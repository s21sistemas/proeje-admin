<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RecursosHumanos;

class RecursosHumanosController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = RecursosHumanos::with('guardia')->get();
        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'faltas' => 'required|string',
            'vacaciones' => 'required|string',
            'descuento_falta' => 'required|string',
            'descuento_prestamo' => 'required|string',
            'descuento_uniforme' => 'required|string',
            'otros_descuentos' => 'required|string',
            'pago_imss' => 'required|string',
            'infonavit' => 'required|string',
            'retencion_impuesto' => 'required|string',
            'sueldo' => 'required|string',
            'aguinaldo' => 'required|string',
            'dias_laborales' => 'required|string',
            'incapacidades' => 'required|string',
            'tiempo_extra' => 'required|string',
            'anticipo_sueldo' => 'required|string',
            'fonacot' => 'required|string',
            'guardia_id' => 'required|exists:guardias,id',
        ]);

        $registro = RecursosHumanos::create($data);
        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = RecursosHumanos::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = RecursosHumanos::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'faltas' => 'sometimes|string',
            'vacaciones' => 'sometimes|string',
            'descuento_falta' => 'sometimes|string',
            'descuento_prestamo' => 'sometimes|string',
            'descuento_uniforme' => 'sometimes|string',
            'otros_descuentos' => 'sometimes|string',
            'pago_imss' => 'sometimes|string',
            'infonavit' => 'sometimes|string',
            'retencion_impuesto' => 'sometimes|string',
            'sueldo' => 'sometimes|string',
            'aguinaldo' => 'sometimes|string',
            'dias_laborales' => 'sometimes|string',
            'incapacidades' => 'sometimes|string',
            'tiempo_extra' => 'sometimes|string',
            'anticipo_sueldo' => 'sometimes|string',
            'fonacot' => 'sometimes|string',
            'guardia_id' => 'sometimes|exists:guardias,id',
        ]);

        $registro->update($data);

        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = RecursosHumanos::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
