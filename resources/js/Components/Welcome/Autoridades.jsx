import { Link } from '@inertiajs/react';
import { CROSS_PATTERN_BG } from '@/Components/patterns';


const FALLBACK_PRINCIPALES = [
    { cargo: 'Presidenta',      nombre: 'Consejero 1' },
    { cargo: 'Vicepresidente',  nombre: 'Consejero 2' },
    { cargo: 'Tesorero',        nombre: 'Consejero 3' },
    { cargo: 'Secretario',      nombre: 'Consejero 4' },
];

const FALLBACK_VOCALES = [
    '1º Vocal – Consejero 5',
    '2º Vocal – Consejero 6',
    '3º Vocal – Consejero 7',
    '4º Vocal – Consejero 8',
    '5º Vocal – Consejero 9',
    '6º Vocal – Consejero 10',
];

export default function Autoridades({ autoridades = [], areas = [] }) {
    const principales = autoridades.length > 0
        ? autoridades.filter((a) => a.tipo === 'principal')
        : FALLBACK_PRINCIPALES;

    const vocales = autoridades.length > 0
        ? autoridades.filter((a) => a.tipo === 'vocal')
        : FALLBACK_VOCALES.map((v, i) => ({ id: i, cargo: `${i+1}º VOCAL`, nombre: v, foto: null }));

    const mesa   = areas.find(a => a.slug === 'mesa-de-entradas');
    const mesaWA = mesa?.correos_activos.find(c => c.es_whatsapp && c.telefono)?.telefono ?? null;
    const waHref = mesaWA ? `https://wa.me/${mesaWA.replace(/\D/g, '')}` : null;

    return (
        <section id="autoridades" className="relative">
            {/* Onda superior */}
            <div className="bg-surface">
                <svg viewBox="0 0 1440 56" className="w-full block text-primary" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                </svg>
            </div>

            <div className="bg-primary relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: CROSS_PATTERN_BG}} />

                <div className="relative max-w-[1200px] mx-auto px-6 sm:px-8 py-20 sm:py-24">

                    {/* Encabezado */}
                    <header className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-20">
                        <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-white">Autoridades</h1>
                        <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-tertiary-fixed-dim">EQUIPO DE TRABAJO</h2>
                    </header>

                    {/* Principales */}
                    {principales.length > 0 && (
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-24">
                            {principales.map((a, i) => (
                                <article key={a.id ?? i} className={`bg-surface-container-lowest/5 backdrop-blur-xl border border-outline-variant/20 rounded flex flex-col shadow-2xl shadow-black/20 overflow-hidden group hover:bg-surface-container-lowest/10 transition-all duration-300 relative ${a.foto ? 'md:flex-row' : ''}`}>
                                    <div className="absolute top-0 left-0 w-full h-1 md:w-1 md:h-full bg-tertiary scale-x-0 md:scale-y-0 group-hover:scale-x-100 md:group-hover:scale-y-100 transition-transform origin-left md:origin-top duration-300 z-10" />
                                    {a.foto && (
                                        <div className="w-full h-80 md:h-auto md:w-2/5 md:aspect-auto relative bg-surface-container-lowest/10 flex items-center justify-center border-b border-outline-variant/10 md:border-b-0 md:border-r shrink-0">
                                            <img
                                                src={`/images/${a.foto}`}
                                                alt={a.nombre}
                                                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                    )}
                                    <div className={`p-6 md:p-8 flex flex-col justify-center w-full ${a.foto ? 'md:w-3/5' : ''}`}>
                                        <h3 className="font-serif text-lg md:text-2xl text-tertiary-fixed-dim md:text-white mb-2 uppercase md:capitalize tracking-wide md:tracking-normal">{a.cargo}</h3>
                                        <p className="font-sans text-xl md:text-lg font-medium text-white md:text-white/80">{a.nombre}</p>
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
                                <div className="h-[1px] flex-grow bg-outline-variant/20" />
                            </header>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {vocales.map((v, i) => (
                                    <article
                                        key={v.id ?? i}
                                        className="group border border-outline-variant/10 rounded bg-primary-container/20 overflow-hidden flex flex-col hover:bg-primary-container/30 transition-all duration-300"
                                    >
                                        {/* Imagen */}
                                        {v.foto && (
                                            <div className="aspect-[3/4] relative bg-surface-container-lowest/10 overflow-hidden shrink-0">
                                                <img
                                                    src={`/images/${v.foto}`}
                                                    alt={v.nombre}
                                                    className="w-full h-full object-cover object-top grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                                />
                                            </div>
                                        )}
                                        {/* Info */}
                                        <div className="p-3 flex flex-col gap-0.5">
                                            <p className="font-serif text-[10px] text-tertiary-fixed-dim uppercase tracking-wider leading-none">
                                                {v.cargo || `${i+1}º VOCAL`}
                                            </p>
                                            <p className="font-sans text-sm text-white/90 font-medium leading-snug mt-1">
                                                {v.nombre}
                                            </p>
                                            {v.area && (
                                                <p className="font-sans text-[10px] text-white/40 mt-0.5 truncate">{v.area}</p>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Separador */}
                    <div className="relative max-w-5xl mx-auto my-20 md:my-32">
                        <div className="border-t border-white/10" />
                    </div>

                    {/* Contacto */}
                    <div className="max-w-7xl mx-auto" id="contacto">
                        <header className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-20">
                            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">Contacto</h2>
                        </header>

                        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                            {/* Dirección */}
                            <div className="bg-surface-container-lowest/5 backdrop-blur-xl border border-outline-variant/20 rounded-none md:rounded p-8 text-center flex flex-col items-center hover:bg-surface-container-lowest/10 transition-colors">
                                <div className="w-14 h-14 rounded-none md:rounded bg-primary-container/30 flex items-center justify-center mb-6 text-tertiary-fixed-dim">
                                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
                                </div>
                                <h3 className="font-serif text-sm font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-3">Dirección</h3>
                                <p className="font-sans text-base text-white/90 leading-relaxed">Av. Calle Real 208/212<br />Merlo Centro</p>
                            </div>

                            {/* Teléfono / WhatsApp */}
                            {waHref ? (
                                <a
                                    href={waHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/wa bg-surface-container-lowest/5 backdrop-blur-xl border border-outline-variant/20 rounded-none md:rounded p-8 text-center flex flex-col items-center hover:bg-[#25d366]/10 hover:border-[#25d366]/30 transition-colors"
                                >
                                    <div className="w-14 h-14 rounded-none md:rounded bg-primary-container/30 flex items-center justify-center mb-6 text-tertiary-fixed-dim group-hover/wa:bg-[#25d366]/20 group-hover/wa:text-[#25d366] transition-colors">
                                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>phone_in_talk</span>
                                    </div>
                                    <h3 className="font-serif text-sm font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-3">Teléfono</h3>
                                    <p className="font-sans text-base text-white/90 group-hover/wa:text-[#25d366] transition-colors">{mesaWA}</p>
                                    <span className="mt-2 font-sans text-[10px] font-bold text-[#25d366] bg-[#25d366]/10 px-2 py-0.5 rounded leading-none">
                                        WhatsApp
                                    </span>
                                </a>
                            ) : (
                                <div className="bg-surface-container-lowest/5 backdrop-blur-xl border border-outline-variant/20 rounded-none md:rounded p-8 text-center flex flex-col items-center hover:bg-surface-container-lowest/10 transition-colors">
                                    <div className="w-14 h-14 rounded-none md:rounded bg-primary-container/30 flex items-center justify-center mb-6 text-tertiary-fixed-dim">
                                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>call</span>
                                    </div>
                                    <h3 className="font-serif text-sm font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-3">Teléfono (Solo WhatsApp)</h3>
                                    <p className="font-sans text-base text-white/90">0220-482-5836</p>
                                </div>
                            )}

                            {/* Horario */}
                            <div className="bg-surface-container-lowest/5 backdrop-blur-xl border border-outline-variant/20 rounded-none md:rounded p-8 text-center flex flex-col items-center hover:bg-surface-container-lowest/10 transition-colors">
                                <div className="w-14 h-14 rounded-none md:rounded bg-primary-container/30 flex items-center justify-center mb-6 text-tertiary-fixed-dim">
                                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>schedule</span>
                                </div>
                                <h3 className="font-serif text-sm font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-3">Horario</h3>
                                <p className="font-sans text-base text-white/90">Lunes a viernes<br />de 8 a 15 hs</p>
                            </div>
                        </div>

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

            {/* Onda inferior */}
            <div className="bg-primary relative z-10 -mb-px">
                <svg viewBox="0 0 1440 56" className="w-full block text-surface translate-y-[1px] scale-y-[1.02] origin-bottom" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                </svg>
            </div>
        </section>
    );
}
