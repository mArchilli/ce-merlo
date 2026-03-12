import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef } from 'react';

export default function QuillEditor({ value, onChange, placeholder }) {
    const containerRef = useRef(null);
    const quillRef = useRef(null);
    // Guardamos el callback en ref para evitar re-registrar el listener
    const onChangeRef = useRef(onChange);
    useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

    useEffect(() => {
        if (quillRef.current) return;

        quillRef.current = new Quill(containerRef.current, {
            theme: 'snow',
            placeholder: placeholder ?? 'Escribe aquí...',
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link'],
                    ['clean'],
                ],
            },
        });

        if (value) {
            quillRef.current.root.innerHTML = value;
        }

        quillRef.current.on('text-change', () => {
            const html = quillRef.current.root.innerHTML;
            // Tratar contenido vacío como string vacío
            const empty = quillRef.current.getText().trim() === '';
            onChangeRef.current(empty ? '' : html);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Cuando se reabre el modal en modo edición, sincronizar el contenido
    useEffect(() => {
        if (!quillRef.current) return;
        const current = quillRef.current.root.innerHTML;
        if (value !== undefined && current !== value) {
            quillRef.current.root.innerHTML = value ?? '';
        }
        // Solo al montar o cuando cambia el valor controlado externamente
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div ref={containerRef} style={{ minHeight: '250px' }} />
        </div>
    );
}
