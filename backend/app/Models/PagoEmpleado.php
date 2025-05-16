<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class PagoEmpleado extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'pagos_empleados';

    protected $fillable = ['guardia_id', 'sueldo_base', 'periodo_inicio', 'periodo_fin', 'dias_trabajados', 'tiempo_extra', 'prima_vacacional', 'incapacidades_pagadas', 'descuentos', 'faltas', 'incapacidades_no_pagadas', 'imss', 'infonavit', 'fonacot', 'retencion_isr', 'total_ingresos', 'total_egresos', 'total_retenciones', 'pago_bruto', 'pago_final', 'observaciones'];

    protected $hidden = ['guardia_id'];

    public function guardia()
    {
        return $this->belongsTo(Guardia::class);
    }
}
