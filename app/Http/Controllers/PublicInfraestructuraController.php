<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\InfraestructuraDocumento;
use App\Models\Obra;
use App\Models\TrabajoMenor;
use Inertia\Inertia;
use Inertia\Response;

class PublicInfraestructuraController extends Controller
{
    public function index(): Response
    {
        $obras           = Obra::with('medioPrincipal')->withCount('medios')->latest()->get();
        $trabajosMenores = TrabajoMenor::with('medioPrincipal')->withCount('medios')->latest()->get();
        $area            = Area::where('slug', 'infraestructura')->with('correosActivos')->first();

        $documentos = InfraestructuraDocumento::where('activa', true)
            ->orderByDesc('anio')
            ->orderByDesc('mes')
            ->orderByDesc('id')
            ->get()
            ->map(fn ($d) => [
                'id'          => $d->id,
                'titulo'      => $d->titulo,
                'descripcion' => $d->descripcion,
                'anio'        => $d->anio,
                'mes'         => $d->mes,
                'pdf_url'     => $d->archivo_pdf
                    ? asset(env('PUBLIC_INFRAESTRUCTURA_PDF_URL_PATH', 'pdfs/infraestructura') . '/' . $d->archivo_pdf)
                    : null,
            ]);

        return Inertia::render('Infraestructura', [
            'obras'           => $obras,
            'trabajosMenores' => $trabajosMenores,
            'correos'         => $area?->correosActivos ?? collect(),
            'documentos'      => $documentos,
        ]);
    }

    public function listObras(): Response
    {
        $obras = Obra::with('medioPrincipal')
            ->orderByDesc('anio')
            ->orderByDesc('mes')
            ->orderByDesc('id')
            ->get();

        return Inertia::render('InfraestructuraLista', [
            'items' => $obras,
            'tipo'  => 'obras',
        ]);
    }

    public function listTrabajos(): Response
    {
        $trabajos = TrabajoMenor::with('medioPrincipal')
            ->orderByDesc('anio')
            ->orderByDesc('mes')
            ->orderByDesc('id')
            ->get();

        return Inertia::render('InfraestructuraLista', [
            'items' => $trabajos,
            'tipo'  => 'trabajos',
        ]);
    }

    public function show(Obra $obra): Response
    {
        $obra->load(['medios' => fn ($q) => $q->orderByDesc('es_principal')->orderBy('id')]);

        return Inertia::render('ViewObra', [
            'obra' => $obra,
        ]);
    }

    public function showTrabajo(TrabajoMenor $trabajoMenor): Response
    {
        $trabajoMenor->load(['medios' => fn ($q) => $q->orderByDesc('es_principal')->orderBy('id')]);

        // Mapeamos para que ViewObra lo entienda como 'obra'
        // y normalizamos 'destacado' a 'destacada'
        $item = $trabajoMenor->toArray();
        $item['destacada'] = $trabajoMenor->destacado;

        return Inertia::render('ViewObra', [
            'obra' => (object) $item,
        ]);
    }
}
