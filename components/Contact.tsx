import React from 'react';

const Contact: React.FC = () => {
    const whatsappLink = "https://wa.me/573043475757?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20de%20TI.";
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center relative z-10 scroll-reveal">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">¿Listo para <span className="gradient-text">mejorar tu red</span>?</h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
                    Contáctanos hoy mismo para una asesoría sin costo. Analizaremos tus necesidades y te propondremos la mejor solución.
                </p>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 text-lg shadow-lg shadow-green-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.501-.182-.001-.381-.001-.579-.001-.198 0-.521.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        Chatea por WhatsApp
                    </a>

                    <a href="mailto:tssecuritys@gmail.com" className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 text-lg shadow-lg shadow-cyan-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                        </svg>
                        Envíanos un Email
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;