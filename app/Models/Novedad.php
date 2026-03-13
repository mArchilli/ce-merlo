<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Novedad extends Model
{
    protected $table = 'novedades';

    protected $fillable = [
        'titulo',
        'descripcion',
        'activa',
        'destacada',
    ];

    protected $casts = [
        'activa'    => 'boolean',
        'destacada' => 'boolean',
    ];

    public function medios(): HasMany
    {
        return $this->hasMany(NovedadMedio::class);
    }

    public function medioPrincipal(): HasOne
    {
        return $this->hasOne(NovedadMedio::class)->where('es_principal', true);
    }

    public function imagenes(): HasMany
    {
        return $this->hasMany(NovedadMedio::class)->where('tipo', 'imagen');
    }

    public function videos(): HasMany
    {
        return $this->hasMany(NovedadMedio::class)->where('tipo', 'video');
    }
}
