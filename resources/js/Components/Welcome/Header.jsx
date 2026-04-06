import { Link } from '@inertiajs/react';

const NAV_ITEMS = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Institucional', href: '#institucional' },
    { label: 'Funcionalidades', href: '#funcionalidades' },
    { label: 'Autoridades', href: '#autoridades' },
    { label: 'Novedades', href: '/novedades', isPage: true },
    { label: 'Recursos Humanos', href: '/areas/recursos-humanos', isPage: true },
    { label: 'SAE', href: '/areas/sae', isPage: true },
    { label: 'Contacto', href: '/contacto', isPage: true },
];

export { NAV_ITEMS };

export default function Header({ auth, scrolled, mobileMenuOpen, setMobileMenuOpen, scrollTo }) {
    return (
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/30 backdrop-blur-xl shadow-lg shadow-black/10' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16">
                <a href="#inicio" onClick={(e) => scrollTo(e, '#inicio')} className={`flex items-center shrink-0 transition-all duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <img
                        src="/logo-consejo-de-merlo.png"
                        alt="Consejo Escolar de Merlo"
                        className="h-10 w-auto"
                    />
                </a>

                {/* Nav desktop */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item) =>
                        item.isPage ? (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-3 py-2 text-sm transition-colors duration-300 rounded-md text-white/80 hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => scrollTo(e, item.href)}
                                className="px-3 py-2 text-sm transition-colors duration-300 rounded-md text-white/80 hover:text-white"
                            >
                                {item.label}
                            </a>
                        )
                    )}
                    {auth?.user && (
                        <Link
                            href={route('dashboard')}
                            className="ml-2 px-4 py-2 text-sm rounded-md transition-colors duration-300 bg-white/15 border border-white/25 text-white hover:bg-white/25"
                        >
                            Panel admin
                        </Link>
                    )}
                </nav>

                {/* Hamburger */}
                <button
                    className="md:hidden p-2 text-white"
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
                        {NAV_ITEMS.map((item) =>
                            item.isPage ? (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => scrollTo(e, item.href)}
                                    className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                >
                                    {item.label}
                                </a>
                            )
                        )}
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
