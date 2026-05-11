<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'ce071@abc.gob.ar'],
            [
                'name' => 'Secretario Administrativo',
                'password' => Hash::make('Consejo071'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'ce.infra20@gmail.com'],
            [
                'name' => 'Infraestructura',
                'password' => Hash::make('Consejo071'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'consultasrrhhmerlo@gmail.com'],
            [
                'name' => 'Recursos Humanos',
                'password' => Hash::make('Consejo071'),
            ]
        );
    }
}
