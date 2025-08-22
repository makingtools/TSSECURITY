import React, { useEffect, useRef, useReducer, useState } from 'react';
import type { ChatMessage, Quote, AIStatus } from '../types';
import { getChatResponse } from '../services/geminiService';
import { getElevenLabsAudioStream } from '../services/elevenLabsService';
import { generateQuotePDF } from '../utils/pdfGenerator';
import QuoteDisplay from './QuoteDisplay';
import { useToasts } from './Toast';
import { Part } from '@google/genai';
import { useAppContext } from '../context/AppContext';
import { useDynamicScript } from '../hooks/useDynamicScript';
import { useFileUpload } from '../hooks/useFileUpload';

// --- Web Speech API Type Definitions for TypeScript ---
// This is to add support for a non-standard browser API.
interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: 'no-speech' | 'aborted' | 'audio-capture' | 'network' | 'not-allowed' | 'service-not-allowed' | 'bad-grammar' | 'language-not-supported';
  readonly message: string;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: (() => void) | null;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    start(): void;
    stop(): void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognition;

declare global {
    interface Window {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
    }
}
// --- End of Web Speech API Type Definitions ---


type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_MESSAGES'; payload: ChatMessage[] }
  | { type: 'SET_STATUS'; payload: AIStatus }
  | { type: 'CLEAR_STATUS' };

interface ChatState {
  messages: ChatMessage[];
  status: AIStatus;
}

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'CLEAR_STATUS':
      return { ...state, status: 'idle' };
    default:
      return state;
  }
};

const fileToGenerativePart = async (file: File): Promise<Part> => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};

