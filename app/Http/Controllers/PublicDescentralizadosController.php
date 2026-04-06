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
        $trabajos = TrabajoMenor::where('tipo', 'descentralizados')
            ->with('medioPrincipal')
            ->orderByDesc('anio')
            ->orderByDesc('mes')
            ->orderByDesc('id')
            ->get();

        $area = Area::where('slug', 'descentralizados')->with('correosActivos')->first();

        return Inertia::render('Descentralizados', [
            'trabajos' => $trabajos,
            'correos'  => $area?->correosActivos ?? collect(),
        ]);
    }
}
