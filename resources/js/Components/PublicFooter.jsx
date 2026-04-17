import { Link } from '@inertiajs/react';

const NAV_LINKS = [
    { label: 'Inicio',    href: '/' },
    { label: 'Novedades', href: '/novedades' },
    { label: 'Contacto',  href: '/contacto' },
];

const AREAS_LINKS = [
    { label: 'Infraestructura',   href: '/areas/infraestructura' },
    { label: 'Recursos Humanos',  href: '/areas/recursos-humanos' },
    { label: 'Patrimonio',        href: '/areas/patrimonio' },
    { label: 'Coop. Escolar',     href: '/areas/cooperacion-escolar' },
    { label: 'SAE',               href: '/areas/sae' },
    { label: 'Descentralizados',  href: '/areas/descentralizados' },
];

export default function PublicFooter() {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-8">

                {/* Grid principal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-200">

                    {/* Marca */}
                    <div className="sm:col-span-2">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 rounded-full bg-brand-blue-700 flex items-center justify-center shrink-0">
                                <span className="text-white font-bold text-sm">CE</span>
                            </div>
                            <div>
                                <span className="block text-base font-bold text-gray-900">Consejo Escolar de Merlo</span>
                                <span className="block text-xs text-gray-400">Provincia de Buenos Aires</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                            Organismo descentralizado de la Dirección General de Cultura y Educación de la Provincia de Buenos Aires, al servicio de la comunidad educativa del distrito.
                        </p>
                    </div>

                    {/* Navegación */}
                    <div>
                        <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.15em] uppercase mb-4">Navegación</p>
                        <nav className="flex flex-col gap-2.5">
                            {NAV_LINKS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm text-gray-500 hover:text-brand-blue-600 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Áreas */}
                    <div>
                        <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.15em] uppercase mb-4">Áreas</p>
                        <nav className="flex flex-col gap-2.5">
                            {AREAS_LINKS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm text-gray-500 hover:text-brand-blue-600 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contacto */}
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
                                <span className="text-sm text-gray-500">Lun a Vie, 8 a 16 hs</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barra inferior */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Consejo Escolar de Merlo.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-400">Powered by <span className="font-semibold text-gray-500">Pampa Labs</span></span>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-blue-200" />
                            <span className="w-2 h-2 rounded-full bg-brand-blue-400" />
                            <span className="w-2 h-2 rounded-full bg-brand-gold-400" />
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
