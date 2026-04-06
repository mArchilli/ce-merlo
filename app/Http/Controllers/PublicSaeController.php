<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Sae;
use Inertia\Inertia;
use Inertia\Response;

class PublicSaeController extends Controller
{
    public function index(): Response
    {
        $items = Sae::where('activa', true)
            ->orderByDesc('anio')
            ->orderByDesc('mes')
            ->orderByDesc('id')
            ->get()
            ->map(function ($item) {
                return [
                    'id'          => $item->id,
                    'titulo'      => $item->titulo,
                    'descripcion' => $item->descripcion,
                    'anio'        => $item->anio,
                    'mes'         => $item->mes,
                    'pdf_url'     => $item->archivo_pdf
                        ? asset(env('PUBLIC_SAE_PDF_URL_PATH', 'pdfs/sae') . '/' . $item->archivo_pdf)
                        : null,
                ];
            });

        $area = Area::where('slug', 'sae')->with('correosActivos')->first();

        return Inertia::render('Sae', [
            'items'   => $items,
            'correos' => $area?->correosActivos ?? collect(),
        ]);
    }
}
