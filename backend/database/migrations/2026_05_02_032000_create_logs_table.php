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
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->string('modulo'); // Ej: 'Usuario', 'Rol', 'Pago'
            $table->unsignedBigInteger('modulo_id'); // ID del modelo afectado
            $table->string('accion'); // Ej: 'crear', 'actualizar', 'eliminar'
            $table->json('datos_anteriores')->nullable(); // Estado anterior
            $table->json('datos_nuevos')->nullable(); // Estado nuevo
            $table->unsignedBigInteger('usuario_id')->nullable(); // Usuario que hizo el cambio
            $table->string('ip')->nullable(); // IP del usuario
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
        Schema::dropIfExists('logs');
    }
};
