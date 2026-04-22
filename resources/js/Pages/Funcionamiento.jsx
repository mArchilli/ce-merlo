import { Head, Link } from '@inertiajs/react';
import PublicNavbar from '@/Components/PublicNavbar';
import Footer from '@/Components/Welcome/Footer';

export default function Funcionamiento() {
    return (
        <>
            <Head title="Funcionamiento – Consejo Escolar de Merlo" />

            <div className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col">

                {/* ══════ HEADER ══════ */}
                <PublicNavbar transparent />

                {/* ══════ HERO ══════ */}
                <section className="relative min-h-[380px] sm:min-h-[420px] flex flex-col overflow-hidden bg-primary">
                    <div className="flex-1 relative">
                        {/* Patrón sutil */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />

                        <div className="relative flex items-center h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 rounded-none md:rounded bg-white/[0.08] border border-white/10 backdrop-blur-sm">
                                    <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                                    <span className="text-white font-sans text-xs font-bold uppercase tracking-widest text-shadow-sm">Consejo Escolar de Merlo</span>
                                </div>
                                <h1 className="font-serif text-5xl sm:text-6xl lg:text-[5rem] font-bold text-white leading-[1.05] tracking-tight text-shadow-md">
                                    Funcionamiento<span className="text-tertiary">.</span>
                                </h1>
                                <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl font-light font-sans">
                                    Conocé cómo trabajamos durante el año, el desarrollo de las sesiones y la aprobación de tareas que realizamos para la comunidad.
                                </p>
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

                {/* ══════ INFORMACIÓN ══════ */}
                <section className="py-16 sm:py-24 bg-surface">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        
                        <div className="max-w-3xl mb-16 md:mb-24">
                            <p className="font-serif text-[11px] font-bold text-tertiary uppercase tracking-[0.2em] mb-4 md:mb-6">
                                Sobre el Consejo
                            </p>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold md:font-medium tracking-tight mb-6">
                                ¿Cómo funcionamos<br className="hidden md:block" /> durante el año?
                            </h2>
                            <p className="font-sans text-secondary text-lg md:text-xl font-light leading-relaxed">
                                El funcionamiento general se organiza a través de sesiones que pueden ser ordinarias o extraordinarias. En estas sesiones se debaten, gestionan y aprueban las distintas tareas y proyectos que el Consejo Escolar lleva a cabo, quedando todo asentado debidamente bajo acta.
                            </p>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 w-full">
                            
                            {/* Sesiones Ordinarias */}
                            <div className="group flex flex-col rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] bg-surface-container-lowest p-8 md:p-10 hover:bg-surface-container-low transition-all duration-300">
                                <div className="w-14 h-14 rounded-none md:rounded bg-surface-container-high text-primary flex items-center justify-center shrink-0 mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>calendar_month</span>
                                </div>
                                <h3 className="font-serif font-bold text-primary text-2xl mb-3">Sesiones Ordinarias</h3>
                                <p className="font-sans text-secondary text-base leading-relaxed">
                                    Se llevan a cabo de manera <strong>quincenal desde febrero a diciembre</strong>. Son las reuniones regulares donde se tratan los temas de agenda, se evalúan proyectos y se da tratamiento a los expedientes vigentes.
                                </p>
                            </div>

                            {/* Sesiones Extraordinarias */}
                            <div className="group flex flex-col rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] bg-surface-container-lowest p-8 md:p-10 hover:bg-surface-container-low transition-all duration-300">
                                <div className="w-14 h-14 rounded-none md:rounded bg-surface-container-high text-primary flex items-center justify-center shrink-0 mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>assignment_late</span>
                                </div>
                                <h3 className="font-serif font-bold text-primary text-2xl mb-3">Sesiones Extraordinarias</h3>
                                <p className="font-sans text-secondary text-base leading-relaxed">
                                    Se programan de manera excepcional <strong>en caso de ser necesarias</strong>, para tratar asuntos urgentes, situaciones imprevistas o temas que requieren una resolución inmediata fuera del calendario quincenal.
                                </p>
                            </div>

                        </div>
                        
                        <div className="w-full mt-6">
                            <div className="bg-primary-container/30 border border-primary-container/50 rounded-none md:rounded p-6 md:p-8 flex items-center gap-4 shadow-sm">
                                <div className="text-primary/70 shrink-0 hidden sm:block">
                                    <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 0" }}>history_edu</span>
                                </div>
                                <p className="font-sans text-primary text-sm sm:text-base leading-relaxed">
                                    <strong>Actas oficiales:</strong> En cada una de estas sesiones, sin importar su carácter, todas las tareas aprobadas que realiza el Consejo Escolar <strong>quedan bajo acta</strong>, garantizando la transparencia administrativa y el registro público.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ══════ FOOTER ══════ */}
                <Footer />

            </div>
        </>
    );
}
