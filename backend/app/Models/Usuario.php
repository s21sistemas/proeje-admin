<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'usuarios';

    protected $fillable = ['nombre_completo', 'email', 'password', 'rol_id'];

    protected $hidden = ['rol_id', 'password'];

    public function setContrasenaAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function rol() {
        return $this->belongsTo(Rol::class);
    }
}
