import { Link } from '@inertiajs/react';
import { CROSS_PATTERN_BG } from '@/Components/patterns';

const IconUser = () => (
    <svg className="w-12 h-12 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

// Datos de respaldo por si no hay registros en la base de datos
const FALLBACK_PRINCIPALES = [
    { cargo: 'Presidenta', nombre: 'Consejero 1' },
    { cargo: 'Vicepresidente', nombre: 'Consejero 2' },
    { cargo: 'Tesorero', nombre: 'Consejero 3' },
    { cargo: 'Secretario', nombre: 'Consejero 4' },
];

const FALLBACK_VOCALES = [
    '1º Vocal – Consejero 5',
    '2º Vocal – Consejero 6',
    '3º Vocal – Consejero 7',
    '4º Vocal – Consejero 8',
    '5º Vocal – Consejero 9',
    '6º Vocal – Consejero 10',
];

export default function Autoridades({ autoridades = [] }) {
    const principales = autoridades.length > 0
        ? autoridades.filter((a) => a.tipo === 'principal')
        : FALLBACK_PRINCIPALES;

    const vocales = autoridades.length > 0
        ? autoridades.filter((a) => a.tipo === 'vocal')
        : FALLBACK_VOCALES.map((v, i) => ({ id: i, cargo: `${i+1}º VOCAL`, nombre: v, foto: null }));

    return (
        <section id="autoridades" className="relative">
            {/* Onda superior — transición desde la sección anterior */}
            <div className="bg-surface">
                <svg viewBox="0 0 1440 56" className="w-full block text-primary" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                </svg>
            </div>

            {/* Contenido sobre fondo oscuro original (mantener según instrucción) */}
            <div className="bg-primary relative overflow-hidden">
                {/* Patrón sutil original */}
                <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: CROSS_PATTERN_BG}} />

                <div className="relative max-w-[1200px] mx-auto px-6 sm:px-8 py-20 sm:py-24">

                    {/* Encabezado Autoridades (Nuevo estilo) */}
                    <header className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-20">
                        <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-white">Autoridades</h1>
                        <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-tertiary-fixed-dim">EQUIPO DE TRABAJO</h2>
                    </header>

                    {/* Principales / Executive Board */}
                    {principales.length > 0 && (
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-24">
                            {principales.map((a, i) => (
                                <article key={a.id ?? i} className="bg-surface-container-lowest/5 backdrop-blur-xl border border-outline-variant/20 rounded flex flex-col md:flex-row shadow-2xl shadow-black/20 overflow-hidden group hover:bg-surface-container-lowest/10 transition-all duration-300 relative">
                                    <div className="absolute top-0 left-0 w-full h-1 md:w-1 md:h-full bg-tertiary scale-x-0 md:scale-y-0 group-hover:scale-x-100 md:group-hover:scale-y-100 transition-transform origin-left md:origin-top duration-300 z-10"></div>
                                    
                                    {/* Espacio para la foto (placeholder o imagen real) */}
                                    <div className="hidden md:flex md:w-2/5 aspect-[4/5] md:aspect-auto relative bg-surface-container-lowest/10 items-center justify-center border-r border-outline-variant/10 shrink-0">
                                        {a.foto ? (
                                            <img
                                                src={`/images/${a.foto}`}
                                                alt={a.nombre}
                                                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center gap-3 p-6 opacity-60">
                                                <IconUser />
                                                <span className="font-sans text-[10px] uppercase tracking-widest font-semibold text-center text-white/40">Foto pendiente</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 md:p-8 flex flex-col justify-center w-full md:w-3/5">
                                        <h3 className="font-serif text-lg md:text-2xl text-tertiary-fixed-dim md:text-white mb-2 uppercase md:capitalize tracking-wide md:tracking-normal">{a.cargo}</h3>
                                        <p className="font-sans text-xl md:text-lg font-medium text-white md:text-on-surface-variant md:text-white/80">{a.nombre}</p>
                                    </div>
                                </article>
                            ))}
                        </section>
                    )}

                    {/* Vocales */}
                    {vocales.length > 0 && (
                        <section className="mt-8 flex flex-col gap-8">
                            <header className="flex items-center gap-4">
                                <h2 className="font-serif text-3xl font-bold text-white">Vocales</h2>
                                <div className="h-[1px] flex-grow bg-outline-variant/20"></div>
                            </header>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {vocales.map((v, i) => (
                                    <article key={v.id ?? i} className="p-5 border border-outline-variant/10 rounded bg-primary-container/20 flex flex-col gap-1 hover:bg-primary-container/30 transition-colors">
                                        <h4 className="font-serif text-sm text-tertiary-fixed-dim uppercase">{v.cargo || `${i+1}º VOCAL`}</h4>
                                        <p className="font-sans text-lg text-white/90">{v.nombre}</p>
                                        {v.area && (
                                            <p className="font-sans text-xs text-white/50 mt-1 truncate">{v.area}</p>
                                        )}
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── Separador visual antes del contacto ── */}
                    <div className="relative max-w-5xl mx-auto my-20 md:my-32">
                        <div className="border-t border-white/10" />
                    </div>

                    {/* ══════ CONTACTO (Rediseñado con el nuevo estilo) ══════ */}
                    <div className="max-w-7xl mx-auto" id="contacto">
                        {/* Encabezado */}
                        <header className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-20">
                            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">Contacto</h2>
                        </header>

                        {/* Info cards */}
                        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                            <div className="bg-surface-container-lowest/5 backdrop-blur-xl border border-outline-variant/20 rounded-none md:rounded p-8 text-center flex flex-col items-center hover:bg-surface-container-lowest/10 transition-colors">
                                <div className="w-14 h-14 rounded-none md:rounded bg-primary-container/30 flex items-center justify-center mb-6 text-tertiary-fixed-dim">
                                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
                                </div>
                                <h3 className="font-serif text-sm font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-3">Dirección</h3>
                                <p className="font-sans text-base text-white/90 leading-relaxed">Av. Calle Real 208/212<br />Merlo Centro</p>
                            </div>
                            
                            <div className="bg-surface-container-lowest/5 backdrop-blur-xl border border-outline-variant/20 rounded-none md:rounded p-8 text-center flex flex-col items-center hover:bg-surface-container-lowest/10 transition-colors">
                                <div className="w-14 h-14 rounded-none md:rounded bg-primary-container/30 flex items-center justify-center mb-6 text-tertiary-fixed-dim">
                                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>call</span>
                                </div>
                                <h3 className="font-serif text-sm font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-3">Teléfono</h3>
                                <p className="font-sans text-base text-white/90">0220-482-5836</p>
                            </div>
                            
                            <div className="bg-surface-container-lowest/5 backdrop-blur-xl border border-outline-variant/20 rounded-none md:rounded p-8 text-center flex flex-col items-center hover:bg-surface-container-lowest/10 transition-colors">
                                <div className="w-14 h-14 rounded-none md:rounded bg-primary-container/30 flex items-center justify-center mb-6 text-tertiary-fixed-dim">
                                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>schedule</span>
                                </div>
                                <h3 className="font-serif text-sm font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-3">Horario</h3>
                                <p className="font-sans text-base text-white/90">Lunes a viernes<br />de 8 a 16 hs</p>
                            </div>
                        </div>

                        {/* CTA a página de contacto */}
                        <div className="text-center mt-10">
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-tertiary text-on-tertiary text-lg font-sans font-semibold rounded hover:bg-tertiary-container hover:text-on-tertiary-container transition-all duration-300 group"
                            >
                                Ver más información de contacto
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 0" }}>
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Onda inferior — transición al footer blanco */}
            <div className="bg-primary relative z-10 -mb-px">
                <svg viewBox="0 0 1440 56" className="w-full block text-surface translate-y-[1px] scale-y-[1.02] origin-bottom" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                </svg>
            </div>
        </section>
    );
}
