
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const createGamingAssistant = (history: any[] = []) => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the DULA FF AI Gaming Consultant. 
      Your goal is to help customers find the best gaming gear.
      You are knowledgeable about PC components, peripherals, and competitive gaming.
      Be friendly, enthusiastic about gaming, and provide technical insights.
      If asked about products, refer to DULA FF's premium lineup (Keyboards, Mice, Monitors).
      Keep responses concise and helpful. Use markdown for better formatting.`,
    },
  });
};

export async function* sendMessageStream(chat: Chat, message: string) {
  const response = await chat.sendMessageStream({ message });
  for await (const chunk of response) {
    yield chunk as GenerateContentResponse;
  }
}
