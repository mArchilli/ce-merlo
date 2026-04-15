<?php

namespace App\Http\Controllers;

use App\Models\CooperacionEscolar;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CooperacionEscolarController extends Controller
{
    public function index(): Response
    {
        $items = CooperacionEscolar::latest()->get()->map(function ($item) {
            return [
                'id'          => $item->id,
                'titulo'      => $item->titulo,
                'descripcion' => $item->descripcion,
                'activa'      => $item->activa,
                'anio'        => $item->anio,
                'mes'         => $item->mes,
                'archivo_pdf' => $item->archivo_pdf,
                'pdf_url'     => $item->archivo_pdf
                    ? asset(env('PUBLIC_COOPERACION_ESCOLAR_PDF_URL_PATH', 'pdfs/cooperacion-escolar') . '/' . $item->archivo_pdf)
                    : null,
                'created_at'  => $item->created_at,
            ];
        });

        return Inertia::render('admin/cooperacion-escolar/CooperacionEscolarIndex', [
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

        CooperacionEscolar::create([
            'titulo'      => $request->titulo,
            'descripcion' => $request->descripcion,
            'activa'      => $request->boolean('activa', true),
            'anio'        => $request->anio ?: null,
            'mes'         => $request->mes ?: null,
            'archivo_pdf' => $nombreArchivo,
        ]);

        return redirect()->route('cooperacion_escolar.index')->with('success', 'Documento creado correctamente.');
    }

    public function update(Request $request, CooperacionEscolar $cooperacionEscolar): RedirectResponse
    {
        $request->validate([
            'titulo'      => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'activa'      => 'boolean',
            'anio'        => 'nullable|integer|min:2000|max:2100',
            'mes'         => 'nullable|integer|min:1|max:12',
            'archivo_pdf' => 'nullable|file|mimes:pdf|max:20480',
        ]);

        $nombreArchivo = $cooperacionEscolar->archivo_pdf;

        if ($request->hasFile('archivo_pdf')) {
            $this->eliminarPdf($cooperacionEscolar->archivo_pdf);
            $nombreArchivo = $this->guardarPdf($request->file('archivo_pdf'));
        }

        $cooperacionEscolar->update([
            'titulo'      => $request->titulo,
            'descripcion' => $request->descripcion,
            'activa'      => $request->boolean('activa', true),
            'anio'        => $request->anio ?: null,
            'mes'         => $request->mes ?: null,
            'archivo_pdf' => $nombreArchivo,
        ]);

        return redirect()->route('cooperacion_escolar.index')->with('success', 'Documento actualizado correctamente.');
    }

    public function destroy(CooperacionEscolar $cooperacionEscolar): RedirectResponse
    {
        $this->eliminarPdf($cooperacionEscolar->archivo_pdf);
        $cooperacionEscolar->delete();

        return redirect()->route('cooperacion_escolar.index')->with('success', 'Documento eliminado correctamente.');
    }

    private function guardarPdf(\Illuminate\Http\UploadedFile $archivo): string
    {
        $basePath = env('PUBLIC_COOPERACION_ESCOLAR_PDF_PATH', 'pdfs/cooperacion-escolar');
        $dir      = public_path($basePath);

        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        $nombre = $this->sanitizarNombre($archivo->getClientOriginalName());

        if (is_file($dir . '/' . $nombre)) {
            $info    = pathinfo($nombre);
            $base    = $info['filename'];
            $ext     = isset($info['extension']) ? '.' . $info['extension'] : '';
            $counter = 1;
            do {
                $nombre = $base . '_' . $counter . $ext;
                $counter++;
            } while (is_file($dir . '/' . $nombre));
        }

        $archivo->move($dir, $nombre);

        return $nombre;
    }

    private function sanitizarNombre(string $nombre): string
    {
        $nombre = basename($nombre);
        $nombre = preg_replace('/[^a-zA-Z0-9._\-]/', '_', $nombre);
        if (!str_ends_with(strtolower($nombre), '.pdf')) {
            $nombre .= '.pdf';
        }
        return $nombre;
    }

    private function eliminarPdf(?string $nombre): void
    {
        if (!$nombre) {
            return;
        }

        $basePath = env('PUBLIC_COOPERACION_ESCOLAR_PDF_PATH', 'pdfs/cooperacion-escolar');
        $fullPath = public_path($basePath . '/' . $nombre);

        if (is_file($fullPath)) {
            @unlink($fullPath);
        }
    }
}
