import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PublicNavbar from '@/Components/PublicNavbar';
import Footer from '@/Components/Welcome/Footer';
import { CROSS_PATTERN_BG } from '@/Components/patterns';



/* ─── Íconos por slug de área ─── */
const AREA_ICONS = {
    'presidencia':         'workspace_premium',
    'patrimonio':          'inventory_2',
    'sae':                 'shopping_cart',
    'recursos-humanos':    'group',
    'jubilaciones':        'elderly',
    'mesa-de-entradas':    'inbox',
    'descentralizados':    'location_city',
    'infraestructura':     'construction',
    'cooperacion-escolar': 'school',
    'guarderia':           'child_care',
    'correo-oficial':      'verified',
};

/* ─── Componente principal ─── */
export default function Contacto({ organismos = [], faqs = [], areas = [] }) {
    const [openFaq, setOpenFaq]       = useState(null);
    const [copiedEmail, setCopiedEmail] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const copyEmail = (email) => {
        navigator.clipboard.writeText(email).then(() => {
            setCopiedEmail(email);
            setTimeout(() => setCopiedEmail(null), 2000);
        });
    };

    const whatsappHref = (phone) => {
        const digits = phone.replace(/\D/g, '');
        return `https://wa.me/${digits}`;
    };

    const mesa       = areas.find(a => a.slug === 'mesa-de-entradas');
    const mesaWA     = mesa?.correos_activos.find(c => c.es_whatsapp && c.telefono)?.telefono ?? null;
    const mesaCorreo = mesa?.correos_activos.find(c => c.correo)?.correo ?? null;

    const CONTACTO_INFO = [
        {
            titulo:   'Dirección',
            detalle:  'Av. Calle Real 208/212',
            subtexto: 'Merlo Centro, Buenos Aires',
            icon:     'location_on',
            href:     null,
        },
        {
            titulo:   'Teléfono',
            detalle:  mesaWA ?? '—',
            subtexto: mesaWA ? 'WhatsApp Mesa de Entradas' : 'Sin datos',
            icon:     'call',
            href:     mesaWA ? whatsappHref(mesaWA) : null,
        },
        {
            titulo:   'Horario de atención',
            detalle:  'Lunes a viernes',
            subtexto: 'de 8 a 15 hs',
            icon:     'schedule',
            href:     null,
        },
        {
            titulo:   'Correo electrónico',
            detalle:  mesaCorreo ?? '—',
            subtexto: 'Mesa de Entradas',
            icon:     'mail',
            href:     mesaCorreo ? `mailto:${mesaCorreo}` : null,
        },
    ];

    return (
        <>
            <Head title="Contacto – Consejo Escolar de Merlo" />

            <div className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col">

                {/* ══════ HEADER ══════ */}
                <PublicNavbar transparent />

                {/* ══════ HERO CONTACTO ══════ */}
                <section className="relative min-h-[380px] sm:min-h-[420px] flex flex-col overflow-hidden bg-primary">
                    <div className="flex-1 relative">
                        {/* Patrón sutil */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: CROSS_PATTERN_BG}} />
                        {/* Círculos decorativos */}
                        <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] rounded-full bg-primary-container/20 blur-3xl" />
                        <div className="absolute -right-20 -bottom-20 w-[280px] h-[280px] rounded-full bg-tertiary/10 blur-3xl" />

                        <div className="relative flex items-center h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 rounded-full bg-white/[0.08] backdrop-blur-sm text-tertiary-fixed-dim text-sm font-medium tracking-wide uppercase border border-white/[0.08]">
                                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse" />
                                    Consejo Escolar de Merlo
                                </div>
                                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight">
                                    Contacto
                                    <span className="text-tertiary">.</span>
                                </h1>
                                <div className="mt-6 w-24 h-1 bg-tertiary rounded-full" />
                                <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl font-light font-sans">
                                    Estamos para ayudarte. Encontrá toda la información para comunicarte con nosotros o acercarte a nuestra sede.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Onda inferior */}
                    <div className="shrink-0 bg-primary">
                        <svg viewBox="0 0 1440 56" className="w-full block text-surface" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ INFORMACIÓN DE CONTACTO ══════ */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        {/* Encabezado */}
                        <div className="max-w-xl mb-12">
                            <p className="font-serif text-xs font-bold text-tertiary tracking-[0.2em] uppercase mb-4">Información</p>
                            <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold md:font-medium tracking-tight mb-3 md:mb-4">
                                ¿Cómo nos encontrás?
                            </h2>
                            <p className="mt-4 text-secondary text-base font-light font-sans leading-relaxed">
                                Podés visitarnos en nuestra sede, llamarnos o escribirnos por correo electrónico.
                            </p>
                        </div>

                        {/* Cards de contacto */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {CONTACTO_INFO.map((item, i) => {
                                const Tag = item.href ? 'a' : 'div';
                                const linkProps = item.href
                                    ? { href: item.href, target: item.href.startsWith('http') ? '_blank' : undefined, rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined }
                                    : {};
                                return (
                                    <Tag
                                        key={i}
                                        {...linkProps}
                                        className="group flex flex-col items-center text-center gap-4 rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest p-7 hover:bg-surface-container-low hover:border-outline-variant/60 transition-all duration-200"
                                    >
                                        <div className="w-14 h-14 rounded-none md:rounded bg-primary-container/20 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>{item.icon}</span>
                                        </div>
                                        <div>
                                            <p className="font-sans text-xs font-bold text-tertiary uppercase tracking-wider mb-2">{item.titulo}</p>
                                            <p className="font-serif font-bold text-primary text-[15px] mb-1">{item.detalle}</p>
                                            <p className="font-sans text-secondary text-sm">{item.subtexto}</p>
                                        </div>
                                    </Tag>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ══════ MAPA + CÓMO LLEGAR ══════ */}
                <section className="py-16 sm:py-20 bg-surface-container-low">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        {/* Encabezado */}
                        <div className="max-w-xl mb-12">
                            <p className="font-serif text-xs font-bold text-tertiary tracking-[0.2em] uppercase mb-4">Ubicación</p>
                            <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold md:font-medium tracking-tight mb-3 md:mb-4">
                                Nuestra sede
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-5 gap-8">
                            {/* Mapa */}
                            <div className="lg:col-span-3 rounded-none md:rounded overflow-hidden border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] h-[350px] sm:h-[420px]">
                                <iframe
                                    title="Ubicación Consejo Escolar de Merlo"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.8!2d-58.7276!3d-34.6714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbf3a0b1c7b3d%3A0x0!2sAv.%20Calle%20Real%20208%2C%20Merlo%2C%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1"
                                    className="w-full h-full"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            {/* Cómo llegar */}
                            <div className="lg:col-span-2 space-y-5">
                                <div className="rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-none md:rounded bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
                                        </div>
                                        <div>
                                            <p className="font-sans font-bold text-primary text-sm mb-1">Dirección completa</p>
                                            <p className="font-sans text-secondary text-sm leading-relaxed">
                                                Av. Calle Real 208/212, Merlo Centro, Provincia de Buenos Aires, Argentina.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-none md:rounded bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>directions_transit</span>
                                        </div>
                                        <div>
                                            <p className="font-sans font-bold text-primary text-sm mb-1">Transporte público</p>
                                            <p className="font-sans text-secondary text-sm leading-relaxed">
                                                Estación Merlo (Línea Sarmiento). A pocas cuadras de la estación, sobre Av. Calle Real.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-none md:rounded bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>schedule</span>
                                        </div>
                                        <div>
                                            <p className="font-sans font-bold text-primary text-sm mb-1">Horario de atención</p>
                                            <p className="font-sans text-secondary text-sm leading-relaxed">
                                                Lunes a viernes de 8:00 a 16:00 hs. Se recomienda llegar antes de las 13:30 para ser atendido.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════ PREGUNTAS FRECUENTES ══════ */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="grid lg:grid-cols-5 gap-12 items-start">

                            {/* Columna izquierda - Texto */}
                            <div className="lg:col-span-2">
                                <p className="font-serif text-xs font-bold text-tertiary tracking-[0.2em] uppercase mb-4">Ayuda</p>
                                <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold md:font-medium tracking-tight mb-3 md:mb-4">
                                    Preguntas frecuentes
                                </h2>
                                <p className="mt-6 text-secondary text-base font-light font-sans leading-relaxed">
                                    Estas son las consultas más comunes que recibimos. Si tu pregunta no está aquí, no dudes en contactarnos.
                                </p>
                            </div>

                            {/* Columna derecha - Accordion */}
                            <div className="lg:col-span-3 space-y-3">
                                {faqs.map((item, i) => (
                                    <div
                                        key={i}
                                        className="rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest overflow-hidden transition-all duration-200 hover:border-outline-variant/60"
                                    >
                                        <button
                                            onClick={() => toggleFaq(i)}
                                            className="flex items-center justify-between w-full text-left px-6 py-5 gap-4 focus:outline-none"
                                            aria-expanded={openFaq === i}
                                        >
                                            <span className="font-serif font-bold text-primary text-[15px] leading-snug">{item.pregunta}</span>
                                            <span 
                                                className={`material-symbols-outlined text-primary transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                                            >
                                                expand_more
                                            </span>
                                        </button>
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <p className="px-6 pb-5 text-secondary font-sans text-sm leading-relaxed">
                                                {item.respuesta}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════ ORGANISMOS VINCULADOS ══════ */}
                <section className="py-16 sm:py-20 bg-surface-container-low">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="max-w-xl mb-12">
                            <p className="font-serif text-xs font-bold text-tertiary tracking-[0.2em] uppercase mb-4">Red institucional</p>
                            <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold md:font-medium tracking-tight mb-3 md:mb-4">
                                Organismos vinculados
                            </h2>
                            <p className="mt-4 text-secondary text-base font-light font-sans leading-relaxed">
                                Organismos e instituciones con los que el Consejo Escolar de Merlo trabaja de manera coordinada en el distrito.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {organismos.map((org) => (
                                <div
                                    key={org.id}
                                    className="group flex flex-col gap-5 rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest p-6 hover:bg-surface-container-low hover:border-outline-variant/60 transition-all duration-200"
                                >
                                    <div className="w-12 h-12 rounded-none md:rounded bg-primary-container/20 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>account_balance</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-serif font-bold text-primary text-[15px] leading-snug mb-3">
                                            {org.titulo}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                                            </div>
                                            <div>
                                                <p className="font-sans text-sm font-bold text-primary">{org.responsable}</p>
                                                <p className="font-sans text-xs text-secondary">{org.cargo}</p>
                                                {org.direccion && (
                                                    <p className="font-sans text-xs text-secondary mt-0.5">{org.direccion}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════ DIRECTORIO DE CORREOS ══════ */}
                {areas.length > 0 && (
                    <section className="py-16 sm:py-20">
                        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                            {/* Encabezado */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-outline-variant/30 pb-8 mb-12">
                                <div className="max-w-xl">
                                    <p className="font-serif text-xs font-bold text-tertiary tracking-[0.2em] uppercase mb-4">Comunicación institucional</p>
                                    <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold md:font-medium tracking-tight mb-3 md:mb-4">
                                        Directorio de correos
                                    </h2>
                                    <p className="mt-2 text-secondary text-base font-light font-sans leading-relaxed">
                                        Escribinos directamente al área que corresponda a tu consulta.
                                    </p>
                                </div>
                                <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-low border border-outline-variant/20 shrink-0">
                                    <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>
                                        contact_mail
                                    </span>
                                </div>
                            </div>

                            {/* Grid de áreas */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {areas.map((area) => (
                                    <div
                                        key={area.id}
                                        className="rounded-none md:rounded border border-outline-variant/20 shadow-[0_8px_32px_rgba(18,53,83,0.06)] md:shadow-[0_4px_24px_rgba(18,53,83,0.04)] bg-surface-container-lowest overflow-hidden"
                                    >
                                        {/* Cabecera del área */}
                                        <div className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant/20 bg-primary/[0.03]">
                                            <div className="w-9 h-9 rounded-none md:rounded bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
                                                <span
                                                    className="material-symbols-outlined text-[18px]"
                                                    style={{ fontVariationSettings: "'FILL' 0" }}
                                                >
                                                    {AREA_ICONS[area.slug] ?? 'mail'}
                                                </span>
                                            </div>
                                            <p className="font-serif font-bold text-primary text-[14px] leading-tight">{area.nombre}</p>
                                        </div>

                                        {/* Lista de contactos */}
                                        <div className="divide-y divide-outline-variant/10">
                                            {area.correos_activos.map((item, i) => {
                                                if (item.telefono && item.es_whatsapp) {
                                                    return (
                                                        <a
                                                            key={i}
                                                            href={whatsappHref(item.telefono)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group/wa w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#25d366]/[0.06] transition-colors duration-150"
                                                        >
                                                            <span
                                                                className="material-symbols-outlined text-[17px] shrink-0 text-[#25d366] transition-colors duration-150"
                                                                style={{ fontVariationSettings: "'FILL' 1" }}
                                                            >
                                                                phone_in_talk
                                                            </span>
                                                            <div className="min-w-0 flex-1">
                                                                {item.descripcion && (
                                                                    <p className="font-sans text-[10px] font-bold text-tertiary uppercase tracking-wider mb-0.5 leading-none">
                                                                        {item.descripcion}
                                                                    </p>
                                                                )}
                                                                <p className="font-sans text-sm text-secondary group-hover/wa:text-[#25d366] transition-colors truncate">
                                                                    {item.telefono}
                                                                </p>
                                                            </div>
                                                            <span className="font-sans text-[10px] font-bold text-[#25d366] bg-[#25d366]/10 px-1.5 py-0.5 rounded leading-none shrink-0">
                                                                WA
                                                            </span>
                                                        </a>
                                                    );
                                                }

                                                const copied = copiedEmail === item.correo;
                                                return (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => copyEmail(item.correo)}
                                                        className={`group/email w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors duration-150 ${
                                                            copied
                                                                ? 'bg-tertiary/[0.07]'
                                                                : 'hover:bg-surface-container-low'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`material-symbols-outlined text-[17px] shrink-0 transition-colors duration-150 ${
                                                                copied ? 'text-tertiary' : 'text-outline group-hover/email:text-primary'
                                                            }`}
                                                            style={{ fontVariationSettings: copied ? "'FILL' 1" : "'FILL' 0" }}
                                                        >
                                                            {copied ? 'check_circle' : 'forward_to_inbox'}
                                                        </span>
                                                        <div className="min-w-0 flex-1">
                                                            {item.descripcion && (
                                                                <p className="font-sans text-[10px] font-bold text-tertiary uppercase tracking-wider mb-0.5 leading-none">
                                                                    {item.descripcion}
                                                                </p>
                                                            )}
                                                            <p className={`font-sans text-sm truncate transition-colors duration-150 ${
                                                                copied ? 'text-tertiary font-medium' : 'text-secondary group-hover/email:text-primary'
                                                            }`}>
                                                                {copied ? '¡Copiado!' : item.correo}
                                                            </p>
                                                        </div>
                                                        <span
                                                            className={`material-symbols-outlined text-[15px] shrink-0 transition-all duration-150 ${
                                                                copied
                                                                    ? 'text-tertiary opacity-100'
                                                                    : 'text-outline opacity-0 group-hover/email:opacity-100'
                                                            }`}
                                                        >
                                                            {copied ? 'done_all' : 'content_copy'}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ══════ CTA ══════ */}
                <section className="relative">
                    <div className="bg-surface-container-low">
                        <svg viewBox="0 0 1440 56" className="w-full block text-primary" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                    <div className="bg-primary relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: CROSS_PATTERN_BG}} />
                        
                        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 text-center">
                            <p className="font-serif text-xs font-bold text-tertiary tracking-[0.2em] uppercase mb-4">¿Tenés alguna consulta?</p>
                            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold md:font-medium tracking-tight mb-6">
                                Estamos para ayudarte
                            </h2>
                            <p className="font-sans text-white/80 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-8">
                                No dudes en acercarte o comunicarte con nosotros. Te atenderemos de la mejor manera para resolver tus consultas.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <a
                                    href="tel:02204825836"
                                    className="inline-flex items-center gap-2.5 px-8 py-3 bg-tertiary text-on-tertiary font-sans text-sm font-bold uppercase tracking-wide rounded-none md:rounded hover:bg-tertiary-fixed-dim transition-all duration-300 shadow-md active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>call</span>
                                    Llamanos
                                </a>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2.5 px-8 py-3 border border-outline-variant/40 bg-white/[0.05] text-white font-sans text-sm font-medium uppercase tracking-wide rounded-none md:rounded hover:bg-white/10 transition-all duration-300 active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
                                    Volver al inicio
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary">
                        <svg viewBox="0 0 1440 56" className="w-full block text-surface" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ FOOTER ══════ */}
                <Footer areas={areas} />

            </div>
        </>
    );
}

