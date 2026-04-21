<?php

namespace App\Http\Controllers;

use App\Models\PreguntaFrecuente;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PreguntaFrecuenteController extends Controller
{
    public function index(): Response
    {
        $faqs = PreguntaFrecuente::orderBy('orden')->orderBy('id')->get();

        return Inertia::render('admin/faqs/FaqsIndex', [
            'faqs' => $faqs,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'pregunta'  => 'required|string|max:500',
            'respuesta' => 'required|string',
            'orden'     => 'nullable|integer|min:0',
        ]);

        PreguntaFrecuente::create([
            'pregunta'  => $request->pregunta,
            'respuesta' => $request->respuesta,
            'orden'     => $request->orden ?? 0,
        ]);

        return redirect()->route('faqs.index')->with('success', 'Pregunta creada correctamente.');
    }

    public function update(Request $request, PreguntaFrecuente $faq): RedirectResponse
    {
        $request->validate([
            'pregunta'  => 'required|string|max:500',
            'respuesta' => 'required|string',
            'orden'     => 'nullable|integer|min:0',
        ]);

        $faq->update([
            'pregunta'  => $request->pregunta,
            'respuesta' => $request->respuesta,
            'orden'     => $request->orden ?? 0,
        ]);

        return redirect()->route('faqs.index')->with('success', 'Pregunta actualizada correctamente.');
    }

    public function destroy(PreguntaFrecuente $faq): RedirectResponse
    {
        $faq->delete();

        return redirect()->route('faqs.index')->with('success', 'Pregunta eliminada correctamente.');
    }
}
