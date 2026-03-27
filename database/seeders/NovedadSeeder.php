<?php

namespace Database\Seeders;

use App\Models\Novedad;
use Illuminate\Database\Seeder;

class NovedadSeeder extends Seeder
{
    public function run(): void
    {
        $novedades = [
            // ── Destacadas ──────────────────────────────────────────────────────
            [
                'titulo'      => 'Inicio del ciclo lectivo 2026 en el distrito de Merlo',
                'descripcion' => '<p>El Consejo Escolar de Merlo informa que el ciclo lectivo 2026 comenzó con normalidad en todos los establecimientos educativos del distrito. Se realizaron tareas previas de acondicionamiento en más de 40 escuelas para garantizar condiciones óptimas de inicio de clases.</p><p>Desde el área de Infraestructura se coordinaron trabajos de pintura, limpieza y reparaciones menores en los edificios escolares.</p>',
                'activa'      => true,
                'destacada'   => true,
                'anio'        => 2026,
                'mes'         => 3,
                'dia'         => 2,
            ],
            [
                'titulo'      => 'Obras de ampliación en la Escuela Primaria N° 12',
                'descripcion' => '<p>Se dieron inicio a las obras de ampliación en la Escuela Primaria N° 12 del barrio San Antonio. El proyecto contempla la construcción de dos aulas nuevas y un salón de usos múltiples, beneficiando a más de 400 alumnos.</p><p>Los trabajos estarán a cargo de la empresa constructora seleccionada mediante licitación pública y se estima una duración de seis meses.</p>',
                'activa'      => true,
                'destacada'   => true,
                'anio'        => 2026,
                'mes'         => 2,
                'dia'         => 18,
            ],
            [
                'titulo'      => 'Entrega de materiales y útiles escolares a 62 establecimientos',
                'descripcion' => '<p>El Consejo Escolar de Merlo realizó la entrega de materiales didácticos y útiles escolares a los 62 establecimientos educativos del distrito. La distribución alcanzó a más de 28.000 alumnos de nivel inicial, primario y secundario.</p>',
                'activa'      => true,
                'destacada'   => true,
                'anio'        => 2026,
                'mes'         => 3,
                'dia'         => 10,
            ],
            [
                'titulo'      => 'Reunión con directores de escuelas sobre el plan de mantenimiento 2026',
                'descripcion' => '<p>Autoridades del Consejo Escolar se reunieron con directivos de las escuelas del distrito para presentar el plan de mantenimiento edilicio 2026. Se priorizarán intervenciones en techos, instalaciones eléctricas y sanitarias.</p><p>Los vecinos y la comunidad educativa podrán seguir el avance de las obras a través del sitio web oficial.</p>',
                'activa'      => true,
                'destacada'   => true,
                'anio'        => 2026,
                'mes'         => 1,
                'dia'         => 27,
            ],

            // ── No destacadas ──────────────────────────────────────────────────
            [
                'titulo'      => 'Capacitación para auxiliares docentes del distrito',
                'descripcion' => '<p>Se llevó a cabo una jornada de capacitación para los auxiliares docentes del distrito, organizada por el Consejo Escolar en coordinación con la Dirección General de Cultura y Educación.</p>',
                'activa'      => true,
                'destacada'   => false,
                'anio'        => 2026,
                'mes'         => 2,
                'dia'         => 5,
            ],
            [
                'titulo'      => 'Actualización del padrón de escuelas habilitadas del distrito',
                'descripcion' => '<p>El área de Patrimonio del Consejo Escolar informa la actualización del padrón de establecimientos educativos habilitados en el distrito de Merlo, conforme a la normativa provincial vigente.</p>',
                'activa'      => true,
                'destacada'   => false,
                'anio'        => 2025,
                'mes'         => 12,
                'dia'         => 15,
            ],
            [
                'titulo'      => 'Rendición de cuentas del cuarto trimestre 2025',
                'descripcion' => '<p>El Consejo Escolar de Merlo presenta la rendición de cuentas correspondiente al cuarto trimestre del ejercicio 2025, disponible para consulta en la sede del organismo.</p>',
                'activa'      => true,
                'destacada'   => false,
                'anio'        => 2025,
                'mes'         => 11,
                'dia'         => 30,
            ],
            [
                'titulo'      => 'Instalación de nuevos calefactores en escuelas del sector oeste',
                'descripcion' => '<p>Se completó la instalación de sistemas de calefacción eficiente en ocho escuelas del sector oeste del distrito, en el marco del programa de mejoras edilicias provinicial.</p>',
                'activa'      => true,
                'destacada'   => false,
                'anio'        => 2025,
                'mes'         => 10,
                'dia'         => 20,
            ],
            [
                'titulo'      => 'Jornada comunitaria de limpieza en establecimientos escolares',
                'descripcion' => '<p>Docentes, alumnos y familias participaron de una jornada comunitaria de limpieza y embellecimiento en distintos establecimientos del distrito, en el marco del programa "Escuelas en Comunidad".</p>',
                'activa'      => true,
                'destacada'   => false,
                'anio'        => 2025,
                'mes'         => 9,
                'dia'         => 12,
            ],
            [
                'titulo'      => 'Nuevo sistema de seguimiento de obras en línea',
                'descripcion' => '<p>El Consejo Escolar implementó un sistema de seguimiento en línea para que la comunidad educativa pueda consultar el estado de las obras en curso en los establecimientos del distrito.</p>',
                'activa'      => true,
                'destacada'   => false,
                'anio'        => 2025,
                'mes'         => 8,
                'dia'         => 3,
            ],
        ];

        foreach ($novedades as $novedad) {
            Novedad::create($novedad);
        }
    }
}
