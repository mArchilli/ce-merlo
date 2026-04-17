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
const IconUser = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

// ─── Modal ────────────────────────────────────────────────────────────────────
function AutoridadModal({ item, onClose }) {
    const isEdit = !!item;

    const { data, setData, processing, errors, reset } = useForm({
        nombre:       item?.nombre ?? '',
        cargo:        item?.cargo ?? '',
        tipo:         item?.tipo ?? 'principal',
        area:         item?.area ?? '',
        orden:        item?.orden ?? 0,
        activa:       item?.activa ?? true,
        eliminar_foto: false,
    });

    const [previewUrl, setPreviewUrl]   = useState(null);
    const [newFile, setNewFile]         = useState(null);
    const fileInputRef                  = useRef(null);

    const fotoActual = item?.foto ? `/images/${item.foto}` : null;

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setNewFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setData('eliminar_foto', false);
        e.target.value = '';
    };

    const removePreview = () => {
        setNewFile(null);
        setPreviewUrl(null);
    };

    const handleEliminarFoto = () => {
        setData('eliminar_foto', true);
        setNewFile(null);
        setPreviewUrl(null);
    };

    const submit = (e) => {
        e.preventDefault();

        const submitData = { ...data };
        if (newFile) submitData.foto = newFile;

        const options = {
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
                toast.success(isEdit ? 'Autoridad actualizada correctamente.' : 'Autoridad creada correctamente.');
            },
            onError: () => toast.error('Error al guardar. Revisá los campos requeridos.'),
        };

        if (isEdit) {
            router.post(route('autoridades.update', item.id), { ...submitData, _method: 'PUT' }, options);
        } else {
            router.post(route('autoridades.store'), submitData, options);
        }
    };

    const imagenActiva = previewUrl ?? (data.eliminar_foto ? null : fotoActual);
    const esPrincipal  = data.tipo === 'principal';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {isEdit ? 'Editar autoridad' : 'Nueva autoridad'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><IconX /></button>
                </div>

                <form onSubmit={submit} className="max-h-[80vh] overflow-y-auto px-6 py-5 space-y-4">

                    {/* Tipo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
                        <select
                            value={data.tipo}
                            onChange={(e) => setData('tipo', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        >
                            <option value="principal">Autoridad principal</option>
                            <option value="vocal">Vocal</option>
                        </select>
                        {errors.tipo && <p className="mt-1 text-xs text-red-500">{errors.tipo}</p>}
                    </div>

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            placeholder="Ej: Lic. María José Barrionuevo"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                        {errors.nombre && <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>}
                    </div>

                    {/* Cargo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cargo *</label>
                        <input
                            type="text"
                            value={data.cargo}
                            onChange={(e) => setData('cargo', e.target.value)}
                            placeholder="Ej: Presidenta"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                        {errors.cargo && <p className="mt-1 text-xs text-red-500">{errors.cargo}</p>}
                    </div>

                    {/* Área (solo vocales) */}
                    {data.tipo === 'vocal' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Área asignada</label>
                            <select
                                value={data.area}
                                onChange={(e) => setData('area', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                            >
                                <option value="">Sin área asignada</option>
                                <option value="Infraestructura">Infraestructura</option>
                                <option value="Recursos Humanos">Recursos Humanos</option>
                                <option value="Patrimonio">Patrimonio</option>
                                <option value="Cooperación Escolar">Cooperación Escolar</option>
                                <option value="SAE">SAE</option>
                                <option value="Descentralizados">Descentralizados</option>
                                <option value="Correo Oficial">Correo Oficial</option>
                            </select>
                            {errors.area && <p className="mt-1 text-xs text-red-500">{errors.area}</p>}
                        </div>
                    )}

                    {/* Orden */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Orden de aparición</label>
                        <input
                            type="number"
                            min={0}
                            value={data.orden}
                            onChange={(e) => setData('orden', parseInt(e.target.value, 10) || 0)}
                            className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                    </div>

                    {/* Foto */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Foto {esPrincipal ? '*' : '(opcional)'}
                        </label>

                        {imagenActiva ? (
                            <div className="relative inline-block">
                                <img
                                    src={imagenActiva}
                                    alt="Vista previa"
                                    className="h-28 w-28 rounded-lg object-cover border border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={previewUrl ? removePreview : handleEliminarFoto}
                                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                    title="Quitar foto"
                                >
                                    <IconX />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:border-blue-400 hover:text-blue-400 transition-colors"
                            >
                                <IconUser />
                                <span className="mt-1 text-xs">Subir foto</span>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleFile}
                        />

                        {!imagenActiva && (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="mt-2 text-xs text-blue-600 hover:underline"
                            >
                                Seleccionar imagen
                            </button>
                        )}

                        {errors.foto && <p className="mt-1 text-xs text-red-500">{errors.foto}</p>}
                        <p className="mt-1 text-xs text-gray-400">JPG, PNG o WebP. Máx. 5 MB.</p>
                    </div>

                    {/* Activa */}
                    <div className="flex items-center gap-2">
                        <input
                            id="activa"
                            type="checkbox"
                            checked={data.activa}
                            onChange={(e) => setData('activa', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
                        />
                        <label htmlFor="activa" className="text-sm font-medium text-gray-700">
                            Visible en el sitio
                        </label>
                    </div>

                    {/* Botones */}
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
                            {processing ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear autoridad'}
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
        router.delete(route('autoridades.destroy', item.id), {
            onSuccess: () => {
                onClose();
                toast.success('Autoridad eliminada correctamente.');
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
                <h3 className="text-base font-semibold text-gray-800 mb-2">¿Eliminar autoridad?</h3>
                <p className="text-sm text-gray-600 mb-5">
                    Se eliminará <span className="font-medium">{item.nombre}</span> y su foto (si tiene). Esta acción no se puede deshacer.
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

// ─── Tarjeta de autoridad ─────────────────────────────────────────────────────
function AutoridadCard({ autoridad, onEdit, onDelete }) {
    return (
        <div className={`flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm ${!autoridad.activa ? 'opacity-50' : ''}`}>
            {/* Foto o avatar */}
            {autoridad.foto ? (
                <img
                    src={`/images/${autoridad.foto}`}
                    alt={autoridad.nombre}
                    className="h-14 w-14 rounded-full object-cover border border-gray-200 shrink-0"
                />
            ) : (
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-400">
                    <IconUser />
                </div>
            )}

            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider truncate">{autoridad.cargo}</p>
                <p className="text-sm font-medium text-gray-800 truncate">{autoridad.nombre}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        autoridad.tipo === 'principal'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                    }`}>
                        {autoridad.tipo === 'principal' ? 'Principal' : 'Vocal'}
                    </span>
                    {autoridad.area && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                            {autoridad.area}
                        </span>
                    )}
                    {!autoridad.activa && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">Oculto</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <button
                    onClick={() => onEdit(autoridad)}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                    <IconEdit /> Editar
                </button>
                <button
                    onClick={() => onDelete(autoridad)}
                    className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
                >
                    <IconTrash /> Eliminar
                </button>
            </div>
        </div>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function AutoridadesIndex({ autoridades }) {
    const [modalOpen, setModalOpen]     = useState(false);
    const [editItem, setEditItem]       = useState(null);
    const [deleteItem, setDeleteItem]   = useState(null);

    const openCreate = () => { setEditItem(null); setModalOpen(true); };
    const openEdit   = (item) => { setEditItem(item); setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); setEditItem(null); };

    const principales = autoridades.filter((a) => a.tipo === 'principal');
    const vocales     = autoridades.filter((a) => a.tipo === 'vocal');

    return (
        <AuthenticatedLayout
            pageTitle="Autoridades"
            pageSubtitle={`${autoridades.length} consejero(s) registrado(s)`}
            pageColor="#8B5CF6"
            pageAction={
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 rounded-lg bg-white/20 border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                    <IconPlus /> Nueva autoridad
                </button>
            }
        >
            <Head title="Autoridades" />
            <Toaster richColors position="top-right" />

            <div className="p-6 space-y-8">

                {/* Autoridades principales */}
                <section>
                    <h2 className="text-base font-semibold text-gray-700 mb-3">
                        Autoridades principales
                        <span className="ml-2 text-xs font-normal text-gray-400">({principales.length})</span>
                    </h2>
                    {principales.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">Sin autoridades principales registradas.</p>
                    ) : (
                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {principales.map((a) => (
                                <AutoridadCard
                                    key={a.id}
                                    autoridad={a}
                                    onEdit={openEdit}
                                    onDelete={setDeleteItem}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* Vocales */}
                <section>
                    <h2 className="text-base font-semibold text-gray-700 mb-3">
                        Vocales
                        <span className="ml-2 text-xs font-normal text-gray-400">({vocales.length})</span>
                    </h2>
                    {vocales.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">Sin vocales registrados.</p>
                    ) : (
                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {vocales.map((a) => (
                                <AutoridadCard
                                    key={a.id}
                                    autoridad={a}
                                    onEdit={openEdit}
                                    onDelete={setDeleteItem}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* Modales */}
            {modalOpen && (
                <AutoridadModal item={editItem} onClose={closeModal} />
            )}
            {deleteItem && (
                <ConfirmDelete item={deleteItem} onClose={() => setDeleteItem(null)} />
            )}
        </AuthenticatedLayout>
    );
}
