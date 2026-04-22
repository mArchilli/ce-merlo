import { Head, Link } from '@inertiajs/react';
import { useState, useRef } from 'react';
import PublicNavbar from '@/Components/PublicNavbar';
import Footer from '@/Components/Welcome/Footer';

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

// ─── Iconos de servicio ───────────────────────────────────────────────────────
const IconSpray = () => (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.75H6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 006 21.75h12a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25h-3.75M9.75 3.75V2.25m0 1.5v1.5m4.5-1.5V2.25m0 1.5v1.5M9.75 12l2.25 2.25 4.5-4.5" />
    </svg>
);
const IconShield = () => (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
);
const IconDroplet = () => (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 010-18c0 4.5 4.5 9 0 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c0 4.5-4.5 9 0 18" />
    </svg>
);
const IconPump = () => (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M10 3v18M14 3v18" />
    </svg>
);
const IconTank = () => (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a1 1 0 00-1 1v8a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM12 7V5a2 2 0 00-2-2H10a2 2 0 00-2 2v2" />
    </svg>
);
const IconStar = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const PAGE_COLOR   = '#0D9488';
const PAGE_COLOR_2 = '#0F766E';

const MESES = {
    1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
    5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto',
    9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre',
};

const SERVICIOS = [
    {
        icon: <IconSpray />,
        titulo: 'Fumigación',
        desc: 'Control preventivo y de emergencia de plagas, insectos y vectores en los establecimientos educativos del distrito.',
    },
    {
        icon: <IconShield />,
        titulo: 'Análisis de agua',
        desc: 'Extracción y análisis de muestras de agua potable en los establecimientos educativos para verificar su calidad y aptitud para el consumo.',
    },
    {
        icon: <IconDroplet />,
        titulo: 'Solicitud de Bidones de Agua',
        desc: 'Provisión y recambio de bidones de agua potable ante cortes del servicio o necesidades puntuales de los establecimientos.',
    },
    {
        icon: <IconPump />,
        titulo: 'Desagote de Pozo',
        desc: 'Vaciado de pozos absorbentes y cámaras sépticas mediante camión atmosférico para prevenir desbordes y regularizar el sistema cloacal.',
    },
    {
        icon: <IconTank />,
        titulo: 'Limpieza de Tanque',
        desc: 'Vaciado, cepillado, lavado y desinfección con hipoclorito de los tanques de reserva de agua potable de cada establecimiento.',
    },
];

