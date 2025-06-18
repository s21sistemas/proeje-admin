<?php

namespace App\Http\Controllers;

use App\Models\MovimientoBancario;
use App\Models\Gasto;
use App\Models\OrdenCompra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MovimientoBancarioController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = MovimientoBancario::with('banco')->get();
        $resultado = $registros->map(function ($mov) {
             $modulo = match($mov->origen_type) {
                'gasto', 'App\\Models\\Gasto' => 'Gasto',
                'orden_compra', 'App\\Models\\OrdenCompra' => 'Orden de Compra',
                'venta', 'App\\Models\\Venta' => 'Venta',
                default => 'Sin origen',
            };
            return [
                'id' => $mov->id,
                'fecha' => $mov->fecha,
                'tipo_movimiento' => $mov->tipo_movimiento,
                'concepto' => $mov->concepto,
                'referencia' => $mov->referencia,
                'monto' => $mov->monto,
                'metodo_pago' => $mov->metodo_pago,
                'banco' => $mov->banco,
                'modulo' => $modulo,
            ];
        });

        return response()->json($resultado);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'tipo_movimiento' => 'required|in:Ingreso,Egreso',
            'concepto' => 'required|string',
            'fecha' => 'required|date',
            'referencia' => 'nullable|string',
            'monto' => 'required|numeric|min:1',
            'metodo_pago' => 'required|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'banco_id' => 'required|exists:bancos,id',
            'origen_id'       => 'required|integer',
            'origen_type'     => 'required|string|in:venta,gasto,orden_compra',
        ]);

        $registro = MovimientoBancario::create($data);
        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $mov = MovimientoBancario::with('banco')->find($id);

        if (!$mov) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $modulo = match($mov->origen_type) {
            'gasto', 'App\\Models\\Gasto' => 'Gasto',
            'orden_compra', 'App\\Models\\OrdenCompra' => 'Orden de Compra',
            'venta', 'App\\Models\\Venta' => 'Venta',
            default => 'Sin origen',
        };

        return response()->json([
            'id' => $mov->id,
            'fecha' => $mov->fecha,
            'tipo_movimiento' => $mov->tipo_movimiento,
            'concepto' => $mov->concepto,
            'referencia' => $mov->referencia,
            'monto' => $mov->monto,
            'metodo_pago' => $mov->metodo_pago,
            'banco' => $mov->banco->nombre ?? null,
            'modulo' => $modulo,
        ]);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = MovimientoBancario::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'tipo_movimiento' => 'sometimes|in:Ingreso,Egreso',
            'concepto' => 'sometimes|string',
            'fecha' => 'sometimes|date',
            'referencia' => 'nullable|string',
            'monto' => 'sometimes|numeric|min:1',
            'metodo_pago' => 'sometimes|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'banco_id' => 'sometimes|exists:bancos,id',
            'origen_id'       => 'sometimes|integer',
            'origen_type'     => 'sometimes|string|in:venta,gasto,orden_compra',
        ]);

        $registro->update($data);
        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = MovimientoBancario::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }

    public function egresosMensuales()
    {
        $añoActual = now()->year;

        $meses = [
            1 => 'Ene', 2 => 'Feb', 3 => 'Mar', 4 => 'Abr',
            5 => 'May', 6 => 'Jun', 7 => 'Jul', 8 => 'Ago',
            9 => 'Sep', 10 => 'Oct', 11 => 'Nov', 12 => 'Dic'
        ];

        $egresos = DB::table('movimientos_bancarios')
            ->selectRaw("MONTH(fecha) as mes, monto, origen_type")
            ->where('tipo_movimiento', 'Egreso')
            ->whereYear('fecha', $añoActual)
            ->get();

        // Agrupar por mes y sumar
        $agrupado = $egresos->groupBy('mes')->map(function ($items, $mes) {
            return [
                'total' => $items->sum('monto'),
                'modulos' => $items->pluck('origen_type')->unique()->map(function ($type) {
                    // Match limpio con tu lógica
                    return match ($type) {
                        'gasto', 'App\\Models\\Gasto' => 'Gasto',
                        'orden_compra', 'App\\Models\\OrdenCompra' => 'Orden de Compra',
                        'venta', 'App\\Models\\Venta' => 'Venta',
                        default => 'Sin origen',
                    };
                })->unique()->values()->all()
            ];
        });

        // Armar la respuesta completa con los 12 meses
        $resultado = collect($meses)->map(function ($nombreMes, $numeroMes) use ($agrupado) {
            $data = $agrupado->get($numeroMes);
            return [
                'mes' => $nombreMes,
                'total' => $data ? round($data['total'], 2) : 0,
                'modulos' => $data ? $data['modulos'] : [],
            ];
        });

        return response()->json($resultado->values());
    }

}
