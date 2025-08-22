import React, { memo } from 'react';
import SectionHeader from './SectionHeader';
import InteractiveCard from './InteractiveCard';

const ServiceItem: React.FC<{ id: string, title: string; description: string; imageUrl: string }> = ({ id, title, description, imageUrl }) => (
    <div id={id}>
        <InteractiveCard>
            <div className="glass-card rounded-lg overflow-hidden group h-full">
                <div className="relative h-64 overflow-hidden">
                    <img src={imageUrl} alt={title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-300"></div>
                </div>
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
                    <p className="text-gray-300">{description}</p>
                </div>
            </div>
        </InteractiveCard>
    </div>
);

const ServicesBusiness: React.FC = () => {
    const services = [
        {
            id: "business-seguridad",
            title: "Seguridad Electrónica Integral",
            description: "Protege tus instalaciones 24/7. Instalamos cámaras (CCTV) con acceso desde tu celular, alarmas de intrusión y controles de acceso biométricos para gestionar la entrada de personal de forma segura.",
            imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "business-cableado",
            title: "Cableado Estructurado y Redes WiFi",
            description: "Creamos la autopista de datos de tu empresa. Diseñamos redes de cableado organizadas y eficientes que garantizan máxima velocidad y confiabilidad, además de una cobertura WiFi total.",
            imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "business-telefonia",
            title: "Plantas Telefónicas IP y Tradicionales",
            description: "Moderniza la comunicación de tu empresa. Implementamos sistemas de telefonía (PBX) que optimizan las llamadas, con opciones avanzadas como menús de voz, grabación y extensiones remotas.",
            imageUrl: "https://images.unsplash.com/photo-1586953208448-3073a73955a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "business-electricas",
            title: "Instalaciones y Redes Eléctricas",
            description: "La energía es la base de todo. Realizamos instalaciones eléctricas seguras, certificadas y eficientes para oficinas, locales comerciales e industria, garantizando el correcto funcionamiento de todos tus equipos.",
            imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <section id="services-business" className="py-20">
            <div className="container mx-auto px-6">
                <SectionHeader 
                    title={<>Soluciones Tecnológicas para tu <span className="gradient-text">Empresa</span></>}
                    subtitle="Potenciamos la seguridad, conectividad y comunicación de tu negocio con tecnología de punta."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <div key={service.id} className="scroll-reveal" style={{transitionDelay: `${index * 100}ms`}}>
                            <ServiceItem {...service} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(ServicesBusiness);