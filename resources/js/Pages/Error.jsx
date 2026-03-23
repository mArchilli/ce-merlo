import { Head, Link } from '@inertiajs/react';

const STATUS_MESSAGES = {
    404: {
        code:     '404',
        title:    'Página no encontrada',
        subtitle: 'La página que buscás no existe o fue movida a otra ubicación.',
    },
    403: {
        code:     '403',
        title:    'Acceso denegado',
        subtitle: 'No tenés permiso para acceder a este recurso.',
    },
    500: {
        code:     '500',
        title:    'Error del servidor',
        subtitle: 'Ocurrió un error interno. Intentá nuevamente en unos minutos.',
    },
    503: {
        code:     '503',
        title:    'Servicio no disponible',
        subtitle: 'El sitio está temporalmente fuera de servicio. Volvé pronto.',
    },
    419: {
        code:     '419',
        title:    'Sesión expirada',
        subtitle: 'Tu sesión expiró. Por favor, recargá la página.',
    },
};

export default function Error({ status = 404 }) {
    const info = STATUS_MESSAGES[status] ?? {
        code:     String(status),
        title:    'Algo salió mal',
        subtitle: 'Ocurrió un error inesperado.',
    };

    return (
        <>
            <Head title={`${info.code} — ${info.title}`} />

            <div
                className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1E3F58 0%, #0f2535 60%, #0a1b25 100%)' }}
            >
                {/* Fondo: patrón sutil */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                />

                {/* Círculos decorativos */}
                <div className="absolute -top-40 -left-40 w-[34rem] h-[34rem] rounded-full border border-white/[0.04]" />
                <div className="absolute -top-28 -left-28 w-[22rem] h-[22rem] rounded-full border border-white/[0.04]" />
                <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full border border-white/[0.05]" />
                <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-amber-400/10 blur-2xl" />
                <div className="absolute top-20 left-16 w-24 h-24 rounded-full bg-white/5 blur-xl" />

                {/* Número grande decorativo */}
                <div
                    className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                    aria-hidden="true"
                >
                    <span
                        className="font-extrabold text-white/[0.04] leading-none"
                        style={{ fontSize: 'clamp(14rem, 40vw, 28rem)' }}
                    >
                        {info.code}
                    </span>
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
                    {/* Logo */}
                    <Link href="/">
                        <img
                            src="/logo-consejo-de-merlo.png"
                            alt="Consejo Escolar de Merlo"
                            className="h-20 w-auto drop-shadow-lg mb-10 hover:opacity-90 transition-opacity"
                        />
                    </Link>

                    {/* Línea separadora amber */}
                    <div className="w-12 h-1 bg-amber-400 rounded-full mb-8" />

                    {/* Código de error pequeño */}
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.1] text-amber-300 text-sm font-semibold tracking-widest uppercase mb-4">
                        Error {info.code}
                    </span>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {info.title}
                    </h1>

                    <p className="mt-4 text-base text-white/60 leading-relaxed">
                        {info.subtitle}
                    </p>

                    {/* Acciones */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2.5 px-6 py-3 bg-amber-400 text-white text-sm font-semibold rounded-lg hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/20"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Volver al inicio
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Página anterior
                        </button>
                    </div>
                </div>

                {/* Footer mínimo */}
                <div className="absolute bottom-6 text-center w-full">
                    <p className="text-xs text-white/25">
                        © {new Date().getFullYear()} Consejo Escolar del Partido de Merlo
                    </p>
                </div>
            </div>
        </>
    );
}
