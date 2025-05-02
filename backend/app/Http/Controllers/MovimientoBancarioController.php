<?php

namespace App\Http\Controllers;

use App\Models\MovimientoBancario;
use Illuminate\Http\Request;

class MovimientoBancarioController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = MovimientoBancario::with('banco')->get();
        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'tipo_movimiento' => 'required|in:Ingreso,Egreso',
            'concepto' => 'required|string',
            'fecha' => 'required|date',
            'referencia' => 'nullable|string',
            'monto' => 'required|numeric|min:1',
            'metodo_pago' => 'required|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'banco_id' => 'required|exists:bancos,id',
        ]);

        $registro = MovimientoBancario::create($data);
        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = MovimientoBancario::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = MovimientoBancario::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'tipo_movimiento' => 'sometimes|in:Ingreso,Egreso',
            'concepto' => 'sometimes|string',
            'fecha' => 'sometimes|date',
            'referencia' => 'nullable|string',
            'monto' => 'sometimes|numeric|min:1',
            'metodo_pago' => 'sometimes|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'banco_id' => 'sometimes|exists:bancos,id',
        ]);

        $registro->update($data);
        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = MovimientoBancario::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
