<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\AreaCorreo;
use Illuminate\Database\Seeder;

class AreaCorreoSeeder extends Seeder
{
    public function run(): void
    {
        $correos = [
            [
                'area'       => ['nombre' => 'Presidencia',       'slug' => 'presidencia'],
                'correo'     => 'presidenciacemerlo071@gmail.com',
                'descripcion' => null,
            ],
            [
                'area'       => ['nombre' => 'Patrimonio',        'slug' => 'patrimonio'],
                'correo'     => 'patrimoniocemerlo@gmail.com',
                'descripcion' => null,
            ],
            [
                'area'       => ['nombre' => 'SAE',               'slug' => 'sae'],
                'correo'     => 'comprasconsejoescolarmerlo2021@gmail.com',
                'descripcion' => 'Compras',
            ],
            [
                'area'       => ['nombre' => 'Recursos Humanos',  'slug' => 'recursos-humanos'],
                'correo'     => 'consultasrrhhmerlo@gmail.com',
                'descripcion' => 'Auxiliares',
            ],
            [
                'area'       => ['nombre' => 'Recursos Humanos',  'slug' => 'recursos-humanos'],
                'correo'     => 'pedidosauxiliaresmerlo@gmail.com',
                'descripcion' => 'Pedido de cobertura',
            ],
            [
                'area'       => ['nombre' => 'Recursos Humanos',  'slug' => 'recursos-humanos'],
                'correo'     => 'contraloresauxiliaresmerlo@gmail.com',
                'descripcion' => 'Consultas equipos directivos',
            ],
            [
                'area'       => ['nombre' => 'Jubilaciones',      'slug' => 'jubilaciones'],
                'correo'     => 'jubilaciones.cemerlo@gmail.com',
                'descripcion' => 'Jubilaciones y subsidios de fallecimiento',
            ],
            [
                'area'       => ['nombre' => 'Mesa de Entradas',  'slug' => 'mesa-de-entradas'],
                'correo'     => 'mesadeentradascemerlo@gmail.com',
                'descripcion' => null,
            ],
            [
                'area'       => ['nombre' => 'Descentralizados',  'slug' => 'descentralizados'],
                'correo'     => 'descentralizadospedidos@gmail.com',
                'descripcion' => null,
            ],
            [
                'area'       => ['nombre' => 'Infraestructura',   'slug' => 'infraestructura'],
                'correo'     => 'ce.infra20@gmail.com',
                'descripcion' => null,
            ],
            [
                'area'       => ['nombre' => 'Cooperación Escolar', 'slug' => 'cooperacion-escolar'],
                'correo'     => 'cooperadorasescolaresmerlo2021@gmail.com',
                'descripcion' => null,
            ],
            [
                'area'       => ['nombre' => 'Guardería',         'slug' => 'guarderia'],
                'correo'     => 'tramitesagentesmerlo@gmail.com',
                'descripcion' => 'Seguros y accidentes de alumnos',
            ],
            [
                'area'       => ['nombre' => 'Guardería',         'slug' => 'guarderia'],
                'correo'     => 'accidentesdealumnoscemerlo@gmail.com',
                'descripcion' => 'Accidentes de alumnos',
            ],
            [
                'area'       => ['nombre' => 'Correo Oficial',    'slug' => 'correo-oficial'],
                'correo'     => 'ce071@abc.gob.ar',
                'descripcion' => 'Correo oficial',
            ],
            [
                'area'       => ['nombre' => 'Mesa de Entradas',  'slug' => 'mesa-de-entradas'],
                'correo'     => 'mesadeentradascemerlo@gmail.com',
                'descripcion' => 'Atención al público',
            ],
            [
                'area'        => ['nombre' => 'Infraestructura',  'slug' => 'infraestructura'],
                'telefono'    => '+54 9 11 5669-6431',
                'es_whatsapp' => true,
                'descripcion' => 'WhatsApp de Pedidos (Solo mensajes)',
            ],
            [
                'area'        => ['nombre' => 'Mesa de Entradas', 'slug' => 'mesa-de-entradas'],
                'telefono'    => '+54 9 11 5317-7350',
                'es_whatsapp' => true,
                'descripcion' => 'WhatsApp de Mesa de Entradas (Solo mensajes)',
            ],
        ];

        foreach ($correos as $item) {
            $area = Area::firstOrCreate(
                ['slug' => $item['area']['slug']],
                ['nombre' => $item['area']['nombre']]
            );

            $matchKey = isset($item['telefono'])
                ? ['area_id' => $area->id, 'telefono'    => $item['telefono']]
                : ['area_id' => $area->id, 'correo'      => $item['correo'], 'descripcion' => $item['descripcion']];

            AreaCorreo::firstOrCreate($matchKey, [
                'correo'      => $item['correo']      ?? null,
                'telefono'    => $item['telefono']    ?? null,
                'descripcion' => $item['descripcion'] ?? null,
                'es_whatsapp' => $item['es_whatsapp'] ?? false,
                'activo'      => true,
            ]);
        }
    }
}
