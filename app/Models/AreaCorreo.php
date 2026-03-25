<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AreaCorreo extends Model
{
    protected $fillable = [
        'area_id',
        'correo',
        'telefono',
        'es_whatsapp',
        'descripcion',
        'activo',
    ];

    protected $casts = [
        'activo'      => 'boolean',
        'es_whatsapp' => 'boolean',
    ];

    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }
}
