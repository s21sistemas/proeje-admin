<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecursosHumanos extends Model
{
    use HasFactory;
    protected $table = 'recursos_humanos';

    protected $fillable = ['faltas', 'vacaciones', 'descuento_falta', 'descuento_prestamo', 'descuento_uniforme', 'otros_descuentos', 'pago_imss', 'infonavit', 'retencion_impuesto', 'sueldo', 'aguinaldo', 'dias_laborales', 'incapacidades', 'tiempo_extra', 'anticipo_sueldo', 'fonacot', 'guardia_id'];

    protected $hidden = ['guardia_id'];

    public function guardia()
    {
        return $this->belongsTo(Guardia::class, 'guardia_id')->select(['id', 'nombre', 'apellido_p', 'apellido_m']);
    }
}
