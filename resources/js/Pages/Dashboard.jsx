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
const IconBriefcase = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
);
const IconGlobe = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 01.284-2.253" />
    </svg>
);
const IconTool = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
);
const IconArchive = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.498c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 2.498v2.254c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V11.37" />
    </svg>
);
const IconHandshake = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
);
const IconArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

const categories = [
    {
        title: 'Áreas',
        modules: [
            {
                label: 'Infraestructura',
                desc: 'Gestioná obras y trabajos menores',
                href: '/admin/infraestructura',
                icon: <IconBuilding />,
                from: '#F59E0B',
                to: '#D97706',
                shadow: 'rgba(217,119,6,0.35)',
            },
            {
                label: 'Descentralizados',
                desc: 'Gestioná los trabajos menores de descentralizados',
                href: '/admin/descentralizados',
                icon: <IconTool />,
                from: '#0D9488',
                to: '#0F766E',
                shadow: 'rgba(15,118,110,0.35)',
            },
            {
                label: 'RR.HH.',
                desc: 'Publicá documentos de recursos humanos',
                href: '/admin/recursos-humanos',
                icon: <IconBriefcase />,
                from: '#10B981',
                to: '#059669',
                shadow: 'rgba(5,150,105,0.35)',
            },
            {
                label: 'SAE',
                desc: 'Publicá los menús del Servicio Alimentario Escolar',
                href: '/admin/sae',
                icon: <IconGlobe />,
                from: '#F97316',
                to: '#EA580C',
                shadow: 'rgba(234,88,12,0.35)',
            },
            {
                label: 'Patrimonio',
                desc: 'Gestioná la documentación patrimonial',
                href: '/admin/patrimonio',
                icon: <IconArchive />,
                from: '#F59E0B',
                to: '#D97706',
                shadow: 'rgba(217,119,6,0.35)',
            },
            {
                label: 'Coop. Escolar',
                desc: 'Gestioná la documentación de cooperación escolar',
                href: '/admin/cooperacion-escolar',
                icon: <IconHandshake />,
                from: '#7C3AED',
                to: '#6D28D9',
                shadow: 'rgba(109,40,217,0.35)',
            },
        ],
    },
    {
        title: 'Comunicación',
        modules: [
            {
                label: 'Novedades',
                desc: 'Publicá noticias y actualizaciones',
                href: '/admin/novedades',
                icon: <IconNewspaper />,
                from: '#3B82F6',
                to: '#1D4ED8',
                shadow: 'rgba(29,78,216,0.35)',
            },
            {
                label: 'Autoridades',
                desc: 'Administrá los consejeros y vocales',
                href: '/admin/autoridades',
                icon: <IconUsers />,
                from: '#8B5CF6',
                to: '#6D28D9',
                shadow: 'rgba(109,40,217,0.35)',
            },
        ],
    },
    {
        title: 'Contacto',
        modules: [
            {
                label: 'Correos y teléfonos',
                desc: 'Gestioná los medios de contacto de cada área',
                href: '/admin/correos',
                icon: <IconMailDash />,
                from: '#0EA5E9',
                to: '#0284C7',
                shadow: 'rgba(2,132,199,0.35)',
            },
        ],
    },
    {
        title: 'Configuración',
        modules: [
            {
                label: 'Perfil',
                desc: 'Editá tu cuenta y contraseña',
                href: '/admin/profile',
                icon: <IconUserCircle />,
                from: '#64748B',
                to: '#475569',
                shadow: 'rgba(71,85,105,0.35)',
            },
        ],
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

            <div className="px-8 py-8 space-y-10">
                {categories.map((cat) => (
                    <div key={cat.title}>
                        <div className="mb-4">
                            <h2 className="text-base font-bold text-gray-700 uppercase tracking-wide">{cat.title}</h2>
                            <div className="mt-1 h-0.5 w-10 rounded-full bg-gray-200" />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            {cat.modules.map((mod) => (
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
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
