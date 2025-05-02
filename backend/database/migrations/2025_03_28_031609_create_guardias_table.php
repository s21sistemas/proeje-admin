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
        Schema::create('guardias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100);
            $table->string('apellido_p', 100);
            $table->string('apellido_m', 100);
            $table->string('correo', 100)->unique();
            $table->string('codigo_acceso', 10);
            $table->string('calle', 100);
            $table->string('numero', 20);
            $table->string('colonia', 50);
            $table->unsignedInteger('cp');
            $table->string('municipio', 100);
            $table->string('estado', 100);
            $table->string('pais', 100);
            $table->string('telefono', 15);
            $table->string('enfermedades', 100);
            $table->string('alergias', 100);
            $table->unsignedInteger('edad');
            $table->string('telefono_emergencia', 15);
            $table->string('contacto_emergencia', 100);
            $table->mediumText('foto');
            $table->mediumText('curp');
            $table->mediumText('ine');
            $table->mediumText('acta_nacimiento');
            $table->mediumText('comprobante_domicilio');
            $table->mediumText('constancia_situacion_fiscal');

            $table->mediumText('comprobante_estudios')->nullable();
            $table->mediumText('carta_recomendacion')->nullable();
            $table->mediumText('antecedentes_no_penales')->nullable();
            $table->mediumText('otro_archivo')->nullable();

            $table->mediumText('antidoping')->nullable();
            $table->date('fecha_antidoping')->nullable();

            $table->enum('estatus', ['Disponible', 'Descansado', 'Dado de baja', 'Asignado'])->default('Disponible');
            $table->enum('rango', ['Guardia', 'Supervisor', 'Jefe de grupo'])->default('Guardia');

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
        Schema::dropIfExists('guardias');
    }
};
