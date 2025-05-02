<?php

namespace Database\Factories;

use App\Models\Guardia;
use Illuminate\Database\Eloquent\Factories\Factory;

class GuardiaFactory extends Factory
{
    protected $model = Guardia::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->firstName,
            'apellido_p' => $this->faker->lastName,
            'apellido_m' => $this->faker->lastName,
            'correo' => $this->faker->unique()->safeEmail,
            'codigo_acceso' => $this->faker->regexify('[A-Z0-9]{10}'),
            'calle' => $this->faker->streetName,
            'numero' => $this->faker->buildingNumber,
            'colonia' => $this->faker->word,
            'cp' => $this->faker->numberBetween(10000, 99999),
            'municipio' => $this->faker->city,
            'estado' => $this->faker->state,
            'pais' => $this->faker->country,
            'telefono' => $this->faker->numerify('###########'),
            'enfermedades' => $this->faker->word,
            'alergias' => $this->faker->word,
            'edad' => $this->faker->numberBetween(20, 60),
            'telefono_emergencia' => $this->faker->numerify('###########'),
            'contacto_emergencia' => $this->faker->name,
            'rango' => $this->faker->randomElement(['Guardia', 'Supervisor', 'Jefe de grupo']),

            'foto' => $this->faker->imageUrl(),
            'curp' => 'curp.pdf',
            'ine' => 'ine.pdf',
            'acta_nacimiento' => 'acta_nacimiento.pdf',
            'comprobante_domicilio' => 'comprobante_domicilio.pdf',

            'constancia_situacion_fiscal' => 'constancia_situacion_fiscal.pdf',
            'comprobante_estudios' => 'comprobante_estudios.pdf',
            'carta_recomendacion' => 'carta_recomendacion.pdf',
            'antecedentes_no_penales' => 'antecedentes_no_penales.pdf',
            'otro_archivo' => 'otro_archivo.pdf',

            'antidoping' => 'antidoping.pdf',
            'fecha_antidoping' => $this->faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d')
        ];
    }
}
