<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReporteBanco extends Model
{
    use HasFactory;

    protected $table = 'reportes_bancos';

    protected $fillable = ['fecha', 'referencia', 'concepto', 'movimiento', 'metodo_pago', 'abono', 'cargo', 'saldo', 'banco_id'];

    protected $hidden = ['banco_id'];

    public function banco()
    {
        return $this->belongsTo(Banco::class, 'banco_id');
    }
}
