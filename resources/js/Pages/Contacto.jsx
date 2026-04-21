import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PublicNavbar from '@/Components/PublicNavbar';
import Footer from '@/Components/Welcome/Footer';

/* ─── Datos de contacto ─── */
const CONTACTO_INFO = [
    {
        titulo: 'Dirección',
        detalle: 'Av. Calle Real 208/212',
        subtexto: 'Merlo Centro, Buenos Aires',
        icon: 'location_on',
    },
    {
        titulo: 'Teléfono',
        detalle: '0220-482-5836',
        subtexto: 'Línea directa',
        icon: 'call',
    },
    {
        titulo: 'Horario de atención',
        detalle: 'Lunes a viernes',
        subtexto: 'de 8 a 16 hs',
        icon: 'schedule',
    },
    {
        titulo: 'Correo electrónico',
        detalle: 'consejoescolarmerlo@abc.gob.ar',
        subtexto: 'Consultas generales',
        icon: 'mail',
    },
];

/* ─── Preguntas frecuentes ─── */
const FAQ = [
    {
        pregunta: '¿Qué trámites puedo realizar en el Consejo Escolar?',
        respuesta: 'En el Consejo Escolar se gestionan trámites relacionados con infraestructura escolar, comedores, transporte educativo, provisión de mobiliario y equipamiento, y administración de personal auxiliar.',
    },
    {
        pregunta: '¿Necesito sacar turno previo?',
        respuesta: 'No es necesario sacar turno previo. Podés acercarte en el horario de atención de lunes a viernes de 8 a 16 hs. Para consultas específicas, te recomendamos comunicarte telefónicamente antes.',
    },
    {
        pregunta: '¿Cómo reporto un problema de infraestructura en una escuela?',
        respuesta: 'Podés acercarte personalmente a la sede del Consejo Escolar, llamar por teléfono al 0220-482-5836 o enviar un correo electrónico detallando el problema y la escuela afectada.',
    },
    {
        pregunta: '¿El Consejo Escolar gestiona las inscripciones escolares?',
        respuesta: 'No, las inscripciones escolares son gestionadas directamente por cada establecimiento educativo. El Consejo Escolar se encarga de la administración de recursos, infraestructura y servicios.',
    },
];

