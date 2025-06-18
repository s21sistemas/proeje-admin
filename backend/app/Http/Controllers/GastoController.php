<?php

namespace App\Http\Controllers;

use App\Models\Gasto;
use App\Models\ModuloConcepto;
use App\Models\MovimientoBancario;
use Illuminate\Http\Request;
use Carbon\Carbon;

class GastoController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Gasto::with(['banco', 'modulo_concepto'])->get();
        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'banco_id' => 'required|exists:bancos,id',
            'modulo_concepto_id' => 'required|exists:modulo_conceptos,id',
            'metodo_pago' => 'required|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'referencia' => 'nullable|string',
            'descuento_monto' => 'required|numeric',
            'impuesto' => 'required|numeric',
            'subtotal' => 'required|numeric|min:1',
            'total' => 'required|numeric|min:1',
        ]);

        $registro = Gasto::create($data);

        $concepto = ModuloConcepto::find($request->modulo_concepto_id);

        $referencia = 'GASTO-' . $concepto->nombre . '-' . $registro->id;
        if($registro->metodo_pago === 'Transferencia bancaria' || $registro->metodo_pago === 'Tarjeta de crédito/débito'){
            $referencia = $registro->referencia;
        }

        $registro->movimientosBancarios()->create([
            'banco_id'      => $data['banco_id'],
            'tipo_movimiento' => 'Egreso',
            'concepto'      => 'Gasto: ' . $concepto->nombre,
            'referencia'    => $referencia,
            'monto'         => $data['total'],
            'metodo_pago'   => $data['metodo_pago'],
            'fecha'         => Carbon::now()->format('Y-m-d'),
        ]);

        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = Gasto::with(['banco', 'modulo_concepto'])->find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = Gasto::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'banco_id' => 'sometimes|exists:bancos,id',
            'modulo_concepto_id' => 'sometimes|exists:modulo_conceptos,id',
            'metodo_pago' => 'sometimes|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'referencia' => 'nullable|string',
            'descuento_monto' => 'sometimes|numeric',
            'impuesto' => 'sometimes|numeric',
            'subtotal' => 'sometimes|numeric|min:1',
            'total' => 'sometimes|numeric|min:1',
        ]);

        $concepto = ModuloConcepto::find($data['modulo_concepto_id']);

        $referencia = 'GASTO-' . $concepto->nombre . '-' . $registro->id;
        if($data['metodo_pago'] === 'Transferencia bancaria' || $data['metodo_pago'] === 'Tarjeta de crédito/débito'){
            $referencia = $data['referencia'];
        }else{
            $data['referencia'] = null;
        }

        $movimiento = $registro->movimientosBancarios()->first();
        $datosMovimiento = [
            'banco_id'      => $data['banco_id'] ?? $registro->banco_id,
            'tipo_movimiento' => 'Egreso',
            'concepto'      => 'Gasto: ' . $concepto->nombre,
            'referencia'    => $referencia,
            'monto'         => $data['total'] ?? $registro->total,
            'metodo_pago'   => $data['metodo_pago'] ?? $registro->metodo_pago,
            'fecha'         => Carbon::now()->format('Y-m-d'),
        ];

        if ($movimiento) {
            $movimiento->update($datosMovimiento);
        } else {
            $registro->movimientosBancarios()->create($datosMovimiento);
        }

        $registro->update($data);
        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = Gasto::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
