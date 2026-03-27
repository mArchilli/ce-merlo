import { Link } from '@inertiajs/react';

const MESES = {
    1: 'ene', 2: 'feb', 3: 'mar', 4: 'abr',
    5: 'may', 6: 'jun', 7: 'jul', 8: 'ago',
    9: 'sep', 10: 'oct', 11: 'nov', 12: 'dic',
};

const IconStar = () => (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const IconNewspaper = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    </svg>
);

function NovedadCard({ novedad }) {
    const tieneMedia = novedad.medio_principal;

    return (
        <article className="group flex flex-col rounded-2xl bg-white border border-gray-100 hover:border-brand-blue-100 hover:shadow-lg transition-all duration-200 overflow-hidden">
            {/* Imagen / placeholder */}
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
                {/* Fecha badge */}
                {(novedad.dia || novedad.mes || novedad.anio) && (
                    <span className="absolute top-3 right-3 flex flex-col items-center rounded-xl bg-brand-blue-800/90 backdrop-blur-sm px-3 py-1.5 text-white shadow-sm min-w-[44px]">
                        {novedad.dia && (
                            <span className="text-base font-bold leading-none">{String(novedad.dia).padStart(2, '0')}</span>
                        )}
                        {novedad.mes && (
                            <span className="text-[10px] uppercase tracking-wider font-medium text-brand-blue-200 leading-none mt-0.5">
                                {MESES[novedad.mes]}
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
                        className="text-sm text-gray-500 line-clamp-3 leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: novedad.descripcion }}
                    />
                )}
            </div>
        </article>
    );
}

export default function Novedades({ novedades = [] }) {
    if (novedades.length === 0) return null;

    return (
        <section id="novedades" className="py-16 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                {/* Encabezado */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
                    <div className="max-w-xl">
                        <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Actualidad</p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                            Novedades
                        </h2>
                        <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                        <p className="mt-4 text-gray-500 text-base font-light leading-relaxed">
                            Enterate de las últimas noticias y novedades del Consejo Escolar de Merlo.
                        </p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {novedades.map((n) => (
                        <NovedadCard key={n.id} novedad={n} />
                    ))}
                </div>

                {/* Botón ver todas */}
                <div className="mt-10 flex justify-center">
                    <Link
                        href="/novedades"
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-blue-700 text-white text-base font-semibold rounded-lg hover:bg-brand-blue-800 transition-all duration-200 shadow-sm"
                    >
                        <IconNewspaper />
                        Ver todas las novedades
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
