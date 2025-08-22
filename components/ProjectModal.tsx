import React, { useEffect, useRef } from 'react';
import type { Project } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProjectModalProps {
    project: Project;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project }) => {
    const { closeProjectModal } = useAppContext();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const modalNode = modalRef.current;
        if (!modalNode) return;

        const focusableElements = modalNode.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        firstElement?.focus();
        modalNode.addEventListener('keydown', handleTabKeyPress);
        
        return () => {
            modalNode.removeEventListener('keydown', handleTabKeyPress);
        };
    }, [project]);

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] p-4 modal-enter"
            onClick={closeProjectModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
        >
            <div 
                ref={modalRef}
                className="glass-card w-full max-w-3xl max-h-[90vh] overflow-y-auto relative modal-content-enter"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={closeProjectModal} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 bg-black/20 rounded-full p-1"
                    aria-label="Cerrar modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="h-64 md:h-80 w-full overflow-hidden rounded-t-xl">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-8 md:p-10">
                    <span className="text-sm font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-1 px-3 rounded-full">{project.category}</span>
                    <h2 id="project-modal-title" className="text-3xl md:text-4xl font-bold text-white mt-4 mb-2 gradient-text">{project.title}</h2>
                    <p className="text-lg text-gray-400 mb-8">{project.client}</p>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-cyan-400 mb-3 border-l-4 border-cyan-400 pl-3">El Reto</h3>
                            <p className="text-gray-300">{project.challenge}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-cyan-400 mb-3 border-l-4 border-cyan-400 pl-3">La Solución</h3>
                            <p className="text-gray-300">{project.solution}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-cyan-400 mb-3 border-l-4 border-cyan-400 pl-3">Los Resultados</h3>
                            <ul className="space-y-3">
                                {project.results.map((result, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-3 text-lg pt-1">{result.icon}</span>
                                        <span className="text-gray-300">{result.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;