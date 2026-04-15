<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CooperacionEscolar extends Model
{
    protected $table = 'cooperacion_escolar';

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
        $basePath = env('PUBLIC_COOPERACION_ESCOLAR_PDF_URL_PATH', 'pdfs/cooperacion-escolar');

        return asset($basePath . '/' . $this->archivo_pdf);
    }
}
