// backend/controllers/aiController.js
import { GoogleGenAI } from '@google/genai';

export const chatWithGemini = async (req, res) => {
  const userMessage = (req.body?.message || '').toString().trim();

  if (!userMessage) {
    return res.json({ reply: 'Please enter a message.' });
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      // Initialize Gemini client
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
      });

      // Generate response
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [
          { role: 'user', parts: [{ text: userMessage }] },
        ],
      });

      // Extract reply text
      const reply =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, I couldn’t respond.';

      return res.json({ reply });
    } catch (error) {
      console.error('Gemini API error:', error);
      return res.status(500).json({ reply: 'Error connecting to Gemini AI service.' });
    }
  }

  // Fallback (no API key available)
  return res.json({ reply: `You said: "${userMessage}"` });
};
