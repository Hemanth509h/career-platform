import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { messages, userProfile } = req.body;

    // If no valid Gemini API key, fallback to smart contextual mock
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
      const mockResponses = [
        `Great question! Based on your profile, careers like Data Science and AI Engineering are high demand. Here is a chart of your top career matches: ![](https://quickchart.io/chart?c={type:'bar',data:{labels:['Data Scientist','AI Engineer','Product Manager'],datasets:[{label:'Match %25',data:[94,91,86],backgroundColor:'rgba(99,102,241,0.5)'}]}})`,
        `The tech industry in India is growing at 35%+ annually. Your analytical scores are strong! Check out your profile radar: ![](https://quickchart.io/chart?c={type:'radar',data:{labels:['Analytical','Creative','Social','Tech','Leadership'],datasets:[{label:'Your Profile',data:[85,60,70,90,75]}]}})`,
        `For a student interested in healthcare, roles like Health Informatics are great. Want me to outline the roadmap?`,
      ];
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      await new Promise(r => setTimeout(r, 1000));
      return res.json({ response: randomResponse });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const profile = userProfile?.profile || {};

    const systemPrompt = `You are an expert AI Career Advisor on the PathFinder AI platform. 
    Student Profile:
    - Name: ${userProfile?.name || 'Student'}
    - Personality: ${profile.personality || 'Unknown'}
    - Aptitude Scores: Analytical(${profile.analyticalScore || 50}), Creative(${profile.creativeScore || 50}), Social(${profile.socialScore || 50}), Technical(${profile.technicalScore || 50}), Leadership(${profile.leadershipScore || 50})
    
    If the student asks for a "chart" or "visualisation" or "graph", you can generate a QuickChart image URL in standard markdown format: ![](https://quickchart.io/chart?c={CONFIG})
    Example config for a bar chart: {type:'bar',data:{labels:['A','B'],datasets:[{label:'Score',data:[10,20]}]}}
    
    Keep responses concise and warm. Always end with a follow-up question.`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: `${systemPrompt}\n\nStudent question: ${messages}`,
    });

    res.json({ response: response.text });

  } catch (error) {
    console.error("Chat API Error:", error.message);
    res.status(500).json({ response: "I'm having trouble connecting to the AI engine. The server may need a valid GEMINI_API_KEY in the .env file." });
  }
});

export default router;
