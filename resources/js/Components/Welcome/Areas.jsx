import { Link } from '@inertiajs/react';

const AREAS = [
    {
        label: 'Infraestructura',
        desc: 'Obras, mantenimiento y reparaciones en establecimientos educativos.',
        href: '/areas/infraestructura',
        color: '#2563EB',
        bg: '#EFF6FF',
        icon: 'corporate_fare',
    },
    {
        label: 'Recursos Humanos',
        desc: 'Gestión del personal auxiliar de los establecimientos del distrito.',
        href: '/areas/recursos-humanos',
        color: '#059669',
        bg: '#ECFDF5',
        icon: 'badge',
    },
    {
        label: 'Patrimonio',
        desc: 'Inventario, altas, bajas y transferencias de bienes patrimoniales.',
        href: '/areas/patrimonio',
        color: '#D97706',
        bg: '#FFFBEB',
        icon: 'account_balance_wallet',
    },
    {
        label: 'Cooperación Escolar',
        desc: 'Supervisión de fondos de cooperadora y recursos escolares.',
        href: '/areas/cooperacion-escolar',
        color: '#7C3AED',
        bg: '#F5F3FF',
        icon: 'handshake',
    },
    {
        label: 'SAE',
        desc: 'Servicio Alimentario Escolar: comedores y provisión de alimentos.',
        href: '/areas/sae',
        color: '#EA580C',
        bg: '#FFF7ED',
        icon: 'nutrition',
    },
    {
        label: 'Descentralizados',
        desc: 'Trabajos menores y mantenimiento en escuelas del distrito.',
        href: '/areas/descentralizados',
        color: '#0891B2',
        bg: '#ECFEFF',
        icon: 'settings_suggest',
    },
];

export default function Areas() {
    return (
        <section id="areas" className="bg-surface text-on-surface py-16 md:py-24 selection:bg-primary-container selection:text-on-primary-container">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header Section */}
                <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-outline-variant/30 pb-8">
                    <div className="max-w-3xl">
                        <span className="font-sans text-sm uppercase tracking-widest text-tertiary mb-4 block font-semibold">
                            Consejo Escolar de Merlo
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold tracking-tight mb-6 leading-tight">
                            Áreas del Consejo
                        </h2>
                        <p className="font-sans text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
                            Accedé a la documentación e información de cada área del Consejo Escolar de Merlo.
                        </p>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-24 h-24 rounded-full bg-surface-container-low border border-outline-variant/20 shadow-[0_8px_24px_rgba(25,28,29,0.04)]">
                        <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>
                            account_balance
                        </span>
                    </div>
                </header>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {AREAS.map((area, i) => {
                        const num = String(i + 1).padStart(2, '0');
                        return (
                            <Link 
                                key={area.href}
                                href={area.href}
                                className="group bg-surface-container-lowest rounded shadow-[0_8px_32px_rgba(25,28,29,0.03)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(25,28,29,0.06)] hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-outline-variant/20 relative"
                            >
                                {/* Decorative colored bar - left on mobile, top on desktop, using area's color */}
                                <div 
                                    className="absolute top-0 left-0 w-1 h-full md:w-full md:h-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ backgroundColor: area.color }}
                                ></div>

                                <div className="p-6 md:p-8 flex flex-col flex-grow pl-8 md:pl-8">
                                    <div className="mb-6 flex items-start justify-between">
                                        <div 
                                            className="w-12 h-12 rounded flex items-center justify-center border border-outline-variant/20"
                                            style={{ backgroundColor: area.bg, color: area.color }}
                                        >
                                            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                                                {area.icon}
                                            </span>
                                        </div>
                                        <span className="font-sans text-xs uppercase tracking-widest text-on-surface-variant/70 font-semibold bg-surface-container py-1 px-2 rounded">
                                            Área {num}
                                        </span>
                                    </div>
                                    
                                    <h3 className="font-serif text-2xl text-primary group-hover:text-tertiary font-semibold mb-4 transition-colors duration-300">
                                        {area.label}
                                    </h3>
                                    
                                    <p className="font-sans text-on-surface-variant mb-8 flex-grow leading-relaxed">
                                        {area.desc}
                                    </p>
                                    
                                    <div className="mt-auto pt-6 border-t border-outline-variant/10">
                                        <span 
                                            className="inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide transition-colors duration-300"
                                            style={{ color: area.color }}
                                        >
                                            Ver documentación
                                            <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                                                arrow_forward
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
