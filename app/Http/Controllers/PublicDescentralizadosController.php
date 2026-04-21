<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\TrabajoMenor;
use Inertia\Inertia;
use Inertia\Response;

class PublicDescentralizadosController extends Controller
{
    public function index(): Response
    {
        $destacados = TrabajoMenor::where('tipo', 'descentralizados')
            ->where('destacado', true)
            ->with('medioPrincipal')
            ->orderByDesc('anio')
            ->orderByDesc('mes')
            ->orderByDesc('id')
            ->get();

        $area = Area::where('slug', 'descentralizados')->with('correosActivos')->first();

        return Inertia::render('Descentralizados', [
            'destacados' => $destacados,
            'correos'    => $area?->correosActivos ?? collect(),
        ]);
    }

    public function listTrabajos(): Response
    {
        $trabajos = TrabajoMenor::where('tipo', 'descentralizados')
            ->with('medioPrincipal')
            ->orderByDesc('anio')
            ->orderByDesc('mes')
            ->orderByDesc('id')
            ->get();

        return Inertia::render('DescentralizadosLista', [
            'trabajos' => $trabajos,
        ]);
    }

    public function show(TrabajoMenor $trabajoMenor): Response
    {
        abort_unless($trabajoMenor->tipo === 'descentralizados', 404);

        $trabajoMenor->load(['medios' => fn ($q) => $q->orderByDesc('es_principal')->orderBy('id')]);

        return Inertia::render('DescentralizadosShow', [
            'trabajo' => $trabajoMenor,
        ]);
    }
}
