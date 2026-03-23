import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

// Iconos inline
const IconHome = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 5v6h4v-6m-4 0H7m10 0h-3" />
    </svg>
);

const IconUser = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const IconLogout = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
    </svg>
);

const IconChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const IconChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

const IconBuilding = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 10h2m-2 4h2m4-4h2m-2 4h2M8 18h8" />
    </svg>
);

const IconNewspaper = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2zM15 4v5h5M9 12h6M9 16h4" />
    </svg>
);

const IconUsers = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-5a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 11-2 0" />
    </svg>
);

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const navItems = [
        { label: 'Inicio',          icon: <IconHome />,      href: route('dashboard'),             routeName: 'dashboard',             color: '#FFA101', bgLight: '#FFF7E6' },
        { label: 'Infraestructura', icon: <IconBuilding />,  href: route('infraestructura.index'), routeName: 'infraestructura.index', color: '#FFA101', bgLight: '#FFF7E6' },
        { label: 'Novedades',       icon: <IconNewspaper />, href: route('novedades.index'),       routeName: 'novedades.index',       color: '#5796C2', bgLight: '#EBF3FA' },
        { label: 'Autoridades',     icon: <IconUsers />,     href: route('autoridades.index'),     routeName: 'autoridades.index',     color: '#7C3AED', bgLight: '#F3E8FF' },
        { label: 'Perfil',          icon: <IconUser />,      href: route('profile.edit'),          routeName: 'profile.edit',          color: '#FFA101', bgLight: '#FFF7E6' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`relative flex flex-col bg-white shadow-md transition-all duration-300 ${
                    collapsed ? 'w-16' : 'w-56'
                }`}
            >
                {/* Header del sidebar */}
                <div className="flex items-center gap-3 px-3 py-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-lg font-bold text-white">
                        A
                    </div>
                    {!collapsed && (
                        <span className="truncate text-sm font-semibold text-gray-800">
                            Admin Panel
                        </span>
                    )}
                </div>

                {/* Botón colapsar */}
                <button
                    onClick={() => setCollapsed((prev) => !prev)}
                    className="absolute -right-3 top-5 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow hover:bg-gray-50"
                    title={collapsed ? 'Expandir' : 'Contraer'}
                >
                    {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
                </button>

                {/* Navegación */}
                <nav className="mt-2 flex-1 space-y-1 px-2">
                    {navItems.map((item) => {
                        const isActive = route().current(item.routeName);
                        return (
                            <Link
                                key={item.routeName}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors duration-150 ${
                                    isActive ? '' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                }`}
                                style={isActive ? { backgroundColor: item.bgLight, color: item.color } : {}}
                                title={collapsed ? item.label : undefined}
                            >
                                <span className="shrink-0">{item.icon}</span>
                                {!collapsed && <span className="truncate">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Cerrar sesión */}
                <div className="border-t border-gray-100 px-2 py-3">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-800"
                        title={collapsed ? 'Cerrar sesión' : undefined}
                    >
                        <span className="shrink-0"><IconLogout /></span>
                        {!collapsed && <span className="truncate">Cerrar sesión</span>}
                    </button>
                </div>
            </aside>

            {/* Contenido principal */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {header && (
                    <header className="bg-white shadow">
                        <div className="px-6 py-4">
                            {header}
                        </div>
                    </header>
                )}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
