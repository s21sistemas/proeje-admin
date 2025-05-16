<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Models\QRPuntoRecorrido;
use App\Models\QRRecorridoGuardia;
use Carbon\Carbon;
use Illuminate\Http\Request;

class QRRecorridoGuardiaController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = QRRecorridoGuardia::select('qr_recorridos_guardia.*')
            ->join('qr_puntos_recorrido as puntos', 'qr_recorridos_guardia.qr_punto_id', '=', 'puntos.id')
            ->join('qrs_generados as generados', 'puntos.qr_generado_id', '=', 'generados.id')
            ->join('ordenes_servicios as ordenes', 'generados.orden_servicio_id', '=', 'ordenes.id')
            ->with(['guardia', 'punto.qr_generado.orden_servicio'])
            ->orderBy('ordenes.codigo_orden_servicio', 'asc')
            ->get();

        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $request->validate([
            'uuid' => 'required|uuid',
            'guardia_id' => 'required|exists:guardias,id',
            'observaciones' => 'nullable|string',
            'foto' => 'nullable|string'
        ]);

        $punto = QRPuntoRecorrido::where('codigo_qr', $request->uuid)->first();

        if (!$punto) {
            return response()->json(['error' => 'QR no válido'], 404);
        }

        $registro = QRRecorridoGuardia::create([
            'guardia_id' => $request->guardia_id,
            'qr_punto_id' => $punto->id,
            'fecha_escaneo' => Carbon::now(),
            'observaciones' => $request->observaciones,
            'foto' => $request->foto
        ]);

        return response()->json(['message' => 'Punto del recorrido guardado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = QRRecorridoGuardia::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }

    public function validar($uuid)
    {
        $punto = QRPuntoRecorrido::where('codigo_qr', $uuid)->first();

        if (!$punto) {
            return response()->json(['message' => 'QR no válido'], 404);
        }

        return response()->json([
            'qr_punto_id' => $punto->id,
            'orden_servicio_id' => $punto->qrGenerado->orden_servicio_id,
            'mensaje' => 'QR válido, puedes continuar',
        ]);
    }
}
