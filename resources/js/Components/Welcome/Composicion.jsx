export default function Composicion() {
    return (
        <section id="composicion" className="py-20 sm:py-24 bg-brand-blue-50/40 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                {/* ── Encabezado ── */}
                <div className="grid lg:grid-cols-2 gap-8 items-end mb-14">
                    <div>
                        <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Composición</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                            ¿Cómo se<br />
                            <span className="text-brand-blue-600">compone?</span>
                        </h2>
                        <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                    </div>
                    <p className="text-gray-500 text-base font-light leading-relaxed lg:pb-1">
                        El Consejo Escolar está integrado por consejeros elegidos por voto popular en elecciones generales, representando distintos espacios políticos del distrito de Merlo. Actúan como órgano colegiado en la administración de los recursos educativos.
                    </p>
                </div>

                {/* ── Fila principal ── */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Stat destacado */}
                    <div className="relative flex flex-col justify-between rounded-2xl bg-brand-blue-700 overflow-hidden p-8 lg:p-10 text-white">
                        {/* Decoración */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/[0.04]" />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/[0.06]" />

                        <div className="relative">
                            <span className="text-[5rem] sm:text-[6rem] font-extrabold leading-none text-white">10</span>
                            <div className="w-12 h-0.5 bg-brand-gold-400 mt-3 mb-4" />
                            <p className="text-lg font-semibold text-brand-blue-100 leading-snug">
                                Consejeros Escolares Titulares
                            </p>
                            <p className="mt-3 text-sm text-brand-blue-300 leading-relaxed">
                                Elegidos por voto popular en representación directa de la ciudadanía del distrito de Merlo.
                            </p>
                        </div>

                        <div className="relative mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-2xl font-extrabold text-white leading-none">4</p>
                                <p className="text-xs text-brand-blue-300 mt-1 leading-tight">años de mandato</p>
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-white leading-none">½</p>
                                <p className="text-xs text-brand-blue-300 mt-1 leading-tight">del cuerpo se renueva cada 2 años</p>
                            </div>
                        </div>
                    </div>

                    {/* Grid de info */}
                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
                        {[
                            {
                                num: '01',
                                title: 'Mandato de 4 años',
                                desc: 'Cada consejero cumple un mandato de cuatro años. La mitad del cuerpo se renueva cada dos años, garantizando continuidad institucional.',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                ),
                            },
                            {
                                num: '02',
                                title: 'Autoridades internas',
                                desc: 'En la Sesión Preparatoria, el cuerpo elige presidencia, vicepresidencia, secretarías y tesorería. Estos cargos se renuevan cada dos años.',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                ),
                            },
                            {
                                num: '03',
                                title: 'Representación plural',
                                desc: 'Los consejeros representan distintos espacios políticos del distrito, garantizando la diversidad de voces en la gestión educativa local.',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                ),
                            },
                            {
                                num: '04',
                                title: 'Administración escolar',
                                desc: 'El cuerpo supervisa y administra los recursos destinados a las escuelas públicas del distrito, como órgano de control y gestión local.',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>
                                ),
                            },
                        ].map((item) => (
                            <div
                                key={item.num}
                                className="group relative flex flex-col gap-4 rounded-2xl border border-brand-blue-100 bg-white p-6 hover:border-brand-blue-200 hover:shadow-sm transition-all duration-200"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-lg bg-brand-blue-50 text-brand-blue-400 flex items-center justify-center shrink-0 group-hover:bg-brand-blue-100 transition-colors">
                                        {item.icon}
                                    </div>
                                    <span className="text-xs font-bold text-brand-gold-400 tracking-widest">{item.num}</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-[15px] mb-1.5">{item.title}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
