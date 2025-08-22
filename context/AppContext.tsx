import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import type { Project, AIStatus } from '../types';

interface AppContextType {
    isChatOpen: boolean;
    setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedProject: Project | null;
    openProjectModal: (project: Project) => void;
    closeProjectModal: () => void;
    currentSection: string;
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
    aiStatus: AIStatus;
    setAiStatus: React.Dispatch<React.SetStateAction<AIStatus>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentSection, setCurrentSection] = useState('hero');
    const [aiStatus, setAiStatus] = useState<AIStatus>('idle');

    const openProjectModal = useCallback((project: Project) => {
        setSelectedProject(project);
    }, []);

    const closeProjectModal = useCallback(() => {
        setSelectedProject(null);
    }, []);

    const value = {
        isChatOpen,
        setIsChatOpen,
        selectedProject,
        openProjectModal,
        closeProjectModal,
        currentSection,
        setCurrentSection,
        aiStatus,
        setAiStatus,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
