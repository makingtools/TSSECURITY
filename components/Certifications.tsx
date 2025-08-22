import React from 'react';
import SectionHeader from './SectionHeader';
import InteractiveCard from './InteractiveCard';

const CertificationLogo: React.FC<{ name: string; certifications: string[]; children: React.ReactNode; }> = ({ name, certifications, children }) => (
    <InteractiveCard>
        <div className="glass-card flex flex-col items-center text-center p-4 h-full justify-between">
            <div className="flex-grow flex items-center justify-center my-4 text-gray-300 w-20 h-20">
                {children}
            </div>
            <div>
                <h4 className="text-lg font-semibold text-white">{name}</h4>
                <p className="text-xs text-gray-400">{certifications.join(', ')}</p>
            </div>
        </div>
    </InteractiveCard>
);


const Certifications: React.FC = () => {
    const logos = [
        { name: "MikroTik", certifications: ['MTCNA', 'MTCRE', 'MTCTCE'], children: <img src="https://mikrotik.com/img/logo_404.png" alt="MikroTik Logo" className="w-full h-auto object-contain brightness-0 invert" /> },
        { name: "Fortinet", certifications: ['NSE 1-3'], children: <svg className="w-full h-auto" viewBox="0 0 128 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.72 32.4V3.6h-8.8V0H24v3.6h-7.68v28.8zM42.36 3.6h-6.84L28.08 21v11.4h3.6V21.84L40.08 8.4v24h3.6V3.6h-1.32zM57.96 32.4h-3.6V0h11.28c5.28 0 9.36 3.72 9.36 9s-4.08 9-9.36 9H61.56v14.4h-3.6zm3.6-18h7.2c3.24 0 5.76-2.16 5.76-5.4s-2.52-5.4-5.76-5.4h-7.2v10.8zM92.28 32.4h-12V0h12c5.64 0 9.84 4.08 9.84 9.6v13.2c0 5.52-4.2 9.6-9.84 9.6zm-8.4-3.6h8.4c3.48 0 6.24-2.52 6.24-6V9.6c0-3.48-2.76-6-6.24-6h-8.4v25.2zM111.48 3.6h-4.08V0h11.76v3.6h-4.08v28.8h-3.6V3.6z" /></svg> },
        { name: "Issabel", certifications: ['Telefonía IP'], children: <svg className="w-full h-auto" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M128 224c53.02 0 96-42.98 96-96S181.02 32 128 32 32 74.98 32 128s42.98 96 96 96z" fill="#FF533D"/><path d="M128 206.5c-43.35 0-78.5-35.15-78.5-78.5S84.65 49.5 128 49.5s78.5 35.15 78.5 78.5-35.15 78.5-78.5 78.5z" fill="#fff"/><path d="M128 200c-39.77 0-72-32.23-72-72s32.23-72 72-72 72 32.23 72 72-32.23 72-72 72z" fill="#FF533D"/><path d="M153 103.2V99c0-9.6-9-17.4-20-17.4h-10c-11 0-20 7.8-20 17.4v4.2c10.4-1.8 20.8-2.4 31.4-2.4 2.8 0 5.6.1 8.4.2.1.2.1.3.2.4v1.8z" fill="#fff"/><path d="M153 103.2c-.1-.1-.1-.3-.2-.4-2.8-.1-5.6-.2-8.4-.2-10.6 0-21 .6-31.4 2.4-5.2 1-9.8 2.6-13.8 4.8 1.4-15 14-26.8 29.4-26.8h10c15.4 0 28.4 11.8 29.4 26.8-4-2.2-8.6-3.8-13.8-4.8-1.2-.2-1.2-.2-1.2-.2zM158.4 128c0-16.8-13.6-30.4-30.4-30.4s-30.4 13.6-30.4 30.4 13.6 30.4 30.4 30.4 30.4-13.6 30.4-30.4z" fill="#fff"/><path d="M141.4 128c0 7.4-6 13.4-13.4 13.4s-13.4-6-13.4-13.4 6-13.4 13.4-13.4 13.4 6 13.4 13.4z" fill="#FF533D"/></svg> },
        { name: "Proxmox", certifications: ['Virtualización'], children: <svg className="w-full h-auto" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-9.4 448h-70.4v-44.8h70.4v44.8zm0-89.6h-70.4V147.2h70.4v211.2zm140.8-56.2c-15.1 0-29.2-4.5-41.2-12.2l-21.7 36.3c16.6 10.1 36.9 15.9 59.2 15.9 51.3 0 89.6-35.8 89.6-89.6s-38.3-89.6-89.6-89.6c-50.5 0-89.6 38.3-89.6 89.6 0 16.7 4.5 33.1 12.9 47.1l-37.4 22.1c-6-16.7-9.4-34.6-9.4-53.7 0-78.1 63.5-140.8 140.8-140.8s140.8 62.7 140.8 140.8-63.5 140.8-140.8 140.8z" /></svg> },
        { name: "LibreNMS", certifications: ['Monitoreo'], children: <svg className="w-full h-auto" viewBox="0 0 120 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M60 0C26.86 0 0 26.86 0 60s26.86 60 60 60 60-26.86 60-60S93.14 0 60 0zm0 110C32.4 110 10 87.6 10 60S32.4 10 60 10s50 22.4 50 50-22.4 50-50 50z" /><path d="M60 20c-22.09 0-40 17.91-40 40h10c0-16.57 13.43-30 30-30s30 13.43 30 30-13.43 30-30 30v10c22.09 0 40-17.91 40-40s-17.91-40-40-40z" /><path d="M60 50c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10z" /></svg> }
    ];

    return (
        <section id="certifications" className="py-20">
            <div className="container mx-auto px-6">
                <SectionHeader 
                    title={<>Tu red en <span className="gradient-text">manos expertas</span></>}
                    subtitle="Nuestro equipo cuenta con certificaciones internacionales que garantizan un trabajo profesional y basado en los más altos estándares de la industria."
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {logos.map((logo, index) => (
                        <div key={index} className="scroll-reveal" style={{transitionDelay: `${index * 100}ms`}}>
                             <CertificationLogo {...logo} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;