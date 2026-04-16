<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InfraestructuraDocumento extends Model
{
    protected $table = 'infraestructura_documentos';

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
        $basePath = env('PUBLIC_INFRAESTRUCTURA_PDF_URL_PATH', 'pdfs/infraestructura');

        return asset($basePath . '/' . $this->archivo_pdf);
    }
}
