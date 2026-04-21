import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import PublicNavbar from '@/Components/PublicNavbar';
import Footer from '@/Components/Welcome/Footer';

const MESES_LABELS = {
    1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
    5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto',
    9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre',
};

const IconStar = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);
const IconFilter = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
    </svg>
);
const IconTool = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
);

// ─── Card ─────────────────────────────────────────────────────────────────────
function TrabajoCard({ item }) {
    const principal = item.medio_principal;

    return (
        <Link
            href={`/areas/descentralizados/trabajos/${item.id}`}
            className="group overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-200 flex flex-col"
        >
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
                        <IconTool />
                    </div>
                )}
                {item.destacado && (
                    <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-cyan-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                        <IconStar /> Destacado
                    </span>
                )}
            </div>

            <div className="flex flex-col flex-1 p-5">
                {(item.anio || item.mes) && (
                    <p className="text-xs text-cyan-600 font-medium mb-1.5">
                        {item.mes ? MESES_LABELS[item.mes] : ''}
                        {item.mes && item.anio ? ' ' : ''}
                        {item.anio ?? ''}
                    </p>
                )}
                <h3 className="font-bold text-gray-900 text-[15px] leading-snug line-clamp-2 mb-2">
                    {item.titulo}
                </h3>
                {item.descripcion && (
                    <div
                        className="text-sm text-gray-500 line-clamp-3 leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.descripcion }}
                    />
                )}
                <p className="mt-auto pt-3 text-xs font-medium text-cyan-600 group-hover:text-cyan-800 transition-colors">
                    Ver más →
                </p>
            </div>
        </Link>
    );
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function DescentralizadosLista({ trabajos = [] }) {
    const [anioFiltro, setAnioFiltro]         = useState('');
    const [mesFiltro, setMesFiltro]           = useState('');
    const [soloDestacados, setSoloDestacados] = useState(false);

    const anios = useMemo(
        () => [...new Set(trabajos.filter(i => i.anio).map(i => i.anio))].sort((a, b) => b - a),
        [trabajos],
    );

    const mesesDisponibles = useMemo(() => {
        const base = anioFiltro
            ? trabajos.filter(i => String(i.anio) === String(anioFiltro))
            : trabajos;
        return [...new Set(base.filter(i => i.mes).map(i => i.mes))].sort((a, b) => a - b);
    }, [trabajos, anioFiltro]);

    const handleAnioChange = (val) => { setAnioFiltro(val); setMesFiltro(''); };

    const filtrados = useMemo(
        () => trabajos.filter(i => {
            if (soloDestacados && !i.destacado)                              return false;
            if (anioFiltro && String(i.anio) !== String(anioFiltro))        return false;
            if (mesFiltro  && String(i.mes)  !== String(mesFiltro))         return false;
            return true;
        }),
        [trabajos, anioFiltro, mesFiltro, soloDestacados],
    );

    const hayFiltros = anioFiltro || mesFiltro || soloDestacados;
    const limpiar    = () => { setAnioFiltro(''); setMesFiltro(''); setSoloDestacados(false); };

    return (
        <>
            <Head title="Trabajos – Descentralizados – Consejo Escolar de Merlo" />

            <div className="bg-white text-gray-800 font-sans antialiased min-h-screen flex flex-col">

                <PublicNavbar transparent />

                {/* Hero */}
                <section className="relative min-h-[300px] sm:min-h-[320px] flex flex-col overflow-hidden">
                    <div className="flex-1 relative" style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #0D9488 100%)' }}>
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                        <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] rounded-full bg-cyan-400/10 blur-3xl" />

                        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-12">
                            <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
                                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                                <span>/</span>
                                <Link href="/areas/descentralizados" className="hover:text-white transition-colors">Descentralizados</Link>
                                <span>/</span>
                                <span className="text-white font-medium">Trabajos</span>
                            </nav>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                                Trabajos<span className="text-cyan-400">.</span>
                            </h1>
                            <div className="mt-4 w-16 h-1 bg-cyan-400 rounded-full" />
                            <p className="mt-4 text-base sm:text-lg text-white/80 font-light">
                                {trabajos.length} {trabajos.length === 1 ? 'trabajo registrado' : 'trabajos registrados'} · del más reciente al más antiguo
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0" style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #0D9488 100%)' }}>
                        <svg viewBox="0 0 1440 56" className="w-full block text-white" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* Filtros y listado */}
                <section className="py-12 sm:py-16 flex-grow">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        {/* Barra de filtros */}
                        <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
                                <IconFilter /> Filtrar:
                            </span>

                            {/* Solo destacados */}
                            <button
                                onClick={() => setSoloDestacados(!soloDestacados)}
                                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                                    soloDestacados
                                        ? 'bg-cyan-600 border-cyan-600 text-white'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                            >
                                <IconStar />
                                Destacados
                            </button>

                            {/* Año */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="filtro-anio" className="text-sm text-gray-500">Año</label>
                                <select
                                    id="filtro-anio"
                                    value={anioFiltro}
                                    onChange={e => handleAnioChange(e.target.value)}
                                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                                >
                                    <option value="">Todos</option>
                                    {anios.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>
                            </div>

                            {/* Mes */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="filtro-mes" className="text-sm text-gray-500">Mes</label>
                                <select
                                    id="filtro-mes"
                                    value={mesFiltro}
                                    onChange={e => setMesFiltro(e.target.value)}
                                    disabled={mesesDisponibles.length === 0}
                                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <option value="">Todos</option>
                                    {mesesDisponibles.map(m => <option key={m} value={m}>{MESES_LABELS[m]}</option>)}
                                </select>
                            </div>

                            {hayFiltros && (
                                <button
                                    onClick={limpiar}
                                    className="flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-800 font-medium transition-colors"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Limpiar
                                </button>
                            )}

                            <span className="ml-auto text-sm text-gray-400">
                                {filtrados.length} {filtrados.length === 1 ? 'trabajo' : 'trabajos'}
                                {hayFiltros ? ' encontrados' : ''}
                            </span>
                        </div>

                        {/* Grid */}
                        {filtrados.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-20 text-gray-400">
                                <IconTool />
                                <p className="mt-3 text-base font-medium">No hay trabajos con los filtros seleccionados</p>
                                {hayFiltros && (
                                    <button onClick={limpiar} className="mt-4 text-sm text-cyan-600 hover:text-cyan-800 font-medium transition-colors">
                                        Limpiar filtros
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {filtrados.map(item => (
                                    <TrabajoCard key={item.id} item={item} />
                                ))}
                            </div>
                        )}

                        {/* Volver */}
                        <div className="mt-12 flex justify-center">
                            <Link
                                href="/areas/descentralizados"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Volver a Descentralizados
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
