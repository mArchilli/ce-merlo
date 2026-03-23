import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar contraseña" />

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-500" />

                <div className="px-8 py-8">
                    <h2 className="text-xl font-bold text-gray-900">Recuperar contraseña</h2>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                        Ingresá tu correo y te enviaremos un enlace para restablecer tu contraseña.
                    </p>

                    {status && (
                        <div className="mt-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-6 space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm transition-colors focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                                placeholder="admin@ejemplo.com"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-amber-400 py-2.5 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-60 transition-colors shadow-sm shadow-amber-200"
                        >
                            {processing ? 'Enviando...' : 'Enviar enlace de recuperación'}
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            <a href={route('login')} className="text-amber-500 hover:text-amber-600 font-medium">
                                ← Volver al inicio de sesión
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
