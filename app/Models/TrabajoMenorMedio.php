<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrabajoMenorMedio extends Model
{
    protected $table = 'trabajo_menor_medios';

    protected $fillable = [
        'trabajo_menor_id',
        'tipo',
        'ruta',
        'nombre_original',
        'es_principal',
    ];

    protected $casts = [
        'es_principal' => 'boolean',
    ];

    protected $appends = ['url'];

    public function trabajoMenor(): BelongsTo
    {
        return $this->belongsTo(TrabajoMenor::class);
    }

    public function getUrlAttribute(): string
    {
        return asset(env('PUBLIC_OBRAS_IMAGES_URL_PATH') . '/' . $this->ruta);
    }
}
