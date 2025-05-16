<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class BoletaGasolina extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'boletas_gasolina';

    protected $fillable = ['vehiculo_id', 'kilometraje', 'litros', 'costo_litro', 'costo_total', 'observaciones'];

    protected $hidden = ['vehiculo_id'];

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class);
    }

    // public function banco()
    // {
    //     return $this->belongsTo(Banco::class);
    // }
}
