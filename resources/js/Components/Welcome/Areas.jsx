import { Link } from '@inertiajs/react';

const IconArrow = () => (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

const AREAS = [
    {
        label: 'Infraestructura',
        desc: 'Obras, mantenimiento y reparaciones en establecimientos educativos.',
        href: '/areas/infraestructura',
        color: '#2563EB',
        bg: '#EFF6FF',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
        ),
    },
    {
        label: 'Recursos Humanos',
        desc: 'Gestión del personal auxiliar de los establecimientos del distrito.',
        href: '/areas/recursos-humanos',
        color: '#059669',
        bg: '#ECFDF5',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        ),
    },
    {
        label: 'Patrimonio',
        desc: 'Inventario, altas, bajas y transferencias de bienes patrimoniales.',
        href: '/areas/patrimonio',
        color: '#D97706',
        bg: '#FFFBEB',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.498c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 2.498v2.254c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V11.37" />
            </svg>
        ),
    },
    {
        label: 'Cooperación Escolar',
        desc: 'Supervisión de fondos de cooperadora y recursos escolares.',
        href: '/areas/cooperacion-escolar',
        color: '#7C3AED',
        bg: '#F5F3FF',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        ),
    },
    {
        label: 'SAE',
        desc: 'Servicio Alimentario Escolar: comedores y provisión de alimentos.',
        href: '/areas/sae',
        color: '#EA580C',
        bg: '#FFF7ED',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
            </svg>
        ),
    },
    {
        label: 'Descentralizados',
        desc: 'Trabajos menores y mantenimiento en escuelas del distrito.',
        href: '/areas/descentralizados',
        color: '#0891B2',
        bg: '#ECFEFF',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
        ),
    },
];

export default function Areas() {
    return (
        <section id="areas" className="py-20 sm:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                {/* Encabezado */}
                <div className="max-w-xl mb-12">
                    <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Acceso directo</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                        Áreas del Consejo
                    </h2>
                    <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                    <p className="mt-4 text-gray-500 text-base font-light leading-relaxed">
                        Accedé a la documentación e información de cada área del Consejo Escolar de Merlo.
                    </p>
                </div>

                {/* Grid de áreas */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {AREAS.map((area) => (
                        <Link
                            key={area.href}
                            href={area.href}
                            className="group flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-7 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                        >
                            {/* Ícono */}
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200"
                                style={{ backgroundColor: area.bg, color: area.color }}
                            >
                                {area.icon}
                            </div>

                            {/* Texto */}
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-base mb-2">{area.label}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{area.desc}</p>
                            </div>

                            {/* CTA */}
                            <div
                                className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
                                style={{ color: area.color }}
                            >
                                Ver documentación
                                <span className="transition-transform duration-200 group-hover:translate-x-1">
                                    <IconArrow />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
