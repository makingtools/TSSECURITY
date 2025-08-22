import React, { memo } from 'react';
import type { Project } from '../types';
import SectionHeader from './SectionHeader';
import InteractiveCard from './InteractiveCard';
import { projects } from '../data/projects';
import { useAppContext } from '../context/AppContext';

const ProjectCard: React.FC<{ project: Project; onProjectSelect: (project: Project) => void; }> = ({ project, onProjectSelect }) => (
    <div 
        className="cursor-pointer h-full"
        onClick={() => onProjectSelect(project)}
        onKeyDown={(e) => e.key === 'Enter' && onProjectSelect(project)}
        role="button"
        tabIndex={0}
    >
        <InteractiveCard>
            <div className="glass-card rounded-lg overflow-hidden group h-full">
                <div className="relative h-64 overflow-hidden">
                    <img src={project.imageUrl} loading="lazy" alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                        <span className="text-sm font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-1 px-3 rounded-full">{project.category}</span>
                        <h3 className="text-2xl font-bold text-white mt-2">{project.title}</h3>
                    </div>
                </div>
            </div>
        </InteractiveCard>
    </div>
);


const FeaturedProjects: React.FC = () => {
    const { openProjectModal } = useAppContext();
    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <SectionHeader
                    title={<>Nuestra Experiencia en <span className="gradient-text">Acción</span></>}
                    subtitle="No solo hablamos de soluciones, las implementamos. Aquí algunos de nuestros proyectos destacados que demuestran nuestro compromiso con la excelencia."
                />
                 <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={project.id} className="scroll-reveal" style={{transitionDelay: `${index * 100}ms`}}>
                            <ProjectCard 
                                project={project}
                                onProjectSelect={openProjectModal}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(FeaturedProjects);