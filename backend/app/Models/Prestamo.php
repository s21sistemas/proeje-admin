<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Prestamo extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'prestamos';

    protected $fillable = [
        'guardia_id',
        'monto_total',
        'saldo_restante',
        'numero_pagos',
        'fecha_prestamo',
        'fecha_pagado',
        'modulo_prestamo_id',
        'observaciones',
        'estatus',
    ];

    protected $hidden = ['guardia_id', 'modulo_prestamo_id'];

    public function guardia()
    {
        return $this->belongsTo(Guardia::class);
    }

    public function abonos()
    {
        return $this->hasMany(AbonoPrestamo::class);
    }

    public function modulo_prestamo()
    {
        return $this->belongsTo(ModuloPrestamo::class);
    }
}
