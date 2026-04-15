import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
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
const IconEye = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);
const IconEyeOff = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
);
const IconPdf = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 13h1.5a1 1 0 010 2H10v-2zm0 0V11m4 4v-2a1 1 0 00-1-1h-1" />
    </svg>
);

const MESES = [
    [1, 'Enero'], [2, 'Febrero'], [3, 'Marzo'], [4, 'Abril'],
    [5, 'Mayo'], [6, 'Junio'], [7, 'Julio'], [8, 'Agosto'],
    [9, 'Septiembre'], [10, 'Octubre'], [11, 'Noviembre'], [12, 'Diciembre'],
];

// ─── Modal Vista PDF ──────────────────────────────────────────────────────────
function PdfViewerModal({ url, titulo, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="relative flex w-full max-w-5xl flex-col rounded-xl bg-white shadow-2xl" style={{ height: '90vh' }}>
                <div className="flex items-center justify-between border-b px-6 py-4 shrink-0">
                    <h2 className="text-base font-semibold text-gray-800 truncate pr-4">{titulo}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
                        <IconX />
                    </button>
                </div>
                <div className="flex-1 overflow-hidden">
                    <iframe src={url} title={titulo} className="h-full w-full border-0" />
                </div>
                <div className="flex justify-end border-t px-6 py-3 shrink-0">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Abrir en nueva pestaña
                    </a>
                </div>
            </div>
        </div>
    );
}

