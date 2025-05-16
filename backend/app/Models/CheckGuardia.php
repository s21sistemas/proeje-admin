<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class CheckGuardia extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'check_guardia';

    protected $fillable = [
        'guardia_id',
        'latitude',
        'longitude',
        'ubicacion',
        'comentarios',
        'foto',
        'fecha_entrada',
        'fecha_salida'
    ];

    public function guardia()
    {
        return $this->belongsTo(Guardia::class);
    }
}
