<?php

namespace Database\Seeders;

use App\Models\TrabajoMenor;
use Illuminate\Database\Seeder;

class DescentralizadosSeeder extends Seeder
{
    public function run(): void
    {
        $trabajos = [
            // Fumigación
            [
                'tipo'        => 'descentralizados',
                'titulo'      => 'Fumigación preventiva – Escuela N° 12',
                'descripcion' => '<p>Aplicación de insecticida residual en perímetro interior y exterior del edificio escolar para control preventivo de vectores (cucarachas, hormigas y mosquitos). Trabajo realizado en horario no escolar con ventilación posterior de 24 hs.</p>',
                'destacado'   => true,
                'anio'        => 2026,
                'mes'         => 3,
            ],
            [
                'tipo'        => 'descentralizados',
                'titulo'      => 'Fumigación de emergencia – Jardín N° 7',
                'descripcion' => '<p>Tratamiento de fumigación de emergencia ante detección de nido de avispas en galería exterior y presencia de insectos en sala de cocina. Se utilizó producto piretroide de baja toxicidad.</p>',
                'destacado'   => false,
                'anio'        => 2025,
                'mes'         => 10,
            ],

            // Desinfección
            [
                'tipo'        => 'descentralizados',
                'titulo'      => 'Desinfección general – Escuela N° 30',
                'descripcion' => '<p>Desinfección integral de aulas, baños, cocina y espacios comunes mediante nebulización con hipoclorito de sodio y amonio cuaternario. La intervención abarcó los dos pisos del establecimiento.</p>',
                'destacado'   => false,
                'anio'        => 2026,
                'mes'         => 2,
            ],
            [
                'tipo'        => 'descentralizados',
                'titulo'      => 'Desinfección de baños y cocina – Escuela Técnica N° 4',
                'descripcion' => '<p>Saneamiento profundo de sanitarios y área de cocina con aplicación de productos biocidas de grado alimentario. Incluye desengrase de mesadas, lavado de paredes y sellado de rejillas.</p>',
                'destacado'   => false,
                'anio'        => 2025,
                'mes'         => 6,
            ],

            // Solicitud de Bidones de Agua
            [
                'tipo'        => 'descentralizados',
                'titulo'      => 'Provisión de bidones de agua – Jardín N° 3',
                'descripcion' => '<p>Entrega y recambio de bidones de agua potable de 20 litros para consumo del personal docente y no docente. Se instalaron tres dispensers y se estableció un cronograma mensual de reposición.</p>',
                'destacado'   => false,
                'anio'        => 2026,
                'mes'         => 1,
            ],
            [
                'tipo'        => 'descentralizados',
                'titulo'      => 'Provisión de bidones de agua – Escuela N° 18',
                'descripcion' => '<p>Solicitud de provisión de agua potable ante corte del servicio municipal. Se entregaron ocho bidones de 20 litros y un dispenser de pie para uso del establecimiento durante la emergencia hídrica.</p>',
                'destacado'   => false,
                'anio'        => 2025,
                'mes'         => 9,
            ],

            // Desagote de pozo
            [
                'tipo'        => 'descentralizados',
                'titulo'      => 'Desagote de pozo absorbente – Escuela N° 25',
                'descripcion' => '<p>Extracción y transporte de líquidos cloacales del pozo absorbente principal del establecimiento, con capacidad de 8.000 litros. Se realizaron dos viajes con camión atmosférico. El trabajo evitó el desborde inminente por colmatación.</p>',
                'destacado'   => true,
                'anio'        => 2026,
                'mes'         => 3,
            ],
            [
                'tipo'        => 'descentralizados',
                'titulo'      => 'Desagote de cámara séptica – Jardín N° 11',
                'descripcion' => '<p>Vaciado de cámara séptica colmatada y lavado a presión de las paredes internas. Se identificó falla en la tapa de acceso, que fue reemplazada como parte del mismo servicio.</p>',
                'destacado'   => false,
                'anio'        => 2025,
                'mes'         => 7,
            ],

            // Limpieza de tanque
            [
                'tipo'        => 'descentralizados',
                'titulo'      => 'Limpieza y desinfección de tanque de agua – Escuela N° 8',
                'descripcion' => '<p>Vaciado, cepillado de paredes y piso, lavado con detergente alcalino y desinfección con hipoclorito al 2 % del tanque de reserva de 5.000 litros. Se realizó análisis bacteriológico previo y posterior con resultado satisfactorio.</p>',
                'destacado'   => false,
                'anio'        => 2026,
                'mes'         => 2,
            ],
            [
                'tipo'        => 'descentralizados',
                'titulo'      => 'Limpieza de tanque elevado – Escuela N° 41',
                'descripcion' => '<p>Inspección, limpieza y cloración del tanque elevado de 3.000 litros ubicado en azotea. Se detectó y reemplazó la válvula flotante deteriorada y se selló una fisura en la pared lateral con mortero hidrófugo.</p>',
                'destacado'   => false,
                'anio'        => 2025,
                'mes'         => 4,
            ],
        ];

        foreach ($trabajos as $datos) {
            TrabajoMenor::firstOrCreate(
                ['titulo' => $datos['titulo'], 'tipo' => 'descentralizados'],
                $datos
            );
        }
    }
}
