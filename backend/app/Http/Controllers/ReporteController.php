<?php

namespace App\Http\Controllers;

use App\Models\Almacen;
use App\Models\Equipamiento;
use Illuminate\Http\Request;
use App\Services\ReporteService;

class ReporteController extends Controller
{
    //  * Mostrar un solo registro por su ID.
    public function getReport(Request $request)
    {

        $request->validate([
            'modulo' => 'required|in:movimientos,orden-compra,compras,gastos,ventas,almacen,equipo',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',

            'metodo_pago' => 'nullable|in:todos,Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'tipo_pago' => 'nullable|in:todos,Crédito,Contado',
            'estatus' => 'nullable|in:todos,Pagada,Pendiente,Cancelada',
            'tipo_movimiento' => 'nullable|in:todos,Ingreso,Egreso',
        ]);

        if($request->modulo === 'almacen') {
            $registros = Almacen::with(['articulo'])->whereBetween('created_at', [$request->fecha_inicio, $request->fecha_fin])->get();
        }else if($request->modulo === 'equipo') {
            $registros = Equipamiento::with(['guardia', 'vehiculo', 'detalles.articulo'])
                ->where('eliminado', false)
                ->whereBetween('created_at', [$request->fecha_inicio, $request->fecha_fin])->get();
        }else{
            $registros = ReporteService::obtenerRegistros($request->modulo, $request->all());
        }

        return response()->json($registros);
    }
}
