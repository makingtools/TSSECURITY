import React from 'react';
import SectionHeader from './SectionHeader';
import InteractiveCard from './InteractiveCard';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <InteractiveCard>
        <div className="glass-card p-6 text-center h-full flex flex-col justify-center items-center">
            <div className="flex items-center justify-center h-16 w-16 mb-4 bg-cyan-400/10 rounded-full text-cyan-400 mx-auto">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    </InteractiveCard>
);

const WhyChooseUs: React.FC = () => {
    const features = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: "Soporte Experto 24/7",
            description: "Resolvemos problemas antes de que afecten a tus clientes. Nuestro equipo está disponible para garantizar la continuidad de tu operación."
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
            title: "Calidad Certificada",
            description: "Contamos con certificaciones líderes en la industria (MikroTik, Fortinet) que respaldan nuestro conocimiento y profesionalismo."
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
            title: "Soluciones a la Medida",
            description: "No ofrecemos paquetes genéricos. Analizamos tus necesidades específicas para diseñar una solución robusta, escalable y rentable."
        }
    ];

    return (
        <section id="why-choose-us" className="py-20">
            <div className="container mx-auto px-6">
                <SectionHeader 
                    title={<>¿Por qué elegir <span className="gradient-text">TS Securitys?</span></>}
                    subtitle="Te ofrecemos más que servicios; te damos tranquilidad y resultados."
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="scroll-reveal" style={{transitionDelay: `${index * 100}ms`}}>
                             <FeatureCard {...feature} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;