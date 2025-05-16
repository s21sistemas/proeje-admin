<?php

namespace App\Http\Controllers;

use App\Models\TiempoExtra;
use Illuminate\Http\Request;

class TiempoExtraController extends Controller
{
    public function index()
    {
        return TiempoExtra::with('guardia')->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'guardia_id' => 'required|exists:guardias,id',
            'horas' => 'required|numeric|min:0.1',
            'monto_por_hora' => 'required|numeric|min:0',
            'monto_total' => 'required|numeric|min:0',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
        ]);

        return TiempoExtra::create($data);
    }

    public function show($id)
    {
        return TiempoExtra::with('guardia')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $extra = TiempoExtra::findOrFail($id);

        $data = $request->validate([
            'horas' => 'sometimes|numeric|min:0.1',
            'monto_por_hora' => 'sometimes|numeric|min:0',
            'monto_total' => 'sometimes|numeric|min:0',
            'fecha_inicio' => 'sometimes|date',
            'fecha_fin' => 'sometimes|date|after_or_equal:fecha_inicio',
        ]);

        $extra->update($data);
        return $extra;
    }

    public function destroy($id)
    {
        $extra = TiempoExtra::findOrFail($id);
        $extra->delete();

        return response()->json(['message' => 'Tiempo extra eliminado']);
    }
}
