import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import PublicNavbar from '@/Components/PublicNavbar';
import Footer from '@/Components/Welcome/Footer';

const MESES_LABELS = {
    1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
    5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto',
    9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre',
};

// ─── Iconos ───────────────────────────────────────────────────────────────────
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

// ─── Card de obra / trabajo menor ─────────────────────────────────────────────
function ItemCard({ item, featuredKey, href }) {
    const principal = item.medio_principal;
    const Wrapper   = href ? Link : 'div';

    return (
        <Wrapper href={href} className="group overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-brand-blue-100 hover:shadow-lg transition-all duration-200 flex flex-col">
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
                    <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-brand-gold-400 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                        <IconStar /> Destacado
                    </span>
                )}
            </div>

            {/* Contenido */}
            <div className="flex flex-col flex-1 p-5">
                {(item.anio || item.mes) && (
                    <p className="text-xs text-brand-gold-500 font-medium mb-1.5">
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
                {href && (
                    <p className="mt-auto pt-3 text-xs font-medium text-brand-blue-500 group-hover:text-brand-blue-700 transition-colors">
                        Ver detalle →
                    </p>
                )}
            </div>
        </Wrapper>
    );
}

// ─── Página de listado ────────────────────────────────────────────────────────
export default function InfraestructuraLista({ items, tipo }) {
    const [anioFiltro, setAnioFiltro] = useState('');
    const [mesFiltro, setMesFiltro]   = useState('');

    const esObras    = tipo === 'obras';
    const featuredKey = esObras ? 'destacada' : 'destacado';
    const titulo      = esObras ? 'Obras' : 'Trabajos Menores';
    const TitleIcon   = esObras ? IconBuilding : IconWrench;

    const anios = useMemo(
        () => [...new Set(items.filter(i => i.anio).map(i => i.anio))].sort((a, b) => b - a),
        [items],
    );

    const mesesDisponibles = useMemo(() => {
        const base = anioFiltro
            ? items.filter(i => String(i.anio) === String(anioFiltro))
            : items;
        return [...new Set(base.filter(i => i.mes).map(i => i.mes))].sort((a, b) => a - b);
    }, [items, anioFiltro]);

    const handleAnioChange = (val) => {
        setAnioFiltro(val);
        setMesFiltro('');
    };

    const itemsFiltrados = useMemo(
        () => items.filter(i => {
            if (anioFiltro && String(i.anio) !== String(anioFiltro)) return false;
            if (mesFiltro  && String(i.mes)  !== String(mesFiltro))  return false;
            return true;
        }),
        [items, anioFiltro, mesFiltro],
    );

    const hayFiltros = anioFiltro || mesFiltro;
    const nombreItem = (n) => esObras
        ? `${n} obra${n !== 1 ? 's' : ''}`
        : `${n} trabajo${n !== 1 ? 's' : ''}`;

    return (
        <>
            <Head title={`${titulo} – Infraestructura – Consejo Escolar de Merlo`} />

            <div className="bg-white text-gray-800 font-sans antialiased">

                {/* ══════ HEADER ══════ */}
                <PublicNavbar transparent />

                {/* ══════ HERO ══════ */}
                <section className="relative min-h-[300px] sm:min-h-[320px] flex flex-col overflow-hidden">
                    <div className="flex-1 relative" style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #2A5678 55%, #B45309 100%)' }}>
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                        <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] rounded-full border border-white/[0.04]" />
                        <div className="absolute -right-20 -bottom-20 w-[280px] h-[280px] rounded-full border border-white/[0.06]" />

                        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-12">
                            {/* Breadcrumb */}
                            <nav className="flex items-center gap-2 text-brand-blue-200/70 text-sm mb-6">
                                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                                <span>/</span>
                                <Link href="/areas/infraestructura" className="hover:text-white transition-colors">Infraestructura</Link>
                                <span>/</span>
                                <span className="text-white font-medium">{titulo}</span>
                            </nav>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.08] tracking-tight">
                                {titulo}<span className="text-brand-gold-400">.</span>
                            </h1>
                            <div className="mt-4 w-16 h-1 bg-brand-gold-400 rounded-full" />
                            <p className="mt-4 text-base sm:text-lg text-brand-blue-200/90 font-light">
                                {nombreItem(items.length)} en total · ordenados del más reciente al más antiguo
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
                                    onClick={() => { setAnioFiltro(''); setMesFiltro(''); }}
                                    className="flex items-center gap-1 text-sm text-brand-blue-500 hover:text-brand-blue-700 font-medium transition-colors"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Limpiar
                                </button>
                            )}

                            <span className="ml-auto text-sm text-gray-400">
                                {nombreItem(itemsFiltrados.length)}
                                {hayFiltros ? ' encontrados' : ''}
                            </span>
                        </div>

                        {/* Grid */}
                        {itemsFiltrados.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-20 text-gray-400">
                                <TitleIcon />
                                <p className="mt-3 text-base font-medium">
                                    No hay {titulo.toLowerCase()} con los filtros seleccionados
                                </p>
                                {hayFiltros && (
                                    <button
                                        onClick={() => { setAnioFiltro(''); setMesFiltro(''); }}
                                        className="mt-4 text-sm text-brand-blue-500 hover:text-brand-blue-700 font-medium transition-colors"
                                    >
                                        Limpiar filtros
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {itemsFiltrados.map(item => (
                                    <ItemCard
                                        key={item.id}
                                        item={item}
                                        featuredKey={featuredKey}
                                        href={esObras ? `/areas/infraestructura/${item.id}` : undefined}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Volver */}
                        <div className="mt-12 flex justify-center">
                            <Link
                                href="/areas/infraestructura"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Volver a Infraestructura
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

