<?php

namespace Database\Seeders;

use App\Models\RecursosHumanos;
use App\Models\Guardia;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RecursosHumanosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Guardia::all()->each(function ($guardia) {
            RecursosHumanos::factory()->count(1)->create(['guardia_id' => $guardia->id]);
        });
    }
}
