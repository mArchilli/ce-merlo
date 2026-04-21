import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import PublicNavbar from '@/Components/PublicNavbar';
import Footer from '@/Components/Welcome/Footer';

const MESES_LABELS = {
    1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
    5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto',
    9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre',
};
const MESES_CORTOS = {
    1: 'ene', 2: 'feb', 3: 'mar', 4: 'abr',
    5: 'may', 6: 'jun', 7: 'jul', 8: 'ago',
    9: 'sep', 10: 'oct', 11: 'nov', 12: 'dic',
};

// ─── Iconos ───────────────────────────────────────────────────────────────────
const IconNewspaper = () => (
    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>
        article
    </span>
);
const IconFilter = () => (
    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
        filter_list
    </span>
);

// ─── Card de novedad ──────────────────────────────────────────────────────────
function NovedadCard({ novedad }) {
    const tieneMedia = novedad.medio_principal;

    let dateStr = '';
    if (novedad.dia || novedad.mes || novedad.anio) {
        const d = String(novedad.dia || '').padStart(2, '0');
        const m = MESES_CORTOS[novedad.mes] || '';
        const y = novedad.anio || '';
        dateStr = `${d} ${m} ${y}`.trim();
    }

    return (
        <Link href={`/novedades/${novedad.id}`} className="block h-full">
            <article className="bg-surface-container-lowest rounded md:rounded-DEFAULT border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-0 md:hover:bg-surface-container-low h-full">
                {/* Imagen / placeholder */}
                <div className="h-48 md:aspect-video w-full relative bg-surface-container-high overflow-hidden shrink-0">
                    {tieneMedia ? (
                        tieneMedia.tipo === 'imagen' ? (
                            <img
                                src={tieneMedia.url}
                                alt={novedad.titulo}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <video src={tieneMedia.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" muted loop />
                        )
                    ) : (
                        <div className="flex h-full items-center justify-center text-outline-variant group-hover:scale-105 transition-transform duration-500">
                            <IconNewspaper />
                        </div>
                    )}
                </div>

                {/* Contenido */}
                <div className="p-6 flex-grow flex flex-col">
                    {dateStr && (
                        <div className="font-sans text-xs uppercase tracking-[0.05em] text-secondary mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>calendar_today</span>
                            <span>{dateStr}</span>
                        </div>
                    )}

                    <h3 className="font-serif text-xl font-bold md:font-medium text-primary leading-snug mb-4 group-hover:text-tertiary md:group-hover:text-primary-container transition-colors">
                        {novedad.titulo}
                    </h3>

                    {novedad.descripcion && (
                        <div
                            className="font-sans text-sm text-on-surface-variant line-clamp-3 leading-relaxed prose prose-sm max-w-none mb-4"
                            dangerouslySetInnerHTML={{ __html: novedad.descripcion }}
                        />
                    )}

                    <div className="mt-auto flex items-center justify-between">
                        <span className="inline-flex items-center text-sm font-sans font-medium text-tertiary group-hover:text-primary transition-colors">
                            Leer más <span className="material-symbols-outlined ml-1 text-[18px]">arrow_forward</span>
                        </span>
                        {novedad.destacada && (
                            <div className="bg-tertiary/10 text-tertiary border border-tertiary/20 px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-sans font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                DESTACADA
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}

// ─── Página pública ───────────────────────────────────────────────────────────
export default function Novedades({ novedades = [] }) {
    const [anioFiltro, setAnioFiltro] = useState('');
    const [mesFiltro, setMesFiltro]   = useState('');
    const [soloDestacadas, setSoloDestacadas] = useState(false);

    const anios = useMemo(
        () => [...new Set(novedades.filter(n => n.anio).map(n => n.anio))].sort((a, b) => b - a),
        [novedades],
    );

    const mesesDisponibles = useMemo(() => {
        const base = anioFiltro
            ? novedades.filter(n => String(n.anio) === String(anioFiltro))
            : novedades;
        return [...new Set(base.filter(n => n.mes).map(n => n.mes))].sort((a, b) => a - b);
    }, [novedades, anioFiltro]);

    const handleAnioChange = (val) => {
        setAnioFiltro(val);
        setMesFiltro('');
    };

    const filtradas = useMemo(() => novedades.filter(n => {
        if (soloDestacadas && !n.destacada) return false;
        if (anioFiltro && String(n.anio) !== String(anioFiltro)) return false;
        if (mesFiltro  && String(n.mes)  !== String(mesFiltro))  return false;
        return true;
    }), [novedades, anioFiltro, mesFiltro, soloDestacadas]);

    const hayFiltros = anioFiltro || mesFiltro || soloDestacadas;
    const limpiar    = () => { setAnioFiltro(''); setMesFiltro(''); setSoloDestacadas(false); };

    return (
        <>
            <Head title="Novedades – Consejo Escolar de Merlo" />

            <div className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col">

                {/* ══════ NAVBAR ══════ */}
                <PublicNavbar transparent />

                {/* ══════ HERO ══════ */}
                <section className="relative min-h-[300px] sm:min-h-[320px] flex flex-col overflow-hidden bg-primary">
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                        <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] rounded-full bg-primary-container/20 blur-3xl" />
                        <div className="absolute -right-20 -bottom-20 w-[280px] h-[280px] rounded-full bg-tertiary/10 blur-3xl" />

                        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-12">
                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 rounded-full bg-white/[0.08] backdrop-blur-sm text-tertiary-fixed-dim text-sm font-medium tracking-wide uppercase border border-white/[0.08]">
                                <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse" />
                                Consejo Escolar de Merlo
                            </div>

                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                                Novedades<span className="text-tertiary">.</span>
                            </h1>
                            <div className="mt-6 w-24 h-1 bg-tertiary" />
                            <p className="mt-6 text-base sm:text-lg text-white/80 font-light font-sans max-w-2xl">
                                Últimas noticias y novedades del Consejo Escolar de Merlo. Explorá todas nuestras publicaciones ({novedades.length} en total).
                            </p>
                        </div>
                    </div>
                    {/* SVG Transition to Surface */}
                    <div className="shrink-0 bg-primary">
                        <svg viewBox="0 0 1440 56" className="w-full block text-surface" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ FILTROS Y LISTADO ══════ */}
                <section className="py-12 sm:py-16 flex-grow">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        {/* Barra de filtros */}
                        <div className="flex flex-wrap items-center gap-4 mb-10 pb-6 border-b border-outline-variant/20">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-secondary font-sans uppercase tracking-wider">
                                <IconFilter /> Filtrar
                            </span>

                            {/* Solo destacadas */}
                            <button
                                onClick={() => setSoloDestacadas(!soloDestacadas)}
                                className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded border font-sans font-medium transition-colors ${
                                    soloDestacadas
                                        ? 'bg-tertiary-container border-tertiary text-on-tertiary-container'
                                        : 'bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-outline-variant/60 hover:bg-surface-container-low'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: soloDestacadas ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                                Destacadas
                            </button>

                            {/* Filtro año */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="filtro-anio" className="text-sm font-sans font-medium text-on-surface-variant">Año</label>
                                <select
                                    id="filtro-anio"
                                    value={anioFiltro}
                                    onChange={e => handleAnioChange(e.target.value)}
                                    className="text-sm font-sans border border-outline-variant/30 rounded px-3 py-2 bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                                >
                                    <option value="">Todos</option>
                                    {anios.map(a => (
                                        <option key={a} value={a}>{a}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filtro mes */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="filtro-mes" className="text-sm font-sans font-medium text-on-surface-variant">Mes</label>
                                <select
                                    id="filtro-mes"
                                    value={mesFiltro}
                                    onChange={e => setMesFiltro(e.target.value)}
                                    disabled={mesesDisponibles.length === 0}
                                    className="text-sm font-sans border border-outline-variant/30 rounded px-3 py-2 bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <option value="">Todos</option>
                                    {mesesDisponibles.map(m => (
                                        <option key={m} value={m}>{MESES_LABELS[m]}</option>
                                    ))}
                                </select>
                            </div>

                            {hayFiltros && (
                                <button
                                    onClick={limpiar}
                                    className="flex items-center gap-1 text-sm font-sans text-secondary hover:text-primary font-medium transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>close</span>
                                    Limpiar
                                </button>
                            )}

                            <span className="ml-auto text-sm font-sans text-secondary-fixed-dim bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-medium">
                                {filtradas.length} {filtradas.length === 1 ? 'novedad' : 'novedades'}
                            </span>
                        </div>

                        {/* Grid */}
                        {filtradas.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded border-2 border-dashed border-outline-variant/30 bg-surface-container-lowest py-24 text-outline">
                                <IconNewspaper />
                                <p className="mt-4 text-base font-sans font-medium text-on-surface-variant">No hay novedades con los filtros seleccionados</p>
                                {hayFiltros && (
                                    <button
                                        onClick={limpiar}
                                        className="mt-6 text-sm px-6 py-2 bg-primary text-on-primary rounded hover:bg-primary-container hover:text-on-primary-container font-sans font-medium transition-colors shadow-sm"
                                    >
                                        Limpiar filtros
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {filtradas.map(n => (
                                    <NovedadCard key={n.id} novedad={n} />
                                ))}
                            </div>
                        )}

                        {/* Volver */}
                        <div className="mt-16 flex justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-outline-variant/40 bg-surface-container-lowest rounded text-sm font-sans font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all duration-300 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ══════ FOOTER ══════ */}
                <Footer />

            </div>
        </>
    );
}

