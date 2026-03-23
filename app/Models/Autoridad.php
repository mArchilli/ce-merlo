<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Autoridad extends Model
{
    protected $table = 'autoridades';

    protected $fillable = [
        'nombre',
        'cargo',
        'tipo',
        'foto',
        'orden',
        'activa',
    ];

    protected $casts = [
        'activa' => 'boolean',
        'orden'  => 'integer',
    ];
}
