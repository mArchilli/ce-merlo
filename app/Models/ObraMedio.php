<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ObraMedio extends Model
{
    protected $fillable = [
        'obra_id',
        'tipo',
        'ruta',
        'nombre_original',
        'es_principal',
    ];

    protected $casts = [
        'es_principal' => 'boolean',
    ];

    protected $appends = ['url'];

    public function obra(): BelongsTo
    {
        return $this->belongsTo(Obra::class);
    }

    public function getUrlAttribute(): string
    {
        return asset(env('PUBLIC_OBRAS_IMAGES_URL_PATH') . '/' . $this->ruta);
    }
}
