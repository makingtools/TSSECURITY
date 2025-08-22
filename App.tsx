import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WhyChooseUs from './components/WhyChooseUs';
import ServicesISP from './components/ServicesISP';
import ServicesBusiness from './components/ServicesBusiness';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import FeaturedProjects from './components/FeaturedProjects';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import AIChatWidget from './components/AIChatWidget';
import ProjectModal from './components/ProjectModal';
import Preloader from './components/Preloader';
import { ToastProvider } from './components/Toast';
import { useScrollObserver } from './hooks/useScrollObserver';
import { useAppContext } from './context/AppContext';
import { useDynamicFavicon } from './hooks/useDynamicFavicon';

const useScrollReveal = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach(el => observer.observe(el));
        return () => elements.forEach(el => observer.unobserve(el));
    }, []);
};

const useInteractiveBackground = () => {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            document.documentElement.style.setProperty('--spotlight-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--spotlight-y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
};

const App: React.FC = () => {
    const { 
        selectedProject, 
        closeProjectModal, 
        isChatOpen, 
        setIsChatOpen, 
        setCurrentSection, 
        aiStatus
    } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    const sectionIds = ['hero', 'why-choose-us', 'services-isp', 'services-business', 'certifications', 'testimonials', 'projects', 'faq', 'contact'];
    const currentSection = useScrollObserver(sectionIds);
    
    useScrollReveal();
    useInteractiveBackground();
    useDynamicFavicon(aiStatus);

    useEffect(() => {
        setCurrentSection(currentSection);
    }, [currentSection, setCurrentSection]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);
    
    const handleEscape = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeProjectModal();
            setIsChatOpen(false);
        }
    }, [closeProjectModal, setIsChatOpen]);

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [handleEscape]);

    return (
        <ToastProvider>
            <div className="relative min-h-screen">
                <Preloader hidden={!isLoading} />
                <div className="spotlight"></div>
                <div className="aurora-bg">
                    <div className="aurora one"></div>
                    <div className="aurora two"></div>
                    <div className="aurora three"></div>
                </div>
                <div className="relative z-10">
                    <Header />
                    <main>
                        <HeroSection />
                        <WhyChooseUs />
                        <ServicesISP />
                        <ServicesBusiness />
                        <Certifications />
                        <Testimonials />
                        <FeaturedProjects />
                        <FAQ />
                        <Contact />
                    </main>
                    <Footer />
                    <FloatingWhatsAppButton />
                    <AIChatWidget />
                    {selectedProject && <ProjectModal project={selectedProject} />}
                </div>
            </div>
        </ToastProvider>
    );
};

export default App;