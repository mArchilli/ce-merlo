<?php

namespace Database\Seeders;

use App\Models\Autoridad;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AutoridadSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $autoridades = [
            // Autoridades principales
            ['nombre' => 'Maria Jose Barrionuevo', 'cargo' => 'Presidenta',                'tipo' => 'principal', 'area' => null, 'orden' => 1],
            ['nombre' => 'Marcelo Bazz',            'cargo' => 'Vicepresidente',            'tipo' => 'principal', 'area' => null, 'orden' => 2],
            ['nombre' => 'Sergio Arias',            'cargo' => 'Tesorero',                  'tipo' => 'principal', 'area' => null, 'orden' => 3],
            ['nombre' => 'Adriana Schmahl',         'cargo' => 'Secretario del Cuerpo',     'tipo' => 'principal', 'area' => null, 'orden' => 4],
            ['nombre' => 'Francisco Sosa',          'cargo' => 'Secretario Administrativo', 'tipo' => 'principal', 'area' => null, 'orden' => 5],
            ['nombre' => 'Mariela Ruiz Díaz',       'cargo' => 'Secretario Técnico',        'tipo' => 'principal', 'area' => null, 'orden' => 6],

            // Vocales
            ['nombre' => 'William García',   'cargo' => 'Vocal', 'tipo' => 'vocal', 'area' => 'Infraestructura',      'orden' => 1],
            ['nombre' => 'Mariela Suárez',   'cargo' => 'Vocal', 'tipo' => 'vocal', 'area' => 'Recursos Humanos',     'orden' => 2],
            ['nombre' => 'Sergio Arias',     'cargo' => 'Vocal', 'tipo' => 'vocal', 'area' => 'SAE / Compras',        'orden' => 3],
            ['nombre' => 'Juan Carlos Ojeda','cargo' => 'Vocal', 'tipo' => 'vocal', 'area' => 'Cooperación Escolar',  'orden' => 4],
            ['nombre' => 'Yésica Costas',    'cargo' => 'Vocal', 'tipo' => 'vocal', 'area' => 'Patrimonio',           'orden' => 5],
            ['nombre' => 'Noelias Delgado',  'cargo' => 'Vocal', 'tipo' => 'vocal', 'area' => 'Descentralizados',     'orden' => 6],
        ];

        foreach ($autoridades as $data) {
            Autoridad::create([
                'nombre' => $data['nombre'],
                'cargo'  => $data['cargo'],
                'tipo'   => $data['tipo'],
                'area'   => $data['area'],
                'orden'  => $data['orden'],
                'foto'   => null,
                'activa' => true,
            ]);
        }
    }
}
