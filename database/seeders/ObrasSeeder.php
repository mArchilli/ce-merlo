<?php

namespace Database\Seeders;

use App\Models\Obra;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ObrasSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Obra::truncate();
        Schema::enableForeignKeyConstraints();

        $obras = [
            [
                'titulo'     => 'Refacción integral de fachada – Escuela N° 12',
                'descripcion'=> '<p>Se realizaron trabajos de revoque, pintura exterior y reemplazo de aberturas en la fachada principal del edificio, mejorando la imagen institucional y la eficiencia energética.</p>',
                'destacada'  => true,
                'anio'       => 2025,
                'mes'        => 3,
            ],
            [
                'titulo'     => 'Construcción de aulas nuevas – Escuela N° 34',
                'descripcion'=> '<p>Ampliación del pabellón Norte con dos aulas de 60 m² cada una, baños accesibles y sala de uso múltiple, equipadas con iluminación LED y ventilación cruzada.</p>',
                'destacada'  => true,
                'anio'       => 2025,
                'mes'        => 7,
            ],
            [
                'titulo'     => 'Impermeabilización de cubiertas – Escuela N° 7',
                'descripcion'=> '<p>Aplicación de membrana asfáltica en toda la cubierta plana del edificio principal para eliminar filtraciones crónicas que afectaban salones y pasillos.</p>',
                'destacada'  => false,
                'anio'       => 2024,
                'mes'        => 11,
            ],
            [
                'titulo'     => 'Instalación eléctrica trifásica – Escuela N° 22',
                'descripcion'=> '<p>Renovación completa del tablero general, tendido de cableado trifásico y colocación de disyuntores diferenciales en todos los circuitos, cumpliendo normativa vigente.</p>',
                'destacada'  => false,
                'anio'       => 2024,
                'mes'        => 8,
            ],
            [
                'titulo'     => 'Construcción de SUM – Escuela N° 45',
                'descripcion'=> '<p>Edificación de un Salón de Usos Múltiples de 180 m² con escenario, depósito, baños y salida de emergencia, destinado a actos escolares y actividades comunitarias.</p>',
                'destacada'  => true,
                'anio'       => 2024,
                'mes'        => 4,
            ],
            [
                'titulo'     => 'Reparación de techos – Escuela N° 3',
                'descripcion'=> '<p>Reemplazo de chapas de zinc deterioradas por panel termoacústico de acero prelacado en el pabellón Sur, reduciendo el riesgo de derrumbe e ingreso de agua.</p>',
                'destacada'  => false,
                'anio'       => 2023,
                'mes'        => 10,
            ],
            [
                'titulo'     => 'Patio cubierto – Jardín de Infantes N° 8',
                'descripcion'=> '<p>Construcción de galería techada de 90 m² adosada al edificio principal, permitiendo el uso del patio en condiciones climáticas adversas para los alumnos del nivel inicial.</p>',
                'destacada'  => false,
                'anio'       => 2023,
                'mes'        => 6,
            ],
            [
                'titulo'     => 'Renovación de pisos – Escuela N° 18',
                'descripcion'=> '<p>Demolición de contrapiso deteriorado y colocación de porcelanato antideslizante en pasillos, aulas y baños de planta baja, mejorando las condiciones de higiene y seguridad.</p>',
                'destacada'  => false,
                'anio'       => 2023,
                'mes'        => 2,
            ],
            [
                'titulo'     => 'Construcción de rampa y baño accesible – Escuela N° 29',
                'descripcion'=> '<p>Adecuación del acceso principal y sanitarios conforme a la Ley N° 24.314 de Accesibilidad, incluyendo rampa antideslizante, pasamanos dobles y baño equipado para personas con discapacidad.</p>',
                'destacada'  => true,
                'anio'       => 2022,
                'mes'        => 9,
            ],
            [
                'titulo'     => 'Red de gas natural – Escuela N° 51',
                'descripcion'=> '<p>Extensión de la red de gas natural hasta el establecimiento, con instalación de calefactores de tiro balanceado en todas las aulas, reemplazando estufas a garrafa instaladas hace más de 20 años.</p>',
                'destacada'  => false,
                'anio'       => 2022,
                'mes'        => 5,
            ],
        ];

        foreach ($obras as $datos) {
            Obra::create($datos);
        }
    }
}