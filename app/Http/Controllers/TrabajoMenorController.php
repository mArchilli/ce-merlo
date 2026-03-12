<?php

namespace App\Http\Controllers;

use App\Models\TrabajoMenor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TrabajoMenorController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'titulo'          => 'required|string|max:255',
            'descripcion'     => 'nullable|string',
            'destacado'       => 'boolean',
            'medios'          => 'nullable|array',
            'medios.*'        => 'file|mimes:jpg,jpeg,png,gif,webp,mp4,mov,avi,webm|max:102400',
            'principal_index' => 'nullable|integer',
        ]);

        DB::transaction(function () use ($request) {
            $trabajo = TrabajoMenor::create([
                'titulo'      => $request->titulo,
                'descripcion' => $request->descripcion,
                'destacado'   => $request->boolean('destacado'),
            ]);

            if ($request->hasFile('medios')) {
                foreach ($request->file('medios') as $index => $archivo) {
                    $tipo = str_starts_with($archivo->getMimeType(), 'video') ? 'video' : 'imagen';
                    $ruta = $this->guardarArchivo($archivo, $trabajo->id);

                    $trabajo->medios()->create([
                        'tipo'            => $tipo,
                        'ruta'            => $ruta,
                        'nombre_original' => $archivo->getClientOriginalName(),
                        'es_principal'    => ($index === (int) $request->principal_index),
                    ]);
                }

                if ($request->principal_index === null) {
                    $trabajo->medios()->first()?->update(['es_principal' => true]);
                }
            }
        });

        return redirect()->route('infraestructura.index')->with('success', 'Trabajo menor creado correctamente.');
    }

    public function update(Request $request, TrabajoMenor $trabajoMenor): RedirectResponse
    {
        $request->validate([
            'titulo'             => 'required|string|max:255',
            'descripcion'        => 'nullable|string',
            'destacado'          => 'boolean',
            'medios'             => 'nullable|array',
            'medios.*'           => 'file|mimes:jpg,jpeg,png,gif,webp,mp4,mov,avi,webm|max:102400',
            'principal_medio_id' => 'nullable|integer|exists:trabajo_menor_medios,id',
            'medios_eliminar'    => 'nullable|array',
            'medios_eliminar.*'  => 'integer|exists:trabajo_menor_medios,id',
        ]);

        DB::transaction(function () use ($request, $trabajoMenor) {
            $trabajoMenor->update([
                'titulo'      => $request->titulo,
                'descripcion' => $request->descripcion,
                'destacado'   => $request->boolean('destacado'),
            ]);

            if ($request->filled('medios_eliminar')) {
                $mediosAEliminar = $trabajoMenor->medios()->whereIn('id', $request->medios_eliminar)->get();
                foreach ($mediosAEliminar as $medio) {
                    $this->eliminarArchivo($medio->ruta);
                    $medio->delete();
                }
            }

            if ($request->hasFile('medios')) {
                foreach ($request->file('medios') as $archivo) {
                    $tipo = str_starts_with($archivo->getMimeType(), 'video') ? 'video' : 'imagen';
                    $ruta = $this->guardarArchivo($archivo, $trabajoMenor->id);

                    $trabajoMenor->medios()->create([
                        'tipo'            => $tipo,
                        'ruta'            => $ruta,
                        'nombre_original' => $archivo->getClientOriginalName(),
                        'es_principal'    => false,
                    ]);
                }
            }

            if ($request->filled('principal_medio_id')) {
                $trabajoMenor->medios()->update(['es_principal' => false]);
                $trabajoMenor->medios()->where('id', $request->principal_medio_id)->update(['es_principal' => true]);
            } elseif ($trabajoMenor->medioPrincipal === null) {
                $trabajoMenor->medios()->first()?->update(['es_principal' => true]);
            }
        });

        return redirect()->route('infraestructura.index')->with('success', 'Trabajo menor actualizado correctamente.');
    }

    public function destroy(TrabajoMenor $trabajoMenor): RedirectResponse
    {
        foreach ($trabajoMenor->medios as $medio) {
            $this->eliminarArchivo($medio->ruta);
        }

        $trabajoMenor->delete();

        return redirect()->route('infraestructura.index')->with('success', 'Trabajo menor eliminado correctamente.');
    }

    public function setPrincipal(Request $request, TrabajoMenor $trabajoMenor): RedirectResponse
    {
        $request->validate([
            'medio_id' => 'required|integer|exists:trabajo_menor_medios,id',
        ]);

        $trabajoMenor->medios()->update(['es_principal' => false]);
        $trabajoMenor->medios()->where('id', $request->medio_id)->update(['es_principal' => true]);

        return back()->with('success', 'Medio principal actualizado.');
    }

    private function guardarArchivo(\Illuminate\Http\UploadedFile $archivo, int $id): string
    {
        $basePath = env('PUBLIC_OBRAS_IMAGES_PATH', 'images');
        $subDir   = "trabajos_menores/{$id}";
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
        $basePath = env('PUBLIC_OBRAS_IMAGES_PATH', 'images');
        $fullPath = public_path($basePath . '/' . $ruta);

        if (is_file($fullPath)) {
            @unlink($fullPath);
        }
    }
}
