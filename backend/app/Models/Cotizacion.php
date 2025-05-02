<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cotizacion extends Model
{
    use HasFactory;

    protected $table = 'cotizaciones';

    protected $fillable = [
        'nombre_empresa',
        'calle',
        'numero',
        'colonia',
        'cp',
        'municipio',
        'estado',
        'pais',
        'telefono_empresa',
        'extension_empresa',
        'nombre_contacto',
        'telefono_contacto',
        'whatsapp_contacto',
        'correo_contacto',

        'credito_dias',
        'descuento_porcentaje',

        'fecha_servicio',
        'servicios',
        'guardias_dia',
        'precio_guardias_dia',
        'guardias_noche',
        'precio_guardias_noche',
        'cantidad_guardias',
        'jefe_grupo',
        'precio_jefe_grupo',
        'supervisor',
        'precio_supervisor',
        'notas',
        'costo_extra',
        'subtotal',
        'impuesto',
        'total',
        'aceptada',
        'sucursal_id',
        'soporte_documental',
        'observaciones_soporte_documental',
        'requisitos_pago_cliente',
        'rfc',
        'razon_social',
        'uso_cfdi',
        'regimen_fiscal',
        'situacion_fiscal'
    ];

    protected $hidden = ['sucursal_id'];

    public function sucursal()
    {
        return $this->belongsTo(Sucursal::class, 'sucursal_id');
    }

    public function venta()
    {
        return $this->hasOne(Venta::class, 'cotizacion_id');
    }

    public function getSituacionFiscalUrlAttribute()
    {
        if (!$this->situacion_fiscal) {
            return;
        }

        return asset("storage/documento_fiscal_cotizacion/{$this->situacion_fiscal}");
    }
}
