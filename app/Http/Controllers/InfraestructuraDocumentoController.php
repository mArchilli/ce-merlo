<?php

namespace App\Http\Controllers;

use App\Models\InfraestructuraDocumento;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class InfraestructuraDocumentoController extends Controller
{
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

        InfraestructuraDocumento::create([
            'titulo'      => $request->titulo,
            'descripcion' => $request->descripcion,
            'activa'      => $request->boolean('activa', true),
            'anio'        => $request->anio ?: null,
            'mes'         => $request->mes ?: null,
            'archivo_pdf' => $nombreArchivo,
        ]);

        return redirect()->route('infraestructura.index')->with('success', 'Documento creado correctamente.');
    }

    public function update(Request $request, InfraestructuraDocumento $infraestructuraDocumento): RedirectResponse
    {
        $request->validate([
            'titulo'      => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'activa'      => 'boolean',
            'anio'        => 'nullable|integer|min:2000|max:2100',
            'mes'         => 'nullable|integer|min:1|max:12',
            'archivo_pdf' => 'nullable|file|mimes:pdf|max:20480',
        ]);

        $nombreArchivo = $infraestructuraDocumento->archivo_pdf;

        if ($request->hasFile('archivo_pdf')) {
            $this->eliminarPdf($infraestructuraDocumento->archivo_pdf);
            $nombreArchivo = $this->guardarPdf($request->file('archivo_pdf'));
        }

        $infraestructuraDocumento->update([
            'titulo'      => $request->titulo,
            'descripcion' => $request->descripcion,
            'activa'      => $request->boolean('activa', true),
            'anio'        => $request->anio ?: null,
            'mes'         => $request->mes ?: null,
            'archivo_pdf' => $nombreArchivo,
        ]);

        return redirect()->route('infraestructura.index')->with('success', 'Documento actualizado correctamente.');
    }

    public function destroy(InfraestructuraDocumento $infraestructuraDocumento): RedirectResponse
    {
        $this->eliminarPdf($infraestructuraDocumento->archivo_pdf);
        $infraestructuraDocumento->delete();

        return redirect()->route('infraestructura.index')->with('success', 'Documento eliminado correctamente.');
    }

    private function guardarPdf(\Illuminate\Http\UploadedFile $archivo): string
    {
        $basePath = env('PUBLIC_INFRAESTRUCTURA_PDF_PATH', 'pdfs/infraestructura');
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

        $basePath = env('PUBLIC_INFRAESTRUCTURA_PDF_PATH', 'pdfs/infraestructura');
        $fullPath = public_path($basePath . '/' . $nombre);

        if (is_file($fullPath)) {
            @unlink($fullPath);
        }
    }
}
