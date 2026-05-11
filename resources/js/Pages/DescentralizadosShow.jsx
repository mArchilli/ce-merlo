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
        <div className="space-y-6">
            {/* Main Viewport */}
            <div className="relative group rounded-2xl overflow-hidden bg-surface-container-high aspect-video shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-outline-variant/10">
                {current.tipo === 'imagen' ? (
                    <img
                        src={current.url}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <video
                        src={current.url}
                        controls
                        className="w-full h-full object-cover"
                    />
                )}
                
                {/* Overlay for multiple items hint */}
                {medios.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 z-10">
                        {active + 1} / {medios.length} MEDIOS
                    </div>
                )}
            </div>

            {/* Bento Grid Thumbnails */}
            {medios.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                    {medios.map((m, i) => (
                        <button
                            key={m.id}
                            onClick={() => setActive(i)}
                            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                                i === active 
                                    ? 'border-tertiary scale-105 shadow-lg z-10' 
                                    : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                            }`}
                        >
                            {m.tipo === 'imagen' ? (
                                <img src={m.url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[24px] text-primary">play_circle</span>
                                </div>
                            )}
                            {i === active && (
                                <div className="absolute inset-0 bg-tertiary/10" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function DescentralizadosShow({ trabajo }) {
    let dateStr = '';
    if (trabajo.mes || trabajo.anio) {
        const parts = [];
        if (trabajo.mes)  parts.push(MESES[trabajo.mes]);
        if (trabajo.anio) parts.push(trabajo.anio);
        dateStr = parts.join(' de ');
    }

    return (
        <>
            <Head title={`${trabajo.titulo} – Descentralizados – Consejo Escolar de Merlo`} />

            <div className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col">

                <PublicNavbar transparent />

                {/* Premium Hero */}
                <section className="relative min-h-[400px] sm:min-h-[480px] flex flex-col overflow-hidden bg-primary">
                    <div className="flex-1 relative flex items-center">
                        {/* Rich Textures */}
                        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: CROSS_PATTERN_BG }} />
                        <div className="absolute -left-20 bottom-0 w-[400px] h-[400px] rounded-full bg-[#0891B2]/10 blur-[100px]" />

                        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20 w-full">
                            <Link
                                href="/areas/descentralizados"
                                className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-all duration-300"
                            >
                                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
                                Volver a Descentralizados
                            </Link>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    {trabajo.destacado && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0891B2] text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-cyan-500/20">
                                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            Destacado
                                        </div>
                                    )}
                                    {dateStr && (
                                        <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-bold uppercase tracking-widest">
                                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 0" }}>calendar_today</span>
                                            {dateStr}
                                        </div>
                                    )}
                                </div>

                                <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight max-w-4xl">
                                    {trabajo.titulo}<span className="text-[#0891B2]">.</span>
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Wave Transition */}
                    <div className="shrink-0 bg-primary">
                        <svg viewBox="0 0 1440 100" className="w-full block text-surface h-20 sm:h-28 translate-y-[1px] scale-y-[1.02] origin-bottom" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,50L80,58C160,66,320,82,480,84C640,86,800,74,960,62C1120,50,1280,38,1360,32L1440,26L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z" />
                        </svg>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 sm:py-24 bg-surface flex-grow">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-16">
                            {/* Main Content Area */}
                            <div className="flex flex-col gap-16">
                                
                                <MediaGallery medios={trabajo.medios} />

                                <div className="relative">
                                    {/* Decorative vertical line */}
                                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-[#0891B2]/20 rounded-full hidden md:block" />
                                    
                                    {trabajo.descripcion ? (
                                        <div
                                            className="prose prose-lg sm:prose-xl max-w-none font-sans text-on-surface-variant leading-relaxed 
                                                prose-headings:font-serif prose-headings:text-primary prose-headings:font-bold
                                                prose-p:text-on-surface-variant/90 prose-strong:text-primary
                                                prose-a:text-[#0891B2] prose-a:no-underline hover:prose-a:underline
                                                prose-img:rounded-2xl prose-img:shadow-xl"
                                            dangerouslySetInnerHTML={{ __html: trabajo.descripcion }}
                                        />
                                    ) : (
                                        <p className="text-on-surface-variant font-sans italic text-lg text-center py-20 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant/30">
                                            Sin descripción disponible.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="mt-24 pt-12 border-t border-outline-variant/20 flex justify-center">
                            <Link
                                href="/areas/descentralizados"
                                className="group inline-flex items-center gap-3 px-8 py-4 border border-outline-variant/40 bg-surface-container-lowest text-sm font-bold uppercase tracking-widest text-on-surface-variant rounded-none md:rounded hover:bg-surface-container-low hover:text-on-surface transition-all duration-300 shadow-sm active:scale-95"
                            >
                                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-1">arrow_back</span>
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
