<?php

namespace App\Http\Controllers;

use App\Models\ReporteBanco;
use Illuminate\Http\Request;

class ReporteBancoController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = ReporteBanco::get();
        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'fecha' => 'required|date',
            'referencia' => 'required|string|max:100',
            'concepto' => 'required|string|max:100',
            'movimiento' => 'required|in:ingreso,egreso',
            'metodo_pago' => 'required|string|max:50',
            'abono' => 'required|string|max:50',
            'cargo' => 'required|string|max:50',
            'saldo' => 'required|string|max:50',
            'banco_id' => 'required|exists:bancos,id',
        ]);

        $registro = ReporteBanco::create($data);
        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = ReporteBanco::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = ReporteBanco::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $request->validate([
            'fecha' => 'sometimes|date',
            'referencia' => 'sometimes|string|max:100',
            'concepto' => 'sometimes|string|max:100',
            'movimiento' => 'sometimes|in:ingreso,egreso',
            'metodo_pago' => 'sometimes|string|max:50',
            'abono' => 'sometimes|string|max:50',
            'cargo' => 'sometimes|string|max:50',
            'saldo' => 'sometimes|string|max:50',
            'banco_id' => 'sometimes|exists:bancos,id',
        ]);

        $registro->update($data);
        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = ReporteBanco::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
