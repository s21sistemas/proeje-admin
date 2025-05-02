<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            GuardiasSeeder::class,
            RecursosHumanosSeeder::class,
            ClientesSeeder::class,
            SucursalesSeeder::class,
            ArticulosSeeder::class,
            ProveedoresSeeder::class,
            BancosSeeder::class,
            MovimientosBancariosSeeder::class,
            VehiculosSeeder::class,
            // EquipamientoSeeder::class,
            CotizacionesSeeder::class,
            VentasSeeder::class,
            GastosSeeder::class,
            OrdenesCompraSeeder::class,
            ComprasSeeder::class,
            AlmacenSeeder::class,
        ]);
    }
}