// ─── Modal Cooperación Escolar ────────────────────────────────────────────────
function CooperacionModal({ item, onClose }) {
    const isEdit = !!item;
    const hoy    = new Date();

    const { data, setData, processing, errors, reset } = useForm({
        titulo:      item?.titulo      ?? '',
        descripcion: item?.descripcion ?? '',
        activa:      item?.activa      ?? true,
        anio:        item?.anio        ?? hoy.getFullYear(),
        mes:         item?.mes         ?? (hoy.getMonth() + 1),
    });

    const [newPdf, setNewPdf]           = useState(null);
    const [replaceMode, setReplaceMode] = useState(false);
    const fileInputRef                  = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setNewPdf(file);
        e.target.value = '';
    };

    const submit = (e) => {
        e.preventDefault();

        if (!isEdit && !newPdf) {
            toast.error('Seleccioná un archivo PDF.');
            return;
        }

        const formData = {
            ...data,
            ...(newPdf ? { archivo_pdf: newPdf } : {}),
        };

        const options = {
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
                toast.success(isEdit ? 'Documento actualizado correctamente.' : 'Documento creado correctamente.');
            },
            onError: () => toast.error('Error al guardar. Revisá los campos requeridos.'),
        };

        if (isEdit) {
            router.post(route('cooperacion_escolar.update', item.id), { ...formData, _method: 'PUT' }, options);
        } else {
            router.post(route('cooperacion_escolar.store'), formData, options);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {isEdit ? 'Editar documento' : 'Nuevo documento'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <IconX />
                    </button>
                </div>

                <form onSubmit={submit} className="max-h-[80vh] overflow-y-auto px-6 py-4 space-y-4">
                    {/* Título */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                        <input
                            type="text"
                            value={data.titulo}
                            onChange={(e) => setData('titulo', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-1 focus:ring-brand-blue-400"
                        />
                        {errors.titulo && <p className="mt-1 text-xs text-red-500">{errors.titulo}</p>}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea
                            rows={3}
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-1 focus:ring-brand-blue-400 resize-none"
                        />
                    </div>

                    {/* Activa */}
                    <div className="flex items-center gap-2">
                        <input
                            id="activa"
                            type="checkbox"
                            checked={data.activa}
                            onChange={(e) => setData('activa', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-brand-blue-400 focus:ring-brand-blue-400"
                        />
                        <label htmlFor="activa" className="text-sm font-medium text-gray-700">
                            Visible (activa)
                        </label>
                    </div>

                    {/* Fecha */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de publicación</label>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Mes</label>
                                <select
                                    value={data.mes}
                                    onChange={(e) => setData('mes', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-1 focus:ring-brand-blue-400"
                                >
                                    <option value="">—</option>
                                    {MESES.map(([n, label]) => (
                                        <option key={n} value={n}>{label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Año</label>
                                <input
                                    type="number"
                                    min="2000"
                                    max="2100"
                                    placeholder="AAAA"
                                    value={data.anio}
                                    onChange={(e) => setData('anio', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-1 focus:ring-brand-blue-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* PDF */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {isEdit ? 'Archivo PDF' : 'Archivo PDF *'}
                        </label>

                        {isEdit && item.pdf_url && !replaceMode && (
                            <div className="mb-3 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                                <span className="text-red-500 shrink-0"><IconPdf /></span>
                                <span className="flex-1 truncate text-sm text-gray-700">{item.archivo_pdf}</span>
                                <button
                                    type="button"
                                    onClick={() => setReplaceMode(true)}
                                    className="shrink-0 rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    Reemplazar
                                </button>
                            </div>
                        )}

                        {(!isEdit || replaceMode) && (
                            <div className="space-y-2">
                                {replaceMode && (
                                    <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                                        El PDF actual será reemplazado al guardar.
                                    </p>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                {newPdf ? (
                                    <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                                        <span className="text-red-500 shrink-0"><IconPdf /></span>
                                        <span className="flex-1 truncate text-sm text-gray-700">{newPdf.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => { setNewPdf(null); if (replaceMode) setReplaceMode(false); }}
                                            className="shrink-0 text-gray-400 hover:text-red-500"
                                        >
                                            <IconX />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-brand-blue-400 hover:text-brand-blue-500 transition-colors"
                                    >
                                        <IconPdf /> Seleccionar archivo PDF
                                    </button>
                                )}
                                {errors.archivo_pdf && (
                                    <p className="mt-1 text-xs text-red-500">{errors.archivo_pdf}</p>
                                )}
                            </div>
                        )}
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
                            className="rounded-lg bg-brand-blue-400 px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue-500 disabled:opacity-60"
                        >
                            {processing ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear documento'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Tarjeta de Documento ─────────────────────────────────────────────────────
function CooperacionCard({ item, onEdit, onDelete, onPreview }) {
    const mesLabel = item.mes
        ? MESES.find(([n]) => n === item.mes)?.[1]
        : null;

    return (
        <div className={`flex flex-col rounded-xl bg-white shadow-sm border transition-opacity ${item.activa ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
            <div className="flex items-center gap-3 rounded-t-xl bg-red-50 px-5 py-4 border-b border-red-100">
                <span className="text-red-500 shrink-0"><IconPdf /></span>
                <span className="flex-1 truncate text-sm font-medium text-red-700">
                    {item.archivo_pdf ?? 'Sin archivo'}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800 leading-snug">{item.titulo}</h3>
                    {!item.activa && (
                        <span className="flex items-center gap-1 shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                            <IconEyeOff /> Oculto
                        </span>
                    )}
                </div>

                {item.descripcion && (
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.descripcion}</p>
                )}

                {(mesLabel || item.anio) && (
                    <p className="mt-2 text-xs text-gray-400">
                        {[mesLabel, item.anio].filter(Boolean).join(' ')}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                    <button
                        onClick={() => onPreview(item)}
                        disabled={!item.pdf_url}
                        className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                    >
                        <IconEye /> Ver PDF
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(item)}
                            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                            <IconEdit /> Editar
                        </button>
                        <button
                            onClick={() => onDelete(item)}
                            className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
                        >
                            <IconTrash /> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Modal Confirmación Eliminar ──────────────────────────────────────────────
function DeleteModal({ item, onConfirm, onClose, processing }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-xl bg-white shadow-2xl p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-2">Eliminar documento</h2>
                <p className="text-sm text-gray-500 mb-6">
                    ¿Confirmás que querés eliminar <span className="font-medium text-gray-700">"{item.titulo}"</span>?
                    Esta acción no se puede deshacer y eliminará el PDF asociado.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={processing}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-60"
                    >
                        {processing ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function CooperacionEscolarIndex({ items }) {
    const [modal, setModal]           = useState(null);
    const [deleteTarget, setDelete]   = useState(null);
    const [pdfPreview, setPdfPreview] = useState(null);
    const [deleting, setDeleting]     = useState(false);

    const handleDelete = () => {
        setDeleting(true);
        router.delete(route('cooperacion_escolar.destroy', deleteTarget.id), {
            onSuccess: () => {
                setDelete(null);
                setDeleting(false);
                toast.success('Documento eliminado correctamente.');
            },
            onError: () => {
                setDeleting(false);
                toast.error('Error al eliminar el documento.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            pageTitle="Cooperación Escolar"
            pageSubtitle="Gestioná los documentos PDF del área"
            pageColor="#7C3AED"
            pageAction={
                <button
                    onClick={() => setModal('create')}
                    className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                    <IconPlus /> Nuevo documento
                </button>
            }
        >
            <Head title="Cooperación Escolar" />
            <Toaster richColors position="top-right" />

            <div className="p-6">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
                        <span className="text-gray-300 mb-3"><IconPdf /></span>
                        <p className="text-sm font-medium text-gray-500">No hay documentos cargados</p>
                        <p className="text-xs text-gray-400 mt-1">Hacé clic en "Nuevo documento" para agregar el primero</p>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {items.map((item) => (
                            <CooperacionCard
                                key={item.id}
                                item={item}
                                onEdit={(i) => setModal(i)}
                                onDelete={(i) => setDelete(i)}
                                onPreview={(i) => setPdfPreview(i)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {modal && (
                <CooperacionModal
                    item={modal === 'create' ? null : modal}
                    onClose={() => setModal(null)}
                />
            )}

            {deleteTarget && (
                <DeleteModal
                    item={deleteTarget}
                    onConfirm={handleDelete}
                    onClose={() => setDelete(null)}
                    processing={deleting}
                />
            )}

            {pdfPreview && (
                <PdfViewerModal
                    url={pdfPreview.pdf_url}
                    titulo={pdfPreview.titulo}
                    onClose={() => setPdfPreview(null)}
                />
            )}
        </AuthenticatedLayout>
    );
}
