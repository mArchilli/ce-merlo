<?php

namespace App\Http\Controllers;

use App\Models\RecursosHumanos;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RecursosHumanosController extends Controller
{
    public function index(): Response
    {
        $recursos = RecursosHumanos::latest()->get()->map(function ($item) {
            return [
                'id'          => $item->id,
                'titulo'      => $item->titulo,
                'descripcion' => $item->descripcion,
                'activa'      => $item->activa,
                'anio'        => $item->anio,
                'mes'         => $item->mes,
                'archivo_pdf' => $item->archivo_pdf,
                'pdf_url'     => $item->archivo_pdf
                    ? asset(env('PUBLIC_RECURSOS_HUMANOS_PDF_URL_PATH', 'pdfs/recursos-humanos') . '/' . $item->archivo_pdf)
                    : null,
                'created_at'  => $item->created_at,
            ];
        });

        return Inertia::render('admin/recursos-humanos/RecursosHumanosIndex', [
            'recursos' => $recursos,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'titulo'      => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'activa'      => 'boolean',
            'anio'        => 'nullable|integer|min:2000|max:2100',
            'mes'         => 'nullable|integer|min:1|max:12',
            'archivo_pdf' => 'required|file|mimes:pdf|max:20480',
        ]);

        $nombreArchivo = $this->guardarPdf($request->file('archivo_pdf'));

        RecursosHumanos::create([
            'titulo'      => $request->titulo,
            'descripcion' => $request->descripcion,
            'activa'      => $request->boolean('activa', true),
            'anio'        => $request->anio ?: null,
            'mes'         => $request->mes ?: null,
            'archivo_pdf' => $nombreArchivo,
        ]);

        return redirect()->route('recursos_humanos.index')->with('success', 'Recurso creado correctamente.');
    }

    public function update(Request $request, RecursosHumanos $recursosHumano): RedirectResponse
    {
        $request->validate([
            'titulo'      => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'activa'      => 'boolean',
            'anio'        => 'nullable|integer|min:2000|max:2100',
            'mes'         => 'nullable|integer|min:1|max:12',
            'archivo_pdf' => 'nullable|file|mimes:pdf|max:20480',
        ]);

        $nombreArchivo = $recursosHumano->archivo_pdf;

        if ($request->hasFile('archivo_pdf')) {
            $this->eliminarPdf($recursosHumano->archivo_pdf);
            $nombreArchivo = $this->guardarPdf($request->file('archivo_pdf'));
        }

        $recursosHumano->update([
            'titulo'      => $request->titulo,
            'descripcion' => $request->descripcion,
            'activa'      => $request->boolean('activa', true),
            'anio'        => $request->anio ?: null,
            'mes'         => $request->mes ?: null,
            'archivo_pdf' => $nombreArchivo,
        ]);

        return redirect()->route('recursos_humanos.index')->with('success', 'Recurso actualizado correctamente.');
    }

    public function destroy(RecursosHumanos $recursosHumano): RedirectResponse
    {
        $this->eliminarPdf($recursosHumano->archivo_pdf);
        $recursosHumano->delete();

        return redirect()->route('recursos_humanos.index')->with('success', 'Recurso eliminado correctamente.');
    }

    private function guardarPdf(\Illuminate\Http\UploadedFile $archivo): string
    {
        $basePath = env('PUBLIC_RECURSOS_HUMANOS_PDF_PATH', 'pdfs/recursos-humanos');
        $dir      = public_path($basePath);

        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        $nombre = uniqid('', true) . '_' . time() . '.pdf';
        $archivo->move($dir, $nombre);

        return $nombre;
    }

    private function eliminarPdf(?string $nombre): void
    {
        if (!$nombre) {
            return;
        }

        $basePath = env('PUBLIC_RECURSOS_HUMANOS_PDF_PATH', 'pdfs/recursos-humanos');
        $fullPath = public_path($basePath . '/' . $nombre);

        if (is_file($fullPath)) {
            @unlink($fullPath);
        }
    }
}
