<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class AbonoPrestamo extends Model
{
    use HasFactory, HasLogs;
    protected $table = 'abonos_prestamo';

    protected $fillable = [
        'prestamo_id',
        'monto',
        'fecha',
        'metodo_pago',
        'observaciones',
    ];

    protected $hidden = ['prestamo_id'];

    public function prestamo()
    {
        return $this->belongsTo(Prestamo::class);
    }
}
