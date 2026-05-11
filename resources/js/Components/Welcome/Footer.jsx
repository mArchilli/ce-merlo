import { Link } from '@inertiajs/react';
import { CROSS_PATTERN_BG } from '@/Components/patterns';

export default function Footer({ scrollTo, areas = [] }) {
    const mesa   = areas.find(a => a.slug === 'mesa-de-entradas');
    const mesaWA = mesa?.correos_activos.find(c => c.es_whatsapp && c.telefono)?.telefono ?? null;
    const waHref = mesaWA ? `https://wa.me/${mesaWA.replace(/\D/g, '')}` : null;

    return (
        <footer className="relative overflow-hidden">
            {/* Onda de transición */}
            <div className="bg-surface">
                <svg viewBox="0 0 1440 72" className="w-full block text-primary" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,40L80,45C160,51,320,61,480,61C640,61,800,51,960,45C1120,40,1280,40,1360,40L1440,40L1440,72L1360,72C1280,72,1120,72,960,72C800,72,640,72,480,72C320,72,160,72,80,72L0,72Z" />
                </svg>
            </div>

            {/* Cuerpo del footer */}
            <div className="relative bg-primary">
                {/* Decoración ambiental */}
                <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 -left-16 w-[300px] h-[300px] rounded-full bg-primary-fixed/5 blur-3xl pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: CROSS_PATTERN_BG }} />

                <div className="relative max-w-[1200px] mx-auto px-6 sm:px-8 pt-20 pb-10">

                    {/* ── Fila superior: marca + descripción ── */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-14 border-b border-white/10">
                        {/* Identidad */}
                        <div className="max-w-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src="/logo-consejo-de-merlo.png"
                                    alt="Logo Consejo Escolar de Merlo"
                                    className="h-14 w-auto object-contain drop-shadow-md"
                                />
                                <div>
                                    <span className="block text-xl font-serif font-bold text-white leading-snug">Consejo Escolar de Merlo</span>
                                    <span className="block text-xs font-sans text-secondary-fixed-dim mt-0.5">Provincia de Buenos Aires</span>
                                </div>
                            </div>
                            <p className="font-sans text-sm text-white/70 leading-relaxed">
                                Organismo descentralizado de la Dirección General de Cultura y Educación de la Provincia de Buenos Aires, al servicio de la comunidad educativa del distrito.
                            </p>
                        </div>

                        {/* Cards de contacto rápido */}
                        <div className="grid sm:grid-cols-3 gap-4 lg:w-auto lg:max-w-xl w-full">
                            {/* Dirección */}
                            <div className="flex flex-col gap-3 rounded-none md:rounded border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors backdrop-blur-sm p-5">
                                <div className="w-10 h-10 rounded-none md:rounded bg-primary-container/40 text-tertiary-fixed-dim flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
                                </div>
                                <div>
                                    <p className="font-serif text-[10px] font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-1">Dirección</p>
                                    <p className="font-sans text-sm font-medium text-white leading-snug">Av. Calle Real 208/212</p>
                                </div>
                            </div>

                            {/* Teléfono / WhatsApp */}
                            {waHref ? (
                                <a
                                    href={waHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/wa flex flex-col gap-3 rounded-none md:rounded border border-white/10 bg-white/[0.04] hover:bg-[#25d366]/10 hover:border-[#25d366]/30 transition-colors backdrop-blur-sm p-5"
                                >
                                    <div className="w-10 h-10 rounded-none md:rounded bg-primary-container/40 text-tertiary-fixed-dim flex items-center justify-center shrink-0 group-hover/wa:bg-[#25d366]/20 group-hover/wa:text-[#25d366] transition-colors">
                                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>phone_in_talk</span>
                                    </div>
                                    <div>
                                        <p className="font-serif text-[10px] font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-1">Teléfono (Solo WhatsApp)</p>
                                        <p className="font-sans text-sm font-medium text-white group-hover/wa:text-[#25d366] transition-colors leading-snug">{mesaWA}</p>
                                        <span className="inline-block mt-1 font-sans text-[9px] font-bold text-[#25d366] bg-[#25d366]/10 px-1.5 py-0.5 rounded leading-none">WhatsApp</span>
                                    </div>
                                </a>
                            ) : (
                                <div className="flex flex-col gap-3 rounded-none md:rounded border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors backdrop-blur-sm p-5">
                                    <div className="w-10 h-10 rounded-none md:rounded bg-primary-container/40 text-tertiary-fixed-dim flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>call</span>
                                    </div>
                                    <div>
                                        <p className="font-serif text-[10px] font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-1">Teléfono</p>
                                        <p className="font-sans text-sm font-medium text-white leading-snug">0220-482-5836</p>
                                    </div>
                                </div>
                            )}

                            {/* Horario */}
                            <div className="flex flex-col gap-3 rounded-none md:rounded border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors backdrop-blur-sm p-5">
                                <div className="w-10 h-10 rounded-none md:rounded bg-primary-container/40 text-tertiary-fixed-dim flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>schedule</span>
                                </div>
                                <div>
                                    <p className="font-serif text-[10px] font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-1">Horario</p>
                                    <p className="font-sans text-sm font-medium text-white leading-snug">Lun a Vie, 8 a 15 hs</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Fila media: navegación y áreas ── */}
                    <div className="py-12 border-b border-white/10 flex flex-col md:flex-row justify-between gap-12 lg:gap-16">
                        {/* Navegación */}
                        <div>
                            <p className="font-serif text-[11px] font-bold text-tertiary-fixed-dim uppercase tracking-[0.2em] mb-6">Navegación</p>
                            <nav className="flex gap-8 sm:gap-16">
                                <div className="flex flex-col gap-3">
                                    <Link href="/" className="font-sans text-sm text-secondary-fixed-dim hover:text-white transition-colors">Inicio</Link>
                                    <Link href="/funcionamiento" className="font-sans text-sm text-secondary-fixed-dim hover:text-white transition-colors">Funcionamiento</Link>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Link href="/novedades" className="font-sans text-sm text-secondary-fixed-dim hover:text-white transition-colors">Novedades</Link>
                                    <Link href="/contacto" className="font-sans text-sm text-secondary-fixed-dim hover:text-white transition-colors">Contacto</Link>
                                </div>
                            </nav>
                        </div>

                        {/* Áreas */}
                        <div className="md:w-3/5 lg:w-1/2">
                            <p className="font-serif text-[11px] font-bold text-tertiary-fixed-dim uppercase tracking-[0.2em] mb-6">Áreas</p>
                            <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                                <Link href="/areas/infraestructura" className="font-sans text-sm text-secondary-fixed-dim hover:text-white transition-colors">Infraestructura</Link>
                                <Link href="/areas/recursos-humanos" className="font-sans text-sm text-secondary-fixed-dim hover:text-white transition-colors">Recursos humanos</Link>
                                <Link href="/areas/patrimonio" className="font-sans text-sm text-secondary-fixed-dim hover:text-white transition-colors">Patrimonio</Link>
                                <Link href="/areas/cooperacion-escolar" className="font-sans text-sm text-secondary-fixed-dim hover:text-white transition-colors">Coop. Escolar</Link>
                                <Link href="/areas/sae" className="font-sans text-sm text-secondary-fixed-dim hover:text-white transition-colors">SAE</Link>
                                <Link href="/areas/descentralizados" className="font-sans text-sm text-secondary-fixed-dim hover:text-white transition-colors">Descentralizados</Link>
                            </nav>
                        </div>
                    </div>

                    {/* ── Línea inferior ── */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="font-sans text-xs text-white/50">
                            © {new Date().getFullYear()} Consejo Escolar de Merlo.
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="font-sans text-sm text-white/50">Powered by <span className="font-semibold text-tertiary-fixed-dim">PAMPA LABS</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
