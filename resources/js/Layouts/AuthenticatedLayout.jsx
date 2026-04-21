import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

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
const IconGlobe = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 01.284-2.253" />
    </svg>
);
const IconMail = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const IconBriefcase = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
);
const IconArchive = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.498c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 2.498v2.254c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V11.37" />
    </svg>
);
const IconHandshake = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
);
const IconTool = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
);
const IconNetwork = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a12 12 0 010 18M12 3a12 12 0 000 18" />
    </svg>
);
const IconQuestion = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);

export default function AuthenticatedLayout({ header, pageTitle, pageSubtitle, pageColor, pageAction, children }) {
    const user = usePage().props.auth.user;
    const [collapsed, setCollapsed] = useState(() => {
        const saved = localStorage.getItem('sidebar-collapsed');
        return saved === null ? true : saved === 'true';
    });

    const toggleCollapsed = () => {
        setCollapsed((prev) => {
            const next = !prev;
            localStorage.setItem('sidebar-collapsed', String(next));
            return next;
        });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const navGroups = [
        {
            items: [
                { label: 'Inicio', icon: <IconHome />, href: route('dashboard'), routeName: 'dashboard', activeColor: '#D4A843' },
            ],
        },
        {
            title: 'Áreas',
            items: [
                { label: 'Infraestructura',  icon: <IconBuilding />,  href: route('infraestructura.index'),       routeName: 'infraestructura.index',       activeColor: '#FFA101' },
                { label: 'Descentralizados', icon: <IconTool />,      href: route('descentralizados.index'),      routeName: 'descentralizados.index',      activeColor: '#0D9488' },
                { label: 'RR.HH.',           icon: <IconBriefcase />, href: route('recursos_humanos.index'),      routeName: 'recursos_humanos.index',      activeColor: '#10B981' },
                { label: 'SAE',              icon: <IconGlobe />,     href: route('sae.index'),                   routeName: 'sae.index',                   activeColor: '#F97316' },
                { label: 'Patrimonio',       icon: <IconArchive />,   href: route('patrimonio.index'),            routeName: 'patrimonio.index',            activeColor: '#F59E0B' },
                { label: 'Coop. Escolar',    icon: <IconHandshake />, href: route('cooperacion_escolar.index'),   routeName: 'cooperacion_escolar.index',   activeColor: '#7C3AED' },
            ],
        },
        {
            title: 'Comunicación',
            items: [
                { label: 'Novedades',    icon: <IconNewspaper />, href: route('novedades.index'),   routeName: 'novedades.index',   activeColor: '#5796C2' },
                { label: 'Autoridades',  icon: <IconUsers />,     href: route('autoridades.index'), routeName: 'autoridades.index', activeColor: '#A78BFA' },
                { label: 'Organismos',   icon: <IconNetwork />,   href: route('organismos.index'),  routeName: 'organismos.index',  activeColor: '#0284C7' },
                { label: 'FAQs',         icon: <IconQuestion />,  href: route('faqs.index'),         routeName: 'faqs.index',         activeColor: '#7C3AED' },
            ],
        },
        {
            title: 'Contacto',
            items: [
                { label: 'Correos', icon: <IconMail />, href: route('correos.index'), routeName: 'correos.index', activeColor: '#0EA5E9' },
            ],
        },
        {
            title: 'Configuración',
            items: [
                { label: 'Perfil', icon: <IconUser />, href: route('profile.edit'), routeName: 'profile.edit', activeColor: '#D4A843' },
            ],
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`relative flex flex-col transition-all duration-300 ${
                    collapsed ? 'w-[4.5rem]' : 'w-60'
                }`}
                style={{ background: 'linear-gradient(180deg, #1E3F58 0%, #132838 100%)' }}
            >
                {/* Logo */}
                <div className={`flex items-center gap-3 px-4 py-5 ${
                    collapsed ? 'justify-center' : ''
                }`}>
                    <img
                        src="/logo-consejo-de-merlo.png"
                        alt="Consejo Escolar de Merlo"
                        className="h-9 w-9 shrink-0 rounded-lg object-contain bg-white/10 p-1"
                    />
                    {!collapsed && (
                        <div className="min-w-0">
                            <p className="truncate text-[13px] font-bold text-white leading-tight">Consejo Escolar</p>
                            <p className="truncate text-[11px] text-white/50 leading-tight">de Merlo</p>
                        </div>
                    )}
                </div>

                {/* Divisor */}
                <div className="mx-4 border-t border-white/10 mb-2" />

                {/* Botón colapsar */}
                <button
                    onClick={toggleCollapsed}
                    className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white/60 shadow hover:bg-white/20 hover:text-white transition-colors"
                    title={collapsed ? 'Expandir' : 'Contraer'}
                >
                    {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
                </button>

                {/* Navegación */}
                <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
                    {navGroups.map((group, gi) => (
                        <div key={gi} className={gi > 0 ? 'pt-2' : ''}>
                            {group.title && !collapsed && (
                                <p className="px-3 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-widest text-white/30 select-none">
                                    {group.title}
                                </p>
                            )}
                            {group.title && collapsed && gi > 0 && (
                                <div className="mx-3 mb-1 mt-1 border-t border-white/10" />
                            )}
                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const isActive = route().current(item.routeName);
                                    return (
                                        <Link
                                            key={item.routeName}
                                            href={item.href}
                                            title={collapsed ? item.label : undefined}
                                            className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                                                isActive
                                                    ? 'bg-white/10 text-white'
                                                    : 'text-white/60 hover:bg-white/[0.07] hover:text-white'
                                            }`}
                                        >
                                            {isActive && (
                                                <span
                                                    className="absolute left-0 h-7 w-0.5 rounded-r-full"
                                                    style={{ backgroundColor: item.activeColor }}
                                                />
                                            )}
                                            <span
                                                className="relative shrink-0"
                                                style={isActive ? { color: item.activeColor } : {}}
                                            >
                                                {item.icon}
                                            </span>
                                            {!collapsed && (
                                                <span className="truncate">{item.label}</span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Usuario + acciones */}
                <div className="mx-2 mb-3 mt-2 space-y-0.5 border-t border-white/10 pt-3">
                    {!collapsed && user && (
                        <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 mb-1">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gold-400 text-xs font-bold text-white">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <p className="truncate text-xs font-medium text-white/80">{user.name}</p>
                        </div>
                    )}
                    <Link
                        href={route('home')}
                        title={collapsed ? 'Ver sitio' : undefined}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-all hover:bg-white/[0.07] hover:text-white"
                    >
                        <span className="shrink-0"><IconGlobe /></span>
                        {!collapsed && <span className="truncate">Ver sitio</span>}
                    </Link>
                    <button
                        onClick={handleLogout}
                        title={collapsed ? 'Cerrar sesión' : undefined}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-all hover:bg-white/[0.07] hover:text-white"
                    >
                        <span className="shrink-0"><IconLogout /></span>
                        {!collapsed && <span className="truncate">Cerrar sesión</span>}
                    </button>
                </div>
            </aside>

            {/* Contenido principal */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Banner de página */}
                {pageTitle ? (
                    <div
                        className="relative overflow-hidden px-7 py-5 flex items-center justify-between shrink-0"
                        style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #2A5678 55%, #366E99 100%)' }}
                    >
                        <div
                            className="absolute -top-8 -right-8 h-36 w-36 rounded-full opacity-[0.15] pointer-events-none"
                            style={{ background: pageColor ?? '#D4A843' }}
                        />
                        <div className="relative">
                            <h1 className="text-lg font-bold text-white leading-tight">{pageTitle}</h1>
                            {pageSubtitle && (
                                <p className="text-sm text-white/50 mt-0.5">{pageSubtitle}</p>
                            )}
                        </div>
                        {pageAction && (
                            <div className="relative shrink-0 ml-4">{pageAction}</div>
                        )}
                    </div>
                ) : header ? (
                    <header className="bg-white border-b border-gray-200 shrink-0">
                        <div className="px-6 py-4">{header}</div>
                    </header>
                ) : null}

                <main className="flex-1 overflow-auto bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
