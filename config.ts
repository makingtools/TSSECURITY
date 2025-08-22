// config.ts

// This file contains non-secret configuration variables for the application.
// Secret keys (like API Keys) should be managed via environment variables.

// --- ElevenLabs Configuration ---
// The API Key is loaded from process.env.ELEVENLABS_API_KEY in the service file.
export const ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Example: A professional female voice (Rachel)

// --- Backend Server Configuration ---
// The URL for the local backend server that handles Telegram notifications.
export const BACKEND_URL = 'http://localhost:3001';