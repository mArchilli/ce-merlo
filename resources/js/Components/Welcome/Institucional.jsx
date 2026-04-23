export default function Institucional() {
    return (
        <section id="institucional" className="bg-surface text-on-surface py-12 md:py-20 lg:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Hero Section: Intentional Asymmetry */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start mb-16 md:mb-24">
                    <div className="lg:col-span-8">
                        <p className="text-tertiary font-bold tracking-[0.1em] text-[0.6875rem] mb-3 md:mb-4 uppercase">
                            Institución y Gobierno
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight font-serif">
                            Sobre el <br className="hidden md:block" />Consejo Escolar
                        </h2>
                        <div className="mt-6 md:mt-8 max-w-2xl">
                            <p className="text-on-surface-variant font-light md:font-normal leading-relaxed text-lg">
                                Administración y gestión del sistema educativo provincial, garantizando el derecho a una educación pública de calidad en todo el territorio bonaerense a través de una gestión transparente y cercana.
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-4 lg:pt-12 hidden md:block">
                        <div className="bg-surface-container-low p-8 rounded shadow-[24px_24px_48px_rgba(18,53,83,0.04)]">
                            <span className="material-symbols-outlined text-tertiary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>policy</span>
                            <h3 className="text-xl font-bold text-primary mb-2 font-serif">Presencia Institucional</h3>
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                                Nuestra labor se fundamenta en la cercanía con las comunidades educativas y la optimización de los recursos públicos.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bento Grid: Main Points */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
                    {/* Point 1 */}
                    <div className="group bg-surface-container-lowest md:bg-surface-container-low hover:bg-surface-container-lowest transition-all duration-300 p-8 rounded-lg md:rounded relative overflow-hidden shadow-[0_24px_48px_rgba(18,53,83,0.04)] md:shadow-none">
                        <div className="absolute right-[-1rem] top-[-1rem] md:top-0 md:right-0 md:w-24 md:h-24 md:bg-primary/5 md:-mr-8 md:-mt-8 md:rounded-full transition-transform group-hover:scale-110 text-primary opacity-5 font-serif text-8xl font-bold md:hidden">01</div>
                        <span className="text-tertiary md:text-tertiary font-bold text-2xl md:text-sm mb-4 block md:tracking-widest md:uppercase font-serif md:font-sans">01</span>
                        <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4 font-serif">Organismo público provincial</h3>
                        <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                            Formamos parte de la estructura gubernamental encargada de asegurar la infraestructura y los servicios básicos necesarios para el funcionamiento de las escuelas.
                        </p>
                    </div>

                    {/* Point 2 */}
                    <div className="group bg-surface-container-low hover:bg-surface-container-lowest transition-all duration-300 p-8 rounded-lg md:rounded relative overflow-hidden">
                        <div className="absolute right-[-1rem] top-[-1rem] md:top-0 md:right-0 md:w-24 md:h-24 md:bg-primary/5 md:-mr-8 md:-mt-8 md:rounded-full transition-transform group-hover:scale-110 text-primary opacity-5 font-serif text-8xl font-bold md:hidden">02</div>
                        <span className="text-tertiary md:text-tertiary font-bold text-2xl md:text-sm mb-4 block md:tracking-widest md:uppercase font-serif md:font-sans">02</span>
                        <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4 font-serif">Órgano descentralizado</h3>
                        <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                            Operamos con autonomía en la gestión de recursos locales, permitiendo una respuesta rápida y específica a las necesidades de cada distrito escolar.
                        </p>
                    </div>

                    {/* Point 3 */}
                    <div className="group bg-surface-container-lowest md:bg-surface-container-low hover:bg-surface-container-lowest transition-all duration-300 p-8 rounded-lg md:rounded relative overflow-hidden shadow-[0_24px_48px_rgba(18,53,83,0.04)] md:shadow-none">
                        <div className="absolute right-[-1rem] top-[-1rem] md:top-0 md:right-0 md:w-24 md:h-24 md:bg-primary/5 md:-mr-8 md:-mt-8 md:rounded-full transition-transform group-hover:scale-110 text-primary opacity-5 font-serif text-8xl font-bold md:hidden">03</div>
                        <span className="text-tertiary md:text-tertiary font-bold text-2xl md:text-sm mb-4 block md:tracking-widest md:uppercase font-serif md:font-sans">03</span>
                        <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4 font-serif">Garantía educativa</h3>
                        <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                            Nuestra misión central es remover obstáculos materiales para que el proceso pedagógico se desarrolle en condiciones dignas y seguras.
                        </p>
                    </div>
                </div>

                {/* Marco Normativo: High Contrast Block */}
                <section className="relative bg-gradient-to-br from-[#123553] to-[#2c4c6b] md:bg-none md:bg-primary-container text-white p-8 md:p-12 lg:p-20 rounded-lg md:rounded-xl overflow-hidden shadow-xl md:shadow-2xl">
                    <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                        <img
                            alt="Close-up of law books in a classical library with warm ambient lighting"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe7YV8Z5u6_OZXObyKDOiJkSBojXaZ2Z5MjLXOz9XVfAWy9XRKd7eVw7RiAiWC3wSe5bLh9sAKbBLW-zumhOqq1RY1bP7zMPIdGihlwRUfYrdh2Uj4LLEBpGgwgTOvwFI6-6nkDstbAvhjHAKLgc0ZZ5YnmvaiJ__KPm3bQmTzFFAOY7CDBe8M3hA1tZ3JQefMrJrr0F-oSieR_eY3gtno_3hOEGmhNp5UkpD546LRJFPehHrvqQmE2YRdgIMllaGqTLVbVXc2X2k"
                        />
                    </div>

                    <div className="relative z-10 lg:grid lg:grid-cols-2 gap-12 items-center">
                        <div className="flex md:block items-start gap-4 md:gap-0">
                            {/* Mobile icon */}
                            <span className="material-symbols-outlined text-tertiary-fixed text-3xl md:hidden mt-1" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>gavel</span>

                            <div>
                                {/* Desktop badge */}
                                <div className="hidden md:inline-flex items-center gap-2 bg-tertiary/20 text-tertiary-fixed px-4 py-1 rounded mb-6">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>gavel</span>
                                    <span className="text-[0.6875rem] font-bold tracking-widest uppercase">Marco Normativo</span>
                                </div>
                                {/* Mobile badge */}
                                <span className="md:hidden text-[0.625rem] font-bold tracking-widest text-on-primary-container block mb-1 uppercase">
                                    Marco Normativo
                                </span>

                                <h3 className="text-xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-8 leading-tight font-serif text-white">Ley Provincial N.° 13.688</h3>
                                <p className="text-primary-fixed md:text-on-primary-container text-sm md:text-lg mb-6 md:mb-8 leading-snug md:leading-relaxed max-w-xl opacity-90 md:opacity-100">
                                    Nuestras facultades y deberes están estrictamente definidos por la Ley de Educación de la Provincia de Buenos Aires, garantizando un ejercicio democrático y reglado de la función pública.
                                </p>

                                {/* Desktop Button */}
                                <a
                                    href="https://normas.gba.gob.ar/ar-b/ley/2007/13688/3181"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden md:inline-flex bg-primary text-white px-8 py-4 rounded font-bold hover:bg-primary/90 transition-colors items-center gap-3"
                                >
                                    <span>Consultar normativa completa</span>
                                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>open_in_new</span>
                                </a>

                                {/* Mobile Button */}
                                <a
                                    href="https://normas.gba.gob.ar/ar-b/ley/2007/13688/3181"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="md:hidden flex items-center gap-2 text-sm font-semibold border-b border-tertiary-fixed-dim pb-1 hover:text-tertiary-fixed transition-colors w-fit"
                                >
                                    Ver documento completo
                                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>arrow_forward</span>
                                </a>
                            </div>
                        </div>

                        <div className="hidden md:grid mt-12 lg:mt-0 grid-cols-2 gap-4">
                            <div className="bg-white/5 backdrop-blur-md p-6 rounded border border-white/10">
                                <h4 className="text-tertiary-fixed font-bold mb-2 font-serif text-lg">Art. 147</h4>
                                <p className="text-sm opacity-80 leading-relaxed text-white">Referente a la administración de los servicios educativos en el ámbito distrital.</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md p-6 rounded border border-white/10">
                                <h4 className="text-tertiary-fixed font-bold mb-2 font-serif text-lg">Art. 150</h4>
                                <p className="text-sm opacity-80 leading-relaxed text-white">Sobre las competencias de los consejeros escolares electos por el voto popular.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Decorative Archival Element (Mobile) */}
                <div className="md:hidden mt-16 flex justify-center opacity-30">
                    <div className="w-16 h-1 bg-outline-variant rounded-full"></div>
                </div>

                {/* Signature Component: Institutional Badge (Desktop) */}
                <div className="hidden md:flex mt-20 flex-col items-center">
                    <div className="flex items-center gap-4 bg-surface-container-highest px-6 py-3 rounded">
                        <span className="material-symbols-outlined text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>verified</span>
                        <span className="text-[0.6875rem] font-medium text-on-surface-variant uppercase tracking-[0.1em]">Documento Oficial del Consejo Escolar de la Provincia de Buenos Aires</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
