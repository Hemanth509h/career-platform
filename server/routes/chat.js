import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { messages, userProfile } = req.body;

    // If no valid Gemini API key, fallback to smart contextual mock
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
      const mockResponses = [
        `Great question! Based on a typical student profile, careers in Data Science, AI Engineering, and UX Research are among the most rewarding in 2026. Would you like me to explain the skill path for any of these?`,
        `The tech industry in India has over 5 million job openings annually. Fields like AI/ML, Cybersecurity, and Cloud Architecture are growing at 35%+ year-over-year. Would you like a detailed roadmap?`,
        `For a student interested in healthcare technology, roles like Health Informatics Specialist, Clinical Data Analyst, or Biomedical Engineer combine both passions. Want me to outline what courses you'd need?`,
        `Your analytical aptitude score suggests strong alignment with quantitative careers: Actuary, Financial Analyst, or Operations Research Scientist. These roles offer ₹8–25 LPA starting salaries in India.`,
        `Emerging hybrid careers like "AI Ethics Consultant", "Sustainability Data Analyst", and "EdTech Product Manager" are uniquely suited for students who want to make a broader societal impact.`,
      ];
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      await new Promise(r => setTimeout(r, 1000));
      return res.json({ response: randomResponse });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemPrompt = `You are an expert AI Career Advisor on the PathFinder AI platform. You help students in India discover career opportunities beyond the typical 8-10 mainstream options. You have knowledge of 250+ career paths across Technology, Healthcare, Business, Arts & Design, Science & Engineering, and Education. 
    
The student's profile: Name: ${userProfile?.name || 'Student'}, Email: ${userProfile?.email || 'N/A'}.

Keep your responses concise (2-4 sentences), warm, and actionable. Always end with a follow-up question or suggestion to keep the conversation going.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemPrompt}\n\nStudent question: ${messages}`,
    });

    res.json({ response: response.text });

  } catch (error) {
    console.error("Chat API Error:", error.message);
    res.status(500).json({ response: "I'm having trouble connecting to the AI engine. The server may need a valid GEMINI_API_KEY in the .env file." });
  }
});

export default router;
