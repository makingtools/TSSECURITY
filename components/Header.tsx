import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
    const { isChatOpen, setIsChatOpen, closeProjectModal } = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isServicesISPOpen, setIsServicesISPOpen] = useState(false);
    const [isServicesBusinessOpen, setIsServicesBusinessOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, elementId: string) => {
        e.preventDefault();
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
        setIsServicesISPOpen(false);
        setIsServicesBusinessOpen(false);
    };

    const navLinkClasses = "relative block lg:inline-block px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-1/2";
    const dropdownLinkClasses = "block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-600/50 hover:text-white w-full text-left transition-colors duration-200 rounded-md";

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/30 backdrop-blur-xl border-b border-[var(--border-color)]' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="text-2xl font-bold text-white">
                    TS<span className="gradient-text">Securitys</span>
                </a>
                
                <nav className="hidden lg:flex items-center space-x-2">
                    <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className={navLinkClasses}>Inicio</a>
                    <div className="relative" onMouseEnter={() => setIsServicesISPOpen(true)} onMouseLeave={() => setIsServicesISPOpen(false)}>
                        <a href="#services-isp" onClick={(e) => handleNavClick(e, 'services-isp')} className={navLinkClasses + " cursor-pointer"} aria-haspopup="true" aria-expanded={isServicesISPOpen}>Servicios ISP</a>
                        {isServicesISPOpen && (
                            <div className="absolute left-0 mt-2 w-64 p-2 glass-card animate-fade-in-up">
                                <a href="#isp-fallas" onClick={(e) => handleNavClick(e, 'isp-fallas')} className={dropdownLinkClasses}>Detección de Fallas</a>
                                <a href="#isp-config" onClick={(e) => handleNavClick(e, 'isp-config')} className={dropdownLinkClasses}>Configuración Avanzada</a>
                                <a href="#isp-asesoria" onClick={(e) => handleNavClick(e, 'isp-asesoria')} className={dropdownLinkClasses}>Asesoramiento WISP/FTTH</a>
                                <a href="#isp-enlaces" onClick={(e) => handleNavClick(e, 'isp-enlaces')} className={dropdownLinkClasses}>Enlaces Inalámbricos</a>
                            </div>
                        )}
                    </div>
                    <div className="relative" onMouseEnter={() => setIsServicesBusinessOpen(true)} onMouseLeave={() => setIsServicesBusinessOpen(false)}>
                         <a href="#services-business" onClick={(e) => handleNavClick(e, 'services-business')} className={navLinkClasses + " cursor-pointer"} aria-haspopup="true" aria-expanded={isServicesBusinessOpen}>Soluciones Empresariales</a>
                         {isServicesBusinessOpen && (
                            <div className="absolute left-0 mt-2 w-64 p-2 glass-card animate-fade-in-up">
                                <a href="#business-seguridad" onClick={(e) => handleNavClick(e, 'business-seguridad')} className={dropdownLinkClasses}>Seguridad Electrónica</a>
                                <a href="#business-cableado" onClick={(e) => handleNavClick(e, 'business-cableado')} className={dropdownLinkClasses}>Cableado Estructurado</a>
                                <a href="#business-telefonia" onClick={(e) => handleNavClick(e, 'business-telefonia')} className={dropdownLinkClasses}>Plantas Telefónicas</a>
                                <a href="#business-electricas" onClick={(e) => handleNavClick(e, 'business-electricas')} className={dropdownLinkClasses}>Redes Eléctricas</a>
                            </div>
                        )}
                    </div>
                    <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={navLinkClasses}>Proyectos</a>
                    <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className={navLinkClasses}>FAQ</a>
                    <a href="#certifications" onClick={(e) => handleNavClick(e, 'certifications')} className={navLinkClasses}>Certificaciones</a>
                </nav>

                <div className="hidden lg:block">
                    <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold py-2 px-6 rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20">
                        Contáctanos
                    </a>
                </div>

                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none" aria-label="Abrir menú">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden glass-card m-2 p-2">
                    <a href="#hero" className={navLinkClasses} onClick={(e) => handleNavClick(e, 'hero')}>Inicio</a>
                    <a href="#services-isp" className={navLinkClasses} onClick={(e) => handleNavClick(e, 'services-isp')}>Servicios ISP</a>
                    <a href="#services-business" className={navLinkClasses} onClick={(e) => handleNavClick(e, 'services-business')}>Soluciones Empresariales</a>
                    <a href="#projects" className={navLinkClasses} onClick={(e) => handleNavClick(e, 'projects')}>Proyectos</a>
                    <a href="#faq" className={navLinkClasses} onClick={(e) => handleNavClick(e, 'faq')}>FAQ</a>
                    <a href="#certifications" className={navLinkClasses} onClick={(e) => handleNavClick(e, 'certifications')}>Certificaciones</a>
                    <div className="px-4 mt-4">
                        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="block text-center bg-cyan-500 text-white font-bold py-2 px-6 rounded-full hover:bg-cyan-600 transition-all duration-300">
                            Contáctanos
                        </a>
                    </div>
                </div>
            )}
             <style>{`
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </header>
    );
};

export default Header;