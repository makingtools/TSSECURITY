import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-transparent border-t border-[var(--border-color)]">
            <div className="container mx-auto px-6 py-8 text-center text-gray-400">
                <p>&copy; {currentYear} TS Securitys. Todos los derechos reservados.</p>
                <p className="mt-2 text-sm">Desarrollado con  pasión por Johan Eduardo Luna Parrado</p>
                <div className="mt-4 flex justify-center items-center space-x-4 text-sm">
                    <span>📲 +57 3043475757</span>
                    <span>|</span>
                    <span>📧 tssecuritys@gmail.com</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;