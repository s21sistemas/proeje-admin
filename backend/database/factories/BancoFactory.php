<?php

namespace Database\Factories;

use App\Models\Banco;
use Illuminate\Database\Eloquent\Factories\Factory;

class BancoFactory extends Factory
{
    protected $model = Banco::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->company . ' Bank',
            'cuenta' => $this->faker->bankAccountNumber,
            'clabe' => $this->faker->numerify('###############'),
        ];
    }
}
