import React from 'react';

interface SectionHeaderProps {
    title: React.ReactNode;
    subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
    <div className="text-center mb-12 md:mb-16 scroll-reveal">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">{title}</h2>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">{subtitle}</p>
    </div>
);

export default SectionHeader;