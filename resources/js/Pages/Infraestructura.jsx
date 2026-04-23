import { Head, Link } from '@inertiajs/react';
import { useState, useRef } from 'react';
import PublicNavbar from '@/Components/PublicNavbar';
import Footer from '@/Components/Welcome/Footer';
import { CROSS_PATTERN_BG } from '@/Components/patterns';

// ─── Iconos ───────────────────────────────────────────────────────────────────
const IconMail = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);
const IconPhone = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
);
const IconWhatsApp = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);
const IconBuilding = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 10h2m-2 4h2m4-4h2m-2 4h2M8 18h8" />
    </svg>
);
const IconWrench = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
);
const IconShield = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
);
const IconStar = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);
const IconPdf = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8.5 18h-1v-5h1.9c.8 0 1.3.5 1.3 1.3 0 .9-.5 1.4-1.4 1.4H8.5v2.3zm.4-3.1h.4c.4 0 .6-.2.6-.6 0-.4-.2-.6-.6-.6h-.4v1.2zm3.7 3.1h-1.1v-5h1.2c1.4 0 2.2.8 2.2 2.5 0 1.6-.9 2.5-2.3 2.5zm.1-4.2h-.1v3.4h.1c.8 0 1.2-.5 1.2-1.7 0-1.2-.4-1.7-1.2-1.7zm4.3.8h1.5v.8H17v1.7h-1v-5h2.6v.8H17v1.7z"/>
    </svg>
);
const IconExternalLink = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);
const IconChevronLeft = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);
const IconChevronRight = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

// ─── Card de obra / trabajo menor ─────────────────────────────────────────────
function ItemCard({ item, featuredKey, href }) {
    const principal = item.medio_principal;
    const Wrapper   = href ? Link : 'div';

    return (
        <Wrapper href={href} className="group overflow-hidden rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest flex flex-col transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-0 md:hover:bg-surface-container-low h-full">
            {/* Imagen */}
            <div className="relative h-48 bg-gray-100 overflow-hidden shrink-0">
                {principal ? (
                    principal.tipo === 'imagen' ? (
                        <img
                            src={principal.url}
                            alt={item.titulo}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <video src={principal.url} className="h-full w-full object-cover" muted />
                    )
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-300">
                        <IconBuilding />
                    </div>
                )}
                {item[featuredKey] && (
                    <span className="absolute top-3 left-3 flex items-center gap-1 rounded bg-blue-600/10 border border-blue-600/20 px-2.5 py-1 text-[10px] font-sans font-bold uppercase tracking-wider text-blue-600 shadow-sm">
                        <IconStar /> DESTACADO
                    </span>
                )}
            </div>

            {/* Contenido */}
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-serif text-xl font-bold md:font-medium text-primary leading-snug mb-4 group-hover:text-blue-600 transition-colors">
                    {item.titulo}
                </h3>
                {item.descripcion && (
                    <div
                        className="font-sans text-sm text-on-surface-variant line-clamp-3 leading-relaxed prose prose-sm max-w-none mb-4"
                        dangerouslySetInnerHTML={{ __html: item.descripcion }}
                    />
                )}
                {href && (
                    <div className="mt-auto flex items-center justify-between">
                        <span className="inline-flex items-center text-sm font-sans font-medium text-blue-600 group-hover:text-primary transition-colors cursor-pointer">
                            Ver detalle <span className="material-symbols-outlined ml-1 text-[18px]">arrow_forward</span>
                        </span>
                    </div>
                )}
            </div>
        </Wrapper>
    );
}

