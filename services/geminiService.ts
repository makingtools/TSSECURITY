import { GoogleGenAI, FunctionDeclaration, Tool, Type, Chat, GenerateContentResponse, Part, Content } from "@google/genai";
import type { ChatMessage, Quote, QuoteItem } from '../types';
import { sendTelegramNotification } from "./telegramService";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

// --- Mock Pricing Database (Updated for 2025 with competitor data) ---
const SERVICE_PRICES: { [key: string]: { description: string, unit_price: number, competitor_multiplier: number } } = {
    // ISP Services
    "DIAGNOSTICO_FALLAS_RED_ISP": { description: "Análisis y diagnóstico completo de red ISP/WISP/FTTH", unit_price: 550000, competitor_multiplier: 1.25 },
    "CONFIGURACION_BALANCEO_CARGAS": { description: "Configuración de balanceo de cargas multi-WAN", unit_price: 900000, competitor_multiplier: 1.20 },
    "CONFIGURACION_OSPF": { description: "Implementación de enrutamiento dinámico OSPF en red", unit_price: 1350000, competitor_multiplier: 1.15 },
    "CONFIGURACION_VPN_SITIO_A_SITIO": { description: "Configuración de VPN segura Site-to-Site", unit_price: 680000, competitor_multiplier: 1.30 },
    "CONFIGURACION_HOTSPOT": { description: "Instalación y personalización de portal cautivo Hotspot", unit_price: 1100000, competitor_multiplier: 1.20 },
    "ASESORIA_PROYECTO_WISP": { description: "Consultoría y diseño de proyecto WISP/FTTH (hora)", unit_price: 180000, competitor_multiplier: 1.25 },
    "INSTALACION_ENLACE_PTP": { description: "Instalación y alineación de enlace PTP (por extremo)", unit_price: 850000, competitor_multiplier: 1.15 },
    
    // Business Solutions
    "INSTALACION_CAMARA_IP": { description: "Instalación y config. de cámara de seguridad IP (4K)", unit_price: 320000, competitor_multiplier: 1.30 },
    "CONFIGURACION_NVR": { description: "Configuración de NVR/DVR para sistema de CCTV", unit_price: 480000, competitor_multiplier: 1.20 },
    "SENSOR_MOVIMIENTO": { description: "Instalación de sensor de movimiento dual-tech", unit_price: 220000, competitor_multiplier: 1.25 },
    "CONTROL_ACCESO_BIOMETRICO": { description: "Instalación de unidad de control de acceso biométrico", unit_price: 1800000, competitor_multiplier: 1.15 },
    "PUNTO_CABLEADO_ESTRUCTURADO": { description: "Instalación de punto de red Cat 6A certificado", unit_price: 210000, competitor_multiplier: 1.35 },
    "CONFIGURACION_PLANTA_IP": { description: "Config. de planta telefónica IP (hasta 10 ext.)", unit_price: 1500000, competitor_multiplier: 1.20 },
    "PUNTO_ELECTRICO_REGULADO": { description: "Instalación de punto eléctrico regulado con polo a tierra", unit_price: 190000, competitor_multiplier: 1.25 }
};

// --- Tool Definition for Gemini ---
const generateQuoteTool: FunctionDeclaration = {
    name: "generateQuote",
    description: "Genera una cotización espectacular y profesional. Solo se debe llamar cuando el cliente ha confirmado los servicios, cantidades Y TAMBIÉN ha proporcionado su nombre completo, número de teléfono y correo electrónico. Nunca llames a esta función sin los datos del cliente.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            items: {
                type: Type.ARRAY,
                description: "Una lista de los servicios a cotizar.",
                items: {
                    type: Type.OBJECT,
                    properties: {
                        service_id: {
                            type: Type.STRING,
                            description: `El ID del servicio. Debe ser uno de: ${Object.keys(SERVICE_PRICES).join(', ')}`,
                        },
                        quantity: {
                            type: Type.INTEGER,
                            description: "La cantidad del servicio. Por defecto 1.",
                        },
                    },
                    required: ["service_id", "quantity"],
                },
            },
            include_comparison: {
                type: Type.BOOLEAN,
                description: "Si el cliente solicita una comparación con la competencia, establece esto en true."
            },
            client_name: { type: Type.STRING, description: "Nombre completo del cliente." },
            client_phone: { type: Type.STRING, description: "Número de teléfono de contacto del cliente." },
            client_email: { type: Type.STRING, description: "Correo electrónico del cliente." }
        },
        required: ["items", "client_name", "client_phone", "client_email"],
    },
};

const tools: Tool[] = [{ functionDeclarations: [generateQuoteTool] }];

