import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const NAV_MAIN = [
    { label: 'Inicio',      href: '/' },
    { label: 'Novedades',   href: '/novedades' },
    { label: 'Contacto',    href: '/contacto' },
];

const NAV_AREAS = [
    { label: 'Infraestructura',   href: '/areas/infraestructura' },
    { label: 'Recursos Humanos',  href: '/areas/recursos-humanos' },
    { label: 'Patrimonio',        href: '/areas/patrimonio' },
    { label: 'Coop. Escolar',     href: '/areas/cooperacion-escolar' },
    { label: 'SAE',               href: '/areas/sae' },
    { label: 'Descentralizados',  href: '/areas/descentralizados' },
];

/**
 * Barra de navegación pública compartida.
 *
 * @param {boolean} transparent  Si es true, la barra empieza transparente sobre
 *                               un hero oscuro y se vuelve blanca al hacer scroll.
 *                               Si es false (por defecto) siempre es blanca.
 */
export default function PublicNavbar({ transparent = false }) {
    const { auth }              = usePage().props;
    const currentUrl            = usePage().url;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [visible, setVisible]   = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Animate in/out
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
            const t = setTimeout(() => { document.body.style.overflow = ''; }, 300);
            return () => clearTimeout(t);
        }
    }, [menuOpen]);

    const close = () => setMenuOpen(false);
    const ghost  = transparent && !scrolled;

    const isActive = (href) => currentUrl === href || (href !== '/' && currentUrl.startsWith(href));

    return (
        <>
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${ghost ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-sm'}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 shrink-0">
                    <span className={`text-sm font-semibold leading-tight transition-colors duration-300 ${ghost ? 'text-white' : 'text-gray-800'}`}>
                        Consejo Escolar
                        <span className={ghost ? 'text-brand-gold-300' : 'text-brand-blue-400'}> de Merlo</span>
                    </span>
                </Link>

                {/* Hamburger — siempre visible */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-300 ${ghost ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`}
                    aria-label="Abrir menú"
                >
                    <span className={`text-[11px] font-bold tracking-[0.18em] uppercase ${ghost ? 'text-white' : 'text-gray-600'}`}>Menú</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </header>

        {/* ── Overlay full-screen ── */}
        {(menuOpen || visible) && (
            <div
                className="fixed inset-0 z-[100] flex flex-col transition-opacity duration-300"
                style={{
                    background: 'linear-gradient(135deg, #0F2A3D 0%, #1E3F58 60%, #162E43 100%)',
                    opacity: visible ? 1 : 0,
                }}
            >
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 sm:px-8 lg:px-12 h-16 shrink-0">
                    <Link href="/" onClick={close} className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-white leading-tight">
                            Consejo Escolar
                            <span className="text-brand-gold-300"> de Merlo</span>
                        </span>
                    </Link>
                    <button
                        onClick={close}
                        className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                        aria-label="Cerrar menú"
                    >
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Columns */}
                <div className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12 py-8 overflow-y-auto">
                    <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-0">

                        {/* Navegación */}
                        <div className="flex flex-col items-center gap-1 sm:pr-10 sm:border-r sm:border-white/15">
                            <p className="text-white font-bold text-xl sm:text-2xl mb-5 sm:mb-8 tracking-tight">Navegación</p>
                            {NAV_MAIN.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={close}
                                    className={`px-6 py-2.5 sm:py-3.5 rounded-lg text-base sm:text-xl font-medium transition-colors w-full text-center ${
                                        isActive(item.href)
                                            ? 'bg-white/20 text-white'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {auth?.user && (
                                <Link
                                    href={route('dashboard')}
                                    onClick={close}
                                    className="mt-5 px-6 py-2.5 rounded-lg bg-brand-gold-500 hover:bg-brand-gold-600 text-white text-base font-semibold transition-colors w-full text-center"
                                >
                                    Panel admin
                                </Link>
                            )}
                        </div>

                        {/* Áreas */}
                        <div className="flex flex-col items-center gap-1 sm:pl-10">
                            <p className="text-white font-bold text-xl sm:text-2xl mb-5 sm:mb-8 tracking-tight">Áreas</p>
                            {NAV_AREAS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={close}
                                    className={`px-6 py-2.5 sm:py-3.5 rounded-lg text-base sm:text-xl font-medium transition-colors w-full text-center ${
                                        isActive(item.href)
                                            ? 'bg-white/20 text-white'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer del overlay */}
                <div className="shrink-0 border-t border-white/10 px-6 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-white/40 text-sm">© {new Date().getFullYear()} Consejo Escolar de Merlo</p>
                    <div className="flex items-center gap-4">
                        <p className="text-white/40 text-sm">Av. Calle Real 208/212 · 0220-482-5836</p>
                        {!auth?.user && (
                            <Link
                                href={route('login')}
                                onClick={close}
                                className="text-white/35 hover:text-white/70 text-xs transition-colors border border-white/15 hover:border-white/30 px-3 py-1.5 rounded-md"
                            >
                                Ingresar
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
