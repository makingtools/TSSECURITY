import React, { memo } from 'react';
import SectionHeader from './SectionHeader';
import { faqData } from '../data/faq';
import { useAppContext } from '../context/AppContext';

const FAQ: React.FC = () => {
    const { setIsChatOpen } = useAppContext();
    return (
        <section id="faq" className="py-20">
            <div className="container mx-auto px-6">
                <SectionHeader 
                    title={<>Preguntas <span className="gradient-text">Frecuentes</span></>}
                    subtitle="Resolvemos tus dudas más comunes para que tomes la mejor decisión."
                />
                <div className="max-w-3xl mx-auto faq-accordion space-y-4">
                    {faqData.map((item, index) => (
                        <details 
                            key={index} 
                            className="glass-card p-1 scroll-reveal"
                            style={{transitionDelay: `${index * 100}ms`}}
                        >
                            <summary className="flex justify-between items-center p-4 cursor-pointer font-semibold text-white">
                                {item.question}
                                <span className="icon text-cyan-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                </span>
                            </summary>
                            <div className="content px-4 pb-4">
                               <p className="text-gray-300 pt-4 border-t border-[var(--border-color)]">{item.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>
                 <div className="text-center mt-12 scroll-reveal">
                    <p className="text-gray-300 mb-4">¿No encuentras la respuesta que buscas?</p>
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30"
                    >
                        Pregúntale a nuestra IA
                    </button>
                </div>
            </div>
        </section>
    );
};

export default memo(FAQ);