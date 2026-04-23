import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PublicNavbar from '@/Components/PublicNavbar';
import Footer from '@/Components/Welcome/Footer';
import { CROSS_PATTERN_BG } from '@/Components/patterns';

const MESES = {
    1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
    5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto',
    9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre',
};

function MediaGallery({ medios }) {
    const [active, setActive] = useState(0);

    if (!medios || medios.length === 0) return null;

    const current = medios[active];

    return (
        <div className="mb-10">
            {/* Vista principal */}
            <div className="w-full rounded-lg overflow-hidden bg-surface-container-high aspect-video mb-3 shadow-md">
                {current.tipo === 'imagen' ? (
                    <img
                        src={current.url}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <video
                        src={current.url}
                        controls
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Thumbnails */}
            {medios.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                    {medios.map((m, i) => (
                        <button
                            key={m.id}
                            onClick={() => setActive(i)}
                            className={`w-16 h-16 rounded overflow-hidden border-2 transition-all duration-200 shrink-0 ${
                                i === active ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                        >
                            {m.tipo === 'imagen' ? (
                                <img src={m.url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[20px] text-outline">play_circle</span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function NovedadShow({ novedad }) {
    let dateStr = '';
    if (novedad.dia || novedad.mes || novedad.anio) {
        const parts = [];
        if (novedad.dia)  parts.push(String(novedad.dia).padStart(2, '0'));
        if (novedad.mes)  parts.push(MESES[novedad.mes]);
        if (novedad.anio) parts.push(novedad.anio);
        dateStr = parts.join(' de ');
    }

    return (
        <>
            <Head title={`${novedad.titulo} – Consejo Escolar de Merlo`} />

            <div className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col">

                <PublicNavbar transparent />

                {/* Hero */}
                <section className="relative min-h-[260px] flex flex-col overflow-hidden bg-primary">
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: CROSS_PATTERN_BG }} />
                        <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] rounded-full bg-primary-container/20 blur-3xl" />

                        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-12">
                            <Link
                                href="/novedades"
                                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-sans mb-6 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                Volver a novedades
                            </Link>

                            {novedad.destacada && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-tertiary/20 border border-tertiary/30 text-tertiary-fixed-dim text-xs font-semibold uppercase tracking-wider font-sans">
                                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    Destacada
                                </div>
                            )}

                            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                                {novedad.titulo}
                            </h1>

                            {dateStr && (
                                <div className="mt-4 flex items-center gap-2 text-white/70 text-sm font-sans">
                                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>calendar_today</span>
                                    {dateStr}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="shrink-0 bg-primary">
                        <svg viewBox="0 0 1440 56" className="w-full block text-surface" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* Contenido */}
                <section className="py-12 sm:py-16 flex-grow">
                    <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">

                        <MediaGallery medios={novedad.medios} />

                        {novedad.descripcion ? (
                            <div
                                className="prose prose-lg max-w-none font-sans text-on-surface-variant leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: novedad.descripcion }}
                            />
                        ) : (
                            <p className="text-on-surface-variant font-sans italic">Sin descripción disponible.</p>
                        )}

                        <div className="mt-14 pt-8 border-t border-outline-variant/20 flex justify-between items-center">
                            <Link
                                href="/novedades"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-outline-variant/40 bg-surface-container-lowest rounded text-sm font-sans font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all duration-300 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
                                Ver todas las novedades
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
