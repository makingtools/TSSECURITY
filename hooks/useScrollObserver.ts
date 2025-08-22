import { useState, useEffect, useRef } from 'react';

export const useScrollObserver = (sectionIds: string[]): string => {
    const [currentSection, setCurrentSection] = useState<string>(sectionIds[0] || '');
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(
            (entries) => {
                const visibleSection = entries.find((entry) => entry.isIntersecting);
                if (visibleSection) {
                    setCurrentSection(visibleSection.target.id);
                }
            },
            {
                rootMargin: '-50% 0px -50% 0px', // Trigger when the section is in the middle of the viewport
                threshold: 0,
            }
        );

        const { current: currentObserver } = observer;
        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                currentObserver.observe(element);
            }
        });

        return () => {
            if (currentObserver) {
                currentObserver.disconnect();
            }
        };
    }, [sectionIds]);

    return currentSection;
};
