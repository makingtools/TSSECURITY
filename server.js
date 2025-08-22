// Import necessary modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes
app.use(express.json()); // Parse incoming JSON requests

// Get config from environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const PORT = process.env.PORT || 3001;

// --- Helper function to format currency ---
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(amount);
};

// --- API Endpoint for sending Telegram notifications ---
app.post('/api/notify-telegram', async (req, res) => {
    // 1. Validate configuration
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID === "YOUR_CHAT_ID_HERE") {
        const errorMsg = "Telegram bot is not configured on the server. Missing TOKEN or CHAT_ID in .env file.";
        console.error(errorMsg);
        // Send a specific error code/message back to the frontend
        return res.status(500).json({ success: false, reason: 'not_configured', message: errorMsg });
    }

    // 2. Get quote data from request body
    const { quote } = req.body;
    if (!quote || !quote.id) {
        return res.status(400).json({ success: false, reason: 'api_error', message: "Invalid quote data received." });
    }

    // 3. Format the message for Telegram (using Markdown)
    let messageText = `*🔥 Nuevo Lead Calificado y Cotización Generada 🔥*\n\n`;
    messageText += `*Cotización ID:* \`${quote.id}\`\n\n`;
    messageText += `*👤 Datos del Cliente:*\n`;
    messageText += `  - *Nombre:* ${quote.client_name}\n`;
    messageText += `  - *Teléfono:* \`${quote.client_phone}\`\n`;
    messageText += `  - *Email:* ${quote.client_email}\n\n`;
    messageText += `*📋 Resumen de la Cotización:*\n`;
    
    quote.items.forEach(item => {
        messageText += `  - ${item.quantity} x ${item.item} - *${formatCurrency(item.total)}*\n`;
    });

    messageText += `\n*💰 TOTAL:* \`${formatCurrency(quote.total)}\`\n\n`;
    messageText += `*#Lead #Cotización #TSSecuritys*`;
    
    const API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const body = {
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: 'Markdown'
    };

    // 4. Send the message to Telegram API
    try {
        const response = await axios.post(API_URL, body);
        if (response.data.ok) {
            console.log("Telegram notification sent successfully.");
            res.status(200).json({ success: true });
        } else {
            console.error("Telegram API returned an error:", response.data);
            res.status(500).json({ success: false, reason: 'api_error', message: `Telegram API Error: ${response.data.description}` });
        }
    } catch (error) {
        console.error("Failed to send notification to Telegram:", error.response ? error.response.data : error.message);
        const errorMessage = error.response?.data?.description || "Failed to connect to Telegram API.";
        res.status(500).json({ success: false, reason: 'api_error', message: errorMessage });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`);
    console.log("Waiting for quote notifications from the frontend...");
});
