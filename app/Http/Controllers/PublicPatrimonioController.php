<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Patrimonio;
use Inertia\Inertia;
use Inertia\Response;

class PublicPatrimonioController extends Controller
{
    public function index(): Response
    {
        $items = Patrimonio::where('activa', true)
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
                        ? asset(env('PUBLIC_PATRIMONIO_PDF_URL_PATH', 'pdfs/patrimonio') . '/' . $item->archivo_pdf)
                        : null,
                ];
            });

        $area = Area::where('slug', 'patrimonio')->with('correosActivos')->first();

        return Inertia::render('Patrimonio', [
            'items'   => $items,
            'correos' => $area?->correosActivos ?? collect(),
        ]);
    }
}
