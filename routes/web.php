<?php

use App\Http\Controllers\AreaCorreoController;
use App\Http\Controllers\AutoridadController;
use App\Http\Controllers\NovedadController;
use App\Http\Controllers\ObraController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicInfraestructuraController;
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

    return Inertia::render('Welcome', [
        'canLogin'    => Route::has('login'),
        'autoridades' => $autoridades,
    ]);
})->name('home');

Route::get('/contacto', function () {
    return Inertia::render('Contacto', [
        'canLogin' => Route::has('login'),
    ]);
})->name('contacto');

Route::get('/areas/infraestructura', [PublicInfraestructuraController::class, 'index'])->name('areas.infraestructura');

Route::prefix('admin')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // Infraestructura - Obras
        Route::get('/infraestructura', [ObraController::class, 'index'])->name('infraestructura.index');
        Route::post('/infraestructura', [ObraController::class, 'store'])->name('infraestructura.store');
        Route::put('/infraestructura/{obra}', [ObraController::class, 'update'])->name('infraestructura.update');
        Route::delete('/infraestructura/{obra}', [ObraController::class, 'destroy'])->name('infraestructura.destroy');
        Route::post('/infraestructura/{obra}/principal', [ObraController::class, 'setPrincipal'])->name('infraestructura.principal');

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
    });

});

require __DIR__.'/auth.php';
