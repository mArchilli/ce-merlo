import { Head } from '@inertiajs/react';
import PublicNavbar from '@/Components/PublicNavbar';
import Hero from '@/Components/Welcome/Hero';
import Institucional from '@/Components/Welcome/Institucional';
import Funciones from '@/Components/Welcome/Funciones';
import Composicion from '@/Components/Welcome/Composicion';
import Autoridades from '@/Components/Welcome/Autoridades';
import Novedades from '@/Components/Welcome/Novedades';
import Footer from '@/Components/Welcome/Footer';

/* ─── Componente principal ─── */
export default function Welcome({ autoridades = [], novedades = [] }) {
    const scrollTo = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Head title="Consejo Escolar de Merlo" />

            <div className="bg-white text-gray-800 font-sans antialiased">
                <PublicNavbar transparent />
                <Hero scrollTo={scrollTo} />
                <Institucional />
                <Funciones />
                <Composicion />
                <Autoridades autoridades={autoridades} />
                <Novedades novedades={novedades} />
                <Footer scrollTo={scrollTo} />
            </div>
        </>
    );
}
