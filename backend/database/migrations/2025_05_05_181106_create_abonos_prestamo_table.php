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
        Schema::create('abonos_prestamo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prestamo_id')->constrained()->onDelete('cascade');
            $table->decimal('monto', 10, 2);
            $table->date('fecha');
            $table->enum('metodo_pago', ['Transferencia bancaria', 'Tarjeta de crédito/débito', 'Efectivo', 'Cheques', 'Descuento nómina', 'Otro']);
            $table->string('observaciones')->nullable();
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
        Schema::dropIfExists('abonos_prestamo');
    }
};