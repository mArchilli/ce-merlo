import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

const IconTrash = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
    </svg>
);

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={className}>
            {/* Encabezado zona de peligro */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
                    <IconTrash />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-gray-900">Eliminar cuenta</h2>
                    <p className="text-sm text-gray-500">Una vez eliminada, todos los datos se borrarán de forma permanente.</p>
                </div>
            </div>

            <div className="rounded-lg border border-red-100 bg-red-50/50 p-4 mb-5">
                <p className="text-sm text-red-700">
                    Antes de eliminar tu cuenta, descargá cualquier información que quieras conservar. Esta acción <strong>no se puede deshacer</strong>.
                </p>
            </div>

            <button
                type="button"
                onClick={confirmUserDeletion}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
                <IconTrash />
                Eliminar mi cuenta
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal} maxWidth="md">
                <form onSubmit={deleteUser} className="p-6">
                    {/* Ícono de advertencia */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900">
                        ¿Estás seguro de que querés eliminar tu cuenta?
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Esta acción es permanente e irreversible. Ingresá tu contraseña para confirmar que querés eliminar definitivamente tu cuenta.
                    </p>

                    <div className="mt-5">
                        <label htmlFor="modal_password" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Contraseña
                        </label>
                        <input
                            id="modal_password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Tu contraseña actual"
                            autoFocus
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm transition-colors focus:border-red-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-400/20"
                        />
                        {errors.password && (
                            <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/30 disabled:opacity-50"
                        >
                            {processing ? 'Eliminando...' : 'Sí, eliminar cuenta'}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
