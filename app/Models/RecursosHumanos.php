<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecursosHumanos extends Model
{
    protected $table = 'recursos_humanos';

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
        $basePath = env('PUBLIC_RECURSOS_HUMANOS_PDF_URL_PATH', 'pdfs/recursos-humanos');

        return asset($basePath . '/' . $this->archivo_pdf);
    }
}
