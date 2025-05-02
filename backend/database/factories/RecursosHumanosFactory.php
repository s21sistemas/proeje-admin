<?php

namespace Database\Factories;

use App\Models\Guardia;
use App\Models\RecursosHumanos;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecursosHumanosFactory extends Factory
{
    protected $model = RecursosHumanos::class;

    public function definition()
    {
        return [
            'faltas' => $this->faker->numberBetween(0, 5),
            'vacaciones' => $this->faker->numberBetween(0, 15),
            'descuento_falta' => $this->faker->randomFloat(2, 0, 1000),
            'descuento_prestamo' => $this->faker->randomFloat(2, 0, 2000),
            'descuento_uniforme' => $this->faker->randomFloat(2, 0, 500),
            'otros_descuentos' => $this->faker->randomFloat(2, 0, 500),
            'pago_imss' => $this->faker->randomFloat(2, 100, 2000),
            'infonavit' => $this->faker->randomFloat(2, 0, 1500),
            'retencion_impuesto' => $this->faker->randomFloat(2, 0, 2000),
            'sueldo' => $this->faker->randomFloat(2, 5000, 15000),
            'aguinaldo' => $this->faker->randomFloat(2, 500, 3000),
            'dias_laborales' => $this->faker->numberBetween(5, 6),
            'incapacidades' => $this->faker->numberBetween(0, 5),
            'tiempo_extra' => $this->faker->randomFloat(2, 0, 3000),
            'anticipo_sueldo' => $this->faker->randomFloat(2, 0, 3000),
            'fonacot' => $this->faker->randomFloat(2, 0, 1000),
            'guardia_id' => Guardia::factory(),
        ];
    }
}
