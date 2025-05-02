<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdenServicio extends Model
{
    use HasFactory;

    protected $table = 'ordenes_servicios';

    protected $fillable = ['domicilio_servicio', 'nombre_responsable_sitio', 'telefono_responsable_sitio', 'fecha_inicio', 'fecha_fin', 'estatus', 'observaciones', 'venta_id', 'eliminado'];

    protected $hidden = ['venta_id'];

    public function venta()
    {
        return $this->belongsTo(Venta::class, 'venta_id');
    }

    public function ordenesServicioGuardias()
    {
        return $this->hasMany(OrdenServicioGuardia::class, 'orden_servicio_id');
    }
}
