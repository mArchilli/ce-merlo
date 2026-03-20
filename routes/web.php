<?php

use App\Http\Controllers\NovedadController;
use App\Http\Controllers\ObraController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrabajoMenorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
});

Route::get('/contacto', function () {
    return Inertia::render('Contacto', [
        'canLogin' => Route::has('login'),
    ]);
})->name('contacto');

Route::get('/institucional', function () {
    return Inertia::render('Institucional', [
        'canLogin' => Route::has('login'),
    ]);
})->name('institucional');

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
});

require __DIR__.'/auth.php';
