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
            ['nombre' => 'Lic. María José Barrionuevo', 'cargo' => 'Presidenta',      'tipo' => 'principal', 'orden' => 1],
            ['nombre' => 'Pablo Robinson Duarte',        'cargo' => 'Vicepresidente',  'tipo' => 'principal', 'orden' => 2],
            ['nombre' => 'Gabriel Aniceto González',     'cargo' => 'Tesorero',        'tipo' => 'principal', 'orden' => 3],
            ['nombre' => 'Juan Carlos Ojeda',            'cargo' => 'Secretario',      'tipo' => 'principal', 'orden' => 4],

            // Vocales
            ['nombre' => 'Aldio Mario Capece',    'cargo' => '1º Vocal', 'tipo' => 'vocal', 'orden' => 1],
            ['nombre' => 'Laura Leguizamón',      'cargo' => '2º Vocal', 'tipo' => 'vocal', 'orden' => 2],
            ['nombre' => 'Juan Sebastián Azarko', 'cargo' => '3º Vocal', 'tipo' => 'vocal', 'orden' => 3],
            ['nombre' => 'Hugo Osvaldo Gerstner', 'cargo' => '4º Vocal', 'tipo' => 'vocal', 'orden' => 4],
            ['nombre' => 'Nilda Gabriela Zapata', 'cargo' => '5º Vocal', 'tipo' => 'vocal', 'orden' => 5],
            ['nombre' => 'María Graciela Scutella','cargo' => '6º Vocal', 'tipo' => 'vocal', 'orden' => 6],
        ];

        foreach ($autoridades as $data) {
            Autoridad::create([
                'nombre' => $data['nombre'],
                'cargo'  => $data['cargo'],
                'tipo'   => $data['tipo'],
                'orden'  => $data['orden'],
                'foto'   => null,
                'activa' => true,
            ]);
        }
    }
}
