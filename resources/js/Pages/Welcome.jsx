import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

/* ─── Íconos SVG simples ─── */
const IconMoney = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.637.392M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const IconBuilding = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
);
const IconTruck = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
);
const IconUsers = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
);
const IconClipboard = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
);

/* ─── Datos ─── */
const NAV_ITEMS = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Institucional', href: '#institucional' },
    { label: 'Funciones', href: '#funciones' },
    { label: 'Autoridades', href: '#autoridades' },
    { label: 'Contacto', href: '#contacto' },
];

const FUNCIONES = [
    { icon: <IconMoney />, title: 'Administración de fondos', desc: 'Administración de fondos destinados al sistema educativo del distrito.' },
    { icon: <IconBuilding />, title: 'Infraestructura escolar', desc: 'Gestión de infraestructura escolar: mantenimiento, reparaciones y obras.' },
    { icon: <IconTruck />, title: 'Servicios escolares', desc: 'Supervisión de servicios escolares: comedores, transporte y mobiliario.' },
    { icon: <IconUsers />, title: 'Coordinación educativa', desc: 'Coordinación con directivos, docentes y la comunidad educativa.' },
    { icon: <IconClipboard />, title: 'Personal auxiliar', desc: 'Gestión del personal auxiliar de las instituciones educativas.' },
];

const AUTORIDADES_PRINCIPALES = [
    { cargo: 'Presidenta', nombre: 'Lic. María José Barrionuevo' },
    { cargo: 'Vicepresidente', nombre: 'Pablo Robinson Duarte' },
    { cargo: 'Tesorero', nombre: 'Gabriel Aniceto González' },
    { cargo: 'Secretario', nombre: 'Juan Carlos Ojeda' },
];

const VOCALES = [
    '1º Vocal – Aldio Mario Capece',
    '2º Vocal – Laura Leguizamón',
    '3º Vocal – Juan Sebastián Azarko',
    '4º Vocal – Hugo Osvaldo Gerstner',
    '5º Vocal – Nilda Gabriela Zapata',
    '6º Vocal – María Graciela Scutella',
];

