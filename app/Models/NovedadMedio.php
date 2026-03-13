<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NovedadMedio extends Model
{
    protected $fillable = [
        'novedad_id',
        'tipo',
        'ruta',
        'nombre_original',
        'es_principal',
    ];

    protected $casts = [
        'es_principal' => 'boolean',
    ];

    protected $appends = ['url'];

    public function novedad(): BelongsTo
    {
        return $this->belongsTo(Novedad::class);
    }

    public function getUrlAttribute(): string
    {
        return asset(env('PUBLIC_NOVEDADES_IMAGES_URL_PATH') . '/' . $this->ruta);
    }
}