const AIChatWidget: React.FC = () => {
    const { isChatOpen, setIsChatOpen, currentSection, setAiStatus } = useAppContext();
    const [{ messages, status }, dispatch] = useReducer(chatReducer, { messages: [], status: 'idle' });
    const { addToast } = useToasts();
    const { attachedFile, filePreview, userInput, setUserInput, handleFileChange, resetFileState, open: openFileDialog, getInputProps } = useFileUpload();
    
    const xlsxStatus = useDynamicScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js");
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hasSentContext = useRef(false);

    // --- Speech Recognition State & Ref ---
    const [isListening, setIsListening] = useState(false);
    const [speechApiSupported, setSpeechApiSupported] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setSpeechApiSupported(true);
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'es-CO';
            
            recognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                setUserInput(userInput + finalTranscript + interimTranscript);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
            };
            
            recognitionRef.current = recognition;
        }
    }, [userInput]); // Re-create if userInput changes to capture current state in closure


    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
            audioRef.current = null;
        }
    };

    useEffect(() => {
        if(isChatOpen && messages.length === 0) {
            try {
                const savedMessages = localStorage.getItem('chatHistory');
                const initialMessage: ChatMessage = { role: 'model', content: "¡Hola! Soy ChatIA, tu vendedor experto de TS Securitys. ¿Qué solución tecnológica necesitas hoy?" };
                dispatch({ type: 'SET_MESSAGES', payload: savedMessages ? JSON.parse(savedMessages) : [initialMessage] });
            } catch (error) { console.error("Failed to load chat history:", error); }
        }
    }, [isChatOpen]);

    useEffect(() => {
        try {
            if (messages.length > 0) localStorage.setItem('chatHistory', JSON.stringify(messages));
        } catch(error) { console.error("Failed to save chat history:", error); }
    }, [messages]);

    const playAudio = async (text: string) => {
        stopAudio();
        const stream = await getElevenLabsAudioStream(text);
        if (stream) {
            const audioBlob = await new Response(stream).blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audioRef.current = audio;
            audio.play().catch(e => console.error("Audio playback error:", e));
        } else {
             addToast('error', 'No se pudo generar el audio.');
        }
    };

    useEffect(() => { 
        if (isChatOpen) scrollToBottom(); 
    }, [messages, isChatOpen, status]);

    useEffect(() => {
        setAiStatus(status);
    }, [status, setAiStatus]);
    
    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    const handleSendMessage = async () => {
        if (!userInput.trim() && !attachedFile) return;
        stopAudio();

        const fileInfo = attachedFile ? { name: attachedFile.name, type: attachedFile.type } : undefined;
        let newUserMessage: ChatMessage = { role: 'user', content: userInput, file: fileInfo, filePreview };

        if (!hasSentContext.current && currentSection) {
            newUserMessage.context = currentSection;
            hasSentContext.current = true;
        }

        dispatch({ type: 'ADD_MESSAGE', payload: newUserMessage });
        await processAndSend([...messages, newUserMessage]);
    };
    
    const processAndSend = async (updatedHistory: ChatMessage[]) => {
        let fileParts: Part[] = [];
        if (attachedFile) {
            if (attachedFile.type.startsWith('image/')) {
                fileParts.push(await fileToGenerativePart(attachedFile));
            } else if ((attachedFile.type.includes('sheet') || attachedFile.name.endsWith('.xlsx')) && xlsxStatus === 'ready') {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const XLSX = (window as any).XLSX;
                    const data = new Uint8Array(e.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    const excelContent = `Contenido del archivo Excel '${attachedFile.name}':\n${JSON.stringify(json, null, 2)}`;
                    fileParts.push({ text: excelContent });
                    await sendToApi(updatedHistory, fileParts);
                };
                reader.readAsArrayBuffer(attachedFile);
                return;
            }
        }
        await sendToApi(updatedHistory, fileParts);
    };

    const sendToApi = async (history: ChatMessage[], fileParts: Part[]) => {
        setUserInput('');
        resetFileState();
        dispatch({ type: 'SET_STATUS', payload: 'thinking' });

        try {
            const response = await getChatResponse(history, fileParts);
            
            if(response.quote) {
                dispatch({ type: 'SET_STATUS', payload: 'generating_quote' });
                
                const notificationStatus = response.quote.telegram_notification_status;
                if (notificationStatus && !notificationStatus.sent) {
                    let message = notificationStatus.message || "Ocurrió un error desconocido al notificar.";
                    let type: 'info' | 'error' = 'error';

                    if (notificationStatus.reason === 'not_configured') {
                        message = "¡Configuración Incompleta! Revisa el archivo .env en el servidor para recibir notificaciones.";
                        type = 'info';
                    } else if (notificationStatus.reason === 'backend_connection_error') {
                        message = "Servidor no detectado. Sigue las instrucciones del archivo README.md para iniciar el backend.";
                        type = 'info';
                    }
                    
                    addToast(type, message);
                }
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            dispatch({ type: 'ADD_MESSAGE', payload: response });
            if (response.content) playAudio(response.content);
        } catch (error) {
            const errorMessage: ChatMessage = { role: 'model', content: "Lo siento, ocurrió un error inesperado." };
            dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
            playAudio(errorMessage.content);
        } finally {
            dispatch({ type: 'CLEAR_STATUS' });
        }
    };
    
    const handleMicClick = () => {
        stopAudio();
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
        setIsListening(!isListening);
    };

    const handleDownloadPdf = (quote: Quote) => {
        const success = generateQuotePDF(quote);
        if (success) addToast('success', 'Cotización PDF generada exitosamente.');
        else addToast('error', 'No se pudo generar el PDF.');
    };

    const proactivePrompts: { [key: string]: string } = {
        'projects': '¿Interesado en nuestros proyectos?',
        'services-isp': '¿Consultas sobre servicios ISP?',
        'services-business': '¿Buscas soluciones para tu empresa?',
        'certifications': '¿Dudas sobre nuestras certificaciones?',
        'faq': '¿Necesitas más respuestas?',
    };
    
    return (
        <>
            <button
                onClick={() => setIsChatOpen(prev => !prev)}
                className="fixed bottom-24 right-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full p-4 shadow-lg shadow-cyan-500/30 hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 z-40 animate-subtle-pulse flex items-center group"
                aria-label="Abrir chat de IA"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                 {!isChatOpen && proactivePrompts[currentSection] && (
                     <span className="absolute right-full mr-4 px-3 py-1.5 text-sm font-semibold text-cyan-100 bg-cyan-800/80 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-x-2">
                         {proactivePrompts[currentSection]}
                     </span>
                 )}
            </button>

            <div className={`fixed bottom-6 right-6 w-[calc(100%-3rem)] max-w-sm h-[70vh] max-h-[600px] glass-card flex flex-col z-50 transition-all duration-300 origin-bottom-right ${isChatOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                 <div className="flex justify-between items-center p-4 border-b border-[var(--border-color)]">
                     <div>
                        <h3 className="text-lg font-bold text-white">ChatIA Vendedor Experto</h3>
                        <p className="text-xs text-cyan-300 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            En línea
                        </p>
                    </div>
                     <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-gray-800/80 text-gray-200 rounded-bl-none'}`}>
                                    {msg.filePreview && <img src={msg.filePreview} alt="file preview" className="rounded-lg mb-2 max-h-32" />}
                                    {msg.file && !msg.filePreview && <div className="text-xs text-cyan-200 bg-cyan-900/40 p-2 rounded-md mb-2">Archivo: {msg.file.name}</div>}
                                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }} />
                                    {msg.quote && <QuoteDisplay quote={msg.quote} onDownloadPdf={handleDownloadPdf} />}
                                </div>
                            </div>
                        ))}
                        {status !== 'idle' && (
                             <div className="flex justify-start"><div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-gray-800/80 text-gray-200 rounded-bl-none"><div className="flex items-center space-x-2 p-1"><span className="typing-dot"></span><span className="typing-dot"></span><span className="typing-dot"></span><span className="text-xs text-gray-400 ml-2 italic">{status === 'thinking' ? 'Analizando...' : 'Generando cotización...'}</span></div></div></div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-4 border-t border-[var(--border-color)]">
                    {attachedFile && (
                        <div className="flex items-center justify-between bg-black/30 p-2 rounded-lg mb-2 text-xs">
                           {filePreview ? <img src={filePreview} className="h-10 w-10 rounded object-cover"/> : <span className="text-cyan-300">Archivo:</span>}
                           <span className="text-gray-300 truncate mx-2">{attachedFile.name}</span>
                           <button type="button" onClick={resetFileState} className="text-red-400 hover:text-red-300 p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg></button>
                        </div>
                    )}
                    <div className="flex items-center bg-black/20 rounded-full border border-gray-700 focus-within:border-cyan-500 transition-colors">
                        <input {...getInputProps()} />
                        <button type="button" onClick={openFileDialog} className="p-2 text-gray-400 hover:text-white m-1 rounded-full transition-colors" aria-label="Adjuntar archivo">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a3 3 0 00-3-3zM7 7a1 1 0 012 0v4a1 1 0 11-2 0V7z" clipRule="evenodd" /><path d="M4 8a1 1 0 011-1h1v1a1 1 0 11-2 0zM13 8a1 1 0 011-1h1v1a1 1 0 11-2 0zM8 12a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /></svg>
                        </button>
                        {speechApiSupported && (
                            <button type="button" onClick={handleMicClick} className={`p-2 m-1 rounded-full transition-colors ${isListening ? 'text-cyan-400 animate-pulse' : 'text-gray-400 hover:text-white'}`} aria-label={isListening ? 'Detener grabación' : 'Iniciar grabación'}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                                  <path d="M5.5 9.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" />
                                  <path d="M10 18a5 5 0 005-5h-1a4 4 0 01-4 4V13a1 1 0 10-2 0v4a4 4 0 01-4-4H4a5 5 0 005 5z" />
                                </svg>
                            </button>
                        )}
                        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder={isListening ? "Escuchando..." : "Escribe o adjunta un archivo..."} className="w-full bg-transparent pl-1 pr-2 py-2 text-white placeholder-gray-400 focus:outline-none" disabled={status !== 'idle'}/>
                        <button type="submit" disabled={status !== 'idle' || (!userInput.trim() && !attachedFile)} className="p-2 text-white rounded-full m-1 bg-cyan-600 disabled:bg-gray-600 hover:bg-cyan-700 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></button>
                    </div>
                </form>
            </div>
            <style>{`.animate-pulse { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; } @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.5); } 50% { opacity: 0.9; transform: scale(1.1); box-shadow: 0 0 5px 5px rgba(34, 211, 238, 0); } }`}</style>
        </>
    );
};

export default AIChatWidget;