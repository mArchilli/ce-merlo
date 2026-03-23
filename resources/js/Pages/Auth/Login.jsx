import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sesión" />

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Franja superior */}
                <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-500" />

                <div className="px-8 py-8">
                    <h2 className="text-xl font-bold text-gray-900">Iniciar sesión</h2>
                    <p className="mt-1 text-sm text-gray-500">Ingresá tus credenciales para acceder al panel.</p>

                    {status && (
                        <div className="mt-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-6 space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm transition-colors focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                                placeholder="admin@ejemplo.com"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* Contraseña */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                {canResetPassword && (
                                    <a
                                        href={route('password.request')}
                                        className="text-xs text-amber-500 hover:text-amber-600 font-medium"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 pr-10 text-sm transition-colors focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-amber-500 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {/* Recordarme */}
                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
                            />
                            <span className="text-sm text-gray-600">Recordar sesión</span>
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-amber-400 py-2.5 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-60 transition-colors shadow-sm shadow-amber-200 mt-2"
                        >
                            {processing ? 'Ingresando...' : 'Ingresar al panel'}
                        </button>

                        <Link
                            href={route('home')}
                            className="flex items-center justify-center gap-1.5 w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver al sitio
                        </Link>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
