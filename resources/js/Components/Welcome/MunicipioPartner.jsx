export default function MunicipioPartner() {
    return (
        <section className="bg-surface-container-low text-on-surface py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Divider decorativo */}
                <div className="flex items-center gap-4 mb-12 md:mb-16">
                    <div className="h-px flex-1 bg-outline-variant/40"></div>
                    <span className="text-[0.6875rem] font-bold tracking-[0.15em] text-tertiary uppercase font-sans">
                        Articulación Institucional
                    </span>
                    <div className="h-px flex-1 bg-outline-variant/40"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Texto */}
                    <div className="order-2 lg:order-1">
                        <p className="text-tertiary font-bold tracking-[0.1em] text-[0.6875rem] mb-3 uppercase font-sans">
                            Trabajo en conjunto
                        </p>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold leading-tight mb-6">
                            Junto a la<br className="hidden md:block" /> Municipalidad<br className="hidden md:block" /> de Merlo
                        </h2>
                        <p className="text-on-surface-variant text-lg leading-relaxed mb-4 max-w-xl font-sans">
                            El Consejo Escolar de Merlo trabaja en estrecha colaboración con la Municipalidad de Merlo, articulando esfuerzos para garantizar condiciones educativas óptimas en todo el distrito.
                        </p>
                        <p className="text-on-surface-variant text-base leading-relaxed mb-10 max-w-xl font-sans">
                            Esta articulación institucional permite una respuesta más eficiente a las necesidades de las comunidades educativas, potenciando los recursos disponibles en beneficio de todos los estudiantes del partido.
                        </p>

                        <a
                            href="https://www.merlo.gob.ar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-primary text-white px-7 py-3.5 rounded font-bold hover:bg-primary/90 transition-colors font-sans text-sm md:text-base"
                        >
                            <span>Visitar sitio del municipio</span>
                            <span
                                className="material-symbols-outlined text-xl"
                                style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                            >
                                open_in_new
                            </span>
                        </a>
                    </div>

                    {/* Logo del municipio */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                        <a
                            href="https://www.merlo.gob.ar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block"
                            aria-label="Ir al sitio oficial de la Municipalidad de Merlo"
                        >
                            {/* Halo decorativo */}
                            <div className="absolute inset-0 -m-6 rounded-2xl bg-gradient-to-br from-primary/5 to-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative bg-white rounded-xl shadow-[0_24px_64px_-12px_rgba(18,53,83,0.12)] p-10 md:p-14 flex flex-col items-center gap-6 group-hover:shadow-[0_32px_80px_-12px_rgba(18,53,83,0.20)] transition-shadow duration-500">
                                <img
                                    src="/logo-municipio-merlo.png"
                                    alt="Logo oficial de la Municipalidad de Merlo"
                                    className="w-52 md:w-64 lg:w-72 h-auto object-contain"
                                />
                                <div className="flex items-center gap-2 text-tertiary text-xs font-bold tracking-widest uppercase font-sans opacity-70 group-hover:opacity-100 transition-opacity">
                                    <span
                                        className="material-symbols-outlined text-sm"
                                        style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                                    >
                                        open_in_new
                                    </span>
                                    <span>merlo.gob.ar</span>
                                </div>
                            </div>
                        </a>
                    </div>

                </div>

                {/* Divider inferior (desktop) */}
                <div className="hidden md:block mt-20 h-px bg-outline-variant/30"></div>

            </div>
        </section>
    );
}
