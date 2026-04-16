<?php

use App\Http\Controllers\AreaCorreoController;
use App\Http\Controllers\InfraestructuraDocumentoController;
use App\Http\Controllers\AutoridadController;
use App\Http\Controllers\NovedadController;
use App\Http\Controllers\ObraController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicDescentralizadosController;
use App\Http\Controllers\PublicInfraestructuraController;
use App\Http\Controllers\PublicNovedadController;
use App\Http\Controllers\PatrimonioController;
use App\Http\Controllers\PublicPatrimonioController;
use App\Http\Controllers\CooperacionEscolarController;
use App\Http\Controllers\PublicCooperacionEscolarController;
use App\Http\Controllers\PublicRecursosHumanosController;
use App\Http\Controllers\PublicSaeController;
use App\Http\Controllers\RecursosHumanosController;
use App\Http\Controllers\SaeController;
use App\Http\Controllers\DescentralizadosController;
use App\Http\Controllers\TrabajoMenorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $autoridades = \App\Models\Autoridad::where('activa', true)
        ->orderBy('tipo')
        ->orderBy('orden')
        ->orderBy('id')
        ->get();

    $novedades = \App\Models\Novedad::with('medioPrincipal')
        ->where('activa', true)
        ->where('destacada', true)
        ->orderByDesc('anio')
        ->orderByDesc('mes')
        ->orderByDesc('dia')
        ->orderByDesc('id')
        ->get();

    return Inertia::render('Welcome', [
        'canLogin'    => Route::has('login'),
        'autoridades' => $autoridades,
        'novedades'   => $novedades,
    ]);
})->name('home');

Route::get('/novedades', [PublicNovedadController::class, 'index'])->name('novedades.public');

Route::get('/areas/recursos-humanos', [PublicRecursosHumanosController::class, 'index'])->name('areas.recursos_humanos');
Route::get('/areas/patrimonio', [PublicPatrimonioController::class, 'index'])->name('areas.patrimonio');
Route::get('/areas/cooperacion-escolar', [PublicCooperacionEscolarController::class, 'index'])->name('areas.cooperacion_escolar');
Route::get('/areas/sae', [PublicSaeController::class, 'index'])->name('areas.sae');
Route::get('/areas/descentralizados', [PublicDescentralizadosController::class, 'index'])->name('areas.descentralizados');

Route::get('/contacto', function () {
    return Inertia::render('Contacto', [
        'canLogin' => Route::has('login'),
    ]);
})->name('contacto');

Route::get('/areas/infraestructura', [PublicInfraestructuraController::class, 'index'])->name('areas.infraestructura');
Route::get('/areas/infraestructura/obras', [PublicInfraestructuraController::class, 'listObras'])->name('areas.infraestructura.obras');
Route::get('/areas/infraestructura/trabajos', [PublicInfraestructuraController::class, 'listTrabajos'])->name('areas.infraestructura.trabajos');
Route::get('/areas/infraestructura/{obra}', [PublicInfraestructuraController::class, 'show'])->name('areas.infraestructura.show');

