import { Link } from '@inertiajs/react';

const IconUser = () => (
    <svg className="w-12 h-12 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

// Datos de respaldo por si no hay registros en la base de datos
const FALLBACK_PRINCIPALES = [
    { cargo: 'Presidenta', nombre: 'Consejero 1' },
    { cargo: 'Vicepresidente', nombre: 'Consejero 2' },
    { cargo: 'Tesorero', nombre: 'Consejero 3' },
    { cargo: 'Secretario', nombre: 'Consejero 4' },
];

const FALLBACK_VOCALES = [
    '1º Vocal – Consejero 5',
    '2º Vocal – Consejero 6',
    '3º Vocal – Consejero 7',
    '4º Vocal – Consejero 8',
    '5º Vocal – Consejero 9',
    '6º Vocal – Consejero 10',
];

export default function Autoridades({ autoridades = [] }) {
    const principales = autoridades.length > 0
        ? autoridades.filter((a) => a.tipo === 'principal')
        : FALLBACK_PRINCIPALES;

    const vocales = autoridades.length > 0
        ? autoridades.filter((a) => a.tipo === 'vocal')
        : FALLBACK_VOCALES.map((v, i) => ({ id: i, cargo: '', nombre: v, foto: null }));

    return (
        <section id="autoridades" className="relative">
            {/* Onda superior — transición desde la sección anterior */}
            <div className="bg-brand-blue-50/40">
                <svg viewBox="0 0 1440 56" className="w-full block text-brand-blue-800" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                </svg>
            </div>

            {/* Contenido sobre fondo oscuro */}
            <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900 relative overflow-hidden">
                {/* Patrón sutil */}
                <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24">

                    {/* Encabezado */}
                    <div className="text-center mb-14">
                        <p className="text-xs font-semibold text-brand-gold-400 tracking-[0.2em] uppercase mb-4">Equipo de trabajo</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                            Autoridades
                        </h2>
                        <div className="mt-5 w-16 h-1 bg-brand-gold-400 mx-auto rounded-full" />
                    </div>

                    {/* Principales */}
                    {principales.length > 0 && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
                            {principales.map((a, i) => (
                                <div key={a.id ?? i} className="group rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm overflow-hidden flex flex-col">
                                    {/* Imagen */}
                                    <div className="relative w-full aspect-[3/4] bg-white/[0.04] overflow-hidden">
                                        {a.foto ? (
                                            <img
                                                src={`/images/${a.foto}`}
                                                alt={a.nombre}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-white/20">
                                                <IconUser />
                                                <span className="text-xs tracking-widest uppercase text-white/20">Sin foto</span>
                                            </div>
                                        )}
                                        {/* Gradiente inferior */}
                                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>

                                    {/* Info */}
                                    <div className="px-5 py-5 flex-1 flex flex-col justify-center border-t border-white/[0.06]">
                                        <p className="text-[11px] font-bold text-brand-gold-400 uppercase tracking-[0.15em] mb-1.5">{a.cargo}</p>
                                        <p className="font-semibold text-white text-[15px] leading-snug">{a.nombre}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Vocales */}
                    {vocales.length > 0 && (
                        <div className="max-w-5xl mx-auto">
                            <h3 className="text-lg font-semibold text-white text-center mb-7">Vocales</h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {vocales.map((v, i) => (
                                    <div key={v.id ?? i} className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5">
                                        {/* Avatar o foto */}
                                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-white/[0.06]">
                                            {v.foto ? (
                                                <img
                                                    src={`/images/${v.foto}`}
                                                    alt={v.nombre}
                                                    className="w-full h-full object-cover object-top"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white/30">
                                                    <IconUser />
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            {v.cargo && (
                                                <p className="text-[11px] font-bold text-brand-gold-400 uppercase tracking-[0.1em] truncate">{v.cargo}</p>
                                            )}
                                            <span className="text-[14px] text-brand-blue-100 leading-snug">{v.nombre}</span>
                                            {v.area && (
                                                <p className="text-[11px] text-white/40 mt-0.5 truncate">{v.area}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── Separador visual ── */}
                    <div className="relative max-w-5xl mx-auto my-20 sm:my-24">
                        <div className="border-t border-white/10" />
                    </div>

                    {/* ══════ CONTACTO ══════ */}
                    <div className="max-w-7xl mx-auto" id="contacto">

                        {/* Encabezado */}
                        <div className="text-center mb-16">
                            <p className="text-xs font-semibold text-brand-gold-400 tracking-[0.2em] uppercase mb-4">Encontranos</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                                Contacto
                            </h2>
                            <div className="mt-5 w-16 h-1 bg-brand-gold-400 mx-auto rounded-full" />
                        </div>

                        {/* Info cards */}
                        <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
                            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-6 text-center">
                                <div className="w-12 h-12 rounded-xl bg-brand-gold-400/10 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-brand-gold-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </div>
                                <p className="text-xs font-semibold text-brand-gold-400 uppercase tracking-wider mb-2">Dirección</p>
                                <p className="text-[15px] text-brand-blue-100 leading-relaxed">Av. Calle Real 208/212<br />Merlo Centro</p>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-6 text-center">
                                <div className="w-12 h-12 rounded-xl bg-brand-gold-400/10 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-brand-gold-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                                <p className="text-xs font-semibold text-brand-gold-400 uppercase tracking-wider mb-2">Teléfono</p>
                                <p className="text-[15px] text-brand-blue-100">0220-482-5836</p>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-6 text-center">
                                <div className="w-12 h-12 rounded-xl bg-brand-gold-400/10 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-brand-gold-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-xs font-semibold text-brand-gold-400 uppercase tracking-wider mb-2">Horario</p>
                                <p className="text-[15px] text-brand-blue-100">Lunes a viernes<br />de 8 a 16 hs</p>
                            </div>
                        </div>

                        {/* CTA a página de contacto */}
                        <div className="text-center mt-10">
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-gold-400 text-white text-base font-semibold rounded-lg hover:bg-brand-gold-500 transition-all duration-200 shadow-lg shadow-brand-gold-400/20"
                            >
                                Ver más información de contacto
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Onda inferior — transición al footer blanco */}
            <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900">
                <svg viewBox="0 0 1440 56" className="w-full block text-white" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                </svg>
            </div>
        </section>
    );
}
