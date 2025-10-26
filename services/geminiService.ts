
import { GoogleGenAI } from "@google/genai";
import { Emoji } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const defaultCommentaries = [
    "A stunning victory!",
    "An unbelievable move!",
    "That was a close call!",
    "Dominance asserted!",
    "The crowd goes wild!",
    "A surprising upset!"
];

export const generateBattleCommentary = async (winner: Emoji, loser: Emoji, winnerPlayer: string): Promise<string> => {
    const prompt = `
      In a fun game called "Emoji Clash", two emojis just battled.
      - The winner is ${winner.character} ${winner.name} (${winner.power.name} power).
      - The loser is ${loser.character} ${loser.name} (${loser.power.name} power).
      - The winner belongs to the ${winnerPlayer}.

      Write a short, exciting, and family-friendly battle commentary sentence (max 15 words) describing the outcome. Be creative and dramatic!
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text.trim();
        // Basic filter for unwanted characters
        return text.replace(/[*_`]/g, '');

    } catch (error) {
        console.error("Gemini API call failed:", error);
        // Fallback to a random default commentary
        return defaultCommentaries[Math.floor(Math.random() * defaultCommentaries.length)];
    }
};
