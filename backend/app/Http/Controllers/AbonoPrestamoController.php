<?php

namespace App\Http\Controllers;

use App\Models\AbonoPrestamo;
use App\Models\Prestamo;
use Illuminate\Http\Request;

class AbonoPrestamoController extends Controller
{
    public function index()
    {
        return AbonoPrestamo::with('prestamo.guardia')->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'prestamo_id' => 'required|exists:prestamos,id',
            'monto' => 'required|numeric|min:1',
            'fecha' => 'required|date',
            'metodo_pago' => 'required|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques,Descuento nómina,Otro',
            'observaciones' => 'nullable|string',
        ]);

        $prestamo = Prestamo::find($request->prestamo_id);

        if (!$prestamo) {
            return response()->json(['error' => 'Prestamo no encontrado'], 404);
        }

        if ($data['monto'] > $prestamo->saldo_restante) {
            return response()->json(['message' => 'El abono excede el saldo pendiente.'], 422);
        }

        $abono = AbonoPrestamo::create($data);

        // actualizar saldo del préstamo
        $prestamo->saldo_restante -= $data['monto'];
        if ($prestamo->saldo_restante <= 0) {
            $prestamo->saldo_restante = 0;
            $prestamo->estatus = "Pagado";
            $prestamo->fecha_pagado = $data['fecha'];
        }
        $prestamo->save();

        return $abono;
    }

    public function show($id)
    {
        return AbonoPrestamo::with('prestamo.guardia')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $registro = AbonoPrestamo::find($id);
        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        // No se permite cambiar monto por seguridad
        $data = $request->validate([
            'fecha' => 'sometimes|date',
            'metodo_pago' => 'sometimes|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques,Descuento nómina,Otro',
            'observaciones' => 'nullable|string',
        ]);

        $registro->update($data);
        return $registro;
    }

    public function destroy($id)
    {
        $registro = AbonoPrestamo::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $prestamo = $abono->prestamo;

        // Revertir saldo si se elimina abono
        $prestamo->saldo_restante += $abono->monto;
        $prestamo->estatus = "Pendiente";
        $prestamo->fecha_pagado = NULL;
        $prestamo->save();

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
