export default function Composicion() {
    return (
        <section id="composicion" className="bg-surface text-on-surface py-20 md:py-32 selection:bg-primary-container selection:text-on-primary-container">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">

                {/* Section Header */}
                <header className="mb-16 md:mb-20 max-w-3xl">
                    <p className="text-tertiary font-sans text-[0.6875rem] uppercase tracking-widest mb-4 font-bold">
                        COMPOSICIÓN
                    </p>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold leading-tight mb-8">
                        ¿Cómo se compone?
                    </h2>
                    <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-2xl font-sans">
                        El Consejo Escolar está integrado por consejeros elegidos por voto popular en elecciones generales, representando distintos espacios políticos del distrito de Merlo. Actúan como órgano colegiado en la administración de los recursos educativos.
                    </p>
                </header>

                <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Main Highlight / Hero Card */}
                    <div className="col-span-12 lg:col-span-5 bg-gradient-to-br from-primary to-primary-container p-8 md:p-12 rounded shadow-[0_24px_48px_-12px_rgba(25,28,29,0.15)] text-white relative overflow-hidden group">
                        {/* Decorative subtle background element */}
                        <div className="absolute -right-24 -top-24 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700"></div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded bg-surface-container-lowest/10 mb-8">
                                <span className="material-symbols-outlined text-4xl text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    account_balance
                                </span>
                            </div>
                            <h3 className="font-serif text-6xl md:text-7xl font-bold leading-none mb-2 text-white">10</h3>
                            <h4 className="font-serif text-xl md:text-2xl leading-tight mb-6 text-white font-semibold">Consejeros Escolares Titulares</h4>

                            <div className="space-y-6 text-on-primary-container">
                                <p className="text-base leading-relaxed font-sans">
                                    Elegidos por voto popular en representación directa de la ciudadanía del distrito de Merlo.
                                </p>
                                <div className="h-[1px] w-12 bg-on-primary-container/30"></div>
                                <div className="grid grid-cols-2 gap-4 text-sm font-sans text-surface-container-highest">
                                    <div>
                                        <span className="block text-3xl font-serif font-bold text-white mb-1">4</span>
                                        años de mandato
                                    </div>
                                    <div>
                                        <span className="block text-3xl font-serif font-bold text-white mb-1">½</span>
                                        del cuerpo se renueva cada 2 años
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Four Points Grid */}
                    <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 lg:pl-8">
                        {[
                            {
                                num: '01',
                                title: 'Mandato de 4 años',
                                desc: 'Cada consejero cumple un mandato de cuatro años. La mitad del cuerpo se renueva cada dos años, garantizando continuidad institucional.',
                                icon: 'calendar_month',
                            },
                            {
                                num: '02',
                                title: 'Autoridades internas',
                                desc: 'En la Sesión Preparatoria, el cuerpo elige presidencia, vicepresidencia, secretarías y tesorería. Estos cargos se renuevan cada dos años.',
                                icon: 'assured_workload',
                            },
                            {
                                num: '03',
                                title: 'Representación plural',
                                desc: 'Los consejeros representan distintos espacios políticos del distrito, garantizando la diversidad de voces en la gestión educativa local.',
                                icon: 'groups',
                            },
                            {
                                num: '04',
                                title: 'Administración escolar',
                                desc: 'El cuerpo supervisa y administra los recursos destinados a las escuelas públicas del distrito, como órgano de control y gestión local.',
                                icon: 'account_balance_wallet',
                            },
                        ].map((item) => (
                            <div key={item.num} className="bg-surface-container-lowest p-6 md:p-8 rounded shadow-[0_8px_24px_-8px_rgba(25,28,29,0.06)] hover:bg-surface-container-low transition-colors duration-300 relative border border-outline-variant/20 h-full flex flex-col group">
                                <div className="absolute top-6 md:top-8 right-6 md:right-8 text-surface-variant font-serif text-3xl md:text-4xl font-bold opacity-50 select-none transition-transform group-hover:scale-110">
                                    {item.num}
                                </div>
                                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded bg-surface-container-high text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                                        {item.icon}
                                    </span>
                                </div>
                                <h4 className="font-serif text-lg md:text-xl font-bold text-primary mb-3">
                                    {item.title}
                                </h4>
                                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-sans">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
