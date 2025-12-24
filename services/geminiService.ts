
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const chatWithAI = async (message: string, context: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      User Context: ${JSON.stringify(context)}
      User Message: ${message}
    `,
    config: {
      systemInstruction: `
        You are ameerapp Assistant, an AI designed for freelancers and small teams.
        You have access to the user's current leads, deals, and tasks provided in context.
        Help the user prioritize their day, draft emails, or analyze sales performance.
        Keep answers professional, concise, and actionable.
        If asked to summarize, use bullet points.
      `
    }
  });
  return response.text;
};

export const generateEmailDraft = async (leadName: string, notes: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a short, professional follow-up email for a lead named ${leadName} based on these notes: ${notes}`,
  });
  return response.text;
};

export const getLeadScoreExplanation = async (leadData: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this lead and give a 1-sentence explanation of why they are scored as ${leadData.status}: ${JSON.stringify(leadData)}`,
  });
  return response.text;
};

export const getQuickInsights = async (leads: any[], deals: any[]) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on these leads: ${JSON.stringify(leads)} and deals: ${JSON.stringify(deals)}, provide 3 quick bullet-point insights for the business owner to focus on today.`,
  });
  return response.text;
};
