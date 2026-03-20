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

/* ─── Funciones detalladas del Consejo Escolar ─── */
const FUNCIONES = [
    {
        id: 'administracion-fondos',
        title: 'Administración de fondos',
        tagline: 'Gestión financiera',
        intro: 'El Consejo Escolar administra los fondos que la Provincia de Buenos Aires destina al funcionamiento del sistema educativo del distrito de Merlo, asegurando la correcta distribución y transparencia en el uso de los recursos públicos.',
        detalles: [
            {
                subtitulo: 'Fondo Descentralizado',
                texto: 'Administración del Fondo Descentralizado asignado por la Dirección General de Cultura y Educación. Estos recursos se destinan al mantenimiento, reparación y mejora de los establecimientos educativos del distrito.',
            },
            {
                subtitulo: 'Partidas especiales',
                texto: 'Gestión de partidas presupuestarias especiales que la Provincia asigna para proyectos específicos, como refacciones mayores, ampliaciones o emergencias edilicias en las escuelas.',
            },
            {
                subtitulo: 'Rendición de cuentas',
                texto: 'Elaboración de rendiciones de cuentas ante los organismos de control provincial, garantizando la transparencia y el correcto uso de los fondos públicos destinados a la educación.',
            },
        ],
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.637.392M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        imagen: null, /* { src: '/storage/...', alt: '...' } */
    },
    {
        id: 'infraestructura-escolar',
        title: 'Infraestructura escolar',
        tagline: 'Obras y mantenimiento',
        intro: 'El Consejo Escolar gestiona toda la infraestructura edilicia de los establecimientos educativos del distrito: construcción de nuevas escuelas, ampliaciones, refacciones, mantenimiento preventivo y reparaciones de emergencia.',
        detalles: [
            {
                subtitulo: 'Obras mayores',
                texto: 'Coordinación con la Dirección Provincial de Infraestructura Escolar (DPIE) para la ejecución de obras de construcción, ampliación y refacción mayor en los establecimientos educativos del distrito.',
            },
            {
                subtitulo: 'Mantenimiento y reparaciones',
                texto: 'Gestión del mantenimiento preventivo y correctivo de los edificios escolares, incluyendo instalaciones eléctricas, sanitarias, de gas, techos, pisos y pintura general.',
            },
            {
                subtitulo: 'Trabajos menores',
                texto: 'Ejecución de trabajos menores de reparación y adecuación en las escuelas, atendiendo las necesidades urgentes que surgen durante el ciclo lectivo para garantizar condiciones edilicias adecuadas.',
            },
        ],
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
        ),
        imagen: null, /* { src: '/storage/...', alt: '...' } */
    },
    {
        id: 'comedores-escolares',
        title: 'Comedores escolares y SAE',
        tagline: 'Servicio Alimentario Escolar',
        intro: 'El Consejo Escolar supervisa y administra el Servicio Alimentario Escolar (SAE) en el distrito de Merlo, garantizando la correcta prestación del servicio de comedores en las escuelas públicas y asegurando una alimentación adecuada para los alumnos.',
        detalles: [
            {
                subtitulo: 'Servicio Alimentario Escolar (SAE)',
                texto: 'Supervisión de la prestación del Servicio Alimentario Escolar, programa de la Dirección General de Cultura y Educación que provee desayuno, almuerzo y/o merienda a los alumnos de las escuelas públicas del distrito.',
            },
            {
                subtitulo: 'Control de prestadores',
                texto: 'Fiscalización de los prestadores del servicio de comedores escolares, asegurando el cumplimiento de las normas de higiene, calidad nutricional y cantidad de raciones establecidas por la normativa provincial.',
            },
            {
                subtitulo: 'Módulos alimentarios',
                texto: 'Gestión y distribución de los módulos alimentarios destinados a los establecimientos educativos, coordinando con las autoridades escolares para garantizar la cobertura del servicio.',
            },
        ],
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.126-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265z" />
            </svg>
        ),
        imagen: null, /* { src: '/storage/...', alt: '...' } */
    },
    {
        id: 'transporte-escolar',
        title: 'Transporte escolar',
        tagline: 'Acceso a la educación',
        intro: 'El Consejo Escolar organiza y controla el servicio de transporte escolar del distrito, garantizando el acceso a la educación de los alumnos que residen en zonas alejadas de los establecimientos educativos.',
        detalles: [
            {
                subtitulo: 'Organización del servicio',
                texto: 'Planificación y coordinación de las rutas y recorridos del transporte escolar, asegurando la cobertura de las zonas del distrito donde los alumnos no tienen acceso directo a los establecimientos educativos.',
            },
            {
                subtitulo: 'Contratación de prestadores',
                texto: 'Gestión de la contratación de los servicios de transporte escolar conforme a la normativa vigente, velando por el cumplimiento de los requisitos de seguridad, habilitación vehicular y aptitud de los conductores.',
            },
            {
                subtitulo: 'Fiscalización y seguridad',
                texto: 'Control y fiscalización del servicio de transporte para garantizar las condiciones de seguridad de los alumnos, verificando que los vehículos cumplan con las normas de seguridad vial y seguros obligatorios.',
            },
        ],
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
        ),
        imagen: null, /* { src: '/storage/...', alt: '...' } */
    },
    {
        id: 'personal-auxiliar',
        title: 'Personal auxiliar',
        tagline: 'Gestión de recursos humanos',
        intro: 'El Consejo Escolar tiene a su cargo la gestión y administración del personal auxiliar que presta servicios en los establecimientos educativos del distrito de Merlo, asegurando el correcto funcionamiento operativo de las escuelas.',
        detalles: [
            {
                subtitulo: 'Designación y gestión',
                texto: 'Administración integral del personal auxiliar de las escuelas del distrito: porteros, cocineros, serenos y personal de maestranza. Incluye designaciones, traslados, licencias y todo lo relativo a la gestión de estos agentes.',
            },
            {
                subtitulo: 'Actos públicos',
                texto: 'Organización de los actos públicos para la cobertura de cargos vacantes de auxiliares, conforme al orden de mérito establecido por la normativa vigente y el escalafón correspondiente.',
            },
            {
                subtitulo: 'Condiciones laborales',
                texto: 'Supervisión de las condiciones laborales del personal auxiliar, velando por el cumplimiento de la normativa laboral y los derechos de los trabajadores del sistema educativo.',
            },
        ],
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        ),
        imagen: null, /* { src: '/storage/...', alt: '...' } */
    },
    {
        id: 'mobiliario-equipamiento',
        title: 'Mobiliario y equipamiento',
        tagline: 'Recursos materiales',
        intro: 'El Consejo Escolar gestiona la provisión, distribución y mantenimiento del mobiliario escolar, el equipamiento didáctico y los elementos necesarios para el correcto funcionamiento de los establecimientos educativos del distrito.',
        detalles: [
            {
                subtitulo: 'Provisión de mobiliario',
                texto: 'Gestión de la compra y distribución de mobiliario escolar: bancos, pupitres, escritorios, sillas, pizarrones, estanterías y demás elementos necesarios para las aulas y dependencias escolares.',
            },
            {
                subtitulo: 'Equipamiento didáctico',
                texto: 'Coordinación de la provisión de equipamiento didáctico y tecnológico para los establecimientos educativos, en articulación con los programas provinciales de modernización escolar.',
            },
            {
                subtitulo: 'Insumos y materiales',
                texto: 'Compra y distribución de insumos de limpieza, materiales de mantenimiento y elementos de uso cotidiano necesarios para el funcionamiento diario de las escuelas del distrito.',
            },
        ],
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
        ),
        imagen: null, /* { src: '/storage/...', alt: '...' } */
    },
];

