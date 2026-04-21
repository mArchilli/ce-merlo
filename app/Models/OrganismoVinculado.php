<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrganismoVinculado extends Model
{
    protected $table = 'organismos_vinculados';

    protected $fillable = [
        'titulo',
        'responsable',
        'cargo',
        'direccion',
        'orden',
    ];
}
