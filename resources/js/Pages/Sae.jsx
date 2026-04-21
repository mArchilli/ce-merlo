import { Head, Link } from '@inertiajs/react';
import PublicNavbar from '@/Components/PublicNavbar';
import Footer from '@/Components/Welcome/Footer';

// ─── Iconos ───────────────────────────────────────────────────────────────────
const IconMail = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);
const IconPhone = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
);
const IconWhatsApp = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);
const IconClipboard = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
);
const IconCalendar = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
);
const IconApple = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C10 3 7 5 7 9c0 5 3 9 5 9s5-4 5-9c0-4-2-6-5-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 0c1-2 3-2 3-2" />
    </svg>
);
const IconPdf = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);
const IconDownload = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);
const IconExternalLink = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const MESES = {
    1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
    5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto',
    9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre',
};

// ─── Tarjeta de Menú ──────────────────────────────────────────────────────────
function MenuCard({ item }) {
    const fecha = [MESES[item.mes], item.anio].filter(Boolean).join(' ');

    return (
        <div className="flex flex-col rounded-2xl bg-white border border-gray-100 hover:border-orange-100 hover:shadow-lg transition-all duration-200 overflow-hidden">
            {/* Vista previa del PDF */}
            <div className="relative bg-gray-100 border-b border-gray-200" style={{ height: '800px' }}>
                <iframe
                    src={`${item.pdf_url}#toolbar=0&navpanes=0&scrollbar=0`}
                    title={item.titulo}
                    className="w-full h-full border-0"
                />
                {fecha && (
                    <span className="absolute top-3 right-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 shadow-sm">
                        {fecha}
                    </span>
                )}
            </div>

            {/* Contenido */}
            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start gap-2 mb-2">
                    <span className="text-red-400 shrink-0 mt-0.5"><IconPdf /></span>
                    <h3 className="font-bold text-gray-900 text-[15px] leading-snug">
                        {item.titulo}
                    </h3>
                </div>
                {item.descripcion && (
                    <div
                        className="prose prose-sm max-w-none text-gray-500 leading-relaxed line-clamp-2 mb-4"
                        dangerouslySetInnerHTML={{ __html: item.descripcion }}
                    />
                )}

                {/* Acciones */}
                <div className="mt-auto flex items-center gap-3">
                    <a
                        href={item.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
                    >
                        <IconExternalLink /> Abrir completo
                    </a>
                    <a
                        href={item.pdf_url}
                        download
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        title="Descargar"
                    >
                        <IconDownload />
                    </a>
                </div>
            </div>
        </div>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function Sae({ items, correos }) {
    return (
        <>
            <Head title="SAE – Consejo Escolar de Merlo" />

            <div className="bg-white text-gray-800 font-sans antialiased">

                {/* ══════ HEADER ══════ */}
                <PublicNavbar transparent />

                {/* ══════ HERO ══════ */}
                <section className="relative min-h-[380px] sm:min-h-[420px] flex flex-col overflow-hidden">
                    <div className="flex-1 relative" style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #2A5678 55%, #EA580C 100%)' }}>
                        {/* Patrón sutil */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                        {/* Círculos decorativos */}
                        <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] rounded-full border border-white/[0.04]" />
                        <div className="absolute -right-20 -bottom-20 w-[280px] h-[280px] rounded-full border border-white/[0.06]" />

                        <div className="relative flex items-center h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 rounded-full bg-white/[0.08] backdrop-blur-sm text-brand-blue-100 text-sm font-medium tracking-wide uppercase border border-white/[0.08]">
                                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                                    Consejo Escolar de Merlo
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
                                    Servicio Alimentario<br />
                                    Escolar
                                    <span className="text-orange-400">.</span>
                                </h1>
                                <div className="mt-5 w-20 h-1 bg-orange-400 rounded-full" />
                                <p className="mt-5 text-lg sm:text-xl text-brand-blue-200/90 leading-relaxed max-w-xl font-light">
                                    El SAE garantiza el derecho a la alimentación de los alumnos de los establecimientos educativos del distrito de Merlo, publicando los menús y la información nutricional oficial.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Onda inferior */}
                    <div className="shrink-0" style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #2A5678 55%, #EA580C 100%)' }}>
                        <svg viewBox="0 0 1440 56" className="w-full block text-white" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ QUÉ ES EL SAE ══════ */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="max-w-xl mb-14">
                            <p className="text-xs font-semibold text-orange-500 tracking-[0.2em] uppercase mb-4">Sobre el área</p>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                ¿Qué es el SAE?
                            </h2>
                            <div className="mt-5 w-16 h-1 bg-orange-400 rounded-full" />
                            <p className="mt-5 text-gray-500 text-base font-light leading-relaxed">
                                El Servicio Alimentario Escolar (SAE) es un programa de la Provincia de Buenos Aires que brinda asistencia alimentaria a los alumnos de las escuelas públicas del distrito, supervisado por el Consejo Escolar de Merlo.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="group flex flex-col gap-4 rounded-2xl border border-brand-blue-100 bg-white p-7 hover:bg-orange-50/60 hover:border-orange-200 transition-all duration-200">
                                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                                    <IconApple />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-[15px] mb-2">Asistencia alimentaria</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Provisión de desayuno, almuerzo y merienda a los alumnos de escuelas primarias, secundarias y especiales del distrito.
                                    </p>
                                </div>
                            </div>

                            <div className="group flex flex-col gap-4 rounded-2xl border border-brand-blue-100 bg-white p-7 hover:bg-orange-50/60 hover:border-orange-200 transition-all duration-200">
                                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                                    <IconCalendar />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-[15px] mb-2">Menús mensuales</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Publicación de los menús oficiales aprobados para cada mes, elaborados bajo criterios nutricionales establecidos por la provincia.
                                    </p>
                                </div>
                            </div>

                            <div className="group flex flex-col gap-4 rounded-2xl border border-brand-blue-100 bg-white p-7 hover:bg-orange-50/60 hover:border-orange-200 transition-all duration-200">
                                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                                    <IconClipboard />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-[15px] mb-2">Documentación oficial</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Acceso a resoluciones, circulares y documentos oficiales relacionados con el Servicio Alimentario Escolar del distrito.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════ MENÚS ══════ */}
                {items.length > 0 && (
                    <section className="py-16 sm:py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                            <div className="max-w-xl mb-10">
                                <p className="text-xs font-semibold text-orange-500 tracking-[0.2em] uppercase mb-4">Documentos</p>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                    Menús
                                </h2>
                                <div className="mt-5 w-16 h-1 bg-orange-400 rounded-full" />
                                <p className="mt-4 text-gray-500 text-base font-light leading-relaxed">
                                    Menús oficiales publicados para los establecimientos del distrito.
                                </p>
                            </div>

                            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                                {items.map((item) => (
                                    <MenuCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ══════ CONTACTO ══════ */}
                <section className="relative">
                    <div className={items.length > 0 ? 'bg-gray-50' : 'bg-white'}>
                        <svg viewBox="0 0 1440 56" className="w-full block text-brand-blue-800" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                    <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

                        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">

                            <div className="text-center mb-12">
                                <p className="text-xs font-semibold text-orange-400 tracking-[0.2em] uppercase mb-4">¿Tenés una consulta?</p>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                                    Contactate con el área de SAE
                                </h2>
                                <div className="mt-5 w-16 h-1 bg-orange-400 mx-auto rounded-full" />
                                <p className="mt-5 text-brand-blue-200/90 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                                    Para consultas sobre los menús, la asistencia alimentaria o cualquier trámite relacionado con el SAE, comunicate con nuestra área.
                                </p>
                            </div>

                            {correos.length > 0 && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                                    {correos.map((c) => {
                                        const waNumber    = c.telefono?.replace(/[^\d+]/g, '');
                                        const isPhoneOnly = c.telefono && !c.correo;
                                        const iconBg      = c.es_whatsapp
                                            ? 'bg-green-400/20 text-green-300 group-hover:bg-green-400/30'
                                            : isPhoneOnly
                                            ? 'bg-sky-400/20 text-sky-300 group-hover:bg-sky-400/30'
                                            : 'bg-orange-400/20 text-orange-300 group-hover:bg-orange-400/30';
                                        const CardIcon = c.es_whatsapp ? IconWhatsApp : isPhoneOnly ? IconPhone : IconMail;

                                        return (
                                            <div
                                                key={c.id}
                                                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-sm p-6 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-200"
                                            >
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${iconBg}`}>
                                                    <CardIcon />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    {c.descripcion && (
                                                        <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1.5">
                                                            {c.descripcion}
                                                        </p>
                                                    )}

                                                    {c.correo && (
                                                        <a href={`mailto:${c.correo}`} className="group/link">
                                                            <span className="font-semibold text-white text-sm break-all group-hover/link:text-orange-300 transition-colors">
                                                                {c.correo}
                                                            </span>
                                                        </a>
                                                    )}

                                                    {c.telefono && (
                                                        <a
                                                            href={c.es_whatsapp ? `https://wa.me/${waNumber}` : `tel:${c.telefono}`}
                                                            target={c.es_whatsapp ? '_blank' : undefined}
                                                            rel={c.es_whatsapp ? 'noopener noreferrer' : undefined}
                                                            className={`flex items-center gap-1.5 group/link ${c.correo ? 'mt-1.5' : ''}`}
                                                        >
                                                            <span className={`font-semibold text-sm break-all transition-colors ${
                                                                c.es_whatsapp
                                                                    ? 'text-green-300 group-hover/link:text-green-200'
                                                                    : 'text-white group-hover/link:text-orange-300'
                                                            }`}>
                                                                {c.telefono}
                                                            </span>
                                                            {c.es_whatsapp && (
                                                                <span className="shrink-0 rounded-full bg-green-400/20 px-2 py-0.5 text-[10px] font-semibold text-green-300">
                                                                    WhatsApp
                                                                </span>
                                                            )}
                                                        </a>
                                                    )}

                                                    <p className="text-xs text-brand-blue-300/70 mt-1.5">
                                                        {c.es_whatsapp
                                                            ? 'Hacer clic para abrir WhatsApp'
                                                            : c.telefono && !c.correo
                                                            ? 'Hacer clic para llamar'
                                                            : 'Hacer clic para enviar un correo'}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    href="/contacto"
                                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-orange-500 text-white text-base font-semibold rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-lg shadow-orange-500/20"
                                >
                                    <IconMail />
                                    Ir a Contacto
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-base font-medium rounded-lg hover:bg-white/10 transition-all duration-200"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    Volver al inicio
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900">
                        <svg viewBox="0 0 1440 56" className="w-full block text-white" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ FOOTER ══════ */}
                <Footer />

            </div>
        </>
    );
}