/* ─── Marco legal de referencia ─── */
const MARCO_LEGAL = [
    { norma: 'Ley de Educación Provincial Nº 13.688', anio: '2007' },
    { norma: 'Ley Orgánica de Consejos Escolares', anio: '1987' },
    { norma: 'Ley de Educación Nacional Nº 26.206', anio: '2006' },
];

/* ─── Componente principal ─── */
export default function Funcionalidades({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToId = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            <Head title="Funcionalidades – Consejo Escolar de Merlo" />

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
                                    ¿Qué hacemos?
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
                                    Funcionalidades
                                    <span className="text-brand-gold-400">.</span>
                                </h1>
                                <div className="mt-5 w-20 h-1 bg-brand-gold-400 rounded-full" />
                                <p className="mt-5 text-lg sm:text-xl text-brand-blue-200/90 leading-relaxed max-w-xl font-light">
                                    Conocé en detalle cada una de las funciones y competencias que desempeña el Consejo Escolar de Merlo para el sistema educativo del distrito.
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

                {/* ══════ RESUMEN RÁPIDO ══════ */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="max-w-3xl mb-12">
                            <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Competencias</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                                Áreas de<br />
                                <span className="text-brand-blue-600">intervención</span>
                            </h2>
                            <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                            <p className="mt-6 text-gray-500 text-base sm:text-lg font-light leading-relaxed">
                                El Consejo Escolar desempeña funciones clave establecidas por la Ley de Educación Provincial Nº 13.688 y la Ley Orgánica de Consejos Escolares para garantizar el correcto funcionamiento del sistema educativo en el distrito de Merlo.
                            </p>
                        </div>

                        {/* Grid de cards resumen con navegación interna */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {FUNCIONES.map((f, i) => (
                                <button
                                    key={f.id}
                                    onClick={() => scrollToId(f.id)}
                                    className="group text-left flex flex-col gap-4 rounded-2xl border border-brand-blue-100 bg-white p-7 hover:bg-brand-blue-50/40 hover:border-brand-blue-200 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-brand-blue-50 text-brand-blue-400 flex items-center justify-center shrink-0 group-hover:bg-brand-blue-100 transition-colors">
                                            {f.icon}
                                        </div>
                                        <span className="text-xs font-bold text-brand-gold-400 tracking-widest">0{i + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-base mb-1.5">{f.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{f.intro}</p>
                                    </div>
                                    <span className="text-brand-blue-500 text-sm font-medium flex items-center gap-1.5 mt-auto group-hover:gap-2.5 transition-all">
                                        Ver detalle
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                        </svg>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════ SECCIONES DETALLADAS ══════ */}
                {FUNCIONES.map((funcion, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                        <section
                            key={funcion.id}
                            id={funcion.id}
                            className={`py-16 sm:py-20 ${isEven ? 'bg-brand-blue-50/40' : 'bg-white'} scroll-mt-20`}
                        >
                            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                                {/* Encabezado de la función */}
                                <div className="flex items-start gap-5 mb-10">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-blue-600 text-white flex items-center justify-center shrink-0">
                                        {funcion.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-2">{funcion.tagline}</p>
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                                            {funcion.title}
                                        </h2>
                                        <div className="mt-4 w-16 h-1 bg-brand-gold-400 rounded-full" />
                                    </div>
                                </div>

                                {/* Layout: contenido + imagen opcional */}
                                <div className={`grid ${funcion.imagen ? 'lg:grid-cols-5' : 'lg:grid-cols-1'} gap-10 items-start`}>

                                    {/* Contenido principal */}
                                    <div className={funcion.imagen ? 'lg:col-span-3' : ''}>
                                        <p className="text-lg text-gray-700 leading-relaxed font-light mb-8">
                                            {funcion.intro}
                                        </p>

                                        <div className="space-y-5">
                                            {funcion.detalles.map((d, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex items-start gap-5 px-6 py-6 rounded-xl border ${
                                                        isEven
                                                            ? 'border-brand-blue-100 bg-white'
                                                            : 'border-gray-100 bg-brand-blue-50/30'
                                                    } hover:border-brand-blue-200 transition-all duration-200`}
                                                >
                                                    <div className="flex flex-col items-center shrink-0 mt-0.5">
                                                        <div className="w-8 h-8 rounded-lg bg-brand-blue-50 text-brand-blue-500 flex items-center justify-center">
                                                            <span className="text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 mb-1.5">{d.subtitulo}</p>
                                                        <p className="text-gray-500 text-sm leading-relaxed">{d.texto}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Imagen opcional */}
                                    {funcion.imagen && (
                                        <div className="lg:col-span-2">
                                            <div className="rounded-2xl overflow-hidden border border-brand-blue-100 bg-white aspect-[4/3]">
                                                <img
                                                    src={funcion.imagen.src}
                                                    alt={funcion.imagen.alt || ''}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    );
                })}

                {/* ══════ MARCO LEGAL ══════ */}
                <section className="relative">
                    <div className="bg-white">
                        <svg viewBox="0 0 1440 56" className="w-full block text-brand-blue-800" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>

                    <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />

                        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
                            <div className="text-center mb-12">
                                <p className="text-xs font-semibold text-brand-gold-400 tracking-[0.2em] uppercase mb-4">Legislación</p>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                                    Marco normativo de referencia
                                </h2>
                                <div className="mt-5 w-16 h-1 bg-brand-gold-400 mx-auto rounded-full" />
                                <p className="mt-6 text-brand-blue-200/80 text-base font-light leading-relaxed max-w-2xl mx-auto">
                                    Todas las funciones del Consejo Escolar se enmarcan en la legislación provincial y nacional vigente.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-4">
                                {MARCO_LEGAL.map((ley, i) => (
                                    <div key={i} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm px-5 py-4">
                                        <span className="text-lg font-extrabold text-brand-gold-400 leading-none">{ley.anio}</span>
                                        <span className="text-sm text-brand-blue-100">{ley.norma}</span>
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

                {/* ══════ CTA ══════ */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                        <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">¿Tenés consultas?</p>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                            Comunicate con nosotros
                        </h2>
                        <div className="w-16 h-1 bg-brand-gold-400 mx-auto rounded-full mb-6" />
                        <p className="text-gray-500 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-8">
                            Si necesitás más información sobre alguna de nuestras funciones o querés realizar una consulta, podés contactarnos por los canales disponibles.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-gold-400 text-white text-base font-semibold rounded-lg hover:bg-brand-gold-500 transition-all duration-200 shadow-lg shadow-brand-gold-400/20"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                Ir a Contacto
                            </Link>
                            <Link
                                href="/institucional"
                                className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-200 text-gray-700 text-base font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
                            >
                                Conocer la institución
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ══════ FOOTER ══════ */}
                <footer className="bg-white border-t border-gray-100">
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
