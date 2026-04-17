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
const IconEyeOff = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
);

// ─── Modal Novedad ────────────────────────────────────────────────────────────
function NovedadModal({ item, onClose }) {
    const isEdit = !!item;
    const hoy = new Date();

    const { data, setData, processing, errors, reset } = useForm({
        titulo:              item?.titulo ?? '',
        descripcion:         item?.descripcion ?? '',
        activa:              item?.activa ?? true,
        destacada:           item?.destacada ?? false,
        anio:                item?.anio ?? hoy.getFullYear(),
        mes:                 item?.mes  ?? (hoy.getMonth() + 1),
        dia:                 item?.dia  ?? hoy.getDate(),
        principal_medio_id:  item?.medio_principal?.id ?? '',
        medios_eliminar:     [],
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
                toast.success(isEdit ? 'Novedad actualizada correctamente.' : 'Novedad creada correctamente.');
            },
            onError: () => toast.error('Error al guardar. Revisá los campos requeridos.'),
        };
        if (isEdit) {
            router.post(route('novedades.update', item.id), { ...submitData, _method: 'PUT' }, options);
        } else {
            router.post(route('novedades.store'), submitData, options);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {isEdit ? 'Editar novedad' : 'Nueva novedad'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><IconX /></button>
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

                    {/* Descripción con Quill */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <div className="rounded-lg border border-gray-300 overflow-hidden focus-within:border-brand-blue-400 focus-within:ring-1 focus-within:ring-brand-blue-400">
                            <QuillEditor
                                value={data.descripcion}
                                onChange={(val) => setData('descripcion', val)}
                                placeholder="Describí la novedad..."
                            />
                        </div>
                    </div>

                    {/* Destacada y Activa */}
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                id="destacada"
                                type="checkbox"
                                checked={data.destacada}
                                onChange={(e) => setData('destacada', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-brand-blue-400 focus:ring-brand-blue-400"
                            />
                            <label htmlFor="destacada" className="text-sm font-medium text-gray-700">
                                Marcar como destacada
                            </label>
                        </div>
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
                    </div>

                    {/* Fecha */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de publicación</label>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Día</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="31"
                                    placeholder="DD"
                                    value={data.dia}
                                    onChange={(e) => setData('dia', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-1 focus:ring-brand-blue-400"
                                />
                                {errors.dia && <p className="mt-1 text-xs text-red-500">{errors.dia}</p>}
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Mes</label>
                                <select
                                    value={data.mes}
                                    onChange={(e) => setData('mes', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-1 focus:ring-brand-blue-400"
                                >
                                    <option value="">—</option>
                                    {[
                                        [1,'Enero'],[2,'Febrero'],[3,'Marzo'],[4,'Abril'],
                                        [5,'Mayo'],[6,'Junio'],[7,'Julio'],[8,'Agosto'],
                                        [9,'Septiembre'],[10,'Octubre'],[11,'Noviembre'],[12,'Diciembre'],
                                    ].map(([n, label]) => (
                                        <option key={n} value={n}>{label}</option>
                                    ))}
                                </select>
                                {errors.mes && <p className="mt-1 text-xs text-red-500">{errors.mes}</p>}
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
                                {errors.anio && <p className="mt-1 text-xs text-red-500">{errors.anio}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Medios existentes (edición) */}
                    {isEdit && item.medios && item.medios.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Medios actuales</label>
                            <div className="grid grid-cols-3 gap-2">
                                {item.medios.map((medio) => (
                                    <div
                                        key={medio.id}
                                        className={`relative rounded-lg border-2 overflow-hidden ${
                                            data.medios_eliminar.includes(medio.id)
                                                ? 'border-red-400 opacity-50'
                                                : (data.principal_medio_id === medio.id ||
                                                   (data.principal_medio_id === '' && medio.es_principal))
                                                ? 'border-brand-blue-400'
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        {medio.tipo === 'imagen' ? (
                                            <img src={medio.url} alt="" className="h-24 w-full object-cover" />
                                        ) : (
                                            <video src={medio.url} className="h-24 w-full object-cover" />
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/40 px-1 py-0.5">
                                            <button
                                                type="button"
                                                title="Marcar como principal"
                                                onClick={() => setData('principal_medio_id', medio.id)}
                                                className={`text-xs ${
                                                    data.principal_medio_id === medio.id ||
                                                    (data.principal_medio_id === '' && medio.es_principal)
                                                        ? 'text-brand-blue-400' : 'text-white'
                                                }`}
                                            >
                                                <IconStar />
                                            </button>
                                            <button type="button" onClick={() => toggleEliminar(medio.id)} className="text-white hover:text-red-400">
                                                <IconX />
                                            </button>
                                        </div>
                                        {(data.principal_medio_id === medio.id ||
                                          (data.principal_medio_id === '' && medio.es_principal)) &&
                                          !data.medios_eliminar.includes(medio.id) && (
                                            <span className="absolute top-1 left-1 rounded bg-brand-blue-400 px-1 py-0.5 text-[10px] font-bold text-white">Principal</span>
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
                                        className={`relative rounded-lg border-2 overflow-hidden ${
                                            principalLocalId === f.localId ? 'border-brand-blue-400' : 'border-gray-200'
                                        }`}
                                    >
                                        {f.tipo === 'imagen' ? (
                                            <img src={f.url} alt={f.nombre} className="h-24 w-full object-cover" />
                                        ) : (
                                            <video src={f.url} className="h-24 w-full object-cover" muted />
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-black/50 px-1 py-0.5">
                                            <button
                                                type="button"
                                                onClick={() => setPrincipalLocalId(principalLocalId === f.localId ? null : f.localId)}
                                                className={`shrink-0 ${
                                                    principalLocalId === f.localId
                                                        ? 'text-brand-blue-400'
                                                        : 'text-white/70 hover:text-brand-blue-300'
                                                }`}
                                                title="Marcar como principal"
                                            >
                                                <IconStar />
                                            </button>
                                            <span className="flex-1 truncate text-[10px] text-white/80">{f.nombre}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeNewFile(f.localId)}
                                                className="shrink-0 text-white/70 hover:text-red-400"
                                                title="Quitar"
                                            >
                                                <IconX />
                                            </button>
                                        </div>
                                        {principalLocalId === f.localId && (
                                            <span className="absolute top-1 left-1 rounded bg-brand-blue-400 px-1 py-0.5 text-[10px] font-bold text-white">Principal</span>
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
                            className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-500 hover:border-brand-blue-400 hover:text-brand-blue-500 transition-colors"
                        >
                            <IconPlus /> Agregar archivo(s)
                        </button>
                    </div>

                    <div className="flex justify-end gap-3 pt-2 border-t">
                        <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Cancelar
                        </button>
                        <button type="submit" disabled={processing} className="rounded-lg bg-brand-blue-400 px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue-500 disabled:opacity-60">
                            {processing ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear novedad'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Tarjeta de Novedad ────────────────────────────────────────────────────────
function NovedadCard({ novedad, onEdit, onDelete }) {
    const principal = novedad.medio_principal;

    return (
        <div className={`overflow-hidden rounded-xl bg-white shadow-sm border flex flex-col transition-opacity ${novedad.activa ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
            <div className="relative h-44 bg-gray-100">
                {principal ? (
                    principal.tipo === 'imagen' ? (
                        <img src={principal.url} alt={novedad.titulo} className="h-full w-full object-cover" />
                    ) : (
                        <video src={principal.url} className="h-full w-full object-cover" muted />
                    )
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-300 text-sm">Sin imagen</div>
                )}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {novedad.destacada && (
                        <span className="flex items-center gap-1 rounded-full bg-brand-blue-400 px-2 py-0.5 text-[11px] font-semibold text-white">
                            <IconStar /> Destacada
                        </span>
                    )}
                    {!novedad.activa && (
                        <span className="flex items-center gap-1 rounded-full bg-gray-500 px-2 py-0.5 text-[11px] font-semibold text-white">
                            <IconEyeOff /> Oculta
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-1">{novedad.titulo}</h3>
                {novedad.descripcion && (
                    <div
                        className="mt-1 text-sm text-gray-500 line-clamp-2 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: novedad.descripcion }}
                    />
                )}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                    <span className="text-xs text-gray-400">{novedad.medios_count ?? 0} medio(s)</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(novedad)}
                            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                            <IconEdit /> Editar
                        </button>
                        <button
                            onClick={() => onDelete(novedad)}
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

// ─── Paginación ───────────────────────────────────────────────────────────────
function Pagination({ paginator, onPageChange }) {
    if (paginator.last_page <= 1) return null;

    const { current_page, last_page } = paginator;

    const pages = [];
    if (last_page <= 7) {
        for (let i = 1; i <= last_page; i++) pages.push(i);
    } else if (current_page <= 4) {
        pages.push(1, 2, 3, 4, 5, '…', last_page);
    } else if (current_page >= last_page - 3) {
        pages.push(1, '…', last_page - 4, last_page - 3, last_page - 2, last_page - 1, last_page);
    } else {
        pages.push(1, '…', current_page - 1, current_page, current_page + 1, '…', last_page);
    }

    return (
        <div className="flex items-center justify-center gap-1 mt-8">
            <button
                onClick={() => onPageChange(current_page - 1)}
                disabled={current_page === 1}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
            </button>

            {pages.map((p, i) =>
                p === '…' ? (
                    <span key={`e${i}`} className="px-2 py-2 text-sm text-gray-400 select-none">…</span>
                ) : (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={`min-w-[2.25rem] rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                            p === current_page
                                ? 'border-brand-blue-400 bg-brand-blue-400 text-white'
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        {p}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(current_page + 1)}
                disabled={current_page === last_page}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                Siguiente
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function NovedadesIndex({ novedades, filters = {}, anios = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editando,  setEditando]  = useState(null);
    const [aEliminar, setAEliminar] = useState(null);

    const [search, setSearch] = useState(filters.search ?? '');
    const [mes,    setMes]    = useState(filters.mes    ?? '');
    const [anio,   setAnio]   = useState(filters.anio   ?? '');

    const searchTimer = useRef(null);

    const go = (params) => {
        const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v !== null && v !== undefined));
        router.get(route('novedades.index'), clean, { preserveState: true, preserveScroll: true, replace: true });
    };

    const handleSearchChange = (val) => {
        setSearch(val);
        clearTimeout(searchTimer.current);
        const currentMes  = mes;
        const currentAnio = anio;
        searchTimer.current = setTimeout(() => {
            go({ search: val, mes: currentMes, anio: currentAnio, page: 1 });
        }, 400);
    };

    const handleMesChange = (val) => {
        setMes(val);
        go({ search, mes: val, anio, page: 1 });
    };

    const handleAnioChange = (val) => {
        setAnio(val);
        setMes('');
        go({ search, anio: val, mes: '', page: 1 });
    };

    const limpiar = () => {
        setSearch(''); setMes(''); setAnio('');
        router.get(route('novedades.index'), {}, { preserveState: true, preserveScroll: true, replace: true });
    };

    const hayFiltros = search || mes || anio;

    const handleEdit  = (item) => { setEditando(item); setModalOpen(true); };
    const handleClose = ()     => { setModalOpen(false); setEditando(null); };

    const confirmDelete = () => {
        router.delete(route('novedades.destroy', aEliminar.id), {
            onSuccess: () => {
                setAEliminar(null);
                toast.success('Novedad eliminada correctamente.');
            },
            onError: () => toast.error('No se pudo eliminar la novedad.'),
        });
    };

    return (
        <>
        <AuthenticatedLayout
            pageTitle="Novedades"
            pageSubtitle={`${novedades.total} novedad(es) registrada(s)`}
            pageColor="#3B82F6"
            pageAction={
                <button
                    onClick={() => { setEditando(null); setModalOpen(true); }}
                    className="flex items-center gap-2 rounded-lg bg-white/20 border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                    <IconPlus /> Nueva novedad
                </button>
            }
        >
            <Head title="Novedades" />

            <div className="py-8 px-6">

                {/* Barra de filtros */}
                <div className="flex flex-wrap items-center gap-3 mb-6 pb-5 border-b border-gray-200">
                    {/* Búsqueda */}
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar por título..."
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue-300 focus:border-transparent w-60"
                        />
                    </div>

                    {/* Filtro año */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-500 whitespace-nowrap">Año</label>
                        <select
                            value={anio}
                            onChange={(e) => handleAnioChange(e.target.value)}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue-300 focus:border-transparent"
                        >
                            <option value="">Todos</option>
                            {anios.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>

                    {/* Filtro mes */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-500 whitespace-nowrap">Mes</label>
                        <select
                            value={mes}
                            onChange={(e) => handleMesChange(e.target.value)}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue-300 focus:border-transparent"
                        >
                            <option value="">Todos</option>
                            {[
                                [1,'Enero'],[2,'Febrero'],[3,'Marzo'],[4,'Abril'],
                                [5,'Mayo'],[6,'Junio'],[7,'Julio'],[8,'Agosto'],
                                [9,'Septiembre'],[10,'Octubre'],[11,'Noviembre'],[12,'Diciembre'],
                            ].map(([n, label]) => <option key={n} value={n}>{label}</option>)}
                        </select>
                    </div>

                    {hayFiltros && (
                        <button
                            onClick={limpiar}
                            className="flex items-center gap-1 text-sm text-brand-blue-500 hover:text-brand-blue-700 font-medium transition-colors"
                        >
                            <IconX /> Limpiar
                        </button>
                    )}

                    <span className="ml-auto text-sm text-gray-400">
                        {novedades.total} {novedades.total === 1 ? 'novedad' : 'novedades'}
                        {hayFiltros ? ' encontradas' : ''}
                    </span>
                </div>

                {novedades.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-20 text-gray-400">
                        <p className="text-lg font-medium">
                            {hayFiltros ? 'No hay novedades con los filtros seleccionados' : 'No hay novedades cargadas'}
                        </p>
                        {hayFiltros ? (
                            <button onClick={limpiar} className="mt-3 text-sm text-brand-blue-500 hover:text-brand-blue-700 font-medium transition-colors">
                                Limpiar filtros
                            </button>
                        ) : (
                            <p className="text-sm mt-1">Hacé clic en "Nueva novedad" para comenzar.</p>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {novedades.data.map((novedad) => (
                                <NovedadCard
                                    key={novedad.id}
                                    novedad={novedad}
                                    onEdit={handleEdit}
                                    onDelete={setAEliminar}
                                />
                            ))}
                        </div>

                        <Pagination
                            paginator={novedades}
                            onPageChange={(page) => go({ search, mes, anio, page })}
                        />
                    </>
                )}
            </div>
        </AuthenticatedLayout>

        {modalOpen && (
            <NovedadModal item={editando} onClose={handleClose} />
        )}

        {aEliminar && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
                    <h3 className="text-lg font-semibold text-gray-800">Eliminar novedad</h3>
                    <p className="mt-2 text-sm text-gray-600">
                        ¿Estás seguro de eliminar <strong>{aEliminar.titulo}</strong>? Esta acción no se puede deshacer.
                    </p>
                    <div className="mt-5 flex justify-end gap-3">
                        <button onClick={() => setAEliminar(null)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            Cancelar
                        </button>
                        <button onClick={confirmDelete} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">
                            Eliminar
                        </button>
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
                    toast:       'rounded-xl shadow-lg border border-gray-100 text-sm',
                    title:       'font-medium text-gray-800',
                    description: 'text-gray-500',
                    success:     '!border-l-4 !border-l-brand-blue-400',
                    error:       '!border-l-4 !border-l-red-500',
                    warning:     '!border-l-4 !border-l-orange-400',
                    info:        '!border-l-4 !border-l-sky-500',
                },
            }}
            icons={{
                success: <span style={{ color: '#5796C2', fontSize: '1rem' }}>&#10003;</span>,
            }}
        />
        </>
    );
}

