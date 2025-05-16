<?php

namespace App\Traits;

use App\Models\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

trait HasLogs
{
    public static function bootHasLogs()
    {
        static::created(function ($model) {
            self::registrarLog($model, 'crear', null, $model->getAttributes());
        });

        static::updated(function ($model) {
            $dirty = $model->getDirty();
            self::registrarLog($model, 'actualizar', $model->getOriginal(), $dirty);
        });

        static::deleted(function ($model) {
            self::registrarLog($model, 'eliminar', $model->getOriginal(), null);
        });
    }

    protected static function registrarLog($model, $accion, $datosAnteriores = null, $datosNuevos = null)
    {
        Log::create([
            'modulo' => class_basename($model),
            'modulo_id' => $model->id,
            'accion' => $accion,
            'datos_anteriores' => $datosAnteriores ? json_encode($datosAnteriores) : null,
            'datos_nuevos' => $datosNuevos ? json_encode($datosNuevos) : null,
            // 'usuario_id' => Auth::id(),
            'usuario_id' => 1,
            'ip' => Request::ip(),
        ]);
    }
}
