<?php

namespace Database\Factories;

use App\Models\MovimientoBancario;
use App\Models\Banco;
use Illuminate\Database\Eloquent\Factories\Factory;

class MovimientoBancarioFactory extends Factory
{
    protected $model = MovimientoBancario::class;

    public function definition(): array
    {
        return [
            'banco_id' => Banco::inRandomOrder()->first()->id,
            'tipo_movimiento' => $this->faker->randomElement(['Ingreso', 'Egreso']),
            'concepto' => $this->faker->sentence(),
            'fecha' => $this->faker->date(),
            'referencia' => $this->faker->optional()->uuid(),
            'monto' => $this->faker->randomFloat(2, 100, 10000),
            'metodo_pago' => $this->faker->randomElement([
                'Transferencia bancaria',
                'Tarjeta de crédito/débito',
                'Efectivo',
                'Cheques'
            ]),
        ];
    }
}
