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
const IconPhone = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);
const IconWhatsApp = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);

// ─── Modal crear / editar correo ──────────────────────────────────────────────
function CorreoModal({ correo, areaId, onClose }) {
    const isEdit = !!correo;

    const { data, setData, processing, errors, reset } = useForm({
        area_id:     correo?.area_id ?? areaId,
        correo:      correo?.correo ?? '',
        telefono:    correo?.telefono ?? '',
        es_whatsapp: correo?.es_whatsapp ?? false,
        descripcion: correo?.descripcion ?? '',
        activo:      correo?.activo ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                reset();
                onClose();
                toast.success(isEdit ? 'Contacto actualizado correctamente.' : 'Contacto agregado correctamente.');
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
            <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
                {/* Franja superior */}
                <div className="h-1 bg-gradient-to-r from-sky-400 to-sky-500" />

                <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900">
                            {isEdit ? 'Editar contacto' : 'Agregar contacto'}
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {isEdit ? 'Modificá los datos del contacto.' : 'Completá al menos un correo o teléfono.'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    >
                        <IconX />
                    </button>
                </div>

                <form onSubmit={submit} className="px-5 sm:px-7 py-5 space-y-4">
                    {/* Correo + Teléfono en grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Correo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Correo electrónico
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

                        {/* Teléfono */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Teléfono de contacto
                            </label>
                            <input
                                type="text"
                                value={data.telefono}
                                onChange={(e) => {
                                    setData('telefono', e.target.value);
                                    if (!e.target.value) setData('es_whatsapp', false);
                                }}
                                placeholder="Ej: +54 9 220 123-4567"
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                            />
                            {errors.telefono && <p className="mt-1 text-xs text-red-500">{errors.telefono}</p>}
                        </div>
                    </div>

                    {/* WhatsApp — solo cuando hay teléfono */}
                    {data.telefono && (
                        <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-green-200 bg-green-50 px-4 py-3 hover:bg-green-100/60 transition-colors">
                            <input
                                type="checkbox"
                                checked={data.es_whatsapp}
                                onChange={(e) => setData('es_whatsapp', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-400"
                            />
                            <div className="flex items-center gap-2">
                                <IconWhatsApp className="h-4 w-4 text-green-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Es número de WhatsApp</p>
                                    <p className="text-xs text-gray-500">Se generará un enlace directo a WhatsApp.</p>
                                </div>
                            </div>
                        </label>
                    )}

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
                            <p className="text-sm font-medium text-gray-700">Contacto activo</p>
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
                            {processing ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Agregar contacto'}
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

            <div className="py-6 px-4 sm:py-8 sm:px-6">
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
                    {area.correos.length} contacto(s) registrado(s) en <span className="font-medium text-gray-700">{area.nombre}</span>
                </p>

                {/* Lista de correos */}
                {area.correos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-16 text-gray-400">
                        <IconMail className="h-10 w-10 mb-3 opacity-40" />
                        <p className="text-base font-medium">No hay contactos registrados</p>
                        <p className="text-sm mt-1 text-center px-4">Hacé clic en "Agregar correo" para comenzar.</p>
                    </div>
                ) : (
                    <div className="space-y-2 max-w-2xl">
                        {area.correos.map((c) => {
                            const waNumber = c.telefono?.replace(/[^\d+]/g, '');
                            return (
                            <div
                                key={c.id}
                                className="flex items-start gap-3 sm:gap-4 rounded-xl bg-white border border-gray-100 px-4 sm:px-5 py-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Ícono */}
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg mt-0.5 ${
                                    !c.activo
                                        ? 'bg-gray-100 text-gray-400'
                                        : c.es_whatsapp
                                        ? 'bg-green-50 text-green-500'
                                        : c.telefono
                                        ? 'bg-sky-50 text-sky-400'
                                        : 'bg-sky-50 text-sky-500'
                                }`}>
                                    {c.es_whatsapp ? <IconWhatsApp /> : c.telefono && !c.correo ? <IconPhone /> : <IconMail />}
                                </div>

                                {/* Contenido */}
                                <div className="flex-1 min-w-0">
                                    {/* Correo */}
                                    {c.correo && (
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                            <p className="text-sm font-medium text-gray-800 break-all">{c.correo}</p>
                                            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                c.activo ? 'bg-sky-100 text-sky-700' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                {c.activo ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </div>
                                    )}

                                    {/* Teléfono / WhatsApp */}
                                    {c.telefono && (
                                        <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${c.correo ? 'mt-1' : ''}`}>
                                            {c.es_whatsapp ? (
                                                <a
                                                    href={`https://wa.me/${waNumber}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm font-medium text-green-600 hover:text-green-700 hover:underline break-all"
                                                >
                                                    {c.telefono}
                                                </a>
                                            ) : (
                                                <a
                                                    href={`tel:${c.telefono}`}
                                                    className="text-sm font-medium text-gray-800 hover:text-sky-600 hover:underline break-all"
                                                >
                                                    {c.telefono}
                                                </a>
                                            )}
                                            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                c.es_whatsapp ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {c.es_whatsapp ? 'WhatsApp' : 'Teléfono'}
                                            </span>
                                            {!c.correo && (
                                                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    c.activo ? 'bg-sky-100 text-sky-700' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                    {c.activo ? 'Activo' : 'Inactivo'}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Descripción */}
                                    {c.descripcion && (
                                        <p className="text-xs text-gray-400 mt-0.5">{c.descripcion}</p>
                                    )}

                                    {/* Botones — siempre visibles, debajo en mobile */}
                                    <div className="flex gap-1.5 mt-3 sm:hidden">
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

                                {/* Botones — solo desktop */}
                                <div className="hidden sm:flex gap-1.5 shrink-0">
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
                            );
                        })}
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
                        <h3 className="text-base font-semibold text-gray-900">Eliminar contacto</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            ¿Estás seguro de eliminar <strong className="text-gray-700">{pendingDelete.correo || pendingDelete.telefono}</strong>? Esta acción no se puede deshacer.
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
