import { Link } from '@inertiajs/react';

export default function Hero({ scrollTo }) {
    return (
        <section id="inicio" className="relative h-screen min-h-[600px] flex flex-col overflow-hidden">
            <div className="flex-1 relative bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900 -mb-16">
                {/* Patrón sutil */}
                <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />
                
                {/* Círculo decorativo */}
                <div className="absolute -right-32 -bottom-32 w-[500px] h-[500px] rounded-full border border-white/[0.04]" />
                <div className="absolute -right-20 -bottom-20 w-[350px] h-[350px] rounded-full border border-white/[0.06]" />

                <div className="relative flex items-center justify-between h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 gap-12">
                    <div className="max-w-xl">
                        {/* Logo mobile: visible solo en < lg */}
                        <div className="flex lg:hidden mb-5">
                            <img
                                src="/logo-consejo-de-merlo.png"
                                alt="Logo Consejo Escolar de Merlo"
                                className="w-40 drop-shadow-2xl"
                            />
                        </div>
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 rounded-full bg-white/[0.08] backdrop-blur-sm text-brand-blue-100 text-sm font-medium tracking-wide uppercase border border-white/[0.08]">
                            <span className="w-2 h-2 rounded-full bg-brand-gold-400 animate-pulse" />
                            Provincia de Buenos Aires
                        </div>
                        <h1 className="text-6xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.05] tracking-tight">
                            Consejo
                            <br />
                            Escolar
                            <br />
                            <span className="text-brand-blue-200">de Merlo</span>
                        </h1>
                        <div className="mt-6 w-20 h-1 bg-brand-gold-400 rounded-full" />
                        <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-brand-blue-200/90 leading-relaxed max-w-2xl font-light">
                            Organismo responsable de la administración y gestión de los recursos y servicios de las escuelas públicas del distrito.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <a
                                href="#funciones"
                                onClick={(e) => scrollTo(e, '#funciones')}
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-gold-400 text-white text-base font-semibold rounded-lg hover:bg-brand-gold-500 transition-all duration-200 shadow-lg shadow-brand-gold-400/20"
                            >
                                Conocer funciones
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                </svg>
                            </a>
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-base font-medium rounded-lg hover:bg-white/10 transition-all duration-200"
                            >
                                Contacto
                            </Link>
                        </div>
                    </div>

                    {/* Logo derecha */}
                    <div className="hidden lg:flex items-center justify-center shrink-0">
                        <img
                            src="/logo-consejo-de-merlo.png"
                            alt="Logo Consejo Escolar de Merlo"
                            className="w-96 xl:w-[28rem] drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Indicador de scroll */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-brand-blue-300/60 animate-bounce">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {/* Onda inferior */}
            <div className="relative z-10 bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900 shrink-0">
                <svg viewBox="0 0 1440 100" className="w-full block text-white h-20 sm:h-28" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,50L80,58C160,66,320,82,480,84C640,86,800,74,960,62C1120,50,1280,38,1360,32L1440,26L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z" />
                </svg>
            </div>
        </section>
    );
}