// ─── Tarjeta de trabajo ───────────────────────────────────────────────────────
function TrabajoCard({ item }) {
    const fecha     = [MESES[item.mes], item.anio].filter(Boolean).join(' ');
    const principal = item.medio_principal;

    return (
        <div className="group overflow-hidden rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-0 md:hover:bg-surface-container-low flex flex-col h-full">
            <div className="relative h-48 bg-surface-container-high overflow-hidden border-b border-outline-variant/20">
                {principal ? (
                    principal.tipo === 'imagen' ? (
                        <img src={principal.url} alt={item.titulo} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                        <video src={principal.url} className="h-full w-full object-cover" muted />
                    )
                ) : (
                    <div className="flex h-full items-center justify-center text-outline-variant/50">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                <span className="absolute top-3 left-3 flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-sans font-bold uppercase tracking-wider text-white shadow-sm bg-cyan-600">
                    <IconStar /> Destacado
                </span>
                {fecha && (
                    <span className="absolute top-3 right-3 rounded bg-white/90 border border-outline-variant/20 px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider text-secondary shadow-sm">
                        {fecha}
                    </span>
                )}
            </div>
            <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif font-bold text-primary text-[15px] leading-snug line-clamp-2">{item.titulo}</h3>
                {item.descripcion && (
                    <div
                        className="mt-3 prose prose-sm max-w-none text-secondary font-sans text-xs leading-relaxed line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: item.descripcion }}
                    />
                )}
            </div>
        </div>
    );
}

// ─── Carrusel de destacados ───────────────────────────────────────────────────
function DestacadosCarrusel({ destacados }) {
    const [idx, setIdx] = useState(0);
    const scrollRef = useRef(null);
    const total      = destacados.length;
    const showArrows = total > 3;

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

    const desktopCards = [0, 1, 2].map((offset) => destacados[(idx + offset) % total]);

    return (
        <section className="py-16 sm:py-20 bg-surface-container-low">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                <div className="max-w-xl mb-10">
                    <p className="font-serif text-xs font-bold text-cyan-600 tracking-[0.2em] uppercase mb-4">Historial de trabajos</p>
                    <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold md:font-medium tracking-tight mb-3 md:mb-4">
                        Trabajos destacados
                    </h2>
                    <p className="mt-4 text-secondary text-base font-light font-sans leading-relaxed">
                        Registro de los trabajos de fumigación, análisis de agua, provisión de agua y saneamiento realizados en los establecimientos del distrito.
                    </p>
                </div>

                {/* Desktop: 3 cards */}
                <div className="hidden md:grid grid-cols-3 gap-6">
                    {desktopCards.map((item, i) => (
                        <TrabajoCard key={`${item.id}-${i}`} item={item} />
                    ))}
                </div>

                {/* Mobile – scroll-snap con peek de cards adyacentes */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-3 -mx-6 px-[8%] pb-1 overscroll-x-contain"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {destacados.map((item) => (
                        <div key={item.id} className="snap-center shrink-0 w-[84%]">
                            <TrabajoCard item={item} />
                        </div>
                    ))}
                </div>

                {/* Navegación desktop */}
                {showArrows && (
                    <div className="hidden md:flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => setIdx((i) => (i - 1 + total) % total)}
                            aria-label="Anterior"
                            className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all duration-200 shadow-sm"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <div className="flex items-center gap-1.5">
                            {destacados.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIdx(i)}
                                    aria-label={`Ir al trabajo ${i + 1}`}
                                    className={`h-2 rounded-full transition-all duration-200 ${i === idx ? 'bg-cyan-600 w-4' : 'bg-outline-variant/40 w-2 hover:bg-outline-variant'}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => setIdx((i) => (i + 1) % total)}
                            aria-label="Siguiente"
                            className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all duration-200 shadow-sm"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                )}

                {/* Navegación mobile */}
                {total > 1 && (
                    <div className="flex md:hidden items-center justify-center gap-3 mt-5">
                        <button
                            onClick={() => scrollToIdx(idx - 1)}
                            disabled={idx === 0}
                            aria-label="Anterior"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-600/10 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <div className="flex gap-1.5">
                            {destacados.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToIdx(i)}
                                    aria-label={`Ir al trabajo ${i + 1}`}
                                    className={`rounded-full transition-all duration-200 ${i === idx ? 'w-5 h-2 bg-cyan-600' : 'w-2 h-2 bg-cyan-200 hover:bg-cyan-400'}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => scrollToIdx(idx + 1)}
                            disabled={idx === total - 1}
                            aria-label="Siguiente"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-600/10 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                )}

                {/* CTA */}
                <div className="flex justify-center mt-10">
                    <Link
                        href="/areas/descentralizados/trabajos"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-cyan-600 text-white font-sans text-sm uppercase tracking-wide font-semibold rounded hover:bg-cyan-700 transition-all duration-300 shadow-md active:scale-[0.98]"
                    >
                        Ver todos los trabajos
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function Descentralizados({ destacados = [], correos }) {
    return (
        <>
            <Head title="Descentralizados – Consejo Escolar de Merlo" />

            <div className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col">

                {/* ══════ HEADER ══════ */}
                <PublicNavbar transparent />

                {/* ══════ HERO ══════ */}
                <section className="relative min-h-[380px] sm:min-h-[420px] flex flex-col overflow-hidden bg-primary">
                    <div className="flex-1 relative">
                        {/* Patrón sutil */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />
                        {/* Círculos decorativos */}
                        <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] rounded-full bg-cyan-600/20 blur-3xl" />
                        <div className="absolute -right-20 -bottom-20 w-[280px] h-[280px] rounded-full bg-cyan-500/10 blur-3xl" />

                        <div className="relative flex items-center h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 rounded-none md:rounded bg-white/[0.08] backdrop-blur-sm text-cyan-300 text-sm font-medium tracking-wide uppercase border border-white/[0.08]">
                                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                                    Consejo Escolar de Merlo
                                </div>
                                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight">
                                    Descentralizados
                                    <span className="text-cyan-500">.</span>
                                </h1>
                                <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl font-light font-sans">
                                    Área del Consejo Escolar de Merlo encargada de la higiene, salubridad y mantenimiento preventivo de los establecimientos educativos del distrito.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Onda inferior */}
                    <div className="bg-primary">
                        <svg viewBox="0 0 1440 56" className="w-full block text-surface-container-lowest" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ QUÉ HACEMOS ══════ */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="max-w-xl mb-14">
                            <p className="font-serif text-xs font-bold text-cyan-600 tracking-[0.2em] uppercase mb-4">Sobre el área</p>
                            <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold md:font-medium tracking-tight mb-3 md:mb-4">
                                ¿Qué hace el área de Descentralizados?
                            </h2>
                            <p className="mt-4 text-secondary text-base font-light font-sans leading-relaxed">
                                El área de Descentralizados del Consejo Escolar de Merlo gestiona los servicios de higiene y mantenimiento sanitario en todos los establecimientos educativos del distrito, asegurando condiciones adecuadas de salubridad para alumnos, docentes y personal.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                            {SERVICIOS.map((s) => (
                                <div
                                    key={s.titulo}
                                    className="group flex flex-col gap-4 rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest p-6 hover:bg-surface-container-low hover:border-outline-variant/60 transition-all duration-200"
                                >
                                    <div className="w-12 h-12 rounded-none md:rounded bg-cyan-600/10 text-cyan-600 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                                        {s.icon}
                                    </div>
                                    <div>
                                        <p className="font-serif font-bold text-primary text-[15px] mb-2">{s.titulo}</p>
                                        <p className="font-sans text-secondary text-sm leading-relaxed">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════ TRABAJOS DESTACADOS (CARRUSEL) ══════ */}
                {destacados.length > 0 && (
                    <DestacadosCarrusel destacados={destacados} />
                )}

                {/* ══════ CONTACTO ══════ */}
                <section className="relative">
                    <div className={destacados.length > 0 ? 'bg-surface-container-low' : 'bg-surface'}>
                        <svg viewBox="0 0 1440 56" className="w-full block text-primary" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                    <div className="bg-primary relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

                        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">

                            <div className="text-center mb-12">
                                <p className="font-serif text-xs font-bold text-cyan-400 tracking-[0.2em] uppercase mb-4">¿Necesitás solicitar un servicio?</p>
                                <h2 className="font-serif text-3xl md:text-5xl text-white font-bold md:font-medium tracking-tight mb-6">
                                    Contactate con Descentralizados
                                </h2>
                                <p className="mt-5 text-white/80 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                                    Para solicitar fumigación, análisis de agua, provisión de bidones, desagote de pozo o limpieza de tanque en tu establecimiento, comunicate con nuestra área.
                                </p>
                            </div>

                            {correos.length > 0 && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                                    {correos.map((c) => {
                                        const waNumber    = c.telefono?.replace(/[^\d+]/g, '');
                                        const isPhoneOnly = c.telefono && !c.correo;
                                        const iconBg      = c.es_whatsapp
                                            ? 'bg-green-400/20 text-green-300 group-hover:bg-green-400/30'
                                            : isPhoneOnly
                                            ? 'bg-sky-400/20 text-sky-300 group-hover:bg-sky-400/30'
                                            : 'bg-cyan-400/20 text-cyan-300 group-hover:bg-cyan-400/30';
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
                                                        <p className="text-xs font-semibold uppercase tracking-wider mb-1.5 text-cyan-400">
                                                            {c.descripcion}
                                                        </p>
                                                    )}

                                                    {c.correo && (
                                                        <a href={`mailto:${c.correo}`} className="group/link">
                                                            <span className="font-semibold text-white text-sm break-all group-hover/link:text-cyan-300 transition-colors">
                                                                {c.correo}
                                                            </span>
                                                        </a>
                                                    )}

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
                                                                    : 'text-white group-hover/link:text-cyan-300'
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
                                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-cyan-600 text-white font-sans text-sm font-bold uppercase tracking-wide rounded hover:bg-cyan-700 transition-all duration-300 shadow-md active:scale-95"
                                >
                                    <IconMail />
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
                    <div className="bg-primary relative z-10 -mb-px">
                        <svg viewBox="0 0 1440 56" className="w-full block text-surface translate-y-[1px] scale-y-[1.02] origin-bottom" preserveAspectRatio="none">
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

