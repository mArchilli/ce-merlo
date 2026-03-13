<?php

namespace App\Http\Controllers;

use App\Models\Novedad;
use App\Models\NovedadMedio;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class NovedadController extends Controller
{
    public function index(): Response
    {
        $novedades = Novedad::with(['medioPrincipal', 'medios'])->withCount('medios')->latest()->get();

        return Inertia::render('admin/novedades/NovedadesIndex', [
            'novedades' => $novedades,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'titulo'          => 'required|string|max:255',
            'descripcion'     => 'nullable|string',
            'activa'          => 'boolean',
            'destacada'       => 'boolean',
            'medios'          => 'nullable|array',
            'medios.*'        => 'file|mimes:jpg,jpeg,png,gif,webp,mp4,mov,avi,webm|max:102400',
            'principal_index' => 'nullable|integer',
        ]);

        DB::transaction(function () use ($request) {
            $novedad = Novedad::create([
                'titulo'      => $request->titulo,
                'descripcion' => $request->descripcion,
                'activa'      => $request->boolean('activa', true),
                'destacada'   => $request->boolean('destacada'),
            ]);

            if ($request->hasFile('medios')) {
                foreach ($request->file('medios') as $index => $archivo) {
                    $tipo = str_starts_with($archivo->getMimeType(), 'video') ? 'video' : 'imagen';
                    $ruta = $this->guardarArchivo($archivo, $novedad->id);

                    $novedad->medios()->create([
                        'tipo'            => $tipo,
                        'ruta'            => $ruta,
                        'nombre_original' => $archivo->getClientOriginalName(),
                        'es_principal'    => ($index === (int) $request->principal_index),
                    ]);
                }

                if ($request->principal_index === null) {
                    $novedad->medios()->first()?->update(['es_principal' => true]);
                }
            }
        });

        return redirect()->route('novedades.index')->with('success', 'Novedad creada correctamente.');
    }

    public function update(Request $request, Novedad $novedad): RedirectResponse
    {
        $request->validate([
            'titulo'             => 'required|string|max:255',
            'descripcion'        => 'nullable|string',
            'activa'             => 'boolean',
            'destacada'          => 'boolean',
            'medios'             => 'nullable|array',
            'medios.*'           => 'file|mimes:jpg,jpeg,png,gif,webp,mp4,mov,avi,webm|max:102400',
            'principal_medio_id' => 'nullable|integer|exists:novedad_medios,id',
            'medios_eliminar'    => 'nullable|array',
            'medios_eliminar.*'  => 'integer|exists:novedad_medios,id',
        ]);

        DB::transaction(function () use ($request, $novedad) {
            $novedad->update([
                'titulo'      => $request->titulo,
                'descripcion' => $request->descripcion,
                'activa'      => $request->boolean('activa', true),
                'destacada'   => $request->boolean('destacada'),
            ]);

            if ($request->filled('medios_eliminar')) {
                $mediosAEliminar = $novedad->medios()->whereIn('id', $request->medios_eliminar)->get();
                foreach ($mediosAEliminar as $medio) {
                    $this->eliminarArchivo($medio->ruta);
                    $medio->delete();
                }
            }

            if ($request->hasFile('medios')) {
                foreach ($request->file('medios') as $archivo) {
                    $tipo = str_starts_with($archivo->getMimeType(), 'video') ? 'video' : 'imagen';
                    $ruta = $this->guardarArchivo($archivo, $novedad->id);

                    $novedad->medios()->create([
                        'tipo'            => $tipo,
                        'ruta'            => $ruta,
                        'nombre_original' => $archivo->getClientOriginalName(),
                        'es_principal'    => false,
                    ]);
                }
            }

            if ($request->filled('principal_medio_id')) {
                $novedad->medios()->update(['es_principal' => false]);
                $novedad->medios()->where('id', $request->principal_medio_id)->update(['es_principal' => true]);
            } elseif ($novedad->medioPrincipal === null) {
                $novedad->medios()->first()?->update(['es_principal' => true]);
            }
        });

        return redirect()->route('novedades.index')->with('success', 'Novedad actualizada correctamente.');
    }

    public function destroy(Novedad $novedad): RedirectResponse
    {
        foreach ($novedad->medios as $medio) {
            $this->eliminarArchivo($medio->ruta);
        }

        $novedad->delete();

        return redirect()->route('novedades.index')->with('success', 'Novedad eliminada correctamente.');
    }

    public function setPrincipal(Request $request, Novedad $novedad): RedirectResponse
    {
        $request->validate([
            'medio_id' => 'required|integer|exists:novedad_medios,id',
        ]);

        $novedad->medios()->update(['es_principal' => false]);
        $novedad->medios()->where('id', $request->medio_id)->update(['es_principal' => true]);

        return back()->with('success', 'Medio principal actualizado.');
    }

    private function guardarArchivo(\Illuminate\Http\UploadedFile $archivo, int $novedadId): string
    {
        $basePath = env('PUBLIC_NOVEDADES_IMAGES_PATH', 'images');
        $subDir   = "novedades/{$novedadId}";
        $dir      = public_path($basePath . '/' . $subDir);

        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        $nombre = uniqid('', true) . '_' . time() . '.' . $archivo->getClientOriginalExtension();
        $archivo->move($dir, $nombre);

        return $subDir . '/' . $nombre;
    }

    private function eliminarArchivo(string $ruta): void
    {
        $basePath = env('PUBLIC_NOVEDADES_IMAGES_PATH', 'images');
        $fullPath = public_path($basePath . '/' . $ruta);

        if (is_file($fullPath)) {
            @unlink($fullPath);
        }
    }
}
