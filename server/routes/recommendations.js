import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { answers } = req.body;
    
    // Safety check if user hasn't added API Key yet
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
      console.log('Using mock AI response since no valid GEMINI_API_KEY is found.');
      // Simulate delay for realism
      await new Promise(resolve => setTimeout(resolve, 2000));
      return res.json({
        profile: {
          personality: "Curious Explorer (INFP)",
          aptitudeScore: 85,
          interests: ["Technology", "Creative Art", "Social Impact"]
        },
        careerMatches: [
          {
            id: "c4",
            title: "Software Engineer",
            matchScore: 92,
            demand: "Very High",
            salary: "$100k - $160k",
            description: "Design and build software applications combining logical aptitude and creative problem-solving."
          },
          {
            id: "c3",
            title: "UX Researcher",
            matchScore: 88,
            demand: "Medium",
            salary: "$85k - $125k",
            description: "Understand user behavior, a perfect match for strong empathy and analytical interests."
          },
          {
            id: "c1",
            title: "AI Product Manager",
            matchScore: 85,
            demand: "High",
            salary: "$120k - $160k",
            description: "Bridge engineering and user needs by guiding the technical product vision."
          }
        ]
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `
      You are an expert Career Counselor AI. 
      Analyze these student assessment answers: ${JSON.stringify(answers)}. 
      Based on these answers, provide a personality summary (e.g., "Analytical Thinker (INTJ)"), an estimated aptitude score out of 100, and top 3 interests.
      Then select the 3 best-fitting careers. Since you cannot see the full 250 DB right now, make up 3 realistic, high-demand careers that perfectly align.
      
      Respond STRICTLY in valid JSON matching this schema exactly with no markdown formatting around it:
      {
        "profile": {
          "personality": "string",
          "aptitudeScore": number,
          "interests": ["string", "string", "string"]
        },
        "careerMatches": [
          {
            "id": "c1 or generate unique ID like c99",
            "title": "string",
            "matchScore": number (out of 100),
            "demand": "string (High, Very High, Medium)",
            "salary": "string ($X - $Y)",
            "description": "string (1 sentence summary)"
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanJson);

    res.json(result);
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "Failed to generate AI recommendations." });
  }
});

export default router;
