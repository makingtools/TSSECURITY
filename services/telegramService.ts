import { BACKEND_URL } from '../config';
import type { Quote } from '../types';

// The result type is updated to include a more specific reason for connection failures.
export type TelegramResult = { success: true } | { success: false; reason: 'not_configured' | 'api_error' | 'backend_connection_error'; message: string };

/**
 * Sends a quote to the backend server, which then relays it as a notification to Telegram.
 * This avoids CORS issues and keeps API keys secure.
 * @param quote The quote object to be sent.
 * @returns A promise that resolves to a TelegramResult object.
 */
export async function sendTelegramNotification(quote: Quote): Promise<TelegramResult> {
    const NOTIFY_API_URL = `${BACKEND_URL}/api/notify-telegram`;

    try {
        const response = await fetch(NOTIFY_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // The backend expects an object with a 'quote' key
            body: JSON.stringify({ quote })
        });
        
        // If the server responds with an error (e.g., 500, 400)
        if (!response.ok) {
            // Try to parse the error response from the backend
            const errorData: { reason: 'not_configured' | 'api_error'; message: string } = await response.json();
            console.error("Backend failed to send Telegram notification:", errorData);
            // Return the detailed error from the backend
            return { 
                success: false, 
                reason: errorData.reason || 'api_error', 
                message: errorData.message || 'An unknown error occurred on the backend.' 
            };
        } 
        
        // If the response is OK (e.g., 200)
        console.log("Notification request sent to backend successfully.");
        return { success: true };
        
    } catch (error: any) {
        // This catches network errors, e.g., if the backend server isn't running.
        const message = `Could not connect to the backend server at ${NOTIFY_API_URL}. Is the server running? (npm start)`;
        console.error(message, error);
        return { 
            success: false, 
            reason: 'backend_connection_error', 
            // This is a user-facing error, so make it helpful.
            message: "No se pudo conectar al servidor de notificaciones. Asegúrate de que el backend esté en ejecución."
        };
    }
}