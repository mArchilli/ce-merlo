import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

// ─── Iconos ───────────────────────────────────────────────────────────────────
const IconPlus = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);
const IconEdit = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
    </svg>
);
const IconTrash = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
    </svg>
);
const IconX = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const IconBuilding = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a12 12 0 010 18M12 3a12 12 0 000 18" />
    </svg>
);

// ─── Modal ────────────────────────────────────────────────────────────────────
function OrganismoModal({ item, onClose }) {
    const isEdit = !!item;

    const { data, setData, processing, errors, reset } = useForm({
        titulo:      item?.titulo      ?? '',
        responsable: item?.responsable ?? '',
        cargo:       item?.cargo       ?? '',
        direccion:   item?.direccion   ?? '',
        orden:       item?.orden       ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                reset();
                onClose();
                toast.success(isEdit ? 'Organismo actualizado correctamente.' : 'Organismo creado correctamente.');
            },
            onError: () => toast.error('Error al guardar. Revisá los campos requeridos.'),
        };

        if (isEdit) {
            router.put(route('organismos.update', item.id), data, options);
        } else {
            router.post(route('organismos.store'), data, options);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {isEdit ? 'Editar organismo' : 'Nuevo organismo vinculado'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><IconX /></button>
                </div>

                <form onSubmit={submit} className="px-6 py-5 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título / Nombre del organismo *</label>
                        <input
                            type="text"
                            value={data.titulo}
                            onChange={(e) => setData('titulo', e.target.value)}
                            placeholder="Ej: Jefatura Distrital"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                        {errors.titulo && <p className="mt-1 text-xs text-red-500">{errors.titulo}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Responsable *</label>
                        <input
                            type="text"
                            value={data.responsable}
                            onChange={(e) => setData('responsable', e.target.value)}
                            placeholder="Ej: Hugo Rosa"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                        {errors.responsable && <p className="mt-1 text-xs text-red-500">{errors.responsable}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cargo *</label>
                        <input
                            type="text"
                            value={data.cargo}
                            onChange={(e) => setData('cargo', e.target.value)}
                            placeholder="Ej: Jefe Distrital"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                        {errors.cargo && <p className="mt-1 text-xs text-red-500">{errors.cargo}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dirección <span className="text-gray-400 font-normal">(opcional)</span>
                        </label>
                        <input
                            type="text"
                            value={data.direccion}
                            onChange={(e) => setData('direccion', e.target.value)}
                            placeholder="Ej: Av. Calle Real 208, Merlo"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                        {errors.direccion && <p className="mt-1 text-xs text-red-500">{errors.direccion}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Orden de aparición</label>
                        <input
                            type="number"
                            min={0}
                            value={data.orden}
                            onChange={(e) => setData('orden', parseInt(e.target.value, 10) || 0)}
                            className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            {processing ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear organismo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Confirmar eliminar ───────────────────────────────────────────────────────
function ConfirmDelete({ item, onClose }) {
    const [processing, setProcessing] = useState(false);

    const confirm = () => {
        setProcessing(true);
        router.delete(route('organismos.destroy', item.id), {
            onSuccess: () => {
                onClose();
                toast.success('Organismo eliminado correctamente.');
            },
            onError: () => {
                setProcessing(false);
                toast.error('Error al eliminar.');
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
                <h3 className="text-base font-semibold text-gray-800 mb-2">¿Eliminar organismo?</h3>
                <p className="text-sm text-gray-600 mb-5">
                    Se eliminará <span className="font-medium">{item.titulo}</span>. Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Cancelar
                    </button>
                    <button onClick={confirm} disabled={processing} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60">
                        {processing ? 'Eliminando…' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Card de organismo ────────────────────────────────────────────────────────
function OrganismoCard({ organismo, onEdit, onDelete }) {
    return (
        <div className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
            <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-400">
                <IconBuilding />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider truncate">{organismo.titulo}</p>
                <p className="text-sm font-medium text-gray-800 truncate">{organismo.responsable}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-sky-100 text-sky-700">
                        {organismo.cargo}
                    </span>
                    {organismo.direccion && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 truncate max-w-[180px]">
                            {organismo.direccion}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <button
                    onClick={() => onEdit(organismo)}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                    <IconEdit /> Editar
                </button>
                <button
                    onClick={() => onDelete(organismo)}
                    className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
                >
                    <IconTrash /> Eliminar
                </button>
            </div>
        </div>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function OrganismosIndex({ organismos }) {
    const [modalOpen, setModalOpen]   = useState(false);
    const [editItem, setEditItem]     = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);

    const openCreate = () => { setEditItem(null); setModalOpen(true); };
    const openEdit   = (item) => { setEditItem(item); setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); setEditItem(null); };

    return (
        <AuthenticatedLayout
            pageTitle="Organismos vinculados"
            pageSubtitle={`${organismos.length} organismo(s) registrado(s)`}
            pageColor="#0284C7"
            pageAction={
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 rounded-lg bg-white/20 border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                    <IconPlus /> Nuevo organismo
                </button>
            }
        >
            <Head title="Organismos vinculados" />
            <Toaster richColors position="top-right" />

            <div className="p-6 space-y-3">
                {organismos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-20 text-center">
                        <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 mb-3">
                            <IconBuilding />
                        </div>
                        <p className="text-sm text-gray-400">No hay organismos registrados.</p>
                        <button
                            onClick={openCreate}
                            className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            <IconPlus /> Agregar el primero
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {organismos.map((o) => (
                            <OrganismoCard
                                key={o.id}
                                organismo={o}
                                onEdit={openEdit}
                                onDelete={setDeleteItem}
                            />
                        ))}
                    </div>
                )}
            </div>

            {modalOpen && (
                <OrganismoModal item={editItem} onClose={closeModal} />
            )}
            {deleteItem && (
                <ConfirmDelete item={deleteItem} onClose={() => setDeleteItem(null)} />
            )}
        </AuthenticatedLayout>
    );
}
