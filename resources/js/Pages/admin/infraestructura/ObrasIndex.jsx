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

// ─── Modal genérico (Obra / Trabajo Menor) ────────────────────────────────────
function ItemModal({ item, onClose, config }) {
    const isEdit = !!item;

    const { data, setData, processing, errors, reset } = useForm({
        titulo:              item?.titulo ?? '',
        descripcion:         item?.descripcion ?? '',
        [config.featuredKey]: item?.[config.featuredKey] ?? false,
        principal_medio_id:  item?.medio_principal?.id ?? '',
        medios_eliminar:     [],
    });

    const [newFiles, setNewFiles]                 = useState([]);  // { localId, file, url, tipo, nombre }
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
        e.target.value = '';  // resetear para poder volver a elegir el mismo archivo
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {isEdit ? `Editar ${config.singular}` : `Nuevo ${config.singular}`}
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
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                        {errors.titulo && <p className="mt-1 text-xs text-red-500">{errors.titulo}</p>}
                    </div>

                    {/* Descripción con Quill */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <div className="rounded-lg border border-gray-300 overflow-hidden focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400">
                            <QuillEditor
                                value={data.descripcion}
                                onChange={(val) => setData('descripcion', val)}
                                placeholder={`Describí el ${config.singular}...`}
                            />
                        </div>
                    </div>

                    {/* Destacado */}
                    <div className="flex items-center gap-2">
                        <input
                            id={`destacado-${config.singular}`}
                            type="checkbox"
                            checked={data[config.featuredKey]}
                            onChange={(e) => setData(config.featuredKey, e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
                        />
                        <label htmlFor={`destacado-${config.singular}`} className="text-sm font-medium text-gray-700">
                            Marcar como destacado
                        </label>
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
                                                ? 'border-amber-400'
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
                                                        ? 'text-amber-400' : 'text-white'
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
                                            <span className="absolute top-1 left-1 rounded bg-amber-400 px-1 py-0.5 text-[10px] font-bold text-white">Principal</span>
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
                                            principalLocalId === f.localId ? 'border-amber-400' : 'border-gray-200'
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
                                                className="shrink-0 text-white/70 hover:text-red-400"
                                                title="Quitar"
                                            >
                                                <IconX />
                                            </button>
                                        </div>
                                        {principalLocalId === f.localId && (
                                            <span className="absolute top-1 left-1 rounded bg-amber-400 px-1 py-0.5 text-[10px] font-bold text-white">Principal</span>
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
                            className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-500 hover:border-amber-400 hover:text-amber-500 transition-colors"
                        >
                            <IconPlus /> Agregar archivo(s)
                        </button>
                    </div>

                    <div className="flex justify-end gap-3 pt-2 border-t">
                        <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Cancelar
                        </button>
                        <button type="submit" disabled={processing} className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 disabled:opacity-60">
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
        <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 flex flex-col">
            <div className="relative h-44 bg-gray-100">
                {principal ? (
                    principal.tipo === 'imagen' ? (
                        <img src={principal.url} alt={item.titulo} className="h-full w-full object-cover" />
                    ) : (
                        <video src={principal.url} className="h-full w-full object-cover" muted />
                    )
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-300 text-sm">Sin imagen</div>
                )}
                {item[featuredKey] && (
                    <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[11px] font-semibold text-white">
                        <IconStar /> Destacado
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-1">{item.titulo}</h3>
                {item.descripcion && (
                    <div
                        className="mt-1 text-sm text-gray-500 line-clamp-2 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.descripcion }}
                    />
                )}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                    <span className="text-xs text-gray-400">{item.medios_count ?? 0} medio(s)</span>
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

// ─── Sección reutilizable (grid + modal + confirmación) ───────────────────────
function Section({ items, config }) {
    const [modalOpen,     setModalOpen]     = useState(false);
    const [editando,      setEditando]      = useState(null);
    const [aEliminar,     setAEliminar]     = useState(null);

    const handleEdit  = (item) => { setEditando(item); setModalOpen(true); };
    const handleClose = ()     => { setModalOpen(false); setEditando(null); };

    const confirmDelete = () => {
        router.delete(route(config.destroyRoute, aEliminar.id), {
            onSuccess: () => {
                setAEliminar(null);
                toast.success(config.msgDeleted);
            },
            onError: () => toast.error('No se pudo eliminar el elemento.'),
        });
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-500">{items.length} {config.singular}(s) registrado(s)</p>
                <button
                    onClick={() => { setEditando(null); setModalOpen(true); }}
                    className="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 transition-colors"
                >
                    <IconPlus /> Nuevo {config.singular}
                </button>
            </div>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-20 text-gray-400">
                    <p className="text-lg font-medium">No hay {config.plural} cargados</p>
                    <p className="text-sm mt-1">Hacé clic en "Nuevo {config.singular}" para comenzar.</p>
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            featuredKey={config.featuredKey}
                            onEdit={handleEdit}
                            onDelete={setAEliminar}
                        />
                    ))}
                </div>
            )}

            {modalOpen && (
                <ItemModal item={editando} onClose={handleClose} config={config} />
            )}

            {aEliminar && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
                        <h3 className="text-lg font-semibold text-gray-800">Eliminar {config.singular}</h3>
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
        </div>
    );
}

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

// ─── Página principal ─────────────────────────────────────────────────────────
export default function ObrasIndex({ obras, trabajosMenores }) {
    const [tab, setTab] = useState('obras');

    const tabs = [
        { key: 'obras',            label: 'Obras' },
        { key: 'trabajos_menores', label: 'Trabajos Menores' },
    ];

    return (
        <>
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Infraestructura</h2>}
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

                {tab === 'obras' && (
                    <Section items={obras} config={OBRA_CONFIG} />
                )}
                {tab === 'trabajos_menores' && (
                    <Section items={trabajosMenores} config={TRABAJO_CONFIG} />
                )}
            </div>
        </AuthenticatedLayout>
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
