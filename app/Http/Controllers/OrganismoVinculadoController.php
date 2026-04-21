<?php

namespace App\Http\Controllers;

use App\Models\OrganismoVinculado;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrganismoVinculadoController extends Controller
{
    public function index(): Response
    {
        $organismos = OrganismoVinculado::orderBy('orden')->orderBy('id')->get();

        return Inertia::render('admin/organismos/OrganismosIndex', [
            'organismos' => $organismos,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'titulo'      => 'required|string|max:255',
            'responsable' => 'required|string|max:255',
            'cargo'       => 'required|string|max:255',
            'direccion'   => 'nullable|string|max:255',
            'orden'       => 'nullable|integer|min:0',
        ]);

        OrganismoVinculado::create([
            'titulo'      => $request->titulo,
            'responsable' => $request->responsable,
            'cargo'       => $request->cargo,
            'direccion'   => $request->direccion ?: null,
            'orden'       => $request->orden ?? 0,
        ]);

        return redirect()->route('organismos.index')->with('success', 'Organismo creado correctamente.');
    }

    public function update(Request $request, OrganismoVinculado $organismo): RedirectResponse
    {
        $request->validate([
            'titulo'      => 'required|string|max:255',
            'responsable' => 'required|string|max:255',
            'cargo'       => 'required|string|max:255',
            'direccion'   => 'nullable|string|max:255',
            'orden'       => 'nullable|integer|min:0',
        ]);

        $organismo->update([
            'titulo'      => $request->titulo,
            'responsable' => $request->responsable,
            'cargo'       => $request->cargo,
            'direccion'   => $request->direccion ?: null,
            'orden'       => $request->orden ?? 0,
        ]);

        return redirect()->route('organismos.index')->with('success', 'Organismo actualizado correctamente.');
    }

    public function destroy(OrganismoVinculado $organismo): RedirectResponse
    {
        $organismo->delete();

        return redirect()->route('organismos.index')->with('success', 'Organismo eliminado correctamente.');
    }
}
