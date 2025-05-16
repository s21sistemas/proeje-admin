<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Gasto extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'gastos';

    protected $fillable = ['banco_id', 'concepto', 'metodo_pago', 'impuesto', 'subtotal', 'total'];

    protected $hidden = ['banco_id'];

    public function banco()
    {
        return $this->belongsTo(Banco::class, 'banco_id');
    }
}
