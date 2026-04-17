<?php

namespace App\Http\Controllers;

use App\Models\Autoridad;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AutoridadController extends Controller
{
    public function index(): Response
    {
        $autoridades = Autoridad::orderBy('tipo')->orderBy('orden')->orderBy('id')->get();

        return Inertia::render('admin/autoridades/AutoridadesIndex', [
            'autoridades' => $autoridades,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'cargo'  => 'required|string|max:255',
            'tipo'   => 'required|in:principal,vocal',
            'area'   => 'nullable|string|max:100',
            'foto'   => [
                'nullable',
                'file',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
                $request->tipo === 'principal' ? 'required' : 'nullable',
            ],
            'orden'  => 'nullable|integer|min:0',
            'activa' => 'boolean',
        ]);

        $fotoRuta = null;
        if ($request->hasFile('foto')) {
            $fotoRuta = $this->guardarFoto($request->file('foto'));
        }

        Autoridad::create([
            'nombre' => $request->nombre,
            'cargo'  => $request->cargo,
            'tipo'   => $request->tipo,
            'area'   => $request->tipo === 'vocal' ? $request->input('area') : null,
            'foto'   => $fotoRuta,
            'orden'  => $request->input('orden', 0),
            'activa' => $request->boolean('activa', true),
        ]);

        return redirect()->route('autoridades.index')->with('success', 'Autoridad creada correctamente.');
    }

    public function update(Request $request, Autoridad $autoridad): RedirectResponse
    {
        $request->validate([
            'nombre'        => 'required|string|max:255',
            'cargo'         => 'required|string|max:255',
            'tipo'          => 'required|in:principal,vocal',
            'area'          => 'nullable|string|max:100',
            'foto'          => 'nullable|file|mimes:jpg,jpeg,png,webp|max:5120',
            'orden'         => 'nullable|integer|min:0',
            'activa'        => 'boolean',
            'eliminar_foto' => 'boolean',
        ]);

        $fotoRuta = $autoridad->foto;

        if ($request->boolean('eliminar_foto')) {
            $this->eliminarFoto($autoridad->foto);
            $fotoRuta = null;
        }

        if ($request->hasFile('foto')) {
            $this->eliminarFoto($autoridad->foto);
            $fotoRuta = $this->guardarFoto($request->file('foto'));
        }

        $autoridad->update([
            'nombre' => $request->nombre,
            'cargo'  => $request->cargo,
            'tipo'   => $request->tipo,
            'area'   => $request->tipo === 'vocal' ? $request->input('area') : null,
            'foto'   => $fotoRuta,
            'orden'  => $request->input('orden', $autoridad->orden),
            'activa' => $request->boolean('activa', true),
        ]);

        return redirect()->route('autoridades.index')->with('success', 'Autoridad actualizada correctamente.');
    }

    public function destroy(Autoridad $autoridad): RedirectResponse
    {
        $this->eliminarFoto($autoridad->foto);
        $autoridad->delete();

        return redirect()->route('autoridades.index')->with('success', 'Autoridad eliminada correctamente.');
    }

    private function guardarFoto(\Illuminate\Http\UploadedFile $foto): string
    {
        $basePath = env('PUBLIC_AUTORIDADES_IMAGES_PATH', 'images');
        $dir      = public_path($basePath . '/autoridades');

        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        $nombre = uniqid('', true) . '_' . time() . '.' . $foto->getClientOriginalExtension();
        $foto->move($dir, $nombre);

        return 'autoridades/' . $nombre;
    }

    private function eliminarFoto(?string $ruta): void
    {
        if (!$ruta) {
            return;
        }

        $basePath = env('PUBLIC_AUTORIDADES_IMAGES_PATH', 'images');
        $fullPath = public_path($basePath . '/' . $ruta);

        if (is_file($fullPath)) {
            @unlink($fullPath);
        }
    }
}
