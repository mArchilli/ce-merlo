import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const IconBuilding = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 10h2m-2 4h2m4-4h2m-2 4h2M8 18h8" />
    </svg>
);

const modules = [
    {
        label: 'Infraestructura',
        href: '/infraestructura',
        icon: <IconBuilding />,
        color: '#FFA101',
        bgLight: '#FFF7E6',
    },
];

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="px-8 py-8">
                {/* Encabezado */}
                <div className="mb-8 flex items-start gap-3">
                    <div className="mt-1 w-1 self-stretch rounded-full" style={{ backgroundColor: '#FFA101' }} />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
                        <p className="mt-0.5 text-sm text-gray-500">Bienvenido al sistema de gestión</p>
                    </div>
                </div>

                {/* Sección módulos */}
                <div className="mb-6 flex items-start gap-3">
                    <div className="mt-1 w-1 self-stretch rounded-full" style={{ backgroundColor: '#FFA101' }} />
                    <div>
                        <h2 className="text-base font-semibold text-gray-700">Módulos</h2>
                        <p className="text-sm text-gray-400">Selecciona un módulo para comenzar</p>
                    </div>
                </div>

                {/* Grid de cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {modules.map((mod) => (
                        <Link
                            key={mod.label}
                            href={mod.href}
                            className="group flex flex-col items-center justify-center rounded-2xl border-2 bg-white px-8 py-10 text-center transition-all duration-200 hover:shadow-md"
                            style={{ borderColor: mod.color }}
                        >
                            <div
                                className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105"
                                style={{ backgroundColor: mod.bgLight, color: mod.color }}
                            >
                                {mod.icon}
                            </div>
                            <span className="text-base font-semibold text-gray-700">{mod.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
