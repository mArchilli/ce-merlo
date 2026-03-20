import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

/* ─── Navegación ─── */
const NAV_ITEMS = [
    { label: 'Inicio', href: '/' },
    { label: 'Institucional', href: '/institucional' },
    { label: 'Funcionalidades', href: '/funcionalidades' },
    { label: 'Autoridades', href: '/autoridades' },
    { label: 'Contacto', href: '/contacto' },
];

/* ─── Autoridades principales ─── */
const AUTORIDADES_PRINCIPALES = [
    {
        cargo: 'Presidenta',
        nombre: 'Lic. María José Barrionuevo',
        descripcion: 'Responsable de la conducción del Consejo Escolar, preside las sesiones y representa al organismo ante las autoridades provinciales y la comunidad educativa del distrito.',
        foto: null, /* { src: '/storage/...', alt: '...' } */
    },
    {
        cargo: 'Vicepresidente',
        nombre: 'Pablo Robinson Duarte',
        descripcion: 'Suplente de la presidencia, colabora en la conducción del Consejo y asume las funciones de presidente en caso de ausencia o impedimento.',
        foto: null,
    },
    {
        cargo: 'Tesorero',
        nombre: 'Gabriel Aniceto González',
        descripcion: 'Encargado de la administración financiera del Consejo: recepción, custodia y rendición de los fondos asignados por la Provincia.',
        foto: null,
    },
    {
        cargo: 'Secretario',
        nombre: 'Juan Carlos Ojeda',
        descripcion: 'Responsable de la documentación, actas de sesiones, correspondencia oficial y el registro administrativo del Consejo Escolar.',
        foto: null,
    },
];

/* ─── Vocales titulares ─── */
const VOCALES = [
    { orden: '1º Vocal', nombre: 'Aldio Mario Capece' },
    { orden: '2º Vocal', nombre: 'Laura Leguizamón' },
    { orden: '3º Vocal', nombre: 'Juan Sebastián Azarko' },
    { orden: '4º Vocal', nombre: 'Hugo Osvaldo Gerstner' },
    { orden: '5º Vocal', nombre: 'Nilda Gabriela Zapata' },
    { orden: '6º Vocal', nombre: 'María Graciela Scutella' },
];

/* ─── Secretaria Administrativa ─── */
const SECRETARIA = {
    cargo: 'Secretaria Administrativa',
    nombre: 'Daniela Ester Escudero',
    descripcion: 'Coordinación de la gestión administrativa diaria del Consejo Escolar, enlace entre las áreas operativas y el cuerpo de consejeros.',
    foto: null,
};

