<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\AreaCorreo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AreaCorreoController extends Controller
{
    public function index(): Response
    {
        $areas = Area::with('correos')->orderBy('id')->get();

        return Inertia::render('admin/correos/CorreosIndex', [
            'areas' => $areas,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'area_id'     => 'required|integer|exists:areas,id',
            'correo'      => 'nullable|email|max:255|required_without:telefono',
            'telefono'    => 'nullable|string|max:50|required_without:correo',
            'es_whatsapp' => 'boolean',
            'descripcion' => 'nullable|string|max:255',
            'activo'      => 'boolean',
        ]);

        AreaCorreo::create([
            'area_id'     => $request->area_id,
            'correo'      => $request->correo,
            'telefono'    => $request->telefono,
            'es_whatsapp' => $request->boolean('es_whatsapp', false),
            'descripcion' => $request->descripcion,
            'activo'      => $request->boolean('activo', true),
        ]);

        return redirect()->route('correos.index')->with('success', 'Correo agregado correctamente.');
    }

    public function update(Request $request, AreaCorreo $correo): RedirectResponse
    {
        $request->validate([
            'correo'      => 'nullable|email|max:255|required_without:telefono',
            'telefono'    => 'nullable|string|max:50|required_without:correo',
            'es_whatsapp' => 'boolean',
            'descripcion' => 'nullable|string|max:255',
            'activo'      => 'boolean',
        ]);

        $correo->update([
            'correo'      => $request->correo,
            'telefono'    => $request->telefono,
            'es_whatsapp' => $request->boolean('es_whatsapp', false),
            'descripcion' => $request->descripcion,
            'activo'      => $request->boolean('activo', true),
        ]);

        return redirect()->route('correos.index')->with('success', 'Correo actualizado correctamente.');
    }

    public function destroy(AreaCorreo $correo): RedirectResponse
    {
        $correo->delete();

        return redirect()->route('correos.index')->with('success', 'Correo eliminado correctamente.');
    }
}