Route::prefix('admin')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

        // Infraestructura - Obras
        Route::get('/infraestructura', [ObraController::class, 'index'])->name('infraestructura.index');
        Route::post('/infraestructura', [ObraController::class, 'store'])->name('infraestructura.store');
        Route::put('/infraestructura/{obra}', [ObraController::class, 'update'])->name('infraestructura.update');
        Route::delete('/infraestructura/{obra}', [ObraController::class, 'destroy'])->name('infraestructura.destroy');
        Route::post('/infraestructura/{obra}/principal', [ObraController::class, 'setPrincipal'])->name('infraestructura.principal');

        // Infraestructura - Documentos PDF
        Route::post('/infraestructura-documentos', [InfraestructuraDocumentoController::class, 'store'])->name('infraestructura_documentos.store');
        Route::put('/infraestructura-documentos/{infraestructuraDocumento}', [InfraestructuraDocumentoController::class, 'update'])->name('infraestructura_documentos.update');
        Route::delete('/infraestructura-documentos/{infraestructuraDocumento}', [InfraestructuraDocumentoController::class, 'destroy'])->name('infraestructura_documentos.destroy');

        // Infraestructura - Trabajos Menores
        Route::post('/trabajos-menores', [TrabajoMenorController::class, 'store'])->name('trabajos_menores.store');
        Route::put('/trabajos-menores/{trabajoMenor}', [TrabajoMenorController::class, 'update'])->name('trabajos_menores.update');
        Route::delete('/trabajos-menores/{trabajoMenor}', [TrabajoMenorController::class, 'destroy'])->name('trabajos_menores.destroy');
        Route::post('/trabajos-menores/{trabajoMenor}/principal', [TrabajoMenorController::class, 'setPrincipal'])->name('trabajos_menores.principal');

        // Novedades
        Route::get('/novedades', [NovedadController::class, 'index'])->name('novedades.index');
        Route::post('/novedades', [NovedadController::class, 'store'])->name('novedades.store');
        Route::put('/novedades/{novedad}', [NovedadController::class, 'update'])->name('novedades.update');
        Route::delete('/novedades/{novedad}', [NovedadController::class, 'destroy'])->name('novedades.destroy');
        Route::post('/novedades/{novedad}/principal', [NovedadController::class, 'setPrincipal'])->name('novedades.principal');

        // Autoridades
        Route::get('/autoridades', [AutoridadController::class, 'index'])->name('autoridades.index');
        Route::post('/autoridades', [AutoridadController::class, 'store'])->name('autoridades.store');
        Route::put('/autoridades/{autoridad}', [AutoridadController::class, 'update'])->name('autoridades.update');
        Route::delete('/autoridades/{autoridad}', [AutoridadController::class, 'destroy'])->name('autoridades.destroy');

        // Correos por área
        Route::get('/correos', [AreaCorreoController::class, 'index'])->name('correos.index');
        Route::post('/correos', [AreaCorreoController::class, 'store'])->name('correos.store');
        Route::put('/correos/{correo}', [AreaCorreoController::class, 'update'])->name('correos.update');
        Route::delete('/correos/{correo}', [AreaCorreoController::class, 'destroy'])->name('correos.destroy');

        // Recursos Humanos
        Route::get('/recursos-humanos', [RecursosHumanosController::class, 'index'])->name('recursos_humanos.index');
        Route::post('/recursos-humanos', [RecursosHumanosController::class, 'store'])->name('recursos_humanos.store');
        Route::put('/recursos-humanos/{recursosHumano}', [RecursosHumanosController::class, 'update'])->name('recursos_humanos.update');
        Route::delete('/recursos-humanos/{recursosHumano}', [RecursosHumanosController::class, 'destroy'])->name('recursos_humanos.destroy');

        // Descentralizados
        Route::get('/descentralizados', [DescentralizadosController::class, 'index'])->name('descentralizados.index');
        Route::post('/descentralizados', [DescentralizadosController::class, 'store'])->name('descentralizados.store');
        Route::put('/descentralizados/{trabajoMenor}', [DescentralizadosController::class, 'update'])->name('descentralizados.update');
        Route::delete('/descentralizados/{trabajoMenor}', [DescentralizadosController::class, 'destroy'])->name('descentralizados.destroy');
        Route::post('/descentralizados/{trabajoMenor}/principal', [DescentralizadosController::class, 'setPrincipal'])->name('descentralizados.principal');

        // Patrimonio
        Route::get('/patrimonio', [PatrimonioController::class, 'index'])->name('patrimonio.index');
        Route::post('/patrimonio', [PatrimonioController::class, 'store'])->name('patrimonio.store');
        Route::put('/patrimonio/{patrimonio}', [PatrimonioController::class, 'update'])->name('patrimonio.update');
        Route::delete('/patrimonio/{patrimonio}', [PatrimonioController::class, 'destroy'])->name('patrimonio.destroy');

        // Cooperación Escolar
        Route::get('/cooperacion-escolar', [CooperacionEscolarController::class, 'index'])->name('cooperacion_escolar.index');
        Route::post('/cooperacion-escolar', [CooperacionEscolarController::class, 'store'])->name('cooperacion_escolar.store');
        Route::put('/cooperacion-escolar/{cooperacionEscolar}', [CooperacionEscolarController::class, 'update'])->name('cooperacion_escolar.update');
        Route::delete('/cooperacion-escolar/{cooperacionEscolar}', [CooperacionEscolarController::class, 'destroy'])->name('cooperacion_escolar.destroy');

        // SAE
        Route::get('/sae', [SaeController::class, 'index'])->name('sae.index');
        Route::post('/sae', [SaeController::class, 'store'])->name('sae.store');
        Route::put('/sae/{sae}', [SaeController::class, 'update'])->name('sae.update');
        Route::delete('/sae/{sae}', [SaeController::class, 'destroy'])->name('sae.destroy');
    });

});

require __DIR__.'/auth.php';
