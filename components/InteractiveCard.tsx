import React, { useRef } from 'react';

interface InteractiveCardProps {
    children: React.ReactNode;
    className?: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ children, className }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const { width, height } = rect;
        const rotateX = (y / height - 0.5) * -20; // Max rotation 10deg
        const rotateY = (x / width - 0.5) * 20;  // Max rotation 10deg
        
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    return (
        <div
            ref={cardRef}
            className={`interactive-card ${className || ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
};

export default InteractiveCard;