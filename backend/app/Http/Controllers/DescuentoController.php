<?php

namespace App\Http\Controllers;

use App\Models\Descuento;
use Illuminate\Http\Request;

class DescuentoController extends Controller
{
    public function index()
    {
        return Descuento::with(['guardia', 'modulo_descuento'])->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'guardia_id' => 'required|exists:guardias,id',
            'monto' => 'required|numeric|min:0',
            'modulo_descuento_id' => 'required|exists:modulo_descuentos,id',
            'fecha' => 'required|date',
            'observaciones' => 'nullable|string',
        ]);

        return Descuento::create($data);
    }

    public function show($id)
    {
        return Descuento::with(['guardia', 'modulo_descuento'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $descuento = Descuento::findOrFail($id);

        $data = $request->validate([
            'monto' => 'sometimes|numeric|min:0',
            'modulo_descuento_id' => 'sometimes|exists:modulo_descuentos,id',
            'fecha' => 'sometimes|date',
            'observaciones' => 'nullable|string',
        ]);

        $descuento->update($data);
        return $descuento;
    }

    public function destroy($id)
    {
        $descuento = Descuento::findOrFail($id);
        $descuento->delete();

        return response()->json(['message' => 'Descuento eliminado']);
    }
}
