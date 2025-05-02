<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdenCompra extends Model
{
    use HasFactory;

    protected $table = 'ordenes_compra';

    protected $fillable = ['proveedor_id', 'banco_id', 'articulo_id', 'numero_oc', 'cantidad_articulo', 'precio_articulo', 'metodo_pago', 'impuesto', 'subtotal', 'total', 'estatus'];

    protected $hidden = ['proveedor_id', 'banco_id', 'articulo_id'];

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_id')->select(['id', 'nombre_empresa']);
    }

    public function banco()
    {
        return $this->belongsTo(Banco::class, 'banco_id')->select(['id', 'nombre']);
    }

    public function articulo()
    {
        return $this->belongsTo(Articulo::class, 'articulo_id')->select(['id', 'nombre', 'precio_compra']);
    }
}