/* ─── Componente principal ─── */
export default function Contacto() {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

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
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />
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
                            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary leading-tight">
                                ¿Cómo nos encontrás?
                            </h2>
                            <div className="mt-5 w-16 h-1 bg-tertiary rounded-full" />
                            <p className="mt-4 text-secondary text-base font-light font-sans leading-relaxed">
                                Podés visitarnos en nuestra sede, llamarnos o escribirnos por correo electrónico.
                            </p>
                        </div>

                        {/* Cards de contacto */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {CONTACTO_INFO.map((item, i) => (
                                <div
                                    key={i}
                                    className="group flex flex-col items-center text-center gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-7 hover:bg-surface-container-low hover:border-outline-variant/60 transition-all duration-200 shadow-sm"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>{item.icon}</span>
                                    </div>
                                    <div>
                                        <p className="font-sans text-xs font-bold text-tertiary uppercase tracking-wider mb-2">{item.titulo}</p>
                                        <p className="font-serif font-bold text-primary text-[15px] mb-1">{item.detalle}</p>
                                        <p className="font-sans text-secondary text-sm">{item.subtexto}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════ MAPA + CÓMO LLEGAR ══════ */}
                <section className="py-16 sm:py-20 bg-surface-container-low">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        {/* Encabezado */}
                        <div className="max-w-xl mb-12">
                            <p className="font-serif text-xs font-bold text-tertiary tracking-[0.2em] uppercase mb-4">Ubicación</p>
                            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary leading-tight">
                                Nuestra sede
                            </h2>
                            <div className="mt-5 w-16 h-1 bg-tertiary rounded-full" />
                        </div>

                        <div className="grid lg:grid-cols-5 gap-8">
                            {/* Mapa */}
                            <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-outline-variant/30 h-[350px] sm:h-[420px] shadow-sm">
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
                                <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
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

                                <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
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

                                <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
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
                                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary leading-tight">
                                    Preguntas<br />
                                    <span className="text-secondary-fixed-dim">frecuentes</span>
                                </h2>
                                <div className="mt-5 w-16 h-1 bg-tertiary rounded-full" />
                                <p className="mt-6 text-secondary text-base font-light font-sans leading-relaxed">
                                    Estas son las consultas más comunes que recibimos. Si tu pregunta no está aquí, no dudes en contactarnos.
                                </p>
                            </div>

                            {/* Columna derecha - Accordion */}
                            <div className="lg:col-span-3 space-y-3">
                                {FAQ.map((item, i) => (
                                    <div
                                        key={i}
                                        className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest overflow-hidden transition-all duration-200 hover:border-outline-variant/60 shadow-sm"
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
                            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary leading-tight">
                                Organismos vinculados
                            </h2>
                            <div className="mt-5 w-16 h-1 bg-tertiary rounded-full" />
                            <p className="mt-4 text-secondary text-base font-light font-sans leading-relaxed">
                                Organismos e instituciones con los que el Consejo Escolar de Merlo trabaja de manera coordinada en el distrito.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                {
                                    nombre: 'Jefatura Distrital',
                                    responsable: 'Hugo Rosa',
                                    cargo: 'Jefe Distrital',
                                    icon: 'account_balance',
                                },
                                {
                                    nombre: 'Secretaría de Educación',
                                    responsable: 'Silvana Zahana',
                                    cargo: 'Secretaria de Educación',
                                    icon: 'school',
                                },
                                {
                                    nombre: 'Sede Inspectores de Nivel',
                                    responsable: 'Hugo Rosa',
                                    cargo: 'Inspector Jefe Distrital',
                                    icon: 'admin_panel_settings',
                                },
                                {
                                    nombre: 'Dirección Provincial de Infraestructura Escolar (DPIe)',
                                    responsable: 'Karina Morales',
                                    cargo: 'Inspectora Regional',
                                    icon: 'architecture',
                                },
                            ].map((org, i) => (
                                <div
                                    key={i}
                                    className="group flex flex-col gap-5 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 hover:bg-surface-container-low hover:border-outline-variant/60 transition-all duration-200 shadow-sm"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>{org.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-serif font-bold text-primary text-[15px] leading-snug mb-3">
                                            {org.nombre}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                                            </div>
                                            <div>
                                                <p className="font-sans text-sm font-bold text-primary">{org.responsable}</p>
                                                <p className="font-sans text-xs text-secondary">{org.cargo}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════ CTA ══════ */}
                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="bg-primary rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />
                            <div className="absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] rounded-full bg-tertiary/20 blur-3xl pointer-events-none" />

                            <div className="relative z-10">
                                <p className="font-serif text-xs font-bold text-tertiary tracking-[0.2em] uppercase mb-4">¿Tenés alguna consulta?</p>
                                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                                    Estamos para ayudarte
                                </h2>
                                <div className="w-16 h-1 bg-tertiary mx-auto rounded-full mb-6" />
                                <p className="font-sans text-white/80 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-8">
                                    No dudes en acercarte o comunicarte con nosotros. Te atenderemos de la mejor manera para resolver tus consultas.
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <a
                                        href="tel:02204825836"
                                        className="inline-flex items-center gap-2.5 px-8 py-3 bg-tertiary text-on-tertiary font-sans text-sm font-bold uppercase tracking-wide rounded hover:bg-tertiary-fixed-dim transition-all duration-300 shadow-md active:scale-95"
                                    >
                                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>call</span>
                                        Llamanos
                                    </a>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2.5 px-8 py-3 border border-outline-variant/40 bg-white/[0.05] text-white font-sans text-sm font-medium uppercase tracking-wide rounded hover:bg-white/10 transition-all duration-300 active:scale-95"
                                    >
                                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
                                        Volver al inicio
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════ FOOTER ══════ */}
                <Footer />

            </div>
        </>
    );
}

