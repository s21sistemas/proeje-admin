<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $table = 'roles';

    protected $fillable = ['nombre', 'descripcion'];

    public function usuarios() {
        return $this->hasMany(Usuario::class);
    }

    public function permisos() {
        return $this->hasMany(Permiso::class);
    }
}
