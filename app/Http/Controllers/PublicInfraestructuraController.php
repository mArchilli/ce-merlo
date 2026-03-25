<?php

namespace App\Http\Controllers;

use App\Models\Area;
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

        return Inertia::render('Infraestructura', [
            'obras'           => $obras,
            'trabajosMenores' => $trabajosMenores,
            'correos'         => $area?->correosActivos ?? collect(),
        ]);
    }
}
