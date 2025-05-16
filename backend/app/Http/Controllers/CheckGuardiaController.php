<?php

namespace App\Http\Controllers;

use App\Models\CheckGuardia;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CheckGuardiaController extends Controller
{
    public function index()
    {
        return CheckGuardia::with(['guardia'])->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'guardia_id' => 'required|exists:guardias,id',
            'latitude'    => 'required|numeric|between:-90,90',
            'longitude'   => 'required|numeric|between:-180,180',
            'ubicacion' => 'required|string',
            'comentarios' => 'nullable|string',
            'foto' => 'required|string'
        ]);

        // Verificar si hay un checkin abierto
        $checkAbierto = CheckGuardia::where('guardia_id', $request->guardia_id)
            ->whereNull('fecha_salida')
            ->latest()
            ->first();

        if ($checkAbierto) {
            return response()->json([
                'message' => 'Ya has realizado un check-in. Debes hacer check-out antes de registrar uno nuevo.',
                'check_id' => $checkAbierto->id,
                'fecha_entrada' => Carbon::parse($checkAbierto->fecha_entrada)->format('d/m/Y h:i:s A')
            ], 409);
        }

        $data['fecha_entarda'] = Carbon::now();

        $registro = CheckGuardia::create($data);
        return response()->json(['message' => 'Check-in registrado', 'id' => $registro->id], 201);
    }

    // Registrar Check-out
    public function update(Request $request, $id)
    {
        $registro = CheckGuardia::find($id);

        if(!$registro){
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }elseif ($registro->fecha_salida) {
            return response()->json(['message' => 'Ya se registró la salida anteriormente'], 400);
        }

        $data = $request->validate([
            'foto' => 'required|string'
        ]);

        $registro->update([
            'fecha_salida' => Carbon::now(),
            'foto' => "{$registro->foto},{$request->foto}"
        ]);

        return response()->json(['message' => 'Check-out registrado correctamente']);
    }

    // Obtener último check-in abierto de un guardia
    public function ultimoCheckAbierto($guardiaId)
    {
        $registro = CheckGuardia::where('guardia_id', $guardiaId)
            ->whereNull('fecha_salida')
            ->latest('fecha_entrada')
            ->first();

        return response()->json($registro);
    }

    public function destroy($id)
    {
        $registro = CheckGuardia::findOrFail($id);
        $registro->delete();

        return response()->json(['message' => 'Registro eliminado']);
    }
}
