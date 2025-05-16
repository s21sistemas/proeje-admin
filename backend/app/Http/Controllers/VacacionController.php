<?php

namespace App\Http\Controllers;

use App\Models\Vacacion;
use Illuminate\Http\Request;

class VacacionController extends Controller
{
    public function index()
    {
        return Vacacion::with('guardia')->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'guardia_id' => 'required|exists:guardias,id',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'dias_totales' => 'required|integer|min:1',
            'prima_vacacional' => 'nullable|numeric',
            'observaciones' => 'nullable|string',
        ]);

        return Vacacion::create($data);
    }

    public function show($id)
    {
        return Vacacion::with('guardia')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $vacacion = Vacacion::findOrFail($id);

        $data = $request->validate([
            'fecha_inicio' => 'sometimes|date',
            'fecha_fin' => 'sometimes|date|after_or_equal:fecha_inicio',
            'dias_totales' => 'sometimes|integer|min:1',
            'prima_vacacional' => 'nullable|numeric',
            'observaciones' => 'nullable|string',
        ]);

        $vacacion->update($data);

        return $vacacion;
    }

    public function destroy($id)
    {
        $vacacion = Vacacion::findOrFail($id);
        $vacacion->delete();

        return response()->json(['message' => 'Vacación eliminada']);
    }
}
