import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

const IconLock = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            {/* Encabezado */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue-800/10 text-brand-blue-700">
                    <IconLock />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-gray-900">Cambiar contraseña</h2>
                    <p className="text-sm text-gray-500">Usá una contraseña larga y aleatoria para mantener tu cuenta segura.</p>
                </div>
            </div>

            <form onSubmit={updatePassword} className="space-y-5">
                <div>
                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Contraseña actual
                    </label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm transition-colors focus:border-brand-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold-400/20"
                    />
                    {errors.current_password && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.current_password}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nueva contraseña
                    </label>
                    <input
                        id="password"
                        ref={passwordInput}
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm transition-colors focus:border-brand-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold-400/20"
                    />
                    {errors.password && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Confirmar nueva contraseña
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm transition-colors focus:border-brand-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold-400/20"
                    />
                    {errors.password_confirmation && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.password_confirmation}</p>
                    )}
                </div>

                <div className="flex items-center gap-4 pt-1">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-lg bg-brand-blue-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-brand-blue-600/50 disabled:opacity-50"
                    >
                        {processing ? 'Actualizando...' : 'Actualizar contraseña'}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <span className="text-sm font-medium text-green-600">¡Contraseña actualizada!</span>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
