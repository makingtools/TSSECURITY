import { ELEVENLABS_VOICE_ID } from '../config';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}/stream`;

export async function getElevenLabsAudioStream(text: string): Promise<ReadableStream<Uint8Array> | null> {
    if (!ELEVENLABS_API_KEY) {
        console.warn("ElevenLabs API key is not configured. Audio generation is disabled.");
        return null;
    }

    const headers = new Headers();
    headers.append("Accept", "audio/mpeg");
    headers.append("xi-api-key", ELEVENLABS_API_KEY);
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.1,
            use_speaker_boost: true
        }
    });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            try {
                const errorData = await response.json();
                console.error("ElevenLabs API Error:", JSON.stringify(errorData, null, 2));
            } catch (e) {
                console.error("ElevenLabs API Error: Could not parse JSON response.", await response.text());
            }
            return null;
        }

        return response.body;

    } catch (error) {
        console.error("Error fetching audio stream from ElevenLabs:", error);
        return null;
    }
}