import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

const IconUser = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            {/* Encabezado */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue-800/10 text-brand-blue-700">
                    <IconUser />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-gray-900">Datos de la cuenta</h2>
                    <p className="text-sm text-gray-500">Actualizá tu nombre y dirección de correo electrónico.</p>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nombre
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm transition-colors focus:border-brand-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold-400/20"
                    />
                    {errors.name && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm transition-colors focus:border-brand-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold-400/20"
                    />
                    {errors.email && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                    )}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
                        <p className="text-sm text-amber-800">
                            Tu dirección de correo no está verificada.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="font-medium underline hover:text-amber-900 focus:outline-none"
                            >
                                Hacé clic acá para reenviar el correo de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <p className="mt-2 text-sm font-medium text-green-700">
                                Se envió un nuevo enlace de verificación a tu correo.
                            </p>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-1">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-lg bg-brand-blue-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-brand-blue-600/50 disabled:opacity-50"
                    >
                        {processing ? 'Guardando...' : 'Guardar cambios'}
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
                        <span className="text-sm font-medium text-green-600">¡Cambios guardados!</span>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
