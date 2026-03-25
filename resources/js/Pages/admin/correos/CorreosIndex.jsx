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
const IconMail = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

// ─── Modal crear / editar correo ──────────────────────────────────────────────
function CorreoModal({ correo, areaId, onClose }) {
    const isEdit = !!correo;

    const { data, setData, processing, errors, reset } = useForm({
        area_id:     correo?.area_id ?? areaId,
        correo:      correo?.correo ?? '',
        descripcion: correo?.descripcion ?? '',
        activo:      correo?.activo ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                reset();
                onClose();
                toast.success(isEdit ? 'Correo actualizado correctamente.' : 'Correo agregado correctamente.');
            },
            onError: () => toast.error('Error al guardar. Revisá los campos requeridos.'),
        };
        if (isEdit) {
            router.put(route('correos.update', correo.id), data, options);
        } else {
            router.post(route('correos.store'), data, options);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
                {/* Franja superior */}
                <div className="h-1 bg-gradient-to-r from-sky-400 to-sky-500" />

                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900">
                            {isEdit ? 'Editar correo' : 'Agregar correo'}
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {isEdit ? 'Modificá los datos del correo.' : 'Completá los datos para agregar un nuevo correo.'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    >
                        <IconX />
                    </button>
                </div>

                <form onSubmit={submit} className="px-6 py-5 space-y-4">
                    {/* Correo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Correo electrónico *
                        </label>
                        <input
                            type="email"
                            value={data.correo}
                            onChange={(e) => setData('correo', e.target.value)}
                            placeholder="ejemplo@organismo.gob.ar"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                        />
                        {errors.correo && <p className="mt-1 text-xs text-red-500">{errors.correo}</p>}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Descripción
                        </label>
                        <input
                            type="text"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            placeholder="Ej: Consultas generales, Mesa de entradas..."
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                        />
                        {errors.descripcion && <p className="mt-1 text-xs text-red-500">{errors.descripcion}</p>}
                    </div>

                    {/* Activo */}
                    <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors">
                        <input
                            type="checkbox"
                            checked={data.activo}
                            onChange={(e) => setData('activo', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-sky-400"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-700">Correo activo</p>
                            <p className="text-xs text-gray-400">Se mostrará en el sitio público del organismo.</p>
                        </div>
                    </label>

                    <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-sky-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60 transition-colors shadow-sm shadow-sky-200"
                        >
                            {processing ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Agregar correo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function CorreosIndex({ areas }) {
    const [tabIdx, setTabIdx]               = useState(0);
    const [modalOpen, setModalOpen]         = useState(false);
    const [editando, setEditando]           = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);

    const area = areas[tabIdx] ?? null;

    const handleClose = () => {
        setModalOpen(false);
        setEditando(null);
    };

    const confirmDelete = () => {
        router.delete(route('correos.destroy', pendingDelete.id), {
            onSuccess: () => {
                setPendingDelete(null);
                toast.success('Correo eliminado correctamente.');
            },
            onError: () => toast.error('No se pudo eliminar el correo.'),
        });
    };

    if (!area) return null;

    return (
        <>
        <AuthenticatedLayout
            pageTitle="Correos"
            pageSubtitle="Correos electrónicos por área"
            pageColor="#0EA5E9"
            pageAction={
                <button
                    onClick={() => { setEditando(null); setModalOpen(true); }}
                    className="flex items-center gap-2 rounded-lg bg-white/20 border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                    <IconPlus /> Agregar correo
                </button>
            }
        >
            <Head title="Correos" />

            <div className="py-8 px-6">
                {/* Tabs de áreas */}
                <div className="mb-6 flex gap-1 border-b border-gray-200 overflow-x-auto">
                    {areas.map((a, idx) => (
                        <button
                            key={a.id}
                            onClick={() => setTabIdx(idx)}
                            className={`whitespace-nowrap px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                                tabIdx === idx
                                    ? 'border-sky-500 text-sky-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {a.nombre}
                        </button>
                    ))}
                </div>

                {/* Contador */}
                <p className="mb-5 text-sm text-gray-500">
                    {area.correos.length} correo(s) registrado(s) en <span className="font-medium text-gray-700">{area.nombre}</span>
                </p>

                {/* Lista de correos */}
                {area.correos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-20 text-gray-400">
                        <IconMail className="h-10 w-10 mb-3 opacity-40" />
                        <p className="text-lg font-medium">No hay correos registrados</p>
                        <p className="text-sm mt-1">Hacé clic en "Agregar correo" para comenzar.</p>
                    </div>
                ) : (
                    <div className="space-y-2 max-w-2xl">
                        {area.correos.map((c) => (
                            <div
                                key={c.id}
                                className="flex items-center gap-4 rounded-xl bg-white border border-gray-100 px-5 py-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                    c.activo ? 'bg-sky-50 text-sky-500' : 'bg-gray-100 text-gray-400'
                                }`}>
                                    <IconMail />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">{c.correo}</p>
                                    {c.descripcion && (
                                        <p className="text-xs text-gray-400 mt-0.5 truncate">{c.descripcion}</p>
                                    )}
                                </div>

                                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    c.activo ? 'bg-sky-100 text-sky-700' : 'bg-gray-100 text-gray-500'
                                }`}>
                                    {c.activo ? 'Activo' : 'Inactivo'}
                                </span>

                                <div className="flex gap-1.5 shrink-0">
                                    <button
                                        onClick={() => { setEditando(c); setModalOpen(true); }}
                                        className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                                    >
                                        <IconEdit /> Editar
                                    </button>
                                    <button
                                        onClick={() => setPendingDelete(c)}
                                        className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 hover:border-red-300 transition-colors"
                                    >
                                        <IconTrash /> Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>

        {modalOpen && (
            <CorreoModal correo={editando} areaId={area.id} onClose={handleClose} />
        )}

        {pendingDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-red-400 to-red-500" />
                    <div className="p-6">
                        <h3 className="text-base font-semibold text-gray-900">Eliminar correo</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            ¿Estás seguro de eliminar <strong className="text-gray-700">{pendingDelete.correo}</strong>? Esta acción no se puede deshacer.
                        </p>
                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                onClick={() => setPendingDelete(null)}
                                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors shadow-sm shadow-red-200"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <Toaster
            position="top-right"
            duration={4000}
            toastOptions={{
                style: { fontFamily: 'inherit' },
                classNames: {
                    toast:   'rounded-xl shadow-lg border border-gray-100 text-sm',
                    title:   'font-medium text-gray-800',
                    success: '!border-l-4 !border-l-sky-500',
                    error:   '!border-l-4 !border-l-red-500',
                },
            }}
            icons={{
                success: <span style={{ color: '#0EA5E9', fontSize: '1rem' }}>&#10003;</span>,
            }}
        />
        </>
    );
}
