import QuillEditor from '@/Components/QuillEditor';
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
const IconStar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);
const IconX = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const IconPdf = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
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

// ─── Configuraciones por tipo ─────────────────────────────────────────────────
const OBRA_CONFIG = {
    singular:     'obra',
    plural:       'obras',
    featuredKey:  'destacada',
    storeRoute:   'infraestructura.store',
    updateRoute:  'infraestructura.update',
    destroyRoute: 'infraestructura.destroy',
    msgCreated:   'Obra creada correctamente.',
    msgUpdated:   'Obra actualizada correctamente.',
    msgDeleted:   'Obra eliminada correctamente.',
};

const TRABAJO_CONFIG = {
    singular:     'trabajo menor',
    plural:       'trabajos menores',
    featuredKey:  'destacado',
    storeRoute:   'trabajos_menores.store',
    updateRoute:  'trabajos_menores.update',
    destroyRoute: 'trabajos_menores.destroy',
    msgCreated:   'Trabajo menor creado correctamente.',
    msgUpdated:   'Trabajo menor actualizado correctamente.',
    msgDeleted:   'Trabajo menor eliminado correctamente.',
};

// ─── Modal genérico (Obra / Trabajo Menor) ────────────────────────────────────
function ItemModal({ item, onClose, config }) {
    const isEdit = !!item;

    const { data, setData, processing, errors, reset } = useForm({
        titulo:               item?.titulo ?? '',
        descripcion:          item?.descripcion ?? '',
        [config.featuredKey]: item?.[config.featuredKey] ?? false,
        anio:                 item?.anio ?? '',
        mes:                  item?.mes ?? '',
        principal_medio_id:   item?.medio_principal?.id ?? '',
        medios_eliminar:      [],
    });

    const [newFiles, setNewFiles]                 = useState([]);
    const [principalLocalId, setPrincipalLocalId] = useState(null);
    const fileInputRef                            = useRef(null);

    const addFiles = (e) => {
        const added = Array.from(e.target.files).map(f => ({
            localId: Math.random().toString(36).slice(2),
            file:    f,
            url:     URL.createObjectURL(f),
            tipo:    f.type.startsWith('video') ? 'video' : 'imagen',
            nombre:  f.name,
        }));
        setNewFiles(prev => [...prev, ...added]);
        e.target.value = '';
    };

    const removeNewFile = (localId) => {
        if (principalLocalId === localId) setPrincipalLocalId(null);
        setNewFiles(prev => prev.filter(f => f.localId !== localId));
    };

    const toggleEliminar = (id) =>
        setData('medios_eliminar', (prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );

    const submit = (e) => {
        e.preventDefault();
        const principalIdx = newFiles.findIndex(f => f.localId === principalLocalId);
        const submitData = {
            ...data,
            medios:          newFiles.map(f => f.file),
            principal_index: principalIdx >= 0 ? principalIdx : '',
        };
        const options = {
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
                toast.success(isEdit ? config.msgUpdated : config.msgCreated);
            },
            onError: () => toast.error('Error al guardar. Revisá los campos requeridos.'),
        };
        if (isEdit) {
            router.post(route(config.updateRoute, item.id), { ...submitData, _method: 'PUT' }, options);
        } else {
            router.post(route(config.storeRoute), submitData, options);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
                {/* Franja superior amber */}
                <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-500" />

                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900">
                            {isEdit ? `Editar ${config.singular}` : `Nuevo ${config.singular}`}
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {isEdit ? 'Modificá los datos del elemento.' : `Completá los datos para crear un nuevo ${config.singular}.`}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    >
                        <IconX />
                    </button>
                </div>

                <form onSubmit={submit} className="max-h-[78vh] overflow-y-auto px-6 py-5 space-y-5">
                    {/* Título */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Título *</label>
                        <input
                            type="text"
                            value={data.titulo}
                            onChange={(e) => setData('titulo', e.target.value)}
                            placeholder={`Nombre del ${config.singular}...`}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                        />
                        {errors.titulo && <p className="mt-1 text-xs text-red-500">{errors.titulo}</p>}
                    </div>

                    {/* Descripción con Quill */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
                        <div className="rounded-lg border border-gray-200 overflow-hidden transition-colors focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20">
                            <QuillEditor
                                value={data.descripcion}
                                onChange={(val) => setData('descripcion', val)}
                                placeholder={`Describí el ${config.singular}...`}
                            />
                        </div>
                    </div>

                    {/* Fecha de realización */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Año de realización</label>
                            <input
                                type="number"
                                min="1900"
                                max="2100"
                                value={data.anio}
                                onChange={(e) => setData('anio', e.target.value)}
                                placeholder="Ej: 2024"
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                            />
                            {errors.anio && <p className="mt-1 text-xs text-red-500">{errors.anio}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mes de realización</label>
                            <select
                                value={data.mes}
                                onChange={(e) => setData('mes', e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                            >
                                <option value="">— Sin especificar —</option>
                                {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'].map((m, i) => (
                                    <option key={i + 1} value={i + 1}>{m}</option>
                                ))}
                            </select>
                            {errors.mes && <p className="mt-1 text-xs text-red-500">{errors.mes}</p>}
                        </div>
                    </div>

                    {/* Destacado */}
                    <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors">
                        <input
                            id={`destacado-${config.singular}`}
                            type="checkbox"
                            checked={data[config.featuredKey]}
                            onChange={(e) => setData(config.featuredKey, e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-700">Marcar como destacado</p>
                            <p className="text-xs text-gray-400">Se mostrará de forma prominente en el sitio.</p>
                        </div>
                    </label>

                    {/* Medios existentes (edición) */}
                    {isEdit && item.medios && item.medios.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Medios actuales</label>
                            <div className="grid grid-cols-3 gap-2">
                                {item.medios.map((medio) => (
                                    <div
                                        key={medio.id}
                                        className={`relative rounded-xl border-2 overflow-hidden transition-all ${
                                            data.medios_eliminar.includes(medio.id)
                                                ? 'border-red-400 opacity-50'
                                                : (data.principal_medio_id === medio.id ||
                                                   (data.principal_medio_id === '' && medio.es_principal))
                                                ? 'border-amber-400 ring-2 ring-amber-400/20'
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        {medio.tipo === 'imagen' ? (
                                            <img src={medio.url} alt="" className="h-24 w-full object-cover" />
                                        ) : (
                                            <video src={medio.url} className="h-24 w-full object-cover" />
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/50 px-1.5 py-1">
                                            <button
                                                type="button"
                                                title="Marcar como principal"
                                                onClick={() => setData('principal_medio_id', medio.id)}
                                                className={`text-xs transition-colors ${
                                                    data.principal_medio_id === medio.id ||
                                                    (data.principal_medio_id === '' && medio.es_principal)
                                                        ? 'text-amber-400' : 'text-white/70 hover:text-amber-300'
                                                }`}
                                            >
                                                <IconStar />
                                            </button>
                                            <button type="button" onClick={() => toggleEliminar(medio.id)} className="text-white/70 hover:text-red-400 transition-colors">
                                                <IconX />
                                            </button>
                                        </div>
                                        {(data.principal_medio_id === medio.id ||
                                          (data.principal_medio_id === '' && medio.es_principal)) &&
                                          !data.medios_eliminar.includes(medio.id) && (
                                            <span className="absolute top-1 left-1 rounded-md bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-white">Principal</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Subir nuevos medios */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {isEdit ? 'Agregar más medios' : 'Imágenes / Videos'}
                        </label>

                        {newFiles.length > 0 && (
                            <div className="mb-3 grid grid-cols-3 gap-2">
                                {newFiles.map((f) => (
                                    <div
                                        key={f.localId}
                                        className={`relative rounded-xl border-2 overflow-hidden transition-all ${
                                            principalLocalId === f.localId
                                                ? 'border-amber-400 ring-2 ring-amber-400/20'
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        {f.tipo === 'imagen' ? (
                                            <img src={f.url} alt={f.nombre} className="h-24 w-full object-cover" />
                                        ) : (
                                            <video src={f.url} className="h-24 w-full object-cover" muted />
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-black/50 px-1.5 py-1">
                                            <button
                                                type="button"
                                                onClick={() => setPrincipalLocalId(principalLocalId === f.localId ? null : f.localId)}
                                                className={`shrink-0 transition-colors ${
                                                    principalLocalId === f.localId
                                                        ? 'text-amber-400'
                                                        : 'text-white/70 hover:text-amber-300'
                                                }`}
                                                title="Marcar como principal"
                                            >
                                                <IconStar />
                                            </button>
                                            <span className="flex-1 truncate text-[10px] text-white/80">{f.nombre}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeNewFile(f.localId)}
                                                className="shrink-0 text-white/70 hover:text-red-400 transition-colors"
                                                title="Quitar"
                                            >
                                                <IconX />
                                            </button>
                                        </div>
                                        {principalLocalId === f.localId && (
                                            <span className="absolute top-1 left-1 rounded-md bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-white">Principal</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={addFiles}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm text-gray-500 hover:border-amber-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                        >
                            <IconPlus /> Agregar archivo(s)
                        </button>
                    </div>

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
                            className="rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-60 transition-colors shadow-sm shadow-amber-200"
                        >
                            {processing ? 'Guardando...' : isEdit ? 'Guardar cambios' : `Crear ${config.singular}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Tarjeta genérica ─────────────────────────────────────────────────────────
function ItemCard({ item, featuredKey, onEdit, onDelete }) {
    const principal = item.medio_principal;

    return (
        <div className="group overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="relative h-44 bg-gray-100 overflow-hidden">
                {principal ? (
                    principal.tipo === 'imagen' ? (
                        <img src={principal.url} alt={item.titulo} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                        <video src={principal.url} className="h-full w-full object-cover" muted />
                    )
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-300 text-sm">Sin imagen</div>
                )}
                {item[featuredKey] && (
                    <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm">
                        <IconStar /> Destacado
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-1">{item.titulo}</h3>
                {(item.anio || item.mes) && (
                    <p className="mt-1 text-xs text-amber-600 font-medium">
                        {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][item.mes - 1]
                            ? `${['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][item.mes - 1]} ${item.anio ?? ''}`
                            : item.anio}
                    </p>
                )}
                {item.descripcion && (
                    <div
                        className="mt-1 text-sm text-gray-500 line-clamp-2 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.descripcion }}
                    />
                )}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 mt-4">
                    <span className="text-xs text-gray-400">{item.medios_count ?? 0} medio(s)</span>
                    <div className="flex gap-1.5">
                        <button
                            onClick={() => onEdit(item)}
                            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        >
                            <IconEdit /> Editar
                        </button>
                        <button
                            onClick={() => onDelete(item)}
                            className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 hover:border-red-300 transition-colors"
                        >
                            <IconTrash /> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Años disponibles para filtro ────────────────────────────────────────────
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// ─── Visor PDF en modal ───────────────────────────────────────────────────────
function PdfViewerModal({ url, titulo, onClose }) {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
            <div className="relative flex w-full max-w-5xl flex-col rounded-xl bg-white shadow-2xl" style={{ height: '90vh' }}>
                <div className="flex items-center justify-between border-b px-6 py-4 shrink-0">
                    <h2 className="text-base font-semibold text-gray-800 truncate pr-4">{titulo}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0"><IconX /></button>
                </div>
                <div className="flex-1 overflow-hidden">
                    <iframe src={url} title={titulo} className="h-full w-full border-0" />
                </div>
                <div className="flex justify-end border-t px-6 py-3 shrink-0">
                    <a href={url} target="_blank" rel="noopener noreferrer"
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Abrir en nueva pestaña
                    </a>
                </div>
            </div>
        </div>
    );
}

// ─── Modal Documento PDF ──────────────────────────────────────────────────────
function DocumentoModal({ item, onClose }) {
    const isEdit = !!item;
    const { data, setData, processing, errors, reset } = useForm({
        titulo:      item?.titulo      ?? '',
        descripcion: item?.descripcion ?? '',
        activa:      item?.activa      ?? true,
        anio:        item?.anio        ?? '',
        mes:         item?.mes         ?? '',
        archivo_pdf: null,
    });
    const fileInputRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();
        const options = {
            forceFormData: true,
            onSuccess: () => { reset(); onClose(); toast.success(isEdit ? 'Documento actualizado correctamente.' : 'Documento creado correctamente.'); },
            onError:   () => toast.error('Error al guardar. Revisá los campos requeridos.'),
        };
        if (isEdit) {
            router.post(route('infraestructura_documentos.update', item.id), { ...data, _method: 'PUT' }, options);
        } else {
            router.post(route('infraestructura_documentos.store'), data, options);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-500" />
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900">{isEdit ? 'Editar documento' : 'Nuevo documento'}</h2>
                        <p className="text-xs text-gray-400 mt-0.5">PDF de infraestructura</p>
                    </div>
                    <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                        <IconX />
                    </button>
                </div>

                <form onSubmit={submit} className="max-h-[78vh] overflow-y-auto px-6 py-5 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Título *</label>
                        <input type="text" value={data.titulo} onChange={(e) => setData('titulo', e.target.value)}
                            placeholder="Nombre del documento..."
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20" />
                        {errors.titulo && <p className="mt-1 text-xs text-red-500">{errors.titulo}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
                        <textarea value={data.descripcion} onChange={(e) => setData('descripcion', e.target.value)}
                            rows={3} placeholder="Descripción opcional..."
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20 resize-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Año</label>
                            <input type="number" min="2000" max="2100" value={data.anio}
                                onChange={(e) => setData('anio', e.target.value)} placeholder="Ej: 2025"
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20" />
                            {errors.anio && <p className="mt-1 text-xs text-red-500">{errors.anio}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mes</label>
                            <select value={data.mes} onChange={(e) => setData('mes', e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20">
                                <option value="">— Sin especificar —</option>
                                {MESES.map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
                            </select>
                            {errors.mes && <p className="mt-1 text-xs text-red-500">{errors.mes}</p>}
                        </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors">
                        <input type="checkbox" checked={data.activa} onChange={(e) => setData('activa', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400" />
                        <div>
                            <p className="text-sm font-medium text-gray-700">Visible (activo)</p>
                            <p className="text-xs text-gray-400">Si está desactivado no aparece en el sitio público.</p>
                        </div>
                    </label>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Archivo PDF {isEdit ? '(dejá vacío para mantener el actual)' : '*'}
                        </label>
                        <input ref={fileInputRef} type="file" accept="application/pdf"
                            onChange={(e) => setData('archivo_pdf', e.target.files[0] ?? null)} className="hidden" />
                        <div className="flex items-center gap-3">
                            <button type="button" onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm text-gray-500 hover:border-amber-400 hover:text-amber-500 hover:bg-amber-50 transition-colors">
                                <IconPdf /> {data.archivo_pdf ? data.archivo_pdf.name : 'Seleccionar PDF'}
                            </button>
                            {data.archivo_pdf && (
                                <button type="button" onClick={() => { setData('archivo_pdf', null); fileInputRef.current.value = ''; }}
                                    className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                                    <IconX />
                                </button>
                            )}
                        </div>
                        {errors.archivo_pdf && <p className="mt-1 text-xs text-red-500">{errors.archivo_pdf}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                        <button type="button" onClick={onClose}
                            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" disabled={processing}
                            className="rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-60 transition-colors shadow-sm shadow-amber-200">
                            {processing ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear documento'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Tarjeta de Documento PDF ─────────────────────────────────────────────────
function DocumentoCard({ doc, onEdit, onDelete, onPreview }) {
    return (
        <div className={`flex flex-col rounded-xl bg-white shadow-sm border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden ${doc.activa ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
            <div className="relative bg-gray-50 border-b border-gray-100" style={{ height: '200px' }}>
                {doc.pdf_url ? (
                    <iframe src={`${doc.pdf_url}#toolbar=0&navpanes=0&scrollbar=0`} title={doc.titulo} className="w-full h-full border-0 pointer-events-none" />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-300"><IconPdf /></div>
                )}
                {!doc.activa && (
                    <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-gray-500 px-2 py-0.5 text-[11px] font-semibold text-white">
                        <IconEyeOff /> Oculto
                    </span>
                )}
                {(doc.mes || doc.anio) && (
                    <span className="absolute top-2 right-2 rounded-lg bg-white/90 border border-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {doc.mes ? `${MESES[doc.mes - 1]} ` : ''}{doc.anio ?? ''}
                    </span>
                )}
            </div>
            <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start gap-2 mb-1">
                    <span className="text-red-400 shrink-0 mt-0.5"><IconPdf /></span>
                    <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm">{doc.titulo}</h3>
                </div>
                {doc.descripcion && (
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">{doc.descripcion}</p>
                )}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 mt-4">
                    <button onClick={() => onPreview(doc)}
                        className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 transition-colors">
                        <IconEye /> Ver
                    </button>
                    <div className="flex gap-1.5">
                        <button onClick={() => onEdit(doc)}
                            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 transition-colors">
                            <IconEdit /> Editar
                        </button>
                        <button onClick={() => onDelete(doc)}
                            className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 hover:border-red-300 transition-colors">
                            <IconTrash /> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Sección de Documentos PDF ────────────────────────────────────────────────
function DocumentosSection({ documentos, onEdit, onDelete, onPreview }) {
    const [search,     setSearch]     = useState('');
    const [filterAnio, setFilterAnio] = useState('');
    const [filterMes,  setFilterMes]  = useState('');

    const aniosDisponibles = [...new Set(documentos.map(d => d.anio).filter(Boolean))].sort((a, b) => b - a);

    const filtered = documentos.filter((d) => {
        const matchSearch = !search || d.titulo.toLowerCase().includes(search.toLowerCase());
        const matchAnio   = !filterAnio || String(d.anio) === String(filterAnio);
        const matchMes    = !filterMes  || String(d.mes)  === String(filterMes);
        return matchSearch && matchAnio && matchMes;
    });

    const hasFilters = search || filterAnio || filterMes;

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                    <input type="text" placeholder="Buscar documentos..." value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20" />
                </div>
                <select value={filterAnio} onChange={(e) => { setFilterAnio(e.target.value); setFilterMes(''); }}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20">
                    <option value="">Todos los años</option>
                    {aniosDisponibles.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                {filterAnio && (
                    <select value={filterMes} onChange={(e) => setFilterMes(e.target.value)}
                        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20">
                        <option value="">Todos los meses</option>
                        {MESES.map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
                    </select>
                )}
                {hasFilters && (
                    <button onClick={() => { setSearch(''); setFilterAnio(''); setFilterMes(''); }}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 transition-colors">
                        Limpiar filtros
                    </button>
                )}
            </div>
            <p className="text-xs text-gray-400">{filtered.length} resultado(s){hasFilters ? ` de ${documentos.length}` : ''}</p>
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-20 text-gray-400">
                    {documentos.length === 0
                        ? <><p className="text-lg font-medium">No hay documentos cargados</p><p className="text-sm mt-1">Hacé clic en "Nuevo documento" para comenzar.</p></>
                        : <><p className="text-lg font-medium">Sin resultados</p><p className="text-sm mt-1">Probá con otros filtros o términos de búsqueda.</p></>
                    }
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((doc) => (
                        <DocumentoCard key={doc.id} doc={doc} onEdit={onEdit} onDelete={onDelete} onPreview={onPreview} />
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Sección reutilizable con búsqueda y filtros ──────────────────────────────
function Section({ items, config, onEdit, onDelete }) {
    const [search, setSearch] = useState('');
    const [filterAnio, setFilterAnio] = useState('');
    const [filterMes,  setFilterMes]  = useState('');

    // Años únicos presentes en los items, para el select
    const aniosDisponibles = [...new Set(items.map(i => i.anio).filter(Boolean))].sort((a, b) => b - a);

    // Filtrado + orden más reciente primero
    const filtered = items
        .filter((item) => {
            const matchSearch = !search ||
                item.titulo.toLowerCase().includes(search.toLowerCase());
            const matchAnio = !filterAnio || String(item.anio) === String(filterAnio);
            const matchMes  = !filterMes  || String(item.mes)  === String(filterMes);
            return matchSearch && matchAnio && matchMes;
        })
        .sort((a, b) => {
            const ya = a.anio ?? 0, yb = b.anio ?? 0;
            const ma = a.mes  ?? 0, mb = b.mes  ?? 0;
            if (yb !== ya) return yb - ya;
            return mb - ma;
        });

    const hasFilters = search || filterAnio || filterMes;

    return (
        <div className="space-y-5">
            {/* Barra de búsqueda y filtros */}
            <div className="flex flex-wrap gap-3 items-center">
                {/* Búsqueda */}
                <div className="relative flex-1 min-w-[200px]">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder={`Buscar ${config.plural}...`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                    />
                </div>

                {/* Filtro año */}
                <select
                    value={filterAnio}
                    onChange={(e) => { setFilterAnio(e.target.value); setFilterMes(''); }}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                >
                    <option value="">Todos los años</option>
                    {aniosDisponibles.map(a => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>

                {/* Filtro mes (solo si hay año seleccionado) */}
                {filterAnio && (
                    <select
                        value={filterMes}
                        onChange={(e) => setFilterMes(e.target.value)}
                        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                    >
                        <option value="">Todos los meses</option>
                        {MESES.map((m, i) => (
                            <option key={i + 1} value={i + 1}>{m}</option>
                        ))}
                    </select>
                )}

                {/* Limpiar filtros */}
                {hasFilters && (
                    <button
                        onClick={() => { setSearch(''); setFilterAnio(''); setFilterMes(''); }}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>

            {/* Conteo resultados */}
            <p className="text-xs text-gray-400">
                {filtered.length} resultado(s){hasFilters ? ` de ${items.length}` : ''}
            </p>

            {/* Grid o empty state */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-20 text-gray-400">
                    {items.length === 0
                        ? <>
                            <p className="text-lg font-medium">No hay {config.plural} cargados</p>
                            <p className="text-sm mt-1">Hacé clic en "Nuevo {config.singular}" para comenzar.</p>
                          </>
                        : <>
                            <p className="text-lg font-medium">Sin resultados</p>
                            <p className="text-sm mt-1">Probá con otros filtros o términos de búsqueda.</p>
                          </>
                    }
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            featuredKey={config.featuredKey}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function ObrasIndex({ obras, trabajosMenores, documentos = [] }) {
    const [tab, setTab] = useState('obras');

    // obra / trabajo modal state
    const [modalOpen,     setModalOpen]     = useState(false);
    const [editando,      setEditando]      = useState(null);
    const [modalConfig,   setModalConfig]   = useState(OBRA_CONFIG);
    const [pendingDelete, setPendingDelete] = useState(null); // { item, config }

    // documento modal state
    const [docModalOpen,     setDocModalOpen]     = useState(false);
    const [editandoDoc,      setEditandoDoc]      = useState(null);
    const [pendingDeleteDoc, setPendingDeleteDoc] = useState(null);
    const [previewDoc,       setPreviewDoc]       = useState(null);

    const currentConfig = tab === 'obras' ? OBRA_CONFIG : TRABAJO_CONFIG;

    const handleNew = () => {
        if (tab === 'documentos') { setEditandoDoc(null); setDocModalOpen(true); return; }
        setEditando(null);
        setModalConfig(currentConfig);
        setModalOpen(true);
    };

    const handleEdit = (item, config) => {
        setEditando(item);
        setModalConfig(config);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setEditando(null);
    };

    const confirmDelete = () => {
        router.delete(route(pendingDelete.config.destroyRoute, pendingDelete.item.id), {
            onSuccess: () => {
                setPendingDelete(null);
                toast.success(pendingDelete.config.msgDeleted);
            },
            onError: () => toast.error('No se pudo eliminar el elemento.'),
        });
    };

    const confirmDeleteDoc = () => {
        router.delete(route('infraestructura_documentos.destroy', pendingDeleteDoc.id), {
            onSuccess: () => { setPendingDeleteDoc(null); toast.success('Documento eliminado correctamente.'); },
            onError:   () => toast.error('No se pudo eliminar el documento.'),
        });
    };

    const pageActionLabel = () => {
        if (tab === 'obras')            return 'Nueva obra';
        if (tab === 'trabajos_menores') return 'Nuevo trabajo menor';
        return 'Nuevo documento';
    };

    const tabs = [
        { key: 'obras',            label: 'Obras' },
        { key: 'trabajos_menores', label: 'Trabajos Menores' },
        { key: 'documentos',       label: 'Documentos PDF' },
    ];

    return (
        <>
        <AuthenticatedLayout
            pageTitle="Infraestructura"
            pageSubtitle="Obras, trabajos menores y documentos"
            pageColor="#F59E0B"
            pageAction={
                <button
                    onClick={handleNew}
                    className="flex items-center gap-2 rounded-lg bg-white/20 border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                    <IconPlus /> {pageActionLabel()}
                </button>
            }
        >
            <Head title="Infraestructura" />

            <div className="py-8 px-6">
                {/* Tabs */}
                <div className="mb-6 flex gap-1 border-b border-gray-200">
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                                tab === t.key
                                    ? 'border-amber-400 text-amber-500'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Secciones */}
                {tab === 'obras' && (
                    <Section
                        items={obras}
                        config={OBRA_CONFIG}
                        onEdit={(item) => handleEdit(item, OBRA_CONFIG)}
                        onDelete={(item) => setPendingDelete({ item, config: OBRA_CONFIG })}
                    />
                )}
                {tab === 'trabajos_menores' && (
                    <Section
                        items={trabajosMenores}
                        config={TRABAJO_CONFIG}
                        onEdit={(item) => handleEdit(item, TRABAJO_CONFIG)}
                        onDelete={(item) => setPendingDelete({ item, config: TRABAJO_CONFIG })}
                    />
                )}
                {tab === 'documentos' && (
                    <DocumentosSection
                        documentos={documentos}
                        onEdit={(doc) => { setEditandoDoc(doc); setDocModalOpen(true); }}
                        onDelete={(doc) => setPendingDeleteDoc(doc)}
                        onPreview={(doc) => setPreviewDoc(doc)}
                    />
                )}
            </div>
        </AuthenticatedLayout>

        {/* Modales obras / trabajos */}
        {modalOpen && (
            <ItemModal item={editando} onClose={handleClose} config={modalConfig} />
        )}

        {pendingDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-red-400 to-red-500" />
                    <div className="p-6">
                        <h3 className="text-base font-semibold text-gray-900">Eliminar {pendingDelete.config.singular}</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            ¿Estás seguro de eliminar <strong className="text-gray-700">{pendingDelete.item.titulo}</strong>? Esta acción no se puede deshacer.
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

        {/* Modales documentos PDF */}
        {docModalOpen && (
            <DocumentoModal item={editandoDoc} onClose={() => { setDocModalOpen(false); setEditandoDoc(null); }} />
        )}

        {pendingDeleteDoc && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-red-400 to-red-500" />
                    <div className="p-6">
                        <h3 className="text-base font-semibold text-gray-900">Eliminar documento</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            ¿Estás seguro de eliminar <strong className="text-gray-700">{pendingDeleteDoc.titulo}</strong>? También se eliminará el archivo PDF. Esta acción no se puede deshacer.
                        </p>
                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                onClick={() => setPendingDeleteDoc(null)}
                                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDeleteDoc}
                                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors shadow-sm shadow-red-200"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {previewDoc && (
            <PdfViewerModal
                url={previewDoc.pdf_url}
                titulo={previewDoc.titulo}
                onClose={() => setPreviewDoc(null)}
            />
        )}

        <Toaster
            position="top-right"
            duration={4000}
            toastOptions={{
                style: { fontFamily: 'inherit' },
                classNames: {
                    toast:       'rounded-xl shadow-lg border border-gray-100 text-sm',
                    title:       'font-medium text-gray-800',
                    description: 'text-gray-500',
                    success:     '!border-l-4 !border-l-amber-400',
                    error:       '!border-l-4 !border-l-red-500',
                    warning:     '!border-l-4 !border-l-orange-400',
                    info:        '!border-l-4 !border-l-sky-500',
                },
            }}
            icons={{
                success: <span style={{ color: '#FFA101', fontSize: '1rem' }}>&#10003;</span>,
            }}
        />
        </>
    );
}
