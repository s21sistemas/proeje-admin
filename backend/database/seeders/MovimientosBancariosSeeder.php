<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MovimientoBancario;

class MovimientosBancariosSeeder extends Seeder
{
    public function run(): void
    {
        MovimientoBancario::factory()->count(5)->create();
    }
}
