<?php

namespace App\Http\Controllers;

use App\Models\BoletaGasolina;
use Illuminate\Http\Request;

class BoletaGasolinaController extends Controller
{
    public function index()
    {
        return BoletaGasolina::with(['vehiculo'])->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            // 'banco_id' => 'required|exists:bancos,id',
            'vehiculo_id' => 'required|exists:vehiculos,id',
            'kilometraje' => 'required|numeric|min:0',
            'litros' => 'required|numeric|min:1',
            'costo_litro' => 'required|numeric|min:1',
            'costo_total' => 'required|numeric|min:1',
            'observaciones' => 'nullable|string',
        ]);

        return BoletaGasolina::create($data);
    }

    public function show($id)
    {
        return BoletaGasolina::with('guardia')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $registro = BoletaGasolina::findOrFail($id);

        $data = $request->validate([
            // 'banco_id' => 'sometimes|exists:bancos,id',
            'kilometraje' => 'sometimes|numeric|min:0',
            'litros' => 'sometimes|numeric|min:1',
            'costo_litro' => 'sometimes|numeric|min:1',
            'costo_total' => 'sometimes|numeric|min:1',
            'observaciones' => 'nullable|string',
        ]);

        $registro->update($data);
        return $registro;
    }

    public function destroy($id)
    {
        $registro = BoletaGasolina::findOrFail($id);
        $registro->delete();

        return response()->json(['message' => 'Registro eliminado']);
    }
}
