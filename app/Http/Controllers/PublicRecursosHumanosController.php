<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\RecursosHumanos;
use Inertia\Inertia;
use Inertia\Response;

class PublicRecursosHumanosController extends Controller
{
    public function index(): Response
    {
        $recursos = RecursosHumanos::where('activa', true)
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
                        ? asset(env('PUBLIC_RECURSOS_HUMANOS_PDF_URL_PATH', 'pdfs/recursos-humanos') . '/' . $item->archivo_pdf)
                        : null,
                ];
            });

        $area = Area::where('slug', 'recursos-humanos')->with('correosActivos')->first();

        return Inertia::render('RecursosHumanos', [
            'recursos' => $recursos,
            'correos'  => $area?->correosActivos ?? collect(),
        ]);
    }
}
