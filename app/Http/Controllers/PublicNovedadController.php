<?php

namespace App\Http\Controllers;

use App\Models\Novedad;
use Inertia\Inertia;
use Inertia\Response;

class PublicNovedadController extends Controller
{
    public function index(): Response
    {
        $novedades = Novedad::with('medioPrincipal')
            ->where('activa', true)
            ->orderByDesc('anio')
            ->orderByDesc('mes')
            ->orderByDesc('dia')
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Novedades', [
            'novedades' => $novedades,
        ]);
    }
}
