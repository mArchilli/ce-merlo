import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import PublicNavbar from '@/Components/PublicNavbar';
import PublicFooter from '@/Components/PublicFooter';

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
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    </svg>
);
const IconStar = () => (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);
const IconFilter = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
    </svg>
);

// ─── Card de novedad ──────────────────────────────────────────────────────────
function NovedadCard({ novedad }) {
    const tieneMedia = novedad.medio_principal;

    return (
        <article className="group flex flex-col rounded-2xl bg-white border border-gray-100 hover:border-brand-blue-100 hover:shadow-lg transition-all duration-200 overflow-hidden">
            {/* Imagen */}
            <div className="relative h-44 bg-gray-50 overflow-hidden shrink-0">
                {tieneMedia ? (
                    tieneMedia.tipo === 'imagen' ? (
                        <img
                            src={tieneMedia.url}
                            alt={novedad.titulo}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <video src={tieneMedia.url} className="h-full w-full object-cover" muted />
                    )
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-200">
                        <IconNewspaper />
                    </div>
                )}
                {novedad.destacada && (
                    <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-brand-gold-400 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                        <IconStar /> Destacada
                    </span>
                )}
                {(novedad.dia || novedad.mes || novedad.anio) && (
                    <span className="absolute top-3 right-3 flex flex-col items-center rounded-xl bg-brand-blue-800/90 backdrop-blur-sm px-3 py-1.5 text-white shadow-sm min-w-[44px]">
                        {novedad.dia && (
                            <span className="text-base font-bold leading-none">{String(novedad.dia).padStart(2, '0')}</span>
                        )}
                        {novedad.mes && (
                            <span className="text-[10px] uppercase tracking-wider font-medium text-brand-blue-200 leading-none mt-0.5">
                                {MESES_CORTOS[novedad.mes]}
                            </span>
                        )}
                        {novedad.anio && (
                            <span className="text-[10px] font-medium text-brand-blue-300/70 leading-none mt-0.5">
                                {novedad.anio}
                            </span>
                        )}
                    </span>
                )}
            </div>

            {/* Contenido */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="font-bold text-gray-900 text-[15px] leading-snug line-clamp-2 mb-2">
                    {novedad.titulo}
                </h3>
                {novedad.descripcion && (
                    <div
                        className="text-sm text-gray-500 line-clamp-4 leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: novedad.descripcion }}
                    />
                )}
            </div>
        </article>
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

            <div className="bg-white text-gray-800 font-sans antialiased">

                {/* ══════ NAVBAR ══════ */}
                <PublicNavbar transparent />

                {/* ══════ HERO ══════ */}
                <section className="relative min-h-[300px] sm:min-h-[320px] flex flex-col overflow-hidden">
                    <div className="flex-1 relative" style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #2A5678 55%, #B45309 100%)' }}>
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                        <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] rounded-full border border-white/[0.04]" />
                        <div className="absolute -right-20 -bottom-20 w-[280px] h-[280px] rounded-full border border-white/[0.06]" />

                        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-12">
                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 rounded-full bg-white/[0.08] backdrop-blur-sm text-brand-blue-100 text-sm font-medium tracking-wide uppercase border border-white/[0.08]">
                                <span className="w-2 h-2 rounded-full bg-brand-gold-400 animate-pulse" />
                                Consejo Escolar de Merlo
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.08] tracking-tight">
                                Novedades<span className="text-brand-gold-400">.</span>
                            </h1>
                            <div className="mt-4 w-16 h-1 bg-brand-gold-400 rounded-full" />
                            <p className="mt-4 text-base sm:text-lg text-brand-blue-200/90 font-light">
                                Últimas noticias y novedades del Consejo Escolar de Merlo · {novedades.length} publicaciones
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0" style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #2A5678 55%, #B45309 100%)' }}>
                        <svg viewBox="0 0 1440 56" className="w-full block text-white" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ FILTROS Y LISTADO ══════ */}
                <section className="py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        {/* Barra de filtros */}
                        <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
                                <IconFilter /> Filtrar:
                            </span>

                            {/* Solo destacadas */}
                            <button
                                onClick={() => setSoloDestacadas(!soloDestacadas)}
                                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                                    soloDestacadas
                                        ? 'bg-brand-gold-50 border-brand-gold-300 text-brand-gold-700'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                            >
                                <IconStar />
                                Destacadas
                            </button>

                            {/* Filtro año */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="filtro-anio" className="text-sm text-gray-500">Año</label>
                                <select
                                    id="filtro-anio"
                                    value={anioFiltro}
                                    onChange={e => handleAnioChange(e.target.value)}
                                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue-300 focus:border-transparent"
                                >
                                    <option value="">Todos</option>
                                    {anios.map(a => (
                                        <option key={a} value={a}>{a}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filtro mes */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="filtro-mes" className="text-sm text-gray-500">Mes</label>
                                <select
                                    id="filtro-mes"
                                    value={mesFiltro}
                                    onChange={e => setMesFiltro(e.target.value)}
                                    disabled={mesesDisponibles.length === 0}
                                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue-300 focus:border-transparent disabled:opacity-40 disabled:cursor-not-allowed"
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
                                    className="flex items-center gap-1 text-sm text-brand-blue-500 hover:text-brand-blue-700 font-medium transition-colors"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Limpiar
                                </button>
                            )}

                            <span className="ml-auto text-sm text-gray-400">
                                {filtradas.length} {filtradas.length === 1 ? 'novedad' : 'novedades'}
                                {hayFiltros ? ' encontradas' : ''}
                            </span>
                        </div>

                        {/* Grid */}
                        {filtradas.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-20 text-gray-400">
                                <IconNewspaper />
                                <p className="mt-3 text-base font-medium">No hay novedades con los filtros seleccionados</p>
                                {hayFiltros && (
                                    <button
                                        onClick={limpiar}
                                        className="mt-4 text-sm text-brand-blue-500 hover:text-brand-blue-700 font-medium transition-colors"
                                    >
                                        Limpiar filtros
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {filtradas.map(n => (
                                    <NovedadCard key={n.id} novedad={n} />
                                ))}
                            </div>
                        )}

                        {/* Volver */}
                        <div className="mt-12 flex justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ══════ FOOTER ══════ */}
                <PublicFooter />

            </div>
        </>
    );
}
