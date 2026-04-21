import { useState } from 'react';
import { Link } from '@inertiajs/react';

const MESES = {
    1: 'ene', 2: 'feb', 3: 'mar', 4: 'abr',
    5: 'may', 6: 'jun', 7: 'jul', 8: 'ago',
    9: 'sep', 10: 'oct', 11: 'nov', 12: 'dic',
};

const IconNewspaper = () => (
    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>
        article
    </span>
);

function NovedadCard({ novedad }) {
    const tieneMedia = novedad.medio_principal;

    let dateStr = '';
    if (novedad.dia || novedad.mes || novedad.anio) {
        const d = String(novedad.dia || '').padStart(2, '0');
        const m = MESES[novedad.mes] || '';
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
                        <div className="bg-tertiary/10 text-tertiary border border-tertiary/20 px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-sans font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            DESTACADA
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default function Novedades({ novedades = [] }) {
    const [idx, setIdx] = useState(0);

    if (novedades.length === 0) return null;

    const total       = novedades.length;
    const showArrows  = total > 3;
    const prev        = () => setIdx((i) => (i - 1 + total) % total);
    const next        = () => setIdx((i) => (i + 1) % total);

    // 3 cards on desktop, 1 on mobile — picked circularly
    const desktopCards = [0, 1, 2].map((offset) => novedades[(idx + offset) % total]);
    const mobileCard   = novedades[idx];

    return (
        <section id="novedades" className="bg-surface text-on-surface py-16 md:py-24">
            <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-8">

                {/* Header */}
                <header className="mb-12 md:mb-16 md:w-2/3 pl-3 md:pl-0 border-l-4 md:border-l-0 border-tertiary">
                    <p className="font-sans text-xs uppercase tracking-[0.05em] text-tertiary mb-2 md:mb-3 hidden md:block">Actualidad</p>
                    <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold md:font-medium tracking-tight mb-3 md:mb-4">
                        Novedades
                    </h2>
                    <p className="font-sans text-sm md:text-lg text-on-surface-variant leading-relaxed max-w-[90%] md:max-w-full">
                        Enterate de las últimas noticias y novedades del Consejo Escolar de Merlo.
                    </p>
                </header>

                {/* Carousel */}
                <div className="relative">
                    {/* Desktop: 3 cards */}
                    <div className="hidden md:grid grid-cols-3 gap-6 md:gap-8">
                        {desktopCards.map((n, i) => (
                            <NovedadCard key={`${n.id}-${i}`} novedad={n} />
                        ))}
                    </div>

                    {/* Mobile: 1 card */}
                    <div className="md:hidden">
                        <NovedadCard key={mobileCard.id} novedad={mobileCard} />
                    </div>

                    {/* Navigation arrows */}
                    {showArrows && (
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <button
                                onClick={prev}
                                aria-label="Anterior"
                                className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-200 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                            </button>

                            {/* Dots */}
                            <div className="flex items-center gap-1.5">
                                {novedades.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setIdx(i)}
                                        aria-label={`Ir a novedad ${i + 1}`}
                                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                            i === idx
                                                ? 'bg-primary w-4'
                                                : 'bg-outline-variant/40 hover:bg-outline-variant'
                                        }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                aria-label="Siguiente"
                                className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-200 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                            </button>
                        </div>
                    )}

                    {/* Dots only (no arrows) when ≤3 novedades */}
                    {!showArrows && total > 1 && (
                        <div className="flex items-center justify-center gap-1.5 mt-8 md:hidden">
                            {novedades.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIdx(i)}
                                    aria-label={`Ir a novedad ${i + 1}`}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                        i === idx ? 'bg-primary w-4' : 'bg-outline-variant/40 hover:bg-outline-variant'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Call to Action */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="/novedades"
                        className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-white font-sans text-sm uppercase tracking-wide font-semibold rounded hover:opacity-90 transition-all duration-300 shadow-[0_8px_24px_rgba(18,53,83,0.2)] active:scale-[0.98]"
                    >
                        Ver todas las novedades
                    </Link>
                </div>
            </div>
        </section>
    );
}
