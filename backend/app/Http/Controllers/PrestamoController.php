<?php

namespace App\Http\Controllers;

use App\Models\Prestamo;
use Illuminate\Http\Request;

class PrestamoController extends Controller
{
    public function index()
    {
        return Prestamo::with(['guardia', 'abonos', 'modulo_prestamo'])->latest()->get();
    }

    public function prestamosPendientes()
    {
        return Prestamo::with(['guardia', 'abonos', 'modulo_prestamo'])->where('estatus', 'Pendiente')->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'guardia_id' => 'required|exists:guardias,id',
            'monto_total' => 'required|numeric|min:1',
            'numero_pagos' => 'required|integer|min:1',
            'fecha_prestamo' => 'required|date',
            'modulo_prestamo_id' => 'required|exists:modulo_prestamos,id',
            'observaciones' => 'nullable|string',
        ]);

        $data['saldo_restante'] = $data['monto_total'];

        return Prestamo::create($data);
    }

    public function show($id)
    {
        return Prestamo::with(['guardia', 'abonos', 'modulo_prestamo'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $prestamo = Prestamo::find($id);
        if (!$prestamo) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'numero_pagos' => 'sometimes|integer|min:1',
            'fecha_prestamo' => 'sometimes|date',
            'modulo_prestamo_id' => 'sometimes|exists:modulo_prestamos,id',
            'observaciones' => 'nullable|string',
        ]);

        $prestamo->update($data);
        return $prestamo;
    }

    public function destroy($id)
    {
        $registro = Prestamo::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
