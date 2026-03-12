<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Obra extends Model
{
    protected $fillable = [
        'titulo',
        'descripcion',
        'destacada',
    ];

    protected $casts = [
        'destacada' => 'boolean',
    ];

    public function medios(): HasMany
    {
        return $this->hasMany(ObraMedio::class);
    }

    public function medioPrincipal(): HasOne
    {
        return $this->hasOne(ObraMedio::class)->where('es_principal', true);
    }

    public function imagenes(): HasMany
    {
        return $this->hasMany(ObraMedio::class)->where('tipo', 'imagen');
    }

    public function videos(): HasMany
    {
        return $this->hasMany(ObraMedio::class)->where('tipo', 'video');
    }
}
