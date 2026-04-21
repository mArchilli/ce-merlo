<?php

namespace Database\Seeders;

use App\Models\PreguntaFrecuente;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PreguntaFrecuenteSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $faqs = [
            [
                'pregunta' => '¿Qué trámites puedo realizar en el Consejo Escolar?',
                'respuesta' => 'En el Consejo Escolar se gestionan trámites relacionados con infraestructura escolar, comedores, transporte educativo, provisión de mobiliario y equipamiento, y administración de personal auxiliar.',
                'orden' => 1,
            ],
            [
                'pregunta' => '¿Necesito sacar turno previo?',
                'respuesta' => 'No es necesario sacar turno previo. Podés acercarte en el horario de atención de lunes a viernes de 8 a 16 hs. Para consultas específicas, te recomendamos comunicarte telefónicamente antes.',
                'orden' => 2,
            ],
            [
                'pregunta' => '¿Cómo reporto un problema de infraestructura en una escuela?',
                'respuesta' => 'Podés acercarte personalmente a la sede del Consejo Escolar, llamar por teléfono al 0220-482-5836 o enviar un correo electrónico detallando el problema y la escuela afectada.',
                'orden' => 3,
            ],
            [
                'pregunta' => '¿El Consejo Escolar gestiona las inscripciones escolares?',
                'respuesta' => 'No, las inscripciones escolares son gestionadas directamente por cada establecimiento educativo. El Consejo Escolar se encarga de la administración de recursos, infraestructura y servicios.',
                'orden' => 4,
            ],
        ];

        foreach ($faqs as $data) {
            PreguntaFrecuente::create($data);
        }
    }
}
