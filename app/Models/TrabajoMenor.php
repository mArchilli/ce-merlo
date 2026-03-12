<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TrabajoMenor extends Model
{
    protected $table = 'trabajos_menores';

    protected $fillable = [
        'titulo',
        'descripcion',
        'destacado',
    ];

    protected $casts = [
        'destacado' => 'boolean',
    ];

    public function medios(): HasMany
    {
        return $this->hasMany(TrabajoMenorMedio::class);
    }

    public function medioPrincipal(): HasOne
    {
        return $this->hasOne(TrabajoMenorMedio::class)->where('es_principal', true);
    }

    public function imagenes(): HasMany
    {
        return $this->hasMany(TrabajoMenorMedio::class)->where('tipo', 'imagen');
    }

    public function videos(): HasMany
    {
        return $this->hasMany(TrabajoMenorMedio::class)->where('tipo', 'video');
    }
}
