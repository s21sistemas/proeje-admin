<?php

namespace Database\Factories;

use App\Models\Sucursal;
use App\Models\Cliente;
use Illuminate\Database\Eloquent\Factories\Factory;

class SucursalFactory extends Factory
{
    protected $model = Sucursal::class;

    public function definition()
    {
        return [
            'cliente_id' => Cliente::factory(),
            'nombre_empresa' => $this->faker->company,
            'calle' => $this->faker->streetName,
            'numero' => $this->faker->buildingNumber,
            'colonia' => $this->faker->word,
            'cp' => $this->faker->numerify('#####'),
            'municipio' => $this->faker->city,
            'estado' => $this->faker->state,
            'pais' => $this->faker->country,
            'telefono_empresa' => $this->faker->numerify('##########'),
            'extension_empresa' => $this->faker->optional()->numerify('###'),
            'nombre_contacto' => $this->faker->name,
            'telefono_contacto' => $this->faker->numerify('##########'),
            'whatsapp_contacto' => $this->faker->numerify('##########'),
            'correo_contacto' => $this->faker->unique()->safeEmail,

            'rfc' => strtoupper($this->faker->regexify('[A-Z]{4}[0-9]{6}[A-Z0-9]{3}')),
            'razon_social' => $this->faker->company() . ' S.A. de C.V.',
            'uso_cfdi' => $this->faker->randomElement(['G01', 'G03', 'I01', 'D01', 'P01',]),
            'regimen_fiscal' => $this->faker->randomElement(['601 - General de Ley Personas Morales', '605 - Sueldos y Salarios', '612 - Personas Físicas con Actividades Empresariales', '616 - Sin obligaciones fiscales',]),
            'situacion_fiscal' => 'situacion_fiscal.pdf',
        ];
    }
}
