<?php

namespace App\Http\Controllers;

use App\Models\Guardia;
use App\Models\OrdenServicioGuardia;
use App\Models\OrdenServicio;
use Illuminate\Http\Request;
use DB;

class OrdenServicioController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = OrdenServicio::with(['venta.cotizacion.sucursal', 'ordenesServicioGuardias.guardia'])->where('eliminado', false)->get();
        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'venta_id' => 'required|exists:ventas,id',
            'domicilio_servicio' => 'required|string',
            'nombre_responsable_sitio' => 'required|string|max:100',
            'telefono_responsable_sitio' => 'required|string|max:15',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'observaciones' => 'nullable|string',

            // Validación para los guardias
            'guardias_id' => 'required|array',
            'guardias_id.*.value' => 'required|integer|exists:guardias,id',

            // Validación para los supervisores (si existe)
            'supervisor_id' => 'nullable|integer|exists:guardias,id',
            // Validación para los jefes de grupo (si existe)
            'jefe_grupo_id' => 'nullable|integer|exists:guardias,id',
        ]);

        DB::beginTransaction();
        try {
            $registro = OrdenServicio::create($data);

            foreach ($request->guardias_id as $guardia) {
                OrdenServicioGuardia::create([
                    'orden_servicio_id' => $registro->id,
                    'guardia_id' => $guardia['value'],
                ]);

                Guardia::find($guardia['value'])->update(['estatus' => 'Asignado']);
            }

            if($request->supervisor_id){
                OrdenServicioGuardia::create([
                    'orden_servicio_id' => $registro->id,
                    'guardia_id' => $request->supervisor_id,
                ]);

                Guardia::find($request->supervisor_id)->update(['estatus' => 'Asignado']);
            }

            if($request->jefe_grupo_id){
                OrdenServicioGuardia::create([
                    'orden_servicio_id' => $registro->id,
                    'guardia_id' => $request->jefe_grupo_id,
                ]);

                Guardia::find($request->jefe_grupo_id)->update(['estatus' => 'Asignado']);
            }

            DB::commit();
            return response()->json(['message' => 'Registros guardados correctamente'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar los datos', 'error' => $e->getMessage()], 500);
        }
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = OrdenServicio::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'venta_id' => 'required|exists:ventas,id',
            'domicilio_servicio' => 'required|string',
            'nombre_responsable_sitio' => 'required|string|max:100',
            'telefono_responsable_sitio' => 'required|string|max:15',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'observaciones' => 'nullable|string',

            'guardias_id' => 'required|array',
            'guardias_id.*.value' => 'required|integer|exists:guardias,id',

            'supervisor_id' => 'nullable|integer|exists:guardias,id',
            'jefe_grupo_id' => 'nullable|integer|exists:guardias,id',
        ]);

        DB::beginTransaction();
        try {
            $orden = OrdenServicio::findOrFail($id);
            $orden->update($data);

            // Guardamos los IDs de todos los guardias que deben estar asignados
            $nuevosGuardias = collect($request->guardias_id)->pluck('value')->toArray();

            if ($request->supervisor_id) {
                $nuevosGuardias[] = $request->supervisor_id;
            }

            if ($request->jefe_grupo_id) {
                $nuevosGuardias[] = $request->jefe_grupo_id;
            }

            // Obtenemos los actuales para comparar
            $guardiasActuales = $orden->ordenesServicioGuardias->pluck('guardia_id')->toArray();

            // Calculamos diferencias
            $guardiasEliminados = array_diff($guardiasActuales, $nuevosGuardias);
            $guardiasNuevos = array_diff($nuevosGuardias, $guardiasActuales);

            // Actualizamos estatus de los guardias eliminados
            Guardia::whereIn('id', $guardiasEliminados)->update(['estatus' => 'Disponible']);

            // Actualizamos estatus de los nuevos guardias
            Guardia::whereIn('id', $guardiasNuevos)->update(['estatus' => 'Asignado']);

            OrdenServicioGuardia::where('orden_servicio_id', $orden->id)
            ->whereIn('guardia_id', $guardiasEliminados)
            ->delete();

            foreach ($guardiasNuevos as $guardiaId) {
                OrdenServicioGuardia::create([
                    'orden_servicio_id' => $orden->id,
                    'guardia_id' => $guardiaId,
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Orden actualizada correctamente']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al actualizar la orden', 'error' => $e->getMessage()], 500);
        }
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = OrdenServicio::findOrFail($id);

        $guardias = $registro->ordenesServicioGuardias->pluck('guardia_id')->toArray();
        Guardia::whereIn('id', $guardias)->update(['estatus' => 'Disponible']);

        $registro->update(['eliminado' => true]);

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
