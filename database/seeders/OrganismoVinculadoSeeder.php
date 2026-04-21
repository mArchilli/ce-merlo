<?php

namespace Database\Seeders;

use App\Models\OrganismoVinculado;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrganismoVinculadoSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $organismos = [
            ['titulo' => 'Jefatura Distrital',                                    'responsable' => 'Hugo Rosa',      'cargo' => 'Jefe Distrital',              'direccion' => null, 'orden' => 1],
            ['titulo' => 'Secretaría de Educación',                               'responsable' => 'Silvana Zahana', 'cargo' => 'Secretaria de Educación',     'direccion' => null, 'orden' => 2],
            ['titulo' => 'Sede Inspectores de Nivel',                             'responsable' => 'Hugo Rosa',      'cargo' => 'Inspector Jefe Distrital',    'direccion' => null, 'orden' => 3],
            ['titulo' => 'Dirección Provincial de Infraestructura Escolar (DPIe)','responsable' => 'Karina Morales', 'cargo' => 'Inspectora Regional',         'direccion' => null, 'orden' => 4],
        ];

        foreach ($organismos as $data) {
            OrganismoVinculado::create($data);
        }
    }
}
