<?php

namespace Database\Seeders;

use App\Models\TrabajoMenor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TrabajosMenoresSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        TrabajoMenor::truncate();
        Schema::enableForeignKeyConstraints();

        $trabajos = [
            [
                'titulo'     => 'Reparación de puerta de acceso – Escuela N° 6',
                'descripcion'=> '<p>Reemplazo de cerradura y bisagras de la puerta principal de ingreso, con ajuste de marco y aplicación de pintura anticorrosiva.</p>',
                'destacado'  => false,
                'anio'       => 2026,
                'mes'        => 2,
            ],
            [
                'titulo'     => 'Pintura de aulas – Escuela N° 14',
                'descripcion'=> '<p>Lijado, masillado y aplicación de pintura látex lavable en tres aulas de planta alta, con zócalo en esmalte sintético hasta 1,20 m.</p>',
                'destacado'  => false,
                'anio'       => 2025,
                'mes'        => 11,
            ],
            [
                'titulo'     => 'Destape y limpieza de desagüe cloacal – Jardín N° 2',
                'descripcion'=> '<p>Limpieza con hidrojet de los colectores secundarios y cámara de inspección principal, restaurando el normal funcionamiento del sistema cloacal.</p>',
                'destacado'  => false,
                'anio'       => 2025,
                'mes'        => 8,
            ],
            [
                'titulo'     => 'Reposición de vidrios rotos – Escuela N° 37',
                'descripcion'=> '<p>Colocación de vidrio float 4 mm en cuatro ventanas del aula 3 y una ventana del aula 7, con sellado perimetral con silicona neutra.</p>',
                'destacado'  => false,
                'anio'       => 2025,
                'mes'        => 4,
            ],
            [
                'titulo'     => 'Reparación de cielorraso – Escuela N° 20',
                'descripcion'=> '<p>Picado de sector desprendido de yeso en hall central, revoque grueso y fino, y posterior pintura a la cal, eliminando el riesgo de caída de material.</p>',
                'destacado'  => true,
                'anio'       => 2024,
                'mes'        => 10,
            ],
            [
                'titulo'     => 'Instalación de bomba de agua – Escuela N° 9',
                'descripcion'=> '<p>Reemplazo de electrobomba centrífuga de 0,75 HP deteriorada por avería en el devanado, con conexión a tablero eléctrico existente y prueba hidráulica.</p>',
                'destacado'  => false,
                'anio'       => 2024,
                'mes'        => 6,
            ],
            [
                'titulo'     => 'Reparación de vereda perimetral – Escuela N° 41',
                'descripcion'=> '<p>Demolición y reconstrucción de 15 m lineales de vereda de hormigón con pendiente hacia la calzada, eliminando irregularidades que representaban riesgo de caídas.</p>',
                'destacado'  => false,
                'anio'       => 2024,
                'mes'        => 2,
            ],
            [
                'titulo'     => 'Cambio de griferías – Jardín N° 5',
                'descripcion'=> '<p>Reemplazo de griferías de baños y cocina por modelos de bajo consumo con pulsador temporizado, reduciendo el gasto de agua potable.</p>',
                'destacado'  => false,
                'anio'       => 2023,
                'mes'        => 9,
            ],
            [
                'titulo'     => 'Reparación de escalera exterior – Escuela N° 28',
                'descripcion'=> '<p>Reconstrucción de borde deteriorado en tres peldaños, colocación de material antideslizante y refuerzo de pasamanos con anclaje en pared.</p>',
                'destacado'  => true,
                'anio'       => 2023,
                'mes'        => 5,
            ],
            [
                'titulo'     => 'Pintura de patio y señalética vial – Escuela N° 33',
                'descripcion'=> '<p>Demarcación del patio con líneas de juego, señalética de tránsito y línea de seguridad perimetral usando pintura epoxi de alto tránsito en colores reglamentarios.</p>',
                'destacado'  => false,
                'anio'       => 2022,
                'mes'        => 11,
            ],
        ];

        foreach ($trabajos as $datos) {
            TrabajoMenor::create($datos);
        }
    }
}
