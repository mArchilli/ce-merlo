const FUNCIONES = [
    { title: 'Administración de fondos', desc: 'Coordinacion con Inspectores, directivos y la comunidad educativa por medio de las cooperadoras escolares.' },
    { title: 'Infraestructura escolar', desc: 'Gestión de infraestructura escolar: mantenimiento, reparaciones y obras.' },
    { title: 'Servicios escolares', desc: 'Supervisión de servicios escolares: comedores, transporte y mobiliario.' },
    { title: 'Coordinación educativa', desc: 'Coordinación con directivos, docentes y la comunidad educativa.' },
    { title: 'Recursos humanos', desc: 'Designación de personal auxiliar de las instituciones educativas.' },
    { title: 'S.A.E', desc: 'Supervisión de servicios escolares: comedores, transporte y patrimonio de las instituciones escolares.' },
];

export default function Funciones() {
    return (
        <section id="funciones" className="bg-surface text-on-surface py-20 md:py-32 selection:bg-secondary-container selection:text-on-secondary-container">
            <div className="max-w-[1200px] mx-auto px-6">
                
                {/* Header Section */}
                <header className="mb-16 md:mb-24 flex flex-col items-start max-w-3xl">
                    <span className="font-sans text-[0.6875rem] uppercase tracking-[0.15em] text-tertiary font-bold mb-4">
                        ¿Qué hacemos?
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold leading-tight mb-8">
                        Funciones principales
                    </h2>
                    <p className="font-sans text-lg md:text-xl text-on-surface-variant leading-relaxed">
                        El Consejo Escolar desempeña funciones clave para el sistema educativo del distrito de Merlo, actuando como nexo entre la comunidad escolar y los organismos provinciales.
                    </p>
                </header>

                {/* Bento Grid / Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {FUNCIONES.map((f, i) => {
                        const num = String(i + 1).padStart(2, '0');
                        return (
                            <div 
                                key={i} 
                                className="group bg-surface-container-lowest md:bg-surface-container-low hover:bg-surface-container-lowest transition-all duration-300 p-8 rounded-lg md:rounded relative overflow-hidden shadow-[0_24px_48px_rgba(18,53,83,0.04)] md:shadow-none"
                            >
                                <div className="absolute right-[-1rem] top-[-1rem] md:top-0 md:right-0 md:w-24 md:h-24 md:bg-primary/5 md:-mr-8 md:-mt-8 md:rounded-full transition-transform group-hover:scale-110 text-primary opacity-5 font-serif text-8xl font-bold md:hidden">
                                    {num}
                                </div>
                                <span className="text-tertiary md:text-tertiary font-bold text-2xl md:text-sm mb-4 block md:tracking-widest md:uppercase font-serif md:font-sans">
                                    {num}
                                </span>
                                <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4 font-serif">
                                    {f.title}
                                </h3>
                                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
