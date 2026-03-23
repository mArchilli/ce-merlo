import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            {/* Panel izquierdo — decorativo */}
            <div
                className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #132838 60%, #0d1e27 100%)' }}
            >
                {/* Círculos decorativos */}
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5" />
                <div className="absolute -bottom-32 -right-16 w-[28rem] h-[28rem] rounded-full bg-white/5" />
                <div className="absolute top-1/3 right-12 w-40 h-40 rounded-full bg-amber-400/10" />

                <div className="relative z-10 flex flex-col items-center text-center px-12">
                    <Link href="/">
                        <img
                            src="/logo-consejo-de-merlo.png"
                            alt="Consejo Escolar de Merlo"
                            className="h-28 w-auto drop-shadow-lg mb-8"
                        />
                    </Link>
                    <h1 className="text-3xl font-bold text-white leading-tight">
                        Panel de Administración
                    </h1>
                    <p className="mt-3 text-white/60 text-sm leading-relaxed max-w-xs">
                        Consejo Escolar del Partido de Merlo
                    </p>
                    <div className="mt-10 w-16 h-0.5 bg-amber-400/60 rounded-full" />
                </div>
            </div>

            {/* Panel derecho — formulario */}
            <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 px-6 py-12">
                {/* Logo mobile */}
                <div className="lg:hidden mb-8 text-center">
                    <Link href="/">
                        <img
                            src="/logo-consejo-de-merlo.png"
                            alt="Consejo Escolar de Merlo"
                            className="h-20 w-auto mx-auto"
                        />
                    </Link>
                    <p className="mt-2 text-xs text-gray-500">Consejo Escolar del Partido de Merlo</p>
                </div>

                <div className="w-full max-w-md">
                    {children}
                </div>

                <p className="mt-8 text-xs text-gray-400">
                    © {new Date().getFullYear()} Consejo Escolar de Merlo
                </p>
            </div>
        </div>
    );
}
