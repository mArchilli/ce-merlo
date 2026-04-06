<?php

namespace App\Http\Controllers;

use App\Models\Sae;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SaeController extends Controller
{
    public function index(): Response
    {
        $items = Sae::latest()->get()->map(function ($item) {
            return [
                'id'          => $item->id,
                'titulo'      => $item->titulo,
                'descripcion' => $item->descripcion,
                'activa'      => $item->activa,
                'anio'        => $item->anio,
                'mes'         => $item->mes,
                'archivo_pdf' => $item->archivo_pdf,
                'pdf_url'     => $item->archivo_pdf
                    ? asset(env('PUBLIC_SAE_PDF_URL_PATH', 'pdfs/sae') . '/' . $item->archivo_pdf)
                    : null,
                'created_at'  => $item->created_at,
            ];
        });

        return Inertia::render('admin/sae/SaeIndex', [
            'items' => $items,
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

        Sae::create([
            'titulo'      => $request->titulo,
            'descripcion' => $request->descripcion,
            'activa'      => $request->boolean('activa', true),
            'anio'        => $request->anio ?: null,
            'mes'         => $request->mes ?: null,
            'archivo_pdf' => $nombreArchivo,
        ]);

        return redirect()->route('sae.index')->with('success', 'Menú creado correctamente.');
    }

    public function update(Request $request, Sae $sae): RedirectResponse
    {
        $request->validate([
            'titulo'      => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'activa'      => 'boolean',
            'anio'        => 'nullable|integer|min:2000|max:2100',
            'mes'         => 'nullable|integer|min:1|max:12',
            'archivo_pdf' => 'nullable|file|mimes:pdf|max:20480',
        ]);

        $nombreArchivo = $sae->archivo_pdf;

        if ($request->hasFile('archivo_pdf')) {
            $this->eliminarPdf($sae->archivo_pdf);
            $nombreArchivo = $this->guardarPdf($request->file('archivo_pdf'));
        }

        $sae->update([
            'titulo'      => $request->titulo,
            'descripcion' => $request->descripcion,
            'activa'      => $request->boolean('activa', true),
            'anio'        => $request->anio ?: null,
            'mes'         => $request->mes ?: null,
            'archivo_pdf' => $nombreArchivo,
        ]);

        return redirect()->route('sae.index')->with('success', 'Menú actualizado correctamente.');
    }

    public function destroy(Sae $sae): RedirectResponse
    {
        $this->eliminarPdf($sae->archivo_pdf);
        $sae->delete();

        return redirect()->route('sae.index')->with('success', 'Menú eliminado correctamente.');
    }

    private function guardarPdf(\Illuminate\Http\UploadedFile $archivo): string
    {
        $basePath = env('PUBLIC_SAE_PDF_PATH', 'pdfs/sae');
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

        $basePath = env('PUBLIC_SAE_PDF_PATH', 'pdfs/sae');
        $fullPath = public_path($basePath . '/' . $nombre);

        if (is_file($fullPath)) {
            @unlink($fullPath);
        }
    }
}
