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
        Schema::create('recursos_humanos', function (Blueprint $table) {
            $table->id();
            $table->string('faltas');
            $table->string('vacaciones');
            $table->string('descuento_falta');
            $table->string('descuento_prestamo');
            $table->string('descuento_uniforme');
            $table->string('otros_descuentos');
            $table->string('pago_imss');
            $table->string('infonavit');
            $table->string('retencion_impuesto');
            $table->string('sueldo');
            $table->string('aguinaldo');
            $table->string('dias_laborales');
            $table->string('incapacidades');
            $table->string('tiempo_extra');
            $table->string('anticipo_sueldo');
            $table->string('fonacot');
            $table->foreignId('guardia_id')->constrained('guardias')->onDelete('cascade');
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
        Schema::dropIfExists('recursos_humanos');
    }
};