/* ─── Componente principal ─── */
export default function Welcome({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (e, href) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Head title="Consejo Escolar de Merlo" />

            <div className="bg-white text-gray-800 font-sans antialiased">

                {/* ══════ HEADER ══════ */}
                <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16">
                        <a href="#inicio" onClick={(e) => scrollTo(e, '#inicio')} className="flex items-center gap-3 shrink-0">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${scrolled ? 'bg-brand-blue-400' : 'bg-white/15 border border-white/25'}`}>
                                <span className="text-white font-bold text-sm">CE</span>
                            </div>
                            <span className={`hidden sm:block text-sm font-semibold leading-tight transition-colors duration-300 ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                                Consejo Escolar
                                <span className={scrolled ? 'text-brand-blue-400' : 'text-brand-gold-300'}> de Merlo</span>
                            </span>
                        </a>

                        {/* Nav desktop */}
                        <nav className="hidden md:flex items-center gap-1">
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => scrollTo(e, item.href)}
                                    className={`px-3 py-2 text-sm transition-colors duration-300 rounded-md ${
                                        scrolled
                                            ? 'text-gray-600 hover:text-brand-blue-500'
                                            : 'text-white/80 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </a>
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
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={(e) => scrollTo(e, item.href)}
                                        className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                    >
                                        {item.label}
                                    </a>
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
                <section id="inicio" className="relative h-screen min-h-[600px] flex flex-col overflow-hidden">
                    <div className="flex-1 relative bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900">
                        {/* Patrón sutil */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />
                        {/* Línea decorativa lateral */}
                        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-brand-gold-400/30 hidden lg:block" />
                        {/* Círculo decorativo */}
                        <div className="absolute -right-32 -bottom-32 w-[500px] h-[500px] rounded-full border border-white/[0.04]" />
                        <div className="absolute -right-20 -bottom-20 w-[350px] h-[350px] rounded-full border border-white/[0.06]" />

                        <div className="relative flex items-center h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16">
                            <div className="max-w-3xl">
                                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 rounded-full bg-white/[0.08] backdrop-blur-sm text-brand-blue-100 text-sm font-medium tracking-wide uppercase border border-white/[0.08]">
                                    <span className="w-2 h-2 rounded-full bg-brand-gold-400 animate-pulse" />
                                    Provincia de Buenos Aires
                                </div>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.05] tracking-tight">
                                    Consejo
                                    <br />
                                    Escolar
                                    <span className="text-brand-gold-400">.</span>
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
                                    <a
                                        href="#contacto"
                                        onClick={(e) => scrollTo(e, '#contacto')}
                                        className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-base font-medium rounded-lg hover:bg-white/10 transition-all duration-200"
                                    >
                                        Contacto
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Indicador de scroll */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-blue-300/60">
                            <span className="text-xs tracking-widest uppercase">Scroll</span>
                            <div className="w-5 h-8 rounded-full border-2 border-brand-blue-300/30 flex justify-center pt-1.5">
                                <div className="w-1 h-2 bg-brand-blue-300/50 rounded-full animate-bounce" />
                            </div>
                        </div>
                    </div>
                    {/* Onda inferior */}
                    <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900 shrink-0">
                        <svg viewBox="0 0 1440 56" className="w-full block text-white" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ INSTITUCIONAL ══════ */}
                <section id="institucional" className="py-20 sm:py-24 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="grid lg:grid-cols-2 gap-12 items-start">

                            {/* Columna izquierda – título + párrafos */}
                            <div>
                                <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Institucional</p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                                    ¿Qué es el<br />
                                    <span className="text-brand-blue-600">Consejo Escolar?</span>
                                </h2>
                                <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                                <p className="mt-8 text-lg sm:text-xl text-gray-700 leading-relaxed font-light">
                                    El Consejo Escolar de Merlo es un <strong className="font-semibold text-gray-900">organismo público</strong> del sistema educativo de la Provincia de Buenos Aires, encargado de administrar y gestionar los recursos y servicios de las escuelas públicas del distrito.
                                </p>
                                <p className="mt-6 text-base text-gray-500 leading-relaxed">
                                    Depende de la Dirección General de Cultura y Educación y actúa como órgano descentralizado a nivel local, garantizando el correcto funcionamiento de los establecimientos escolares.
                                </p>
                            </div>

                            {/* Columna derecha – pilares en cards */}
                            <div className="space-y-3">
                                {[
                                    {
                                        num: '01',
                                        title: 'Organismo público provincial',
                                        desc: 'Integrado al sistema educativo de la Provincia de Buenos Aires con funciones específicas en el distrito de Merlo.',
                                        icon: (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        num: '02',
                                        title: 'Órgano descentralizado',
                                        desc: 'Funciona de manera autónoma a nivel local, dependiendo de la Dirección General de Cultura y Educación bonaerense.',
                                        icon: (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-6.364-6.364L4.5 8.25l4.5 4.5" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        num: '03',
                                        title: 'Garantía educativa',
                                        desc: 'Asegura el correcto funcionamiento de los servicios escolares, la infraestructura y los recursos del distrito.',
                                        icon: (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
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
                    </div>
                </section>

                {/* ══════ FUNCIONES ══════ */}
                <section id="funciones" className="py-20 sm:py-24 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="max-w-3xl mx-auto text-center mb-14">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Funciones principales
                            </h2>
                            <div className="mt-3 w-12 h-1 bg-brand-gold-400 mx-auto rounded-full" />
                            <p className="mt-4 text-gray-500 text-sm">
                                El Consejo Escolar desempeña funciones clave para el sistema educativo del distrito de Merlo.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                            {FUNCIONES.map((f, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-blue-200 hover:shadow-sm transition-all duration-200"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-brand-blue-50 text-brand-blue-400 flex items-center justify-center mb-4">
                                        {f.icon}
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-sm mb-2">{f.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════ COMPOSICIÓN ══════ */}
                <section className="py-20 sm:py-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                        ¿Cómo se compone?
                                    </h2>
                                    <div className="mt-3 w-12 h-1 bg-brand-gold-400 rounded-full" />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        El Consejo Escolar de Merlo está integrado por <strong className="text-gray-800">diez Consejeros Escolares Titulares</strong> elegidos por voto popular.
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Cada consejero cumple un mandato de cuatro años, renovándose la mitad del cuerpo cada dos años.
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Dentro del Consejo se designan las autoridades del organismo: presidente, vicepresidente, secretario y tesorero.
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Los consejeros representan distintos espacios políticos del distrito y trabajan en la administración y supervisión de los recursos destinados a las escuelas públicas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════ AUTORIDADES ══════ */}
                <section id="autoridades" className="py-20 sm:py-24 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="max-w-3xl mx-auto text-center mb-14">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Autoridades
                            </h2>
                            <div className="mt-3 w-12 h-1 bg-brand-gold-400 mx-auto rounded-full" />
                        </div>

                        {/* Principales */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-12">
                            {AUTORIDADES_PRINCIPALES.map((a, i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                                    <div className="w-16 h-16 rounded-full bg-brand-blue-50 mx-auto mb-4 flex items-center justify-center">
                                        <svg className="w-7 h-7 text-brand-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs font-semibold text-brand-blue-400 uppercase tracking-wider mb-1">{a.cargo}</p>
                                    <p className="font-medium text-gray-900 text-sm">{a.nombre}</p>
                                </div>
                            ))}
                        </div>

                        {/* Vocales */}
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">Vocales</h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {VOCALES.map((v, i) => (
                                    <div key={i} className="bg-white rounded-lg border border-gray-100 px-5 py-3.5 text-sm text-gray-700">
                                        {v}
                                    </div>
                                ))}
                            </div>

                            {/* Secretaria Administrativa */}
                            <div className="mt-6 bg-white rounded-lg border border-gray-100 px-5 py-4 text-center max-w-sm mx-auto">
                                <p className="text-xs font-semibold text-brand-blue-400 uppercase tracking-wider mb-1">Secretaria Administrativa</p>
                                <p className="text-sm font-medium text-gray-900">Daniela Ester Escudero</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════ CONTACTO ══════ */}
                <section id="contacto" className="py-20 sm:py-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="max-w-3xl mx-auto text-center mb-14">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Contacto
                            </h2>
                            <div className="mt-3 w-12 h-1 bg-brand-gold-400 mx-auto rounded-full" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Info */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Consejo Escolar de Merlo</h3>
                                    <p className="text-gray-500 text-sm">Organismo descentralizado de la Dirección General de Cultura y Educación.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-brand-blue-50 flex items-center justify-center text-brand-blue-400 shrink-0 mt-0.5">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Dirección</p>
                                            <p className="text-sm text-gray-500">Avenida Calle Real 208/212, Merlo Centro</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-brand-blue-50 flex items-center justify-center text-brand-blue-400 shrink-0 mt-0.5">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Teléfono</p>
                                            <p className="text-sm text-gray-500">0220-482-5836</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-brand-blue-50 flex items-center justify-center text-brand-blue-400 shrink-0 mt-0.5">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Horario</p>
                                            <p className="text-sm text-gray-500">Lunes a viernes de 8 a 14 hs</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mapa */}
                            <div className="rounded-xl overflow-hidden border border-gray-200 h-72 md:h-auto min-h-[280px]">
                                <iframe
                                    title="Ubicación Consejo Escolar de Merlo"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.8!2d-58.7276!3d-34.6714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbf3a0b1c7b3d%3A0x0!2sAv.%20Calle%20Real%20208%2C%20Merlo%2C%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1"
                                    className="w-full h-full"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════ FOOTER ══════ */}
                <footer className="bg-gray-900 text-gray-400">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-9 h-9 rounded-full bg-brand-blue-400 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">CE</span>
                                    </div>
                                    <span className="text-white font-semibold text-sm">Consejo Escolar de Merlo</span>
                                </div>
                                <p className="text-sm leading-relaxed max-w-md">
                                    Organismo descentralizado de la Dirección General de Cultura y Educación de la Provincia de Buenos Aires.
                                </p>
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm mb-3">Navegación</p>
                                <nav className="flex flex-col gap-2">
                                    {NAV_ITEMS.map((item) => (
                                        <a
                                            key={item.href}
                                            href={item.href}
                                            onClick={(e) => scrollTo(e, item.href)}
                                            className="text-sm text-gray-400 hover:text-white transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
                            © {new Date().getFullYear()} Consejo Escolar de Merlo. Todos los derechos reservados.
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}
