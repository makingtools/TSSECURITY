import React, { memo } from 'react';
import SectionHeader from './SectionHeader';
import InteractiveCard from './InteractiveCard';
import { testimonials } from '../data/testimonials';

const TestimonialCard: React.FC<{ quote: string; name: string; company: string; }> = ({ quote, name, company }) => (
    <InteractiveCard>
        <div className="glass-card p-8 relative h-full flex flex-col justify-between">
            <svg className="absolute top-6 left-6 h-12 w-12 text-white/5" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.33 8.35C5.88 11.23 4.5 15.3 4.5 19.5c0 1.67.21 3.3.62 4.84l.21.78.82.28c.32.1.66.16 1 .21.43.06.86.1 1.28.1 3.53 0 6.6-2.14 7.9-5.25-1.93-1.31-3.23-3.52-3.23-6.09 0-3.34 2.14-5.91 5.2-7.24-2.88-2.14-6.6-2.35-9.79-1.79zM22.33 8.35c-3.45 2.88-4.83 6.95-4.83 11.15 0 1.67.21 3.3.62 4.84l.21.78.82.28c.32.1.66.16 1 .21.43.06.86.1 1.28.1 3.53 0 6.6-2.14 7.9-5.25-1.93-1.31-3.23-3.52-3.23-6.09 0-3.34 2.14-5.91 5.2-7.24-2.88-2.14-6.6-2.35-9.79-1.79z" />
            </svg>
            <blockquote className="relative text-gray-300 italic z-10">
                <p>"{quote}"</p>
            </blockquote>
            <div className="mt-6 border-t border-[var(--border-color)] pt-4">
                <p className="font-bold text-white">{name}</p>
                <p className="text-sm text-cyan-400">{company}</p>
            </div>
        </div>
    </InteractiveCard>
);


const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-20">
            <div className="container mx-auto px-6">
                <SectionHeader 
                    title={<>Lo que dicen <span className="gradient-text">nuestros clientes</span></>}
                    subtitle="La satisfacción de nuestros clientes es nuestra mejor carta de presentación."
                />
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="scroll-reveal" style={{transitionDelay: `${index * 100}ms`}}>
                             <TestimonialCard {...testimonial} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(Testimonials);