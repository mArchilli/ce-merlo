import { Link } from '@inertiajs/react';
import { NAV_ITEMS } from './Header';

export default function Footer({ scrollTo }) {
    return (
        <footer className="relative overflow-hidden">
            {/* Onda de transición */}
            <div className="bg-surface">
                <svg viewBox="0 0 1440 72" className="w-full block text-primary" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,40L80,45C160,51,320,61,480,61C640,61,800,51,960,45C1120,40,1280,40,1360,40L1440,40L1440,72L1360,72C1280,72,1120,72,960,72C800,72,640,72,480,72C320,72,160,72,80,72L0,72Z" />
                </svg>
            </div>

            {/* Cuerpo del footer */}
            <div className="relative bg-primary">
                {/* Decoración ambiental */}
                <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 -left-16 w-[300px] h-[300px] rounded-full bg-primary-fixed/5 blur-3xl pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

                <div className="relative max-w-[1200px] mx-auto px-6 sm:px-8 pt-16 pb-10">

                    {/* ── Fila superior: marca + descripción ── */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-14 border-b border-white/10">
                        {/* Identidad */}
                        <div className="max-w-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-inner">
                                    <span className="text-white font-serif font-bold text-xl tracking-tight">CE</span>
                                </div>
                                <div>
                                    <span className="block text-xl font-serif font-bold text-white leading-snug">Consejo Escolar de Merlo</span>
                                    <span className="block text-xs font-sans text-secondary-fixed-dim mt-0.5">Provincia de Buenos Aires</span>
                                </div>
                            </div>
                            <p className="font-sans text-sm text-white/70 leading-relaxed">
                                Organismo descentralizado de la Dirección General de Cultura y Educación de la Provincia de Buenos Aires, al servicio de la comunidad educativa del distrito.
                            </p>
                        </div>

                        {/* Cards de contacto rápido */}
                        <div className="grid sm:grid-cols-3 gap-4 lg:w-auto lg:max-w-xl w-full">
                            {[
                                {
                                    label: 'Dirección',
                                    value: 'Av. Calle Real 208/212',
                                    icon: 'location_on',
                                },
                                {
                                    label: 'Teléfono',
                                    value: '0220-482-5836',
                                    icon: 'call',
                                },
                                {
                                    label: 'Horario',
                                    value: 'Lun a Vie, 8 a 14 hs',
                                    icon: 'schedule',
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors backdrop-blur-sm p-5"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary-container/40 text-tertiary-fixed-dim flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>{item.icon}</span>
                                    </div>
                                    <div>
                                        <p className="font-serif text-[10px] font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-1">{item.label}</p>
                                        <p className="font-sans text-sm font-medium text-white leading-snug">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Fila media: navegación ── */}
                    <div className="py-12 border-b border-white/10">
                        <p className="font-serif text-[11px] font-bold text-tertiary-fixed-dim uppercase tracking-[0.2em] mb-6">Navegación</p>
                        <nav className="flex flex-wrap gap-x-8 gap-y-3">
                            {NAV_ITEMS.map((item) =>
                                item.isPage ? (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="font-sans text-sm text-secondary-fixed-dim hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={scrollTo ? (e) => scrollTo(e, item.href) : undefined}
                                        className="font-sans text-sm text-secondary-fixed-dim hover:text-white transition-colors cursor-pointer"
                                    >
                                        {item.label}
                                    </a>
                                )
                            )}
                        </nav>
                    </div>

                    {/* ── Línea inferior ── */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="font-sans text-xs text-white/50">
                            © {new Date().getFullYear()} Consejo Escolar de Merlo.
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="font-sans text-xs text-white/50">Powered by <span className="font-semibold text-white/70">PAMPA LABS</span></span>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-primary-fixed-dim/60" />
                                <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim/60" />
                                <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim/80" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
