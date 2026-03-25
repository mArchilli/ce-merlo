import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import PublicNavbar from '@/Components/PublicNavbar';

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
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

const IconBuilding = () => (
    <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 10h2m-2 4h2m4-4h2m-2 4h2M8 18h8" />
    </svg>
);
const IconExpand = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ medios, index, onClose, onPrev, onNext }) {
    const medio = medios[index];
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
            {/* Prev */}
            {hasMultiple && (
                <button
                    className="absolute left-3 sm:left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
                    onClick={e => { e.stopPropagation(); onPrev(); }}
                    aria-label="Anterior"
                >
                    <IconChevronLeft />
                </button>
            )}

            {/* Media */}
            <div
                className="relative flex items-center justify-center px-16 sm:px-20"
                style={{ maxWidth: '100vw', maxHeight: '90vh' }}
                onClick={e => e.stopPropagation()}
            >
                {medio.tipo === 'imagen' ? (
                    <img
                        src={medio.url}
                        alt=""
                        className="max-w-[80vw] max-h-[85vh] rounded-xl object-contain shadow-2xl"
                    />
                ) : (
                    <video
                        src={medio.url}
                        controls
                        autoPlay
                        className="max-w-[80vw] max-h-[85vh] rounded-xl shadow-2xl"
                    />
                )}
            </div>

            {/* Next */}
            {hasMultiple && (
                <button
                    className="absolute right-3 sm:right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
                    onClick={e => { e.stopPropagation(); onNext(); }}
                    aria-label="Siguiente"
                >
                    <IconChevronRight />
                </button>
            )}

            {/* Close */}
            <button
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
                onClick={onClose}
                aria-label="Cerrar"
            >
                <IconX />
            </button>

            {/* Counter */}
            {hasMultiple && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs text-white font-medium">
                    {index + 1} / {medios.length}
                </div>
            )}
        </div>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function ViewObra({ obra }) {
    const [lightboxIndex, setLightboxIndex]   = useState(null);

    const medios    = obra.medios ?? [];
    const principal = medios.find(m => m.es_principal) || medios[0] || null;

    // Gallery sorted: principal first, then the rest by id
    const sortedMedios = principal
        ? [principal, ...medios.filter(m => m.id !== principal.id)]
        : medios;

    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const prevMedia     = useCallback(() => setLightboxIndex(i => (i - 1 + sortedMedios.length) % sortedMedios.length), [sortedMedios.length]);
    const nextMedia     = useCallback(() => setLightboxIndex(i => (i + 1) % sortedMedios.length), [sortedMedios.length]);

    useEffect(() => {
        if (lightboxIndex === null) return;
        const handler = (e) => {
            if (e.key === 'Escape')      closeLightbox();
            if (e.key === 'ArrowLeft')   prevMedia();
            if (e.key === 'ArrowRight')  nextMedia();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [lightboxIndex, closeLightbox, prevMedia, nextMedia]);

    const hasGallery    = sortedMedios.length > 0;
    const hasDescription = !!(obra.descripcion?.trim());

    return (
        <>
            <Head title={`${obra.titulo} – Infraestructura – Consejo Escolar de Merlo`} />

            <div className="bg-gray-50 text-gray-800 font-sans antialiased min-h-screen">

                {/* ══════ HEADER ══════ */}
                <PublicNavbar />

                {/* ══════ BACK BAR + HERO ══════ */}
                <div className="pt-16">
                    {/* Breadcrumb */}
                    <div className="bg-brand-blue-900">
                        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-11 flex items-center gap-2 text-sm">
                            <Link
                                href="/areas/infraestructura"
                                className="flex items-center gap-1.5 text-brand-blue-300 hover:text-white transition-colors"
                            >
                                <IconArrowLeft />
                                Infraestructura
                            </Link>
                            <span className="text-brand-blue-600 text-xs">›</span>
                            <span className="text-white/80 font-medium truncate max-w-[60vw]">{obra.titulo}</span>
                        </div>
                    </div>

                    {/* Hero */}
                    <div
                        className="relative w-full overflow-hidden cursor-pointer"
                        style={{ height: 'clamp(280px, 48vw, 560px)' }}
                        onClick={() => hasGallery && setLightboxIndex(0)}
                    >
                        {principal ? (
                            principal.tipo === 'imagen' ? (
                                <img
                                    src={principal.url}
                                    alt={obra.titulo}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <video
                                    src={principal.url}
                                    className="h-full w-full object-cover"
                                    muted
                                    loop
                                    autoPlay
                                    playsInline
                                />
                            )
                        ) : (
                            <div className="flex h-full items-center justify-center bg-brand-blue-900 text-brand-blue-700">
                                <IconBuilding />
                            </div>
                        )}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Expand hint */}
                        {hasGallery && (
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
                                <IconExpand />
                                <span className="hidden sm:inline">Ampliar</span>
                            </div>
                        )}

                        {/* Title overlay */}
                        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8">
                            {obra.destacada && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold-400 px-3 py-1 text-xs font-semibold text-white mb-3 shadow-sm">
                                    <IconStar /> Destacada
                                </span>
                            )}
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                                {obra.titulo}
                            </h1>
                            {(obra.anio || obra.mes) && (
                                <p className="mt-1.5 text-sm font-medium text-brand-gold-300">
                                    {obra.mes ? MESES[obra.mes - 1] : ''}{obra.mes && obra.anio ? ' ' : ''}{obra.anio ?? ''}
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

                {/* ══════ CONTENIDO PRINCIPAL ══════ */}
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
                    <div className={`grid gap-10 lg:gap-16 ${hasDescription && sortedMedios.length > 1 ? 'lg:grid-cols-5' : ''}`}>

                        {/* ── Descripción ── */}
                        {hasDescription && (
                            <div className={sortedMedios.length > 1 ? 'lg:col-span-2' : ''}>
                                <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">
                                    Descripción
                                </p>
                                <div
                                    className="prose prose-gray prose-sm sm:prose max-w-none text-gray-600 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: obra.descripcion }}
                                />
                            </div>
                        )}

                        {/* ── Galería ── */}
                        {sortedMedios.length > 1 && (
                            <div className={hasDescription ? 'lg:col-span-3' : ''}>
                                <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">
                                    Galería · {sortedMedios.length} archivos
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {sortedMedios.map((m, idx) => (
                                        <button
                                            key={m.id}
                                            onClick={() => setLightboxIndex(idx)}
                                            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-400 focus:ring-offset-2"
                                        >
                                            {m.tipo === 'imagen' ? (
                                                <img
                                                    src={m.url}
                                                    alt=""
                                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-brand-blue-900 text-white/70 group-hover:text-white transition-colors">
                                                    <IconPlay />
                                                </div>
                                            )}

                                            {/* Principal badge */}
                                            {m.es_principal && (
                                                <span className="absolute top-2 left-2 rounded-full bg-brand-gold-400 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                                                    Principal
                                                </span>
                                            )}

                                            {/* Expand overlay */}
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

                        {/* Fallback when no description + only 1 medio */}
                        {!hasDescription && sortedMedios.length <= 1 && (
                            <div className="py-8 text-center text-gray-400">
                                <p className="text-sm">No hay descripción disponible para esta obra.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ══════ BACK LINK ══════ */}
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
                    <Link
                        href="/areas/infraestructura"
                        className="inline-flex items-center gap-2 text-sm text-brand-blue-500 hover:text-brand-blue-700 font-medium transition-colors"
                    >
                        <IconArrowLeft />
                        Volver a Infraestructura
                    </Link>
                </div>

                {/* ══════ FOOTER ══════ */}
                <footer className="bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-8">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-200">

                            {/* Marca */}
                            <div className="lg:col-span-2">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-11 h-11 rounded-full bg-brand-blue-700 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">CE</span>
                                    </div>
                                    <div>
                                        <span className="block text-base font-bold text-gray-900">Consejo Escolar de Merlo</span>
                                        <span className="block text-xs text-gray-400">Provincia de Buenos Aires</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                                    Organismo descentralizado de la Dirección General de Cultura y Educación de la Provincia de Buenos Aires, al servicio de la comunidad educativa del distrito.
                                </p>
                            </div>

                            {/* Navegación */}
                            <div>
                                <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.15em] uppercase mb-4">Navegación</p>
                                <nav className="flex flex-col gap-2.5">
                                    {[
                                        { label: 'Inicio',          href: '/' },
                                        { label: 'Infraestructura', href: '/areas/infraestructura' },
                                        { label: 'Contacto',        href: '/contacto' },
                                    ].map((item) => (
                                        <Link key={item.href} href={item.href} className="text-sm text-gray-500 hover:text-brand-blue-600 transition-colors">
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            {/* Contacto */}
                            <div>
                                <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.15em] uppercase mb-4">Contacto</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-brand-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-500">Av. Calle Real 208/212</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-brand-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                        <span className="text-sm text-gray-500">0220-482-5836</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-brand-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-500">Lun a Vie, 8 a 14 hs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-gray-400">
                                © {new Date().getFullYear()} Consejo Escolar de Merlo.
                            </p>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-400">Powered by <span className="font-semibold text-gray-500">Pampa Labs</span></span>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-brand-blue-200" />
                                    <span className="w-2 h-2 rounded-full bg-brand-blue-400" />
                                    <span className="w-2 h-2 rounded-full bg-brand-gold-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>

            {/* ══════ LIGHTBOX ══════ */}
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
