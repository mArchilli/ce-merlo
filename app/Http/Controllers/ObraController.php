<?php

namespace App\Http\Controllers;

use App\Models\Obra;
use App\Models\ObraMedio;
use App\Models\TrabajoMenor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ObraController extends Controller
{
    public function index(): Response
    {
        $obras          = Obra::with(['medioPrincipal', 'medios'])->withCount('medios')->latest()->get();
        $trabajosMenores = TrabajoMenor::with(['medioPrincipal', 'medios'])->withCount('medios')->where('tipo', 'infraestructura')->latest()->get();

        return Inertia::render('admin/infraestructura/ObrasIndex', [
            'obras'           => $obras,
            'trabajosMenores' => $trabajosMenores,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'titulo'      => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'destacada'   => 'boolean',
            'anio'        => 'nullable|integer|min:1900|max:2100',
            'mes'         => 'nullable|integer|min:1|max:12',
            'medios'      => 'nullable|array',
            'medios.*'    => 'file|mimes:jpg,jpeg,png,gif,webp,mp4,mov,avi,webm|max:102400',
            'principal_index' => 'nullable|integer',
        ]);

        DB::transaction(function () use ($request) {
            $obra = Obra::create([
                'titulo'      => $request->titulo,
                'descripcion' => $request->descripcion,
                'destacada'   => $request->boolean('destacada'),
                'anio'        => $request->anio ?: null,
                'mes'         => $request->mes ?: null,
            ]);

            if ($request->hasFile('medios')) {
                foreach ($request->file('medios') as $index => $archivo) {
                    $tipo = str_starts_with($archivo->getMimeType(), 'video') ? 'video' : 'imagen';
                    $ruta = $this->guardarArchivo($archivo, $obra->id);

                    $obra->medios()->create([
                        'tipo'           => $tipo,
                        'ruta'           => $ruta,
                        'nombre_original'=> $archivo->getClientOriginalName(),
                        'es_principal'   => ($index === (int) $request->principal_index),
                    ]);
                }

                // Si no se indicó principal, marcar el primero
                if ($request->principal_index === null) {
                    $obra->medios()->first()?->update(['es_principal' => true]);
                }
            }
        });

        return redirect()->route('infraestructura.index')->with('success', 'Obra creada correctamente.');
    }

    public function update(Request $request, Obra $obra): RedirectResponse
    {
        $request->validate([
            'titulo'      => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'destacada'   => 'boolean',
            'anio'        => 'nullable|integer|min:1900|max:2100',
            'mes'         => 'nullable|integer|min:1|max:12',
            'medios'      => 'nullable|array',
            'medios.*'    => 'file|mimes:jpg,jpeg,png,gif,webp,mp4,mov,avi,webm|max:102400',
            'principal_medio_id' => 'nullable|integer|exists:obra_medios,id',
            'medios_eliminar'    => 'nullable|array',
            'medios_eliminar.*'  => 'integer|exists:obra_medios,id',
        ]);

        DB::transaction(function () use ($request, $obra) {
            $obra->update([
                'titulo'      => $request->titulo,
                'descripcion' => $request->descripcion,
                'destacada'   => $request->boolean('destacada'),
                'anio'        => $request->anio ?: null,
                'mes'         => $request->mes ?: null,
            ]);

            // Eliminar medios seleccionados
            if ($request->filled('medios_eliminar')) {
                $mediosAEliminar = $obra->medios()->whereIn('id', $request->medios_eliminar)->get();
                foreach ($mediosAEliminar as $medio) {
                    $this->eliminarArchivo($medio->ruta);
                    $medio->delete();
                }
            }

            // Subir nuevos medios
            if ($request->hasFile('medios')) {
                foreach ($request->file('medios') as $archivo) {
                    $tipo = str_starts_with($archivo->getMimeType(), 'video') ? 'video' : 'imagen';
                    $ruta = $this->guardarArchivo($archivo, $obra->id);

                    $obra->medios()->create([
                        'tipo'           => $tipo,
                        'ruta'           => $ruta,
                        'nombre_original'=> $archivo->getClientOriginalName(),
                        'es_principal'   => false,
                    ]);
                }
            }

            // Actualizar principal
            if ($request->filled('principal_medio_id')) {
                $obra->medios()->update(['es_principal' => false]);
                $obra->medios()->where('id', $request->principal_medio_id)->update(['es_principal' => true]);
            } elseif ($obra->medioPrincipal === null) {
                $obra->medios()->first()?->update(['es_principal' => true]);
            }
        });

        return redirect()->route('infraestructura.index')->with('success', 'Obra actualizada correctamente.');
    }

    public function destroy(Obra $obra): RedirectResponse
    {
        foreach ($obra->medios as $medio) {
            $this->eliminarArchivo($medio->ruta);
        }

        $obra->delete();

        return redirect()->route('infraestructura.index')->with('success', 'Obra eliminada correctamente.');
    }

    public function setPrincipal(Request $request, Obra $obra): RedirectResponse
    {
        $request->validate([
            'medio_id' => 'required|integer|exists:obra_medios,id',
        ]);

        $obra->medios()->update(['es_principal' => false]);
        $obra->medios()->where('id', $request->medio_id)->update(['es_principal' => true]);

        return back()->with('success', 'Medio principal actualizado.');
    }

    private function guardarArchivo(\Illuminate\Http\UploadedFile $archivo, int $obraId): string
    {
        $basePath = env('PUBLIC_OBRAS_IMAGES_PATH', 'images');
        $subDir   = "obras/{$obraId}";
        $dir      = public_path($basePath . '/' . $subDir);

        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        $nombre   = uniqid('', true) . '_' . time() . '.' . $archivo->getClientOriginalExtension();
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
