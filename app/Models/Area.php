<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Area extends Model
{
    protected $fillable = [
        'nombre',
        'slug',
    ];

    public function correos(): HasMany
    {
        return $this->hasMany(AreaCorreo::class);
    }

    public function correosActivos(): HasMany
    {
        return $this->hasMany(AreaCorreo::class)->where('activo', true);
    }
}
