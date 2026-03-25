import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

const IconBuilding = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 10h2m-2 4h2m4-4h2m-2 4h2M8 18h8" />
    </svg>
);
const IconNewspaper = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2zM15 4v5h5M9 12h6M9 16h4" />
    </svg>
);
const IconUsers = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-5a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 11-2 0" />
    </svg>
);
const IconUserCircle = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
const IconMailDash = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const IconArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

const modules = [
    {
        label: 'Infraestructura',
        desc: 'Gestioná obras y trabajos menores',
        href: '/infraestructura',
        icon: <IconBuilding />,
        from: '#F59E0B',
        to: '#D97706',
        shadow: 'rgba(217,119,6,0.35)',
    },
    {
        label: 'Novedades',
        desc: 'Publicá noticias y actualizaciones',
        href: '/novedades',
        icon: <IconNewspaper />,
        from: '#3B82F6',
        to: '#1D4ED8',
        shadow: 'rgba(29,78,216,0.35)',
    },
    {
        label: 'Autoridades',
        desc: 'Administrá los consejeros y vocales',
        href: '/autoridades',
        icon: <IconUsers />,
        from: '#8B5CF6',
        to: '#6D28D9',
        shadow: 'rgba(109,40,217,0.35)',
    },
    {
        label: 'Correos',
        desc: 'Gestioná los correos de cada área',
        href: '/correos',
        icon: <IconMailDash />,
        from: '#0EA5E9',
        to: '#0284C7',
        shadow: 'rgba(2,132,199,0.35)',
    },
    {
        label: 'Perfil',
        desc: 'Editá tu cuenta y contraseña',
        href: '/profile',
        icon: <IconUserCircle />,
        from: '#10B981',
        to: '#059669',
        shadow: 'rgba(5,150,105,0.35)',
    },
];

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Banner de bienvenida */}
            <div
                className="relative overflow-hidden px-8 py-10"
                style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #2A5678 60%, #366E99 100%)' }}
            >
                {/* Círculos decorativos */}
                <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full opacity-10" style={{ background: '#D4A843' }} />
                <div className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full opacity-[0.07]" style={{ background: '#ffffff' }} />

                <div className="relative flex items-center gap-5">
                    <img
                        src="/logo-consejo-de-merlo.png"
                        alt="Logo"
                        className="h-16 w-16 rounded-2xl bg-white/10 object-contain p-2 backdrop-blur-sm shadow-lg"
                    />
                    <div>
                        <p className="text-sm font-medium text-white/60 mb-0.5">Bienvenido,</p>
                        <h1 className="text-2xl font-extrabold text-white leading-tight">{user?.name ?? 'Administrador'}</h1>
                        <p className="mt-1 text-sm text-white/50">Consejo Escolar de Merlo — Panel de gestión</p>
                    </div>
                </div>
            </div>

            <div className="px-8 py-8">
                {/* Título sección */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Módulos del sistema</h2>
                    <p className="text-sm text-gray-400">Seleccioná un módulo para comenzar</p>
                </div>

                {/* Grid de cards */}
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {modules.map((mod) => (
                        <Link
                            key={mod.label}
                            href={mod.href}
                            className="group relative overflow-hidden rounded-2xl p-6 text-white transition-all duration-200 hover:-translate-y-1"
                            style={{
                                background: `linear-gradient(135deg, ${mod.from} 0%, ${mod.to} 100%)`,
                                boxShadow: `0 8px 24px ${mod.shadow}`,
                            }}
                        >
                            {/* Círculo decorativo de fondo */}
                            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-125" />

                            {/* Ícono */}
                            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-white/20 p-3">
                                {mod.icon}
                            </div>

                            {/* Texto */}
                            <h3 className="text-base font-bold leading-tight">{mod.label}</h3>
                            <p className="mt-1 text-xs text-white/70 leading-snug">{mod.desc}</p>

                            {/* Flecha */}
                            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
                                Ir al módulo <IconArrow />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
