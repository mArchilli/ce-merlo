import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import PublicNavbar from '@/Components/PublicNavbar';
import Footer from '@/Components/Welcome/Footer';

// ─── Iconos ───────────────────────────────────────────────────────────────────
const IconArrowLeft = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);
const IconX = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const IconChevronLeft = () => (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);
const IconChevronRight = () => (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);
const IconPlay = () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);
const IconStar = () => (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);
const IconExpand = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);
const IconTool = () => (
    <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
);

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ medios, index, onClose, onPrev, onNext }) {
    const medio       = medios[index];
    const hasMultiple = medios.length > 1;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-sm"
            onClick={onClose}
        >
            {hasMultiple && (
                <button
                    className="absolute left-3 sm:left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
                    onClick={e => { e.stopPropagation(); onPrev(); }}
                    aria-label="Anterior"
                >
                    <IconChevronLeft />
                </button>
            )}

            <div
                className="relative flex items-center justify-center px-16 sm:px-20"
                style={{ maxWidth: '100vw', maxHeight: '90vh' }}
                onClick={e => e.stopPropagation()}
            >
                {medio.tipo === 'imagen' ? (
                    <img src={medio.url} alt="" className="max-w-[80vw] max-h-[85vh] rounded-xl object-contain shadow-2xl" />
                ) : (
                    <video src={medio.url} controls autoPlay className="max-w-[80vw] max-h-[85vh] rounded-xl shadow-2xl" />
                )}
            </div>

            {hasMultiple && (
                <button
                    className="absolute right-3 sm:right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
                    onClick={e => { e.stopPropagation(); onNext(); }}
                    aria-label="Siguiente"
                >
                    <IconChevronRight />
                </button>
            )}

            <button
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
                onClick={onClose}
                aria-label="Cerrar"
            >
                <IconX />
            </button>

            {hasMultiple && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs text-white font-medium">
                    {index + 1} / {medios.length}
                </div>
            )}
        </div>
    );
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function DescentralizadosShow({ trabajo }) {
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const medios    = trabajo.medios ?? [];
    const principal = medios.find(m => m.es_principal) || medios[0] || null;

    const sortedMedios = principal
        ? [principal, ...medios.filter(m => m.id !== principal.id)]
        : medios;

    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const prevMedia     = useCallback(() => setLightboxIndex(i => (i - 1 + sortedMedios.length) % sortedMedios.length), [sortedMedios.length]);
    const nextMedia     = useCallback(() => setLightboxIndex(i => (i + 1) % sortedMedios.length), [sortedMedios.length]);

    useEffect(() => {
        if (lightboxIndex === null) return;
        const handler = (e) => {
            if (e.key === 'Escape')     closeLightbox();
            if (e.key === 'ArrowLeft')  prevMedia();
            if (e.key === 'ArrowRight') nextMedia();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [lightboxIndex, closeLightbox, prevMedia, nextMedia]);

    const hasGallery     = sortedMedios.length > 0;
    const hasDescription = !!(trabajo.descripcion?.trim());

    return (
        <>
            <Head title={`${trabajo.titulo} – Descentralizados – Consejo Escolar de Merlo`} />

            <div className="bg-gray-50 text-gray-800 font-sans antialiased min-h-screen flex flex-col">

                <PublicNavbar />

                {/* Breadcrumb + Hero */}
                <div className="pt-16">
                    <div style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #0D9488 100%)' }}>
                        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-11 flex items-center gap-2 text-sm">
                            <Link href="/areas/descentralizados" className="flex items-center gap-1.5 text-cyan-300 hover:text-white transition-colors">
                                Descentralizados
                            </Link>
                            <span className="text-white/40 text-xs">›</span>
                            <Link href="/areas/descentralizados/trabajos" className="text-cyan-300 hover:text-white transition-colors">
                                Trabajos
                            </Link>
                            <span className="text-white/40 text-xs">›</span>
                            <span className="text-white/80 font-medium truncate max-w-[50vw]">{trabajo.titulo}</span>
                        </div>
                    </div>

                    {/* Hero imagen */}
                    <div
                        className="relative w-full overflow-hidden cursor-pointer"
                        style={{ height: 'clamp(280px, 48vw, 560px)' }}
                        onClick={() => hasGallery && setLightboxIndex(0)}
                    >
                        {principal ? (
                            principal.tipo === 'imagen' ? (
                                <img src={principal.url} alt={trabajo.titulo} className="h-full w-full object-cover" />
                            ) : (
                                <video src={principal.url} className="h-full w-full object-cover" muted loop autoPlay playsInline />
                            )
                        ) : (
                            <div className="flex h-full items-center justify-center text-cyan-900/30" style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #0D9488 100%)' }}>
                                <IconTool />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {hasGallery && (
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
                                <IconExpand />
                                <span className="hidden sm:inline">Ampliar</span>
                            </div>
                        )}

                        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8">
                            {trabajo.destacado && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white mb-3 shadow-sm">
                                    <IconStar /> Destacado
                                </span>
                            )}
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                                {trabajo.titulo}
                            </h1>
                            {(trabajo.anio || trabajo.mes) && (
                                <p className="mt-1.5 text-sm font-medium text-cyan-300">
                                    {trabajo.mes ? MESES[trabajo.mes - 1] : ''}
                                    {trabajo.mes && trabajo.anio ? ' ' : ''}
                                    {trabajo.anio ?? ''}
                                </p>
                            )}
                            {medios.length > 0 && (
                                <p className="mt-2 text-sm text-white/60">
                                    {medios.length} {medios.length === 1 ? 'archivo' : 'archivos'}
                                    {medios.length > 1 && <span className="ml-1">· Galería disponible abajo</span>}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contenido */}
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 flex-grow">
                    <div className={`grid gap-10 lg:gap-16 ${hasDescription && sortedMedios.length > 1 ? 'lg:grid-cols-5' : ''}`}>

                        {/* Descripción */}
                        {hasDescription && (
                            <div className={sortedMedios.length > 1 ? 'lg:col-span-2' : ''}>
                                <p className="text-xs font-semibold text-cyan-600 tracking-[0.2em] uppercase mb-4">
                                    Descripción
                                </p>
                                <div
                                    className="prose prose-gray prose-sm sm:prose max-w-none text-gray-600 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: trabajo.descripcion }}
                                />
                            </div>
                        )}

                        {/* Galería */}
                        {sortedMedios.length > 1 && (
                            <div className={hasDescription ? 'lg:col-span-3' : ''}>
                                <p className="text-xs font-semibold text-cyan-600 tracking-[0.2em] uppercase mb-4">
                                    Galería · {sortedMedios.length} archivos
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {sortedMedios.map((m, idx) => (
                                        <button
                                            key={m.id}
                                            onClick={() => setLightboxIndex(idx)}
                                            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                                        >
                                            {m.tipo === 'imagen' ? (
                                                <img src={m.url} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-cyan-900 text-white/70 group-hover:text-white transition-colors">
                                                    <IconPlay />
                                                </div>
                                            )}
                                            {m.es_principal && (
                                                <span className="absolute top-2 left-2 rounded-full bg-cyan-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                                                    Principal
                                                </span>
                                            )}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-full p-2 shadow-lg">
                                                    <IconExpand />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!hasDescription && sortedMedios.length <= 1 && (
                            <div className="py-8 text-center text-gray-400">
                                <p className="text-sm">No hay descripción disponible para este trabajo.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Volver */}
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
                    <Link
                        href="/areas/descentralizados/trabajos"
                        className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-800 font-medium transition-colors"
                    >
                        <IconArrowLeft />
                        Volver a todos los trabajos
                    </Link>
                </div>

                <Footer />
            </div>

            {lightboxIndex !== null && (
                <Lightbox
                    medios={sortedMedios}
                    index={lightboxIndex}
                    onClose={closeLightbox}
                    onPrev={prevMedia}
                    onNext={nextMedia}
                />
            )}
        </>
    );
}