// --- System Prompt ---
const systemInstruction = `
Eres 'ChatIA', un vendedor experto y espectacular de servicios IT para TS Securitys. Tu misión es captar, asesorar, cotizar y concretar ventas. Tu operación es para Colombia, todos los precios son en Pesos Colombianos (COP).

**Tu Estilo:**
- **Profesional y Confiable:** Tu tono inspira confianza. Eres amable, pero muy profesional.
- **Concreto y Conciso:** Tus respuestas son muy breves, claras y directas al punto. No usas más palabras de las necesarias.
- **Enfoque en Cierre:** Siempre motiva al cliente a avanzar. "¿Procedemos con la cotización?", "¿Qué te parece si generamos el PDF para que lo revises?", "¿Deseas que agendemos una llamada para avanzar?".

**Reglas de Interacción OBLIGATORIAS:**
1.  **Captura de Datos del Cliente (INDISPENSABLE):** Antes de generar CUALQUIER cotización, DEBES obtener y confirmar los siguientes datos del cliente:
    - Nombre completo
    - Número de teléfono
    - Correo electrónico
    NUNCA llames a la herramienta \`generateQuote\` sin haber recopilado esta información primero. Pregunta por ellos de forma amable y profesional.

2.  **Generación de Cotizaciones:**
    - Llama a la herramienta \`generateQuote\` ÚNICAMENTE cuando tengas los servicios confirmados Y los 3 datos del cliente.
    - La herramienta genera un PDF espectacular que el cliente podrá descargar. El PDF siempre indica que los precios no incluyen IVA.
    - Si el cliente lo pide, puedes incluir una comparación con precios promedio de la competencia para resaltar nuestro valor.
    - Si la cotización es compleja, invita al cliente a adjuntar un archivo: "Para ser más preciso, ¿te gustaría adjuntar una foto o un archivo Excel con tus requerimientos?".

3.  **Gestión de Archivos:** Puedes analizar fotos (ej. foto de un rack) o archivos Excel con requerimientos que el usuario adjunte para entender mejor sus necesidades.

4.  **Proactividad:** Si recibes un contexto inicial, úsalo para iniciar la conversación. Por ejemplo: "Veo que te interesan nuestros Proyectos. ¿Hay alguno en particular que te gustaría replicar?".

5.  **NO des soporte técnico.** Si preguntan "cómo configuro X", tu respuesta es: "Esa es una configuración experta que realizamos en nuestro servicio de [Servicio]. ¿Te gustaría cotizarlo para que nos encarguemos de todo?".
`;

// --- Client-side Tool Implementation ---
async function calculateQuote(items: { service_id: string; quantity: number }[], client_name: string, client_phone: string, client_email: string, include_comparison?: boolean): Promise<Quote> {
    let subtotal = 0;
    let competitor_total = 0;
    const quoteItems: QuoteItem[] = items.map(item => {
        const service = SERVICE_PRICES[item.service_id];
        const unit_price = service?.unit_price || 0;
        const total = unit_price * item.quantity;
        subtotal += total;

        if (include_comparison) {
            competitor_total += (unit_price * (service?.competitor_multiplier || 1.2)) * item.quantity;
        }

        return {
            item: item.service_id.replace(/_/g, ' '),
            description: service?.description || "Servicio no encontrado",
            quantity: item.quantity,
            unit_price: unit_price,
            total: total,
        };
    });

    const quote: Quote = { 
        id: `COT-${Date.now()}`, 
        items: quoteItems, 
        subtotal, 
        total: subtotal, // Total is now the same as subtotal (no IVA)
        client_name,
        client_phone,
        client_email,
    };
    if (include_comparison) {
        quote.competitor_total = competitor_total;
    }
    
    // Send Telegram notification and store the detailed result
    const notificationResult = await sendTelegramNotification(quote);
    if (notificationResult.success === false) {
        quote.telegram_notification_status = {
            sent: false,
            reason: notificationResult.reason,
            message: notificationResult.message,
        };
    } else {
        quote.telegram_notification_status = {
            sent: true,
        };
    }

    return quote;
}

// --- Main API Interaction Function ---
export async function getChatResponse(history: ChatMessage[], fileParts: Part[] = []): Promise<ChatMessage> {
  try {
    const geminiHistory: Content[] = history
        .filter(msg => !msg.quote && msg.status !== 'thinking') // Filter out non-content messages
        .map(msg => ({
            role: msg.role,
            parts: msg.context 
                   ? [{text: msg.content}, {text: `[System Note: The user is currently viewing the '${msg.context}' section of the website. Use this information to tailor your response.]`}]
                   : [{ text: msg.content }]
        }));

    const lastUserMessageContent = geminiHistory.pop();
    if (!lastUserMessageContent) throw new Error("No user message found");
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction, tools },
      history: geminiHistory,
    });
    
    const messageParts: Part[] = [...lastUserMessageContent.parts, ...fileParts];
    
    const response: GenerateContentResponse = await chat.sendMessage({ message: messageParts });
    
    const functionCall = response.candidates?.[0]?.content?.parts[0]?.functionCall;

    if (functionCall && functionCall.name === 'generateQuote' && functionCall.args.items) {
        const { items, include_comparison, client_name, client_phone, client_email } = functionCall.args;
        const quote = await calculateQuote(items as any[], client_name as string, client_phone as string, client_email as string, include_comparison as boolean);
        
        const functionResponsePart: Part = {
            functionResponse: { name: 'generateQuote', response: { quote_id: quote.id, total: quote.total } }
        };

        const result2 = await chat.sendMessage({ message: [functionResponsePart] });
        const summaryText = result2.text;

        return { role: 'model', content: summaryText, quote: quote };
    }
    
    return { role: 'model', content: response.text };

  } catch (error) {
    console.error("Error getting response from Gemini API:", error);
    return { 
        role: 'model', 
        content: "Lo siento, estoy teniendo problemas para conectarme. Por favor, intenta de nuevo o contáctanos por WhatsApp." 
    };
  }
};