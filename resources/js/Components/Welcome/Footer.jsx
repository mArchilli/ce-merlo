import { Link } from '@inertiajs/react';
import { NAV_ITEMS } from './Header';

export default function Footer({ scrollTo }) {
    return (
        <footer className="relative overflow-hidden">
            {/* Onda de transición */}
            <div className="bg-white">
                <svg viewBox="0 0 1440 72" className="w-full block text-brand-blue-900" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,40L80,45C160,51,320,61,480,61C640,61,800,51,960,45C1120,40,1280,40,1360,40L1440,40L1440,72L1360,72C1280,72,1120,72,960,72C800,72,640,72,480,72C320,72,160,72,80,72L0,72Z" />
                </svg>
            </div>

            {/* Cuerpo del footer */}
            <div className="relative bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-blue-900">
                {/* Decoración ambiental */}
                <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-brand-blue-700/20 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 -left-16 w-[300px] h-[300px] rounded-full bg-brand-blue-600/10 blur-3xl pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10">

                    {/* ── Fila superior: marca + descripción ── */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-14 border-b border-white/10">
                        {/* Identidad */}
                        <div className="max-w-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.08] border border-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                                    <span className="text-white font-extrabold text-base tracking-tight">CE</span>
                                </div>
                                <div>
                                    <span className="block text-base font-bold text-white leading-snug">Consejo Escolar de Merlo</span>
                                    <span className="block text-xs text-brand-blue-300 mt-0.5">Provincia de Buenos Aires</span>
                                </div>
                            </div>
                            <p className="text-sm text-brand-blue-200/70 leading-relaxed">
                                Organismo descentralizado de la Dirección General de Cultura y Educación de la Provincia de Buenos Aires, al servicio de la comunidad educativa del distrito.
                            </p>
                        </div>

                        {/* Cards de contacto rápido */}
                        <div className="grid sm:grid-cols-3 gap-4 lg:w-auto lg:max-w-xl w-full">
                            {[
                                {
                                    label: 'Dirección',
                                    value: 'Av. Calle Real 208/212',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: 'Teléfono',
                                    value: '0220-482-5836',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: 'Horario',
                                    value: 'Lun a Vie, 8 a 14 hs',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ),
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm p-5"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-white/10 text-brand-blue-200 flex items-center justify-center shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold text-brand-gold-400 uppercase tracking-widest mb-1">{item.label}</p>
                                        <p className="text-sm font-medium text-white leading-snug">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Fila media: navegación ── */}
                    <div className="py-12 border-b border-white/10">
                        <p className="text-[10px] font-semibold text-brand-gold-400 uppercase tracking-[0.2em] mb-6">Navegación</p>
                        <nav className="flex flex-wrap gap-x-8 gap-y-3">
                            {NAV_ITEMS.map((item) =>
                                item.isPage ? (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-sm text-brand-blue-200/70 hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={(e) => scrollTo(e, item.href)}
                                        className="text-sm text-brand-blue-200/70 hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                )
                            )}
                        </nav>
                    </div>

                    {/* ── Línea inferior ── */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-brand-blue-300/60">
                            © {new Date().getFullYear()} Consejo Escolar de Merlo.
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-brand-blue-300/60">Powered by <span className="font-semibold text-brand-blue-200/80">PAMPA LABS</span></span>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-brand-blue-400/60" />
                                <span className="w-2 h-2 rounded-full bg-brand-blue-300/60" />
                                <span className="w-2 h-2 rounded-full bg-brand-gold-400/80" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
