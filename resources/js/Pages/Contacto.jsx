import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PublicNavbar from '@/Components/PublicNavbar';
import PublicFooter from '@/Components/PublicFooter';

/* ─── Datos de contacto ─── */
const CONTACTO_INFO = [
    {
        titulo: 'Dirección',
        detalle: 'Av. Calle Real 208/212',
        subtexto: 'Merlo Centro, Buenos Aires',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        ),
    },
    {
        titulo: 'Teléfono',
        detalle: '0220-482-5836',
        subtexto: 'Línea directa',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
        ),
    },
    {
        titulo: 'Horario de atención',
        detalle: 'Lunes a viernes',
        subtexto: 'de 8 a 16 hs',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        titulo: 'Correo electrónico',
        detalle: 'consejoescolarmerlo@abc.gob.ar',
        subtexto: 'Consultas generales',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
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

            <div className="bg-white text-gray-800 font-sans antialiased">

                {/* ══════ HEADER ══════ */}
                <PublicNavbar transparent />

                {/* ══════ HERO CONTACTO ══════ */}
                <section className="relative min-h-[380px] sm:min-h-[420px] flex flex-col overflow-hidden">
                    <div className="flex-1 relative bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900">
                        {/* Patrón sutil */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />
                        {/* Círculos decorativos */}
                        <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] rounded-full border border-white/[0.04]" />
                        <div className="absolute -right-20 -bottom-20 w-[280px] h-[280px] rounded-full border border-white/[0.06]" />

                        <div className="relative flex items-center h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 rounded-full bg-white/[0.08] backdrop-blur-sm text-brand-blue-100 text-sm font-medium tracking-wide uppercase border border-white/[0.08]">
                                    <span className="w-2 h-2 rounded-full bg-brand-gold-400 animate-pulse" />
                                    Consejo Escolar de Merlo
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
                                    Contacto
                                    <span className="text-brand-gold-400">.</span>
                                </h1>
                                <div className="mt-5 w-20 h-1 bg-brand-gold-400 rounded-full" />
                                <p className="mt-5 text-lg sm:text-xl text-brand-blue-200/90 leading-relaxed max-w-xl font-light">
                                    Estamos para ayudarte. Encontrá toda la información para comunicarte con nosotros o acercarte a nuestra sede.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Onda inferior */}
                    <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900 shrink-0">
                        <svg viewBox="0 0 1440 56" className="w-full block text-white" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                </section>

                {/* ══════ INFORMACIÓN DE CONTACTO ══════ */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        {/* Encabezado */}
                        <div className="max-w-xl mb-12">
                            <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Información</p>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                ¿Cómo nos encontrás?
                            </h2>
                            <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                            <p className="mt-4 text-gray-500 text-base font-light leading-relaxed">
                                Podés visitarnos en nuestra sede, llamarnos o escribirnos por correo electrónico.
                            </p>
                        </div>

                        {/* Cards de contacto */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {CONTACTO_INFO.map((item, i) => (
                                <div
                                    key={i}
                                    className="group flex flex-col items-center text-center gap-4 rounded-2xl border border-brand-blue-100 bg-white p-7 hover:bg-brand-blue-50/60 hover:border-brand-blue-200 transition-all duration-200"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-brand-blue-50 text-brand-blue-400 flex items-center justify-center shrink-0 group-hover:bg-brand-blue-100 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-brand-gold-500 uppercase tracking-wider mb-2">{item.titulo}</p>
                                        <p className="font-semibold text-gray-900 text-[15px] mb-1">{item.detalle}</p>
                                        <p className="text-gray-500 text-sm">{item.subtexto}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════ MAPA + CÓMO LLEGAR ══════ */}
                <section className="py-16 sm:py-20 bg-brand-blue-50/40">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        {/* Encabezado */}
                        <div className="max-w-xl mb-12">
                            <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Ubicación</p>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                Nuestra sede
                            </h2>
                            <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                        </div>

                        <div className="grid lg:grid-cols-5 gap-8">
                            {/* Mapa */}
                            <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-brand-blue-100 h-[350px] sm:h-[420px]">
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
                                <div className="rounded-2xl border border-brand-blue-100 bg-white p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-brand-blue-50 text-brand-blue-400 flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm mb-1">Dirección completa</p>
                                            <p className="text-gray-500 text-sm leading-relaxed">
                                                Av. Calle Real 208/212, Merlo Centro, Provincia de Buenos Aires, Argentina.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-brand-blue-100 bg-white p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-brand-blue-50 text-brand-blue-400 flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm mb-1">Transporte público</p>
                                            <p className="text-gray-500 text-sm leading-relaxed">
                                                Estación Merlo (Línea Sarmiento). A pocas cuadras de la estación, sobre Av. Calle Real.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-brand-blue-100 bg-white p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-brand-blue-50 text-brand-blue-400 flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm mb-1">Horario de atención</p>
                                            <p className="text-gray-500 text-sm leading-relaxed">
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
                <section className="py-16 sm:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="grid lg:grid-cols-5 gap-12 items-start">

                            {/* Columna izquierda - Texto */}
                            <div className="lg:col-span-2">
                                <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Ayuda</p>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                    Preguntas<br />
                                    <span className="text-brand-blue-600">frecuentes</span>
                                </h2>
                                <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                                <p className="mt-6 text-gray-500 text-base font-light leading-relaxed">
                                    Estas son las consultas más comunes que recibimos. Si tu pregunta no está aquí, no dudes en contactarnos.
                                </p>
                            </div>

                            {/* Columna derecha - Accordion */}
                            <div className="lg:col-span-3 space-y-3">
                                {FAQ.map((item, i) => (
                                    <div
                                        key={i}
                                        className="rounded-xl border border-gray-100 bg-white/60 backdrop-blur-sm overflow-hidden transition-all duration-200 hover:border-brand-blue-100"
                                    >
                                        <button
                                            onClick={() => toggleFaq(i)}
                                            className="flex items-center justify-between w-full text-left px-6 py-5 gap-4"
                                            aria-expanded={openFaq === i}
                                        >
                                            <span className="font-semibold text-gray-900 text-[15px] leading-snug">{item.pregunta}</span>
                                            <svg
                                                className={`w-5 h-5 text-brand-blue-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
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
                <section className="py-16 sm:py-20 bg-brand-blue-50/40">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                        <div className="max-w-xl mb-12">
                            <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Red institucional</p>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                Organismos vinculados
                            </h2>
                            <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                            <p className="mt-4 text-gray-500 text-base font-light leading-relaxed">
                                Organismos e instituciones con los que el Consejo Escolar de Merlo trabaja de manera coordinada en el distrito.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                {
                                    nombre: 'Jefatura Distrital',
                                    responsable: 'Hugo Rosa',
                                    cargo: 'Jefe Distrital',
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                        </svg>
                                    ),
                                },
                                {
                                    nombre: 'Secretaría de Educación',
                                    responsable: 'Silvana Zahana',
                                    cargo: 'Secretaria de Educación',
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
                                        </svg>
                                    ),
                                },
                                {
                                    nombre: 'Sede Inspectores de Nivel',
                                    responsable: 'Hugo Rosa',
                                    cargo: 'Inspector Jefe Distrital',
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ),
                                },
                                {
                                    nombre: 'Dirección Provincial de Infraestructura Escolar (DPIe)',
                                    responsable: 'Karina Morales',
                                    cargo: 'Inspectora Regional',
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                        </svg>
                                    ),
                                },
                            ].map((org, i) => (
                                <div
                                    key={i}
                                    className="group flex flex-col gap-5 rounded-2xl border border-brand-blue-100 bg-white p-6 hover:bg-brand-blue-50/60 hover:border-brand-blue-200 transition-all duration-200"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-brand-blue-50 text-brand-blue-400 flex items-center justify-center shrink-0 group-hover:bg-brand-blue-100 transition-colors">
                                        {org.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 text-[15px] leading-snug mb-3">
                                            {org.nombre}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-brand-gold-50 text-brand-gold-500 flex items-center justify-center shrink-0">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{org.responsable}</p>
                                                <p className="text-xs text-gray-400">{org.cargo}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════ CTA ══════ */}
                <section className="relative">
                    <div className="bg-white">
                        <svg viewBox="0 0 1440 56" className="w-full block text-brand-blue-800" preserveAspectRatio="none">
                            <path fill="currentColor" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,56L1360,56C1280,56,1120,56,960,56C800,56,640,56,480,56C320,56,160,56,80,56L0,56Z" />
                        </svg>
                    </div>
                    <div className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-blue-900 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />

                        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 text-center">
                            <p className="text-xs font-semibold text-brand-gold-400 tracking-[0.2em] uppercase mb-4">¿Tenés alguna consulta?</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
                                Estamos para ayudarte
                            </h2>
                            <div className="w-16 h-1 bg-brand-gold-400 mx-auto rounded-full mb-6" />
                            <p className="text-brand-blue-200/90 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-8">
                                No dudes en acercarte o comunicarte con nosotros. Te atenderemos de la mejor manera para resolver tus consultas.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <a
                                    href="tel:02204825836"
                                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-gold-400 text-white text-base font-semibold rounded-lg hover:bg-brand-gold-500 transition-all duration-200 shadow-lg shadow-brand-gold-400/20"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                    Llamanos
                                </a>
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
                <PublicFooter />

            </div>
        </>
    );
}
