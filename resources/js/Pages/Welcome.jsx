import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from '@/Components/Welcome/Header';
import Hero from '@/Components/Welcome/Hero';
import Institucional from '@/Components/Welcome/Institucional';
import Funciones from '@/Components/Welcome/Funciones';
import Composicion from '@/Components/Welcome/Composicion';
import Autoridades from '@/Components/Welcome/Autoridades';
import Footer from '@/Components/Welcome/Footer';

/* ─── Componente principal ─── */
export default function Welcome({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (e, href) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Head title="Consejo Escolar de Merlo" />

            <div className="bg-white text-gray-800 font-sans antialiased">
                <Header auth={auth} scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} scrollTo={scrollTo} />
                <Hero scrollTo={scrollTo} />
                <Institucional />
                <Funciones />
                <Composicion />
                <Autoridades />
                <Footer scrollTo={scrollTo} />
            </div>
        </>
    );
}
