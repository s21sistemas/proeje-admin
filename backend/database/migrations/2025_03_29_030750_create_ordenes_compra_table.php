<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ordenes_compra', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proveedor_id')->constrained('proveedores')->onDelete('cascade');
            $table->foreignId('banco_id')->constrained('bancos')->onDelete('cascade');
            $table->foreignId('articulo_id')->constrained('articulos')->onDelete('cascade');
            $table->string('numero_oc')->unique();
            $table->unsignedInteger('cantidad_articulo');
            $table->decimal('precio_articulo', 10, 2);
            $table->enum('metodo_pago', ['Transferencia bancaria', 'Tarjeta de crédito/débito', 'Efectivo', 'Cheques']);
            $table->decimal('impuesto', 10, 2)->default(0);
            $table->decimal('subtotal', 10, 2);
            $table->decimal('total', 10, 2);
            $table->enum('estatus', ['Pagada', 'Pendiente', 'Cancelada', 'Vencida'])->default('Pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ordenes_compra');
    }
};