/* ─── Componente principal ─── */
export default function Autoridades({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <Head title="Autoridades – Consejo Escolar de Merlo" />

            <div className="bg-white text-gray-800 font-sans antialiased">

                {/* ══════ HEADER ══════ */}
                <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-3 shrink-0">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${scrolled ? 'bg-brand-blue-400' : 'bg-white/15 border border-white/25'}`}>
                                <span className="text-white font-bold text-sm">CE</span>
                            </div>
                            <span className={`hidden sm:block text-sm font-semibold leading-tight transition-colors duration-300 ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                                Consejo Escolar
                                <span className={scrolled ? 'text-brand-blue-400' : 'text-brand-gold-300'}> de Merlo</span>
                            </span>
                        </Link>

                        {/* Nav desktop */}
                        <nav className="hidden md:flex items-center gap-1">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-3 py-2 text-sm transition-colors duration-300 rounded-md ${
                                        scrolled
                                            ? 'text-gray-600 hover:text-brand-blue-500'
                                            : 'text-white/80 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {auth?.user && (
                                <Link
                                    href={route('dashboard')}
                                    className={`ml-2 px-4 py-2 text-sm rounded-md transition-colors duration-300 ${
                                        scrolled
                                            ? 'bg-brand-blue-400 text-white hover:bg-brand-blue-500'
                                            : 'bg-white/15 border border-white/25 text-white hover:bg-white/25'
                                    }`}
                                >
                                    Panel admin
                                </Link>
                            )}
                        </nav>

                        {/* Hamburger */}
                        <button
                            className={`md:hidden p-2 transition-colors duration-300 ${scrolled ? 'text-gray-600' : 'text-white'}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Menú"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {mobileMenuOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                }
                            </svg>
                        </button>
                    </div>

                    {/* Nav móvil */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
                            <nav className="flex flex-col px-4 py-3 gap-1">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                {auth?.user && (
                                    <Link href={route('dashboard')} className="px-3 py-2.5 text-sm text-brand-blue-500 font-medium">
                                        Panel admin
                                    </Link>
                                )}
                            </nav>
                        </div>
                    )}
                </header>

                {/* ══════ HERO ══════ */}
                <section className="relative min-h-[380px] sm:min-h-[420px] flex flex-col overflow-hidden">
                    <div className="flex-1 relative bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900">
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />
                        <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] rounded-full border border-white/[0.04]" />
                        <div className="absolute -right-20 -bottom-20 w-[280px] h-[280px] rounded-full border border-white/[0.06]" />
                        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-brand-gold-400/30 hidden lg:block" />

                        <div className="relative flex items-center h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 rounded-full bg-white/[0.08] backdrop-blur-sm text-brand-blue-100 text-sm font-medium tracking-wide uppercase border border-white/[0.08]">
                                    <span className="w-2 h-2 rounded-full bg-brand-gold-400 animate-pulse" />
                                    Equipo de trabajo
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
                                    Autoridades
                                    <span className="text-brand-gold-400">.</span>
                                </h1>
                                <div className="mt-5 w-20 h-1 bg-brand-gold-400 rounded-full" />
                                <p className="mt-5 text-lg sm:text-xl text-brand-blue-200/90 leading-relaxed max-w-xl font-light">
                                    Conocé a los consejeros escolares elegidos democráticamente por la comunidad de Merlo para administrar y gestionar los recursos educativos del distrito.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900 shrink-0">
                        <svg viewBox="0 0 1440 56" className="w-full block text-white" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ COMPOSICIÓN DEL CONSEJO ══════ */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="grid lg:grid-cols-2 gap-12 items-start">

                            <div>
                                <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Composición</p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                                    ¿Cómo se integra el<br />
                                    <span className="text-brand-blue-600">Consejo Escolar?</span>
                                </h2>
                                <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                                <p className="mt-8 text-lg sm:text-xl text-gray-700 leading-relaxed font-light">
                                    El Consejo Escolar de Merlo está compuesto por <strong className="font-semibold text-gray-900">10 consejeros escolares titulares</strong>, elegidos por voto popular en elecciones generales, representando a la comunidad del distrito.
                                </p>
                                <p className="mt-6 text-base text-gray-500 leading-relaxed">
                                    Los consejeros cumplen un mandato de 4 años, renovándose la mitad del cuerpo cada 2 años. El cuerpo designa internamente sus autoridades: presidente, vicepresidente, secretario y tesorero.
                                </p>
                                <p className="mt-4 text-base text-gray-500 leading-relaxed">
                                    Además, cuenta con una Secretaría Administrativa y personal de apoyo para la gestión diaria del organismo.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                {[
                                    { valor: '10', label: 'Consejeros titulares', desc: 'Elegidos por voto popular.' },
                                    { valor: '4', label: 'Años de mandato', desc: 'Renovación parcial bienal.' },
                                    { valor: '4', label: 'Autoridades', desc: 'Presidente, vice, secretario y tesorero.' },
                                    { valor: '6', label: 'Vocales', desc: 'Participan en las sesiones y comisiones.' },
                                ].map((stat, i) => (
                                    <div key={i} className="rounded-2xl border border-brand-blue-100 bg-white p-6">
                                        <span className="text-3xl sm:text-4xl font-extrabold text-brand-blue-600 leading-none">{stat.valor}</span>
                                        <p className="mt-2 font-semibold text-gray-900 text-sm">{stat.label}</p>
                                        <p className="mt-1.5 text-gray-500 text-xs leading-relaxed">{stat.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════ AUTORIDADES PRINCIPALES ══════ */}
                <section className="relative">
                    <div className="bg-white">
                        <svg viewBox="0 0 1440 56" className="w-full block text-brand-blue-800" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>

                    <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />

                        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24">

                            <div className="text-center mb-14">
                                <p className="text-xs font-semibold text-brand-gold-400 tracking-[0.2em] uppercase mb-4">Cargos jerárquicos</p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                                    Autoridades principales
                                </h2>
                                <div className="mt-5 w-16 h-1 bg-brand-gold-400 mx-auto rounded-full" />
                                <p className="mt-6 text-brand-blue-200/80 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                                    Designados internamente por el cuerpo de consejeros para conducir el organismo.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                                {AUTORIDADES_PRINCIPALES.map((a, i) => (
                                    <div key={i} className="group rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm overflow-hidden">
                                        <div className="h-1 bg-gradient-to-r from-brand-gold-400 to-brand-gold-300" />
                                        <div className="flex gap-5 p-6 sm:p-7">
                                            {/* Foto o placeholder */}
                                            <div className="shrink-0">
                                                {a.foto ? (
                                                    <img
                                                        src={a.foto.src}
                                                        alt={a.foto.alt || a.nombre}
                                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-white/10"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-brand-gold-400/10 flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-brand-gold-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-brand-gold-400 uppercase tracking-wider mb-2">{a.cargo}</p>
                                                <p className="font-semibold text-white text-lg leading-snug mb-2">{a.nombre}</p>
                                                <p className="text-sm text-brand-blue-200/70 leading-relaxed">{a.descripcion}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900">
                        <svg viewBox="0 0 1440 56" className="w-full block text-white" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ VOCALES ══════ */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="max-w-xl mb-12">
                            <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Consejeros</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                                Vocales<br />
                                <span className="text-brand-blue-600">titulares</span>
                            </h2>
                            <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                            <p className="mt-6 text-gray-500 text-base font-light leading-relaxed">
                                Los vocales participan en las sesiones del Consejo, integran comisiones de trabajo y colaboran en la toma de decisiones sobre los recursos y servicios educativos del distrito.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {VOCALES.map((v, i) => (
                                <div
                                    key={i}
                                    className="group flex items-start gap-5 px-6 py-6 rounded-xl border border-gray-100 bg-white hover:bg-brand-blue-50/60 hover:border-brand-blue-100 transition-all duration-200"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-brand-blue-50 text-brand-blue-400 flex items-center justify-center shrink-0 group-hover:bg-brand-blue-100 transition-colors">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-brand-gold-500 uppercase tracking-wider mb-1.5">{v.orden}</p>
                                        <p className="font-semibold text-gray-900 text-[15px]">{v.nombre}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════ SECRETARÍA ADMINISTRATIVA ══════ */}
                <section className="py-16 sm:py-20 bg-brand-blue-50/40">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="max-w-xl mb-12">
                            <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Gestión administrativa</p>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                Secretaría<br />
                                <span className="text-brand-blue-600">Administrativa</span>
                            </h2>
                            <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                        </div>

                        <div className="max-w-3xl">
                            <div className="flex flex-col sm:flex-row items-start gap-6 rounded-2xl border border-brand-blue-100 bg-white p-7 sm:p-8">
                                {/* Foto o placeholder */}
                                <div className="shrink-0">
                                    {SECRETARIA.foto ? (
                                        <img
                                            src={SECRETARIA.foto.src}
                                            alt={SECRETARIA.foto.alt || SECRETARIA.nombre}
                                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-brand-blue-100"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-brand-blue-50 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-brand-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-brand-gold-500 uppercase tracking-wider mb-2">{SECRETARIA.cargo}</p>
                                    <p className="font-bold text-gray-900 text-xl mb-3">{SECRETARIA.nombre}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">{SECRETARIA.descripcion}</p>
                                    <p className="mt-4 text-gray-500 text-sm leading-relaxed">
                                        La Secretaría Administrativa es responsable de coordinar las tareas operativas del Consejo Escolar, gestionar la documentación, correspondencia y servir de enlace entre las distintas áreas del organismo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════ ELECCIÓN Y MANDATO ══════ */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="max-w-xl mb-12">
                            <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Proceso democrático</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                                Elección y<br />
                                <span className="text-brand-blue-600">mandato</span>
                            </h2>
                            <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[
                                {
                                    num: '01',
                                    title: 'Elección por voto popular',
                                    desc: 'Los consejeros escolares son elegidos por los ciudadanos del distrito de Merlo en elecciones generales, junto con las autoridades ejecutivas y legislativas.',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                    ),
                                },
                                {
                                    num: '02',
                                    title: 'Mandato de cuatro años',
                                    desc: 'Cada consejero cumple un mandato de 4 años. Cada 2 años se renueva la mitad del cuerpo, garantizando continuidad institucional y representación actualizada.',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                        </svg>
                                    ),
                                },
                                {
                                    num: '03',
                                    title: 'Representación plural',
                                    desc: 'Los 10 consejeros representan distintos espacios políticos del distrito, asegurando pluralidad y diversidad de perspectivas en las decisiones del organismo.',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                        </svg>
                                    ),
                                },
                                {
                                    num: '04',
                                    title: 'Designación interna de autoridades',
                                    desc: 'Una vez constituido el cuerpo, los consejeros eligen entre sí las autoridades: presidente, vicepresidente, secretario y tesorero del Consejo Escolar.',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    ),
                                },
                                {
                                    num: '05',
                                    title: 'Sesiones del cuerpo',
                                    desc: 'El Consejo sesiona en forma regular para tratar los temas de su competencia. Las decisiones se toman de forma colegiada, por mayoría de los consejeros presentes.',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                                        </svg>
                                    ),
                                },
                                {
                                    num: '06',
                                    title: 'Rango constitucional',
                                    desc: 'Los Consejos Escolares están previstos en el artículo 203 de la Constitución de la Provincia de Buenos Aires, lo que les otorga rango constitucional dentro del sistema educativo.',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
                                        </svg>
                                    ),
                                },
                            ].map((item) => (
                                <div
                                    key={item.num}
                                    className="group flex items-start gap-5 px-6 py-6 rounded-xl border border-gray-100 bg-white/60 backdrop-blur-sm hover:bg-brand-blue-50/60 hover:border-brand-blue-100 transition-all duration-200 cursor-default"
                                >
                                    <span className="text-xs font-bold text-brand-gold-400 tracking-widest mt-1 w-5 shrink-0">{item.num}</span>
                                    <div className="w-10 h-10 rounded-lg bg-brand-blue-50 text-brand-blue-400 flex items-center justify-center shrink-0 group-hover:bg-brand-blue-100 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 mb-1.5">{item.title}</p>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════ CTA ══════ */}
                <section className="relative">
                    <div className="bg-white">
                        <svg viewBox="0 0 1440 56" className="w-full block text-brand-blue-800" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                    <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />

                        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 text-center">
                            <p className="text-xs font-semibold text-brand-gold-400 tracking-[0.2em] uppercase mb-4">Conocé más</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
                                Sobre el Consejo Escolar
                            </h2>
                            <div className="w-16 h-1 bg-brand-gold-400 mx-auto rounded-full mb-6" />
                            <p className="text-brand-blue-200/90 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-8">
                                Descubrí las funciones, la historia institucional y cómo contactarnos.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    href="/funcionalidades"
                                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-gold-400 text-white text-base font-semibold rounded-lg hover:bg-brand-gold-500 transition-all duration-200 shadow-lg shadow-brand-gold-400/20"
                                >
                                    Funcionalidades
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/contacto"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-base font-medium rounded-lg hover:bg-white/10 transition-all duration-200"
                                >
                                    Contacto
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900">
                        <svg viewBox="0 0 1440 56" className="w-full block text-white" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ FOOTER ══════ */}
                <footer className="bg-white">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-8">

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-200">

                            <div className="lg:col-span-2">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-11 h-11 rounded-full bg-brand-blue-700 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">CE</span>
                                    </div>
                                    <div>
                                        <span className="block text-base font-bold text-gray-900">Consejo Escolar de Merlo</span>
                                        <span className="block text-xs text-gray-400">Provincia de Buenos Aires</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                                    Organismo descentralizado de la Dirección General de Cultura y Educación de la Provincia de Buenos Aires, al servicio de la comunidad educativa del distrito.
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.15em] uppercase mb-4">Navegación</p>
                                <nav className="flex flex-col gap-2.5">
                                    <Link href="/" className="text-sm text-gray-500 hover:text-brand-blue-600 transition-colors">
                                        Inicio
                                    </Link>
                                    <Link href="/institucional" className="text-sm text-gray-500 hover:text-brand-blue-600 transition-colors">
                                        Institucional
                                    </Link>
                                    <Link href="/funcionalidades" className="text-sm text-gray-500 hover:text-brand-blue-600 transition-colors">
                                        Funcionalidades
                                    </Link>
                                    <Link href="/autoridades" className="text-sm text-gray-500 hover:text-brand-blue-600 transition-colors">
                                        Autoridades
                                    </Link>
                                    <Link href="/contacto" className="text-sm text-gray-500 hover:text-brand-blue-600 transition-colors">
                                        Contacto
                                    </Link>
                                </nav>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.15em] uppercase mb-4">Contacto</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-brand-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-500">Av. Calle Real 208/212</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-brand-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                        <span className="text-sm text-gray-500">0220-482-5836</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-brand-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-500">Lun a Vie, 8 a 14 hs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-gray-400">
                                © {new Date().getFullYear()} Consejo Escolar de Merlo. Todos los derechos reservados.
                            </p>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-blue-200" />
                                <span className="w-2 h-2 rounded-full bg-brand-blue-400" />
                                <span className="w-2 h-2 rounded-full bg-brand-gold-400" />
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}
