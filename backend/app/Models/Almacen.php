<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Almacen extends Model
{
    use HasFactory;

    protected $table = 'almacen';

    protected $fillable = ['articulo_id', 'numero_serie', 'fecha_entrada', 'fecha_salida', 'estado', 'otra_informacion'];

    public function articulo()
    {
        return $this->belongsTo(Articulo::class);
    }

}
