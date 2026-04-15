<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\CooperacionEscolar;
use Inertia\Inertia;
use Inertia\Response;

class PublicCooperacionEscolarController extends Controller
{
    public function index(): Response
    {
        $items = CooperacionEscolar::where('activa', true)
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
                        ? asset(env('PUBLIC_COOPERACION_ESCOLAR_PDF_URL_PATH', 'pdfs/cooperacion-escolar') . '/' . $item->archivo_pdf)
                        : null,
                ];
            });

        $area = Area::where('slug', 'cooperacion-escolar')->with('correosActivos')->first();

        return Inertia::render('CooperacionEscolar', [
            'items'   => $items,
            'correos' => $area?->correosActivos ?? collect(),
        ]);
    }
}
