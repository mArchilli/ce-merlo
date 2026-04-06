<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sae extends Model
{
    protected $table = 'sae';

    protected $fillable = [
        'titulo',
        'descripcion',
        'archivo_pdf',
        'activa',
        'anio',
        'mes',
    ];

    protected $casts = [
        'activa' => 'boolean',
    ];

    public function getPdfUrlAttribute(): string
    {
        $basePath = env('PUBLIC_SAE_PDF_URL_PATH', 'pdfs/sae');

        return asset($basePath . '/' . $this->archivo_pdf);
    }
}
