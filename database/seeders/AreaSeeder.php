<?php

namespace Database\Seeders;

use App\Models\Area;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    public function run(): void
    {
        $areas = [
            ['nombre' => 'Infraestructura',    'slug' => 'infraestructura'],
            ['nombre' => 'Recursos Humanos',   'slug' => 'recursos-humanos'],
            ['nombre' => 'SAE',                'slug' => 'sae'],
            ['nombre' => 'Cooperación Escolar','slug' => 'cooperacion-escolar'],
            ['nombre' => 'Patrimonio',         'slug' => 'patrimonio'],
            ['nombre' => 'Descentralizados',   'slug' => 'descentralizados'],
            ['nombre' => 'Correo Oficial',     'slug' => 'correo-oficial'],
        ];

        foreach ($areas as $area) {
            Area::firstOrCreate(['slug' => $area['slug']], $area);
        }
    }
}
