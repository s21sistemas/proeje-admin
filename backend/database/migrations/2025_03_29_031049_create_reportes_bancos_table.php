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
        Schema::create('reportes_bancos', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('referencia', 100);
            $table->string('concepto', 100);
            $table->enum('movimiento', ['ingreso', 'egreso']);
            $table->string('metodo_pago', 50);
            $table->string('abono', 50);
            $table->string('cargo', 50);
            $table->string('saldo', 50);
            $table->foreignId('banco_id')->constrained('bancos')->onDelete('cascade');
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
        Schema::dropIfExists('reportes_bancos');
    }
};
