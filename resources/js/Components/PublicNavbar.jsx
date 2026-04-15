import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
    { label: 'Inicio',            href: '/' },
    { label: 'Novedades',         href: '/novedades' },
    { label: 'Infraestructura',   href: '/areas/infraestructura' },
    { label: 'Recursos Humanos',  href: '/areas/recursos-humanos' },
    { label: 'Patrimonio',        href: '/areas/patrimonio' },
    { label: 'SAE',               href: '/areas/sae' },
    { label: 'Descentralizados',  href: '/areas/descentralizados' },
    { label: 'Contacto',          href: '/contacto' },
];

/**
 * Barra de navegación pública compartida.
 *
 * @param {boolean} transparent  Si es true, la barra empieza transparente sobre
 *                               un hero oscuro y se vuelve blanca al hacer scroll.
 *                               Si es false (por defecto) siempre es blanca.
 */
export default function PublicNavbar({ transparent = false }) {
    const { auth }                          = usePage().props;
    const [scrolled, setScrolled]           = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const ghost = transparent && !scrolled;

    return (
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${ghost ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-sm'}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 shrink-0">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${ghost ? 'bg-white/15 border border-white/25' : 'bg-brand-blue-400'}`}>
                        <span className="text-white font-bold text-sm">CE</span>
                    </div>
                    <span className={`hidden sm:block text-sm font-semibold leading-tight transition-colors duration-300 ${ghost ? 'text-white' : 'text-gray-800'}`}>
                        Consejo Escolar
                        <span className={ghost ? 'text-brand-gold-300' : 'text-brand-blue-400'}> de Merlo</span>
                    </span>
                </Link>

                {/* Nav desktop */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-3 py-2 text-sm transition-colors duration-300 rounded-md ${
                                ghost
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-gray-600 hover:text-brand-blue-500'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    {auth?.user && (
                        <Link
                            href={route('dashboard')}
                            className={`ml-2 px-4 py-2 text-sm rounded-md transition-colors duration-300 ${
                                ghost
                                    ? 'bg-white/15 border border-white/25 text-white hover:bg-white/25'
                                    : 'bg-brand-blue-400 text-white hover:bg-brand-blue-500'
                            }`}
                        >
                            Panel admin
                        </Link>
                    )}
                </nav>

                {/* Hamburger */}
                <button
                    className={`md:hidden p-2 transition-colors duration-300 ${ghost ? 'text-white' : 'text-gray-600'}`}
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
    );
}
