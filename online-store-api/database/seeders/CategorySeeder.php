<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Electrónica',
                'description' => 'Dispositivos electrónicos como teléfonos, laptops y tablets.',
            ],
            [
                'name' => 'Hogar',
                'description' => 'Artículos para el hogar y la cocina.',
            ],
            [
                'name' => 'Ropa',
                'description' => 'Prendas de vestir para hombres, mujeres y niños.',
            ],
            [
                'name' => 'Deportes',
                'description' => 'Equipo y accesorios para actividades deportivas.',
            ],
            [
                'name' => 'Juguetes',
                'description' => 'Juguetes y juegos para todas las edades.',
            ],
        ]);
    }
}
