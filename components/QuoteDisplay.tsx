import React from 'react';
import type { Quote } from '../types';
import { useToasts } from './Toast';

interface QuoteDisplayProps {
    quote: Quote;
    onDownloadPdf: (quote: Quote) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(amount);
};

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote, onDownloadPdf }) => {
    const { addToast } = useToasts();

    const handleSendEmail = () => {
        addToast('info', 'Para enviar, descarga el PDF y adjúntalo en un correo para tu cliente.');
    };

    return (
        <div className="mt-3 border-t border-cyan-500/50 pt-3 text-white">
            <h4 className="font-bold text-md mb-2 text-cyan-300">Cotización Espectacular: {quote.id}</h4>
            <div className="text-xs space-y-1">
                {quote.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-1">
                        <span className="col-span-2 truncate">{item.quantity} x {item.item}</span>
                        <span className="text-right font-mono">{formatCurrency(item.total)}</span>
                    </div>
                ))}
            </div>
            <div className="border-t border-cyan-800/50 my-2"></div>
            
            {quote.competitor_total && (
                 <div className="text-xs space-y-1 mb-2">
                    <div className="grid grid-cols-3 gap-1 text-gray-400">
                        <span className="col-span-2 font-semibold">Precio Promedio Competencia:</span>
                        <span className="text-right font-mono line-through">{formatCurrency(quote.competitor_total)}</span>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-3 gap-1 text-sm">
                <span className="col-span-2 font-bold gradient-text">NUESTRO TOTAL:</span>
                <span className="text-right font-bold font-mono">{formatCurrency(quote.total)}</span>
            </div>
             <p className="text-right text-[10px] text-gray-400 italic mt-1">Precios no incluyen IVA</p>
            
            <button
                onClick={() => onDownloadPdf(quote)}
                className="mt-4 w-full text-center bg-cyan-600/50 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-all duration-300 text-sm flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Descargar PDF Profesional
            </button>

            {quote.client_email && (
                 <button
                    onClick={handleSendEmail}
                    className="mt-2 w-full text-center bg-purple-600/50 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition-all duration-300 text-sm flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                    Enviar Cotización por Email
                </button>
            )}
        </div>
    );
};

export default QuoteDisplay;