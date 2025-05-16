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
        Schema::create('check_guardia', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guardia_id')->constrained('guardias')->onDelete('cascade');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->mediumText('ubicacion');
            $table->mediumText('comentarios')->nullable();
            $table->text('foto')->nullable();

            $table->timestamp('fecha_entrada')->useCurrent();
            $table->timestamp('fecha_salida')->nullable();
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
        Schema::dropIfExists('check_guardia');
    }
};
