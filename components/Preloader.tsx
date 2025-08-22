import React from 'react';

interface PreloaderProps {
    hidden: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ hidden }) => {
    return (
        <div className={`preloader ${hidden ? 'hidden' : ''}`}>
            <div className="preloader-logo">
                TS<span className="gradient-text">Securitys</span>
            </div>
        </div>
    );
};

export default Preloader;
