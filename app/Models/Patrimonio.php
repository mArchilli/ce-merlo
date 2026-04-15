<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patrimonio extends Model
{
    protected $table = 'patrimonio';

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
        $basePath = env('PUBLIC_PATRIMONIO_PDF_URL_PATH', 'pdfs/patrimonio');

        return asset($basePath . '/' . $this->archivo_pdf);
    }
}
