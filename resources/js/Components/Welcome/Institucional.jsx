export default function Institucional() {
    return (
        <section id="institucional" className="py-20 sm:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Columna izquierda – título + párrafos */}
                    <div>
                        <p className="text-xs font-semibold text-brand-gold-500 tracking-[0.2em] uppercase mb-4">Institucional</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                            ¿Qué es el<br />
                            <span className="text-brand-blue-600">Consejo Escolar?</span>
                        </h2>
                        <div className="mt-5 w-16 h-1 bg-brand-gold-400 rounded-full" />
                        <p className="mt-8 text-lg sm:text-xl text-gray-700 leading-relaxed font-light">
                            El Consejo Escolar de Merlo es un <strong className="font-semibold text-gray-900">organismo público</strong> del sistema educativo de la Provincia de Buenos Aires, encargado de administrar y gestionar los recursos y servicios de las escuelas públicas del distrito.
                        </p>
                        <p className="mt-6 text-base text-gray-500 leading-relaxed">
                            Depende de la Dirección General de Cultura y Educación y actúa como órgano descentralizado a nivel local, garantizando el correcto funcionamiento de los establecimientos escolares.
                        </p>
                        <a
                            href="https://normas.gba.gob.ar/ar-b/ley/2007/13688/3181"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex items-center gap-3 px-5 py-4 rounded-xl border border-brand-blue-100 bg-brand-blue-50/60 hover:bg-brand-blue-100/70 hover:border-brand-blue-200 transition-all duration-200 group"
                        >
                            <div className="w-9 h-9 rounded-lg bg-brand-blue-600 text-white flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-semibold text-brand-blue-500 uppercase tracking-widest">Marco normativo</p>
                                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-blue-700 transition-colors">
                                    Ley Provincial N.° 13.688
                                </p>
                                <p className="text-xs text-gray-500">Ley de Educación de la Provincia de Buenos Aires — Consejos Escolares</p>
                            </div>
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-blue-500 ml-auto shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </a>
                    </div>

                    {/* Columna derecha – pilares en cards */}
                    <div className="space-y-3">
                        {[
                            {
                                num: '01',
                                title: 'Organismo público provincial',
                                desc: 'Integrado al sistema educativo de la Provincia de Buenos Aires con funciones específicas en el distrito de Merlo.',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
                                    </svg>
                                ),
                            },
                            {
                                num: '02',
                                title: 'Órgano descentralizado',
                                desc: 'Funciona de manera autónoma a nivel local, dependiendo de la Dirección General de Cultura y Educación bonaerense.',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-6.364-6.364L4.5 8.25l4.5 4.5" />
                                    </svg>
                                ),
                            },
                            {
                                num: '03',
                                title: 'Garantía educativa',
                                desc: 'Asegura el correcto funcionamiento de los servicios escolares, la infraestructura y los recursos del distrito.',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                ),
                            },
                        ].map((item) => (
                            <div
                                key={item.num}
                                className="group flex items-start gap-5 px-6 py-6 rounded-xl border border-gray-100 bg-white/60 backdrop-blur-sm hover:bg-brand-blue-50/60 hover:border-brand-blue-100 transition-all duration-200 cursor-default"
                            >
                                <span className="text-xs font-bold text-brand-gold-400 tracking-widest mt-1 w-5 shrink-0">{item.num}</span>
                                <div className="w-10 h-10 rounded-lg bg-brand-blue-50 text-brand-blue-400 flex items-center justify-center shrink-0 group-hover:bg-brand-blue-100 transition-colors">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1.5">{item.title}</p>
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
