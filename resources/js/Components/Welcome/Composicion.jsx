export default function Composicion() {
    return (
        <section className="py-20 sm:py-24 bg-brand-blue-50/40">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                {/* Encabezado */}
                <div className="max-w-xl mb-14">
                    <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Composición</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                        ¿Cómo se<br />
                        <span className="text-brand-blue-600">compone?</span>
                    </h2>
                    <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                </div>

                {/* Layout: stat + items */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Stat grande */}
                    <div className="flex flex-col justify-center rounded-2xl bg-brand-blue-700 p-8 lg:p-10 text-white">
                        <span className="text-6xl sm:text-7xl font-extrabold leading-none">10</span>
                        <span className="mt-3 text-lg font-semibold text-brand-blue-100">Consejeros Escolares Titulares</span>
                        <p className="mt-3 text-sm text-brand-blue-200 leading-relaxed">
                            Elegidos por voto popular, representan distintos espacios políticos del distrito.
                        </p>
                    </div>

                    {/* Puntos informativos */}
                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
                        {[
                            {
                                title: 'Mandato de 4 años',
                                desc: 'Cada consejero cumple un mandato de cuatro años, renovándose la mitad del cuerpo cada dos años.',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Autoridades internas',
                                desc: 'Por medio de la Sesión Preparatoria, el cuerpo de consejeros vota los cargos de: presidencia, vicepresidencia, secretario administrativo, secretario del cuerpo y tesorero. Los mismos se renuevan cada dos años.',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Representación plural',
                                desc: 'Los consejeros representan distintos espacios políticos del distrito de Merlo.',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Administración escolar',
                                desc: 'Trabajan en la administración y supervisión de los recursos destinados a las escuelas públicas.',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>
                                ),
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 rounded-2xl border border-brand-blue-100 bg-white p-6">
                                <div className="w-10 h-10 rounded-lg bg-brand-blue-50 text-brand-blue-400 flex items-center justify-center shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
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
