import { Link } from '@inertiajs/react';
import { CROSS_PATTERN_BG } from '@/Components/patterns';

export default function Hero({ scrollTo }) {
    return (
        <section id="inicio" className="relative min-h-[100svh] flex flex-col overflow-hidden bg-primary -mb-16">
            <div className="flex-1 relative">
                {/* Patrón sutil */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: CROSS_PATTERN_BG }} />


                <div className="relative flex items-center justify-between h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-16 gap-12">
                    <div className="max-w-2xl">
                        {/* Logo mobile: visible solo en < lg */}
                        <div className="flex lg:hidden mb-8">
                            <img
                                src="/logo-consejo-de-merlo.png"
                                alt="Logo Consejo Escolar de Merlo"
                                className="w-40 drop-shadow-2xl"
                            />
                        </div>
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 rounded-none md:rounded bg-white/[0.08] backdrop-blur-sm text-white/90 text-sm font-medium tracking-wide uppercase border border-white/[0.08]">
                            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                            Provincia de Buenos Aires
                        </div>
                        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight">
                            Consejo
                            <br />
                            Escolar
                            <br />
                            de Merlo<span className="text-tertiary">.</span>
                        </h1>
                        <p className="mt-8 text-lg sm:text-xl lg:text-2xl text-white/80 font-sans font-light leading-relaxed max-w-xl">
                            Organismo responsable de la administración y gestión de los recursos y servicios de las escuelas públicas del distrito.
                        </p>
                        <div className="mt-12 flex flex-wrap items-center gap-4">
                            <a
                                href="#funciones"
                                onClick={(e) => scrollTo(e, '#funciones')}
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-primary font-sans text-sm font-bold uppercase tracking-wide rounded-none md:rounded hover:bg-surface-container transition-all duration-300 shadow-md active:scale-95"
                            >
                                Conocer funciones
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                </svg>
                            </a>
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/20 bg-white/[0.05] text-white font-sans text-sm font-medium uppercase tracking-wide rounded-none md:rounded hover:bg-white/10 transition-all duration-300 active:scale-95"
                            >
                                Contacto
                            </Link>
                        </div>
                    </div>

                    {/* Logo derecha */}
                    <div className="hidden lg:flex items-center justify-center shrink-0 mt-8">
                        <img
                            src="/logo-consejo-de-merlo.png"
                            alt="Logo Consejo Escolar de Merlo"
                            className="w-96 xl:w-[28rem] drop-shadow-2xl"
                        />
                    </div>
                </div>


            </div>

            {/* Onda inferior */}
            <div className="relative z-10 shrink-0 bg-primary -mb-px">
                <svg viewBox="0 0 1440 100" className="w-full block text-surface h-20 sm:h-28 translate-y-[1px] scale-y-[1.02] origin-bottom" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,50L80,58C160,66,320,82,480,84C640,86,800,74,960,62C1120,50,1280,38,1360,32L1440,26L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z" />
                </svg>
            </div>
        </section>
    );
}
