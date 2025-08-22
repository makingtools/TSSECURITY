import React from 'react';
import SectionHeader from './SectionHeader';
import InteractiveCard from './InteractiveCard';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ServiceCard: React.FC<{ id: string; icon: React.ReactNode; title: string; description: string; example: string;}> = ({ id, icon, title, description, example }) => (
    <div id={id}>
        <InteractiveCard>
            <div className="glass-card p-8 h-full">
                <div className="flex items-center justify-center h-16 w-16 mb-6 bg-cyan-400/10 rounded-full text-cyan-400">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                <p className="text-gray-300 mb-4">{description}</p>
                <div className="text-sm text-cyan-200 bg-cyan-900/40 p-3 rounded-lg border-l-4 border-cyan-400">
                    <p className="font-semibold mb-1">Ejemplo real:</p>
                    <p className="italic">"{example}"</p>
                </div>
            </div>
        </InteractiveCard>
    </div>
);

const ServicesISP: React.FC = () => {
    return (
        <section id="services-isp" className="py-20">
            <div className="container mx-auto px-6">
                <SectionHeader 
                    title={<>Servicios Especializados para <span className="gradient-text">Proveedores de Internet</span></>}
                    subtitle="Optimizamos tu red WISP, ISP o FTTH para que ofrezcas un servicio de máxima calidad."
                />

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="scroll-reveal" style={{transitionDelay: '0ms'}}>
                        <ServiceCard
                            id="isp-fallas"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                            title="Detección y Solución de Fallas"
                            description="¿Tus clientes se quejan de caídas o lentitud? Identificamos la causa raíz de las fallas (interferencias, saturación, etc.) y aplicamos soluciones definitivas para garantizar un servicio estable 24/7."
                            example="Evita perder clientes. Detectamos por qué se cae la conexión en horas pico y lo resolvemos para siempre."
                        />
                    </div>
                     <div className="scroll-reveal" style={{transitionDelay: '100ms'}}>
                        <ServiceCard
                            id="isp-enlaces"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>}
                            title="Enlaces Inalámbricos PTP y PTMP"
                            description="Conectamos tus sedes, torres y clientes sin necesidad de cables. Diseñamos enlaces punto a punto (PTP) y punto a multipunto (PTMP) de alta capacidad y estabilidad."
                            example="Llevamos internet de alta velocidad desde tu nodo principal hasta una nueva zona a 15 km de distancia."
                        />
                    </div>
                    <div id="isp-config" className="md:col-span-2 scroll-reveal" style={{transitionDelay: '200ms'}}>
                        <InteractiveCard>
                            <div className="glass-card p-8">
                                <div className="flex items-center justify-center h-16 w-16 mb-6 bg-cyan-400/10 rounded-full text-cyan-400 mx-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-6 text-center">Configuración de Redes Avanzada</h3>
                                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div className="flex items-start"><CheckIcon /><p className="ml-3 text-gray-300"><strong className="text-white">Balanceo de Cargas:</strong> ¿Tienes dos o más proveedores? Los usamos simultáneamente. Si uno falla, tu red sigue funcionando sin que nadie lo note.</p></div>
                                    <div className="flex items-start"><CheckIcon /><p className="ml-3 text-gray-300"><strong className="text-white">OSPF (Enrutamiento Dinámico):</strong> Tu red elegirá siempre la ruta más rápida de forma automática. Si un equipo falla, el tráfico se redirige al instante.</p></div>
                                    <div className="flex items-start"><CheckIcon /><p className="ml-3 text-gray-300"><strong className="text-white">VPN Segura:</strong> Conectamos tus torres, oficinas y servidores en una red privada y segura, sin importar dónde estén ubicados.</p></div>
                                    <div className="flex items-start"><CheckIcon /><p className="ml-3 text-gray-300"><strong className="text-white">Hotspot (Portal Cautivo):</strong> Ideal para hoteles o plazas. Creamos un portal para que tus clientes inicien sesión o paguen para acceder a internet.</p></div>
                                </div>
                            </div>
                        </InteractiveCard>
                    </div>
                     <div className="md:col-span-2 scroll-reveal" style={{transitionDelay: '300ms'}}>
                        <ServiceCard
                            id="isp-asesoria"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                            title="Asesoramiento para Proyectos WISP y FTTH"
                            description="¿Quieres empezar tu propio negocio de internet? Te guiamos en cada paso: desde el diseño de la red y la compra de equipos hasta la configuración y facturación a clientes."
                            example="Lanza tu WISP con éxito. Te ayudamos a crear un plan de negocio técnico y financiero viable para tu zona."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesISP;