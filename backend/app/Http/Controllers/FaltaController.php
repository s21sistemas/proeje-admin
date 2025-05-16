<?php

namespace App\Http\Controllers;

use App\Models\Falta;
use Illuminate\Http\Request;

class FaltaController extends Controller
{
    public function index()
    {
        return Falta::with('guardia')->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'guardia_id' => 'required|exists:guardias,id',
            'cantidad_faltas' => 'required|integer|min:1',
            'monto' => 'required|numeric|min:0',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
        ]);

        return Falta::create($data);
    }

    public function show($id)
    {
        return Falta::with('guardia')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $falta = Falta::findOrFail($id);

        $data = $request->validate([
            'cantidad_faltas' => 'sometimes|integer|min:1',
            'monto' => 'sometimes|numeric|min:0',
            'fecha_inicio' => 'sometimes|date',
            'fecha_fin' => 'sometimes|date|after_or_equal:fecha_inicio',
        ]);

        $falta->update($data);
        return $falta;
    }

    public function destroy($id)
    {
        $falta = Falta::findOrFail($id);
        $falta->delete();

        return response()->json(['message' => 'Falta eliminada']);
    }
}
