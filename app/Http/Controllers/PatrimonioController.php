<?php

namespace App\Http\Controllers;

use App\Models\Patrimonio;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PatrimonioController extends Controller
{
    public function index(): Response
    {
        $items = Patrimonio::latest()->get()->map(function ($item) {
            return [
                'id'          => $item->id,
                'titulo'      => $item->titulo,
                'descripcion' => $item->descripcion,
                'activa'      => $item->activa,
                'anio'        => $item->anio,
                'mes'         => $item->mes,
                'archivo_pdf' => $item->archivo_pdf,
                'pdf_url'     => $item->archivo_pdf
                    ? asset(env('PUBLIC_PATRIMONIO_PDF_URL_PATH', 'pdfs/patrimonio') . '/' . $item->archivo_pdf)
                    : null,
                'created_at'  => $item->created_at,
            ];
        });

        return Inertia::render('admin/patrimonio/PatrimonioIndex', [
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

        Patrimonio::create([
            'titulo'      => $request->titulo,
            'descripcion' => $request->descripcion,
            'activa'      => $request->boolean('activa', true),
            'anio'        => $request->anio ?: null,
            'mes'         => $request->mes ?: null,
            'archivo_pdf' => $nombreArchivo,
        ]);

        return redirect()->route('patrimonio.index')->with('success', 'Documento creado correctamente.');
    }

    public function update(Request $request, Patrimonio $patrimonio): RedirectResponse
    {
        $request->validate([
            'titulo'      => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'activa'      => 'boolean',
            'anio'        => 'nullable|integer|min:2000|max:2100',
            'mes'         => 'nullable|integer|min:1|max:12',
            'archivo_pdf' => 'nullable|file|mimes:pdf|max:20480',
        ]);

        $nombreArchivo = $patrimonio->archivo_pdf;

        if ($request->hasFile('archivo_pdf')) {
            $this->eliminarPdf($patrimonio->archivo_pdf);
            $nombreArchivo = $this->guardarPdf($request->file('archivo_pdf'));
        }

        $patrimonio->update([
            'titulo'      => $request->titulo,
            'descripcion' => $request->descripcion,
            'activa'      => $request->boolean('activa', true),
            'anio'        => $request->anio ?: null,
            'mes'         => $request->mes ?: null,
            'archivo_pdf' => $nombreArchivo,
        ]);

        return redirect()->route('patrimonio.index')->with('success', 'Documento actualizado correctamente.');
    }

    public function destroy(Patrimonio $patrimonio): RedirectResponse
    {
        $this->eliminarPdf($patrimonio->archivo_pdf);
        $patrimonio->delete();

        return redirect()->route('patrimonio.index')->with('success', 'Documento eliminado correctamente.');
    }

    private function guardarPdf(\Illuminate\Http\UploadedFile $archivo): string
    {
        $basePath = env('PUBLIC_PATRIMONIO_PDF_PATH', 'pdfs/patrimonio');
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

        $basePath = env('PUBLIC_PATRIMONIO_PDF_PATH', 'pdfs/patrimonio');
        $fullPath = public_path($basePath . '/' . $nombre);

        if (is_file($fullPath)) {
            @unlink($fullPath);
        }
    }
}