// ─── Carrusel de destacados ───────────────────────────────────────────────────
function InfraCarrusel({ items, featuredKey, getHref }) {
    const [idx, setIdx] = useState(0);
    const scrollRef = useRef(null);
    const total = items.length;
    const cols  = Math.min(total, 3);
    const showDesktopNav = total > 3;
    const showMobileNav  = total > 1;

    const scrollToIdx = (newIdx) => {
        const clamped = Math.max(0, Math.min(newIdx, total - 1));
        setIdx(clamped);
        if (!scrollRef.current) return;
        const el = scrollRef.current;
        const child = el.children[clamped];
        if (!child) return;
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        el.scrollTo({ left: childCenter - el.clientWidth / 2, behavior: 'smooth' });
    };

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const el = scrollRef.current;
        const center = el.scrollLeft + el.clientWidth / 2;
        let closestIdx = 0;
        let minDist = Infinity;
        Array.from(el.children).forEach((child, i) => {
            const dist = Math.abs((child.offsetLeft + child.offsetWidth / 2) - center);
            if (dist < minDist) { minDist = dist; closestIdx = i; }
        });
        setIdx(closestIdx);
    };

    const gridClass = cols === 1 ? 'grid-cols-1' : cols === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3';

    return (
        <div>
            {/* Desktop */}
            <div className={`hidden sm:grid ${gridClass} gap-5`}>
                {Array.from({ length: cols }, (_, offset) => {
                    const item = items[(idx + offset) % total];
                    return <ItemCard key={`${item.id}-${offset}`} item={item} featuredKey={featuredKey} href={getHref?.(item)} />;
                })}
            </div>

            {/* Mobile – scroll-snap con peek de cards adyacentes */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-3 -mx-6 px-[8%] pb-1 overscroll-x-contain"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item) => (
                    <div key={item.id} className="snap-center shrink-0 w-[84%]">
                        <ItemCard item={item} featuredKey={featuredKey} href={getHref?.(item)} />
                    </div>
                ))}
            </div>

            {/* Desktop navigation */}
            {showDesktopNav && (
                <div className="hidden sm:flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={() => setIdx(i => (i - 1 + total) % total)}
                        aria-label="Anterior"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                        <IconChevronLeft />
                    </button>
                    <div className="flex gap-1.5">
                        {Array.from({ length: total }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setIdx(i)}
                                aria-label={`Ir a ${i + 1}`}
                                className={`rounded-full transition-all duration-200 ${i === idx ? 'w-5 h-2 bg-blue-600' : 'w-2 h-2 bg-blue-200 hover:bg-blue-400'}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => setIdx(i => (i + 1) % total)}
                        aria-label="Siguiente"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                        <IconChevronRight />
                    </button>
                </div>
            )}

            {/* Mobile navigation */}
            {showMobileNav && (
                <div className="flex sm:hidden items-center justify-center gap-3 mt-5">
                    <button
                        onClick={() => scrollToIdx(idx - 1)}
                        disabled={idx === 0}
                        aria-label="Anterior"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <IconChevronLeft />
                    </button>
                    <div className="flex gap-1.5">
                        {Array.from({ length: total }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToIdx(i)}
                                aria-label={`Ir a ${i + 1}`}
                                className={`rounded-full transition-all duration-200 ${i === idx ? 'w-5 h-2 bg-blue-600' : 'w-2 h-2 bg-blue-200 hover:bg-blue-400'}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => scrollToIdx(idx + 1)}
                        disabled={idx === total - 1}
                        aria-label="Siguiente"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <IconChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

export default function Infraestructura({ obras, trabajosMenores, correos, documentos = [] }) {
    const [tab, setTab] = useState('obras');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewTitulo, setPreviewTitulo] = useState('');

    const obrasDestacadas   = obras.filter(o => o.destacada);
    const trabajosDestacados = trabajosMenores.filter(t => t.destacado);

    return (
        <>
            <Head title="Infraestructura – Consejo Escolar de Merlo" />

            <div className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col">

                {/* ══════ HEADER ══════ */}
                <PublicNavbar transparent />

                {/* ══════ HERO ══════ */}
                <section className="relative min-h-[380px] sm:min-h-[420px] flex flex-col overflow-hidden bg-primary">
                    <div className="flex-1 relative">
                        {/* Patrón sutil */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: CROSS_PATTERN_BG}} />
                        {/* Círculos decorativos */}
                        <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-3xl" />
                        <div className="absolute -right-20 -bottom-20 w-[280px] h-[280px] rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative flex items-center h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 rounded-none md:rounded bg-white/[0.08] backdrop-blur-sm text-blue-300 text-sm font-medium tracking-wide uppercase border border-white/[0.08]">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    Consejo Escolar de Merlo
                                </div>
                                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight">
                                    Infraestructura
                                    <span className="text-blue-500">.</span>
                                </h1>
                                <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl font-light font-sans">
                                    Nos encargamos del mantenimiento, refacción y construcción de la infraestructura de los establecimientos educativos del distrito de Merlo.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Onda inferior */}
                    <div className="shrink-0 bg-primary">
                        <svg viewBox="0 0 1440 56" className="w-full block text-surface" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ QUÉ HACE EL ÁREA ══════ */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="max-w-xl mb-14">
                            <p className="font-serif text-xs font-bold text-blue-600 tracking-[0.2em] uppercase mb-4">Sobre el área</p>
                            <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold md:font-medium tracking-tight mb-3 md:mb-4">
                                ¿Qué hace el área de Infraestructura?
                            </h2>
                            <p className="mt-4 text-secondary text-base font-light font-sans leading-relaxed">
                                El área de Infraestructura del Consejo Escolar de Merlo gestiona todo lo relacionado con el estado físico y edilicio de los establecimientos educativos del distrito.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Card 1 */}
                            <div className="group flex flex-col gap-4 rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest p-7 hover:bg-surface-container-low hover:border-outline-variant/60 transition-all duration-200">
                                <div className="w-12 h-12 rounded-none md:rounded bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <IconBuilding />
                                </div>
                                <div>
                                    <p className="font-serif font-bold text-primary text-[15px] mb-2">Obras de infraestructura</p>
                                    <p className="font-sans text-secondary text-sm leading-relaxed">
                                        Supervisión y gestión de obras de refacción, ampliación y construcción de edificios escolares en todo el distrito.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="group flex flex-col gap-4 rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest p-7 hover:bg-surface-container-low hover:border-outline-variant/60 transition-all duration-200">
                                <div className="w-12 h-12 rounded-none md:rounded bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <IconWrench />
                                </div>
                                <div>
                                    <p className="font-serif font-bold text-primary text-[15px] mb-2">Trabajos de mantenimiento</p>
                                    <p className="font-sans text-secondary text-sm leading-relaxed">
                                        Coordinación de tareas de mantenimiento preventivo y correctivo para garantizar el buen estado de los establecimientos.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="group flex flex-col gap-4 rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest p-7 hover:bg-surface-container-low hover:border-outline-variant/60 transition-all duration-200">
                                <div className="w-12 h-12 rounded-none md:rounded bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <IconShield />
                                </div>
                                <div>
                                    <p className="font-serif font-bold text-primary text-[15px] mb-2">Control y seguimiento</p>
                                    <p className="font-sans text-secondary text-sm leading-relaxed">
                                        Verificación del cumplimiento de los estándares de seguridad y habilitación de los espacios educativos del municipio.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* ══════ OBRAS Y TRABAJOS MENORES ══════ */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="max-w-xl mb-10">
                            <p className="font-serif text-xs font-bold text-blue-600 tracking-[0.2em] uppercase mb-4">Gestión</p>
                            <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold md:font-medium tracking-tight mb-3 md:mb-4">
                                Obras y trabajos
                            </h2>
                            <p className="mt-4 text-secondary text-base font-light font-sans leading-relaxed">
                                Conocé los proyectos en curso y los trabajos realizados en los establecimientos del distrito.
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-1 border-b border-outline-variant/30 mb-8">
                            <button
                                onClick={() => setTab('obras')}
                                className={`px-6 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                                    tab === 'obras'
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-secondary hover:text-primary'
                                }`}
                            >
                                Obras
                                <span className={`ml-2 rounded px-2 py-0.5 text-xs font-bold ${
                                    tab === 'obras' ? 'bg-blue-600/10 text-blue-600' : 'bg-surface-container-highest text-secondary'
                                }`}>
                                    {obras.length}
                                </span>
                            </button>
                            <button
                                onClick={() => setTab('trabajos')}
                                className={`px-6 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                                    tab === 'trabajos'
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-secondary hover:text-primary'
                                }`}
                            >
                                Trabajos menores
                                <span className={`ml-2 rounded px-2 py-0.5 text-xs font-bold ${
                                    tab === 'trabajos' ? 'bg-blue-600/10 text-blue-600' : 'bg-surface-container-highest text-secondary'
                                }`}>
                                    {trabajosMenores.length}
                                </span>
                            </button>
                        </div>

                        {/* Carrusel obras destacadas */}
                        {tab === 'obras' && (
                            obrasDestacadas.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-none md:rounded border-2 border-dashed border-outline-variant/30 py-20 text-outline-variant">
                                    <IconBuilding />
                                    <p className="mt-3 text-base font-medium font-sans">No hay obras destacadas aún</p>
                                </div>
                            ) : (
                                <InfraCarrusel
                                    items={obrasDestacadas}
                                    featuredKey="destacada"
                                    getHref={obra => `/areas/infraestructura/${obra.id}`}
                                />
                            )
                        )}
                        {tab === 'obras' && (
                            <div className="mt-8 flex justify-center">
                                <Link
                                    href="/areas/infraestructura/obras"
                                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-brand-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-brand-blue-800 transition-all duration-200 shadow-sm"
                                >
                                    <IconBuilding />
                                    Ver todas las obras
                                    <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">{obras.length}</span>
                                </Link>
                            </div>
                        )}

                        {/* Carrusel trabajos menores destacados */}
                        {tab === 'trabajos' && (
                            trabajosDestacados.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-none md:rounded border-2 border-dashed border-outline-variant/30 py-20 text-outline-variant">
                                    <IconWrench />
                                    <p className="mt-3 text-base font-medium font-sans">No hay trabajos menores destacados aún</p>
                                </div>
                            ) : (
                                <InfraCarrusel
                                    items={trabajosDestacados}
                                    featuredKey="destacado"
                                />
                            )
                        )}
                        {tab === 'trabajos' && (
                            <div className="mt-8 flex justify-center">
                                <Link
                                    href="/areas/infraestructura/trabajos"
                                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-brand-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-brand-blue-800 transition-all duration-200 shadow-sm"
                                >
                                    <IconWrench />
                                    Ver todos los trabajos menores
                                    <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">{trabajosMenores.length}</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* ══════ DOCUMENTOS PDF ══════ */}
                {documentos.length > 0 && (
                    <section className="py-16 sm:py-20 bg-surface-container-low">
                        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                            <div className="max-w-xl mb-10">
                                <p className="font-serif text-xs font-bold text-blue-600 tracking-[0.2em] uppercase mb-4">Documentación</p>
                                <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold md:font-medium tracking-tight mb-3 md:mb-4">
                                    Documentos y publicaciones
                                </h2>
                                <p className="mt-4 text-secondary text-base font-light font-sans leading-relaxed">
                                    Informes, actas y publicaciones oficiales del área de Infraestructura.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {documentos.map((doc) => (
                                    <div key={doc.id} className="group flex flex-col rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest transition-all duration-200 overflow-hidden hover:bg-surface-container-low">
                                        {/* Miniatura iframe */}
                                        <div className="relative bg-surface-container-high border-b border-outline-variant/20 overflow-hidden" style={{ height: '200px' }}>
                                            {doc.pdf_url ? (
                                                <iframe
                                                    src={`${doc.pdf_url}#toolbar=0&navpanes=0&scrollbar=0`}
                                                    title={doc.titulo}
                                                    className="w-full h-full border-0 pointer-events-none"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-outline-variant">
                                                    <IconPdf />
                                                </div>
                                            )}
                                            {(doc.mes || doc.anio) && (
                                                <span className="absolute top-2 right-2 rounded bg-white/90 border border-outline-variant/20 px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider text-secondary">
                                                    {doc.mes ? `${MESES[doc.mes - 1]} ` : ''}{doc.anio ?? ''}
                                                </span>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex flex-col flex-1 p-4">
                                            <div className="flex items-start gap-2 mb-1">
                                                <span className="text-blue-600 shrink-0 mt-0.5"><IconPdf /></span>
                                                <h3 className="font-serif font-bold text-primary text-[14px] leading-snug line-clamp-2">{doc.titulo}</h3>
                                            </div>
                                            {doc.descripcion && (
                                                <p className="mt-1 text-xs font-sans text-secondary line-clamp-2 leading-relaxed">{doc.descripcion}</p>
                                            )}
                                            <div className="mt-auto flex items-center gap-2 pt-3 border-t border-outline-variant/20 mt-4">
                                                {doc.pdf_url && (
                                                    <>
                                                        <button
                                                            onClick={() => { setPreviewUrl(doc.pdf_url); setPreviewTitulo(doc.titulo); }}
                                                            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-brand-blue-700 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-blue-800 transition-colors"
                                                        >
                                                            Ver PDF
                                                        </button>
                                                        <a
                                                            href={doc.pdf_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-500 hover:border-brand-blue-300 hover:text-brand-blue-600 transition-colors"
                                                            title="Abrir en nueva pestaña"
                                                        >
                                                            <IconExternalLink />
                                                        </a>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Visor PDF modal */}
                {previewUrl && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setPreviewUrl(null)}>
                        <div className="relative flex w-full max-w-5xl flex-col rounded-none md:rounded bg-surface-container-lowest shadow-2xl overflow-hidden" style={{ height: '90vh' }} onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between border-b border-outline-variant/20 px-6 py-4 shrink-0">
                                <h2 className="text-sm font-semibold text-primary truncate pr-4">{previewTitulo}</h2>
                                <button onClick={() => setPreviewUrl(null)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <iframe src={previewUrl} title={previewTitulo} className="h-full w-full border-0" />
                            </div>
                            <div className="flex justify-end border-t px-6 py-3 shrink-0">
                                <a href={previewUrl} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                    <IconExternalLink /> Abrir en nueva pestaña
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* ══════ CONTACTO ══════ */}
                <section className="relative">
                    <div className="bg-surface-container-low">
                        <svg viewBox="0 0 1440 56" className="w-full block text-primary" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                    <div className="bg-primary relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: CROSS_PATTERN_BG }} />

                        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">

                            {/* Encabezado centrado */}
                            <div className="text-center mb-12">
                                <p className="font-serif text-xs font-bold text-blue-400 tracking-[0.2em] uppercase mb-4">¿Tenés una consulta?</p>
                                <h2 className="font-serif text-3xl md:text-5xl text-white font-bold md:font-medium tracking-tight mb-6">
                                    Contactate con Infraestructura
                                </h2>
                                <p className="mt-5 text-white/80 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                                    Para reportar problemas en establecimientos escolares o consultar sobre obras en curso, no dudes en comunicarte con nosotros.
                                </p>
                            </div>

                            {/* Cards de contacto */}
                            {correos.length > 0 && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                                    {correos.map((c) => {
                                        const waNumber = c.telefono?.replace(/[^\d+]/g, '');
                                        const isPhoneOnly = c.telefono && !c.correo;
                                        const iconBg = c.es_whatsapp
                                            ? 'bg-green-400/20 text-green-300 group-hover:bg-green-400/30'
                                            : isPhoneOnly
                                            ? 'bg-sky-400/20 text-sky-300 group-hover:bg-sky-400/30'
                                            : 'bg-brand-gold-400/20 text-brand-gold-300 group-hover:bg-brand-gold-400/30';

                                        const CardIcon = c.es_whatsapp ? IconWhatsApp : isPhoneOnly ? IconPhone : IconMail;

                                        return (
                                            <div
                                                key={c.id}
                                                className="group flex items-start gap-4 rounded-none md:rounded border border-white/10 bg-white/[0.07] backdrop-blur-sm p-6 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-200 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)]"
                                            >
                                                <div className={`w-12 h-12 rounded-none md:rounded flex items-center justify-center shrink-0 transition-colors ${iconBg}`}>
                                                    <CardIcon />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    {c.descripcion && (
                                                        <p className="text-xs font-semibold text-brand-gold-400 uppercase tracking-wider mb-1.5">
                                                            {c.descripcion}
                                                        </p>
                                                    )}

                                                    {/* Correo */}
                                                    {c.correo && (
                                                        <a href={`mailto:${c.correo}`} className="group/link">
                                                            <span className="font-semibold text-white text-sm break-all group-hover/link:text-brand-gold-300 transition-colors">
                                                                {c.correo}
                                                            </span>
                                                        </a>
                                                    )}

                                                    {/* Teléfono / WhatsApp */}
                                                    {c.telefono && (
                                                        <a
                                                            href={c.es_whatsapp ? `https://wa.me/${waNumber}` : `tel:${c.telefono}`}
                                                            target={c.es_whatsapp ? '_blank' : undefined}
                                                            rel={c.es_whatsapp ? 'noopener noreferrer' : undefined}
                                                            className={`flex items-center gap-1.5 group/link ${c.correo ? 'mt-1.5' : ''}`}
                                                        >
                                                            <span className={`font-semibold text-sm break-all transition-colors ${
                                                                c.es_whatsapp
                                                                    ? 'text-green-300 group-hover/link:text-green-200'
                                                                    : 'text-white group-hover/link:text-brand-gold-300'
                                                            }`}>
                                                                {c.telefono}
                                                            </span>
                                                            {c.es_whatsapp && (
                                                                <span className="shrink-0 rounded-full bg-green-400/20 px-2 py-0.5 text-[10px] font-semibold text-green-300">
                                                                    WhatsApp
                                                                </span>
                                                            )}
                                                        </a>
                                                    )}

                                                    <p className="text-xs text-brand-blue-300/70 mt-1.5">
                                                        {c.es_whatsapp
                                                            ? 'Hacer clic para abrir WhatsApp'
                                                            : c.telefono && !c.correo
                                                            ? 'Hacer clic para llamar'
                                                            : 'Hacer clic para enviar un correo'}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
                                <Link
                                    href="/contacto"
                                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-blue-600 text-white font-sans text-sm font-bold uppercase tracking-wide rounded hover:bg-blue-700 transition-all duration-300 shadow-md active:scale-95"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                    Ir a Contacto
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-outline-variant/40 bg-white/[0.05] text-white font-sans text-sm font-medium uppercase tracking-wide rounded hover:bg-white/10 transition-all duration-300 active:scale-95"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    Volver al inicio
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary">
                        <svg viewBox="0 0 1440 56" className="w-full block text-surface-container-lowest" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ FOOTER ══════ */}
                <Footer />

            </div>
        </>
    );
}

