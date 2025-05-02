<?php

namespace App\Http\Controllers;

use App\Models\Gasto;
use App\Models\MovimientoBancario;
use Illuminate\Http\Request;
use Carbon\Carbon;

class GastoController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Gasto::with('banco')->get();
        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'banco_id' => 'required|exists:bancos,id',
            'concepto' => 'required|string',
            'metodo_pago' => 'required|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'impuesto' => 'nullable|boolean',
            'subtotal' => 'required|numeric|min:1',
            'total' => 'required|numeric|min:1',
        ]);

        $registro = Gasto::create($data);

        MovimientoBancario::create([
            'banco_id'      => $data['banco_id'],
            'tipo_movimiento' => 'Egreso',
            'concepto'      => 'Gasto: ' . $data['concepto'],
            'referencia'    => 'GASTO-' . $data['concepto'] . '-' . $registro->id,
            'monto'         => $data['total'],
            'metodo_pago'   => $data['metodo_pago'],
            'fecha'         => Carbon::now()->format('Y-m-d'),
        ]);

        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = Gasto::find($id);

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

        $request->validate([
            'banco_id' => 'sometimes|exists:bancos,id',
            'concepto' => 'sometimes|string',
            'metodo_pago' => 'sometimes|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'impuesto' => 'nullable|boolean',
            'subtotal' => 'sometimes|numeric|min:1',
            'total' => 'sometimes|numeric|min:1',
        ]);

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
