import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// Full career database for matching
const CAREER_DATABASE = [
  { id: "c1", title: "AI Product Manager", demand: "High", salary: "₹18L – ₹40L", category: "Technology", skills: ["Product Strategy", "AI/ML Basics", "Agile", "User Research"], description: "Bridge engineering and user needs to build intelligent software products." },
  { id: "c2", title: "Data Scientist", demand: "Very High", salary: "₹12L – ₹35L", category: "Technology", skills: ["Python", "Statistics", "Machine Learning", "SQL"], description: "Extract insights from complex datasets and build predictive models." },
  { id: "c3", title: "UX Researcher", demand: "High", salary: "₹8L – ₹22L", category: "Design", skills: ["User Research", "Figma", "Usability Testing", "Analytics"], description: "Understand user behavior to create intuitive digital experiences." },
  { id: "c4", title: "Sustainability Consultant", demand: "High", salary: "₹10L – ₹25L", category: "Science", skills: ["ESG Analysis", "Carbon Accounting", "Policy", "Systems Thinking"], description: "Help organizations reduce environmental impact and meet climate targets." },
  { id: "c5", title: "Biomedical Engineer", demand: "High", salary: "₹8L – ₹20L", category: "Healthcare", skills: ["Biology", "Engineering", "Medical Devices", "R&D"], description: "Design medical devices and equipment to improve patient outcomes." },
  { id: "c6", title: "Health Informatics Specialist", demand: "High", salary: "₹9L – ₹22L", category: "Healthcare", skills: ["EHR Systems", "Clinical Data", "HL7 FHIR", "Healthcare IT"], description: "Manage clinical data systems to improve healthcare delivery." },
  { id: "c7", title: "EdTech Product Designer", demand: "Medium", salary: "₹7L – ₹18L", category: "Education", skills: ["Instructional Design", "LMS Platforms", "UX", "Curriculum"], description: "Design digital learning experiences that make education more effective." },
  { id: "c8", title: "Renewable Energy Engineer", demand: "Very High", salary: "₹9L – ₹24L", category: "Science", skills: ["Solar/Wind Tech", "Grid Systems", "Power Electronics", "AutoCAD"], description: "Design and implement clean energy systems for a sustainable future." },
  { id: "c9", title: "Cybersecurity Analyst", demand: "Very High", salary: "₹10L – ₹30L", category: "Technology", skills: ["Network Security", "Ethical Hacking", "SIEM", "Risk Assessment"], description: "Protect digital infrastructure from cyber threats and breaches." },
  { id: "c10", title: "Financial Analyst", demand: "High", salary: "₹8L – ₹24L", category: "Business", skills: ["Financial Modelling", "Excel", "Valuation", "Research"], description: "Analyse financial data to guide investment decisions and business strategy." },
  { id: "c11", title: "Cloud Solutions Architect", demand: "Very High", salary: "₹20L – ₹50L", category: "Technology", skills: ["AWS/Azure", "System Design", "Terraform", "DevOps"], description: "Design scalable cloud infrastructure for enterprise applications." },
  { id: "c12", title: "Sports Analytics Specialist", demand: "Medium", salary: "₹6L – ₹18L", category: "Technology", skills: ["Data Analysis", "Sports Science", "Python", "Visualization"], description: "Use data to optimize athletic performance and team strategy." },
  { id: "c13", title: "Full Stack Developer", demand: "Very High", salary: "₹10L – ₹40L", category: "Technology", skills: ["React", "Node.js", "Databases", "System Design"], description: "Build end-to-end web applications from UI to backend infrastructure." },
  { id: "c14", title: "Growth Marketing Manager", demand: "High", salary: "₹10L – ₹30L", category: "Business", skills: ["SEO/SEM", "Analytics", "Content Strategy", "A/B Testing"], description: "Drive user acquisition and retention through data-driven marketing strategies." },
  { id: "c15", title: "Actuarial Scientist", demand: "High", salary: "₹12L – ₹35L", category: "Business", skills: ["Statistics", "Risk Modelling", "Actuarial Exams", "Finance"], description: "Assess and manage financial risk using advanced statistical methods." },
  { id: "c16", title: "Visual Designer", demand: "Medium", salary: "₹6L – ₹18L", category: "Design", skills: ["Adobe Suite", "Typography", "Brand Design", "Motion"], description: "Create compelling visual identities and design assets for brands." },
];

// Generate smart mock recommendations based on assessment answers
const generateMockRecommendations = (answers, profileContext) => {
  const aptitudeScore = Object.values(answers).filter(v => v >= 4).length * 8 + 40;
  const analyticalScore = ([1, 5, 8, 15].map(id => answers[id] || 3).reduce((a, b) => a + b, 0) / 4) / 5;
  const creativeScore = ([9, 16, 18].map(id => answers[id] || 3).reduce((a, b) => a + b, 0) / 3) / 5;
  const socialScore = ([3, 6, 14].map(id => answers[id] || 3).reduce((a, b) => a + b, 0) / 3) / 5;
  const techScore = ([4, 12, 20].map(id => answers[id] || 3).reduce((a, b) => a + b, 0) / 3) / 5;
  const leaderScore = ([2, 7, 3].map(id => answers[id] || 3).reduce((a, b) => a + b, 0) / 3) / 5;

  const scoredCareers = CAREER_DATABASE.map(career => {
    let score = 70;
    if (career.category === 'Technology') score += techScore * 20;
    if (career.category === 'Design') score += creativeScore * 20;
    if (career.category === 'Business') score += (analyticalScore + leaderScore) * 10;
    if (career.category === 'Healthcare') score += socialScore * 20;
    if (career.category === 'Science') score += analyticalScore * 15;
    if (career.category === 'Education') score += socialScore * 15;
    score = Math.min(98, Math.round(score + (Math.random() * 6 - 3)));
    return { ...career, matchScore: score };
  }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);

  const interests = profileContext?.interests || [];
  let personality = 'Analytical Thinker (INTP)';
  if (creativeScore > 0.7) personality = 'Creative Visionary (INFP)';
  else if (leaderScore > 0.7) personality = 'Strategic Leader (ENTJ)';
  else if (socialScore > 0.7) personality = 'Empathetic Connector (ENFJ)';
  else if (techScore > 0.7) personality = 'Systematic Engineer (ISTJ)';

  const explanations = {
    Technology: "Your strong analytical aptitude and tech interest scores suggest you thrive in structured problem-solving environments.",
    Design: "Your creative expression and visual thinking scores align closely with design-focused roles.",
    Business: "Your leadership tendencies and risk tolerance indicate strong business acumen.",
    Healthcare: "Your high empathy and social orientation scores match the service-driven nature of healthcare.",
    Science: "Your curiosity-driven thinking and systematic approach suits scientific research careers.",
    Education: "Your strong communication ability and passion for helping others fits education perfectly."
  };

  return {
    profile: {
      personality,
      aptitudeScore: Math.min(99, aptitudeScore),
      interests: interests.length > 0 ? interests : ["Technology", "Problem Solving", "Innovation"],
      learningStyle: profileContext?.learningStyle || "Visual Learner",
      academicStrengths: profileContext?.academicStrengths || ["Mathematics", "Science"],
    },
    careerMatches: scoredCareers.map(c => ({
      id: c.id,
      title: c.title,
      matchScore: c.matchScore,
      demand: c.demand,
      salary: c.salary,
      description: c.description,
      skills: c.skills,
      category: c.category,
      explanation: explanations[c.category] || "Your profile shows strong alignment with this career path."
    }))
  };
};

router.post('/', async (req, res) => {
  try {
    const { answers, profileContext } = req.body;

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
      console.log('Using smart mock recommendations (no GEMINI_API_KEY set).');
      await new Promise(resolve => setTimeout(resolve, 2000));
      return res.json(generateMockRecommendations(answers || {}, profileContext || {}));
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
You are an expert Career Counselor AI. Analyze this comprehensive student assessment:

ASSESSMENT ANSWERS (1=Strongly Disagree, 5=Strongly Agree):
${JSON.stringify(answers)}

STUDENT PROFILE CONTEXT:
- Learning Style: ${profileContext?.learningStyle || 'Not specified'}
- Academic Strengths: ${JSON.stringify(profileContext?.academicStrengths || [])}
- Budget: ${profileContext?.budget || 'Not specified'}
- Location: ${profileContext?.location || 'Not specified'}
- Preferred Mode: ${profileContext?.studyMode || 'Not specified'}
- Education Level: ${profileContext?.educationLevel || 'Not specified'}
- Interest Areas: ${JSON.stringify(profileContext?.interests || [])}

AVAILABLE CAREERS DATABASE:
${JSON.stringify(CAREER_DATABASE.map(c => ({ id: c.id, title: c.title, category: c.category, skills: c.skills })))}

Based on the full profile, provide:
1. A personality type description (like "Analytical Thinker (INTJ)")
2. An estimated aptitude score (0-100)
3. Top 3 interests inferred from answers
4. Top 5 best-matching careers from the database with match score and explanation

Respond STRICTLY as valid JSON (no markdown):
{
  "profile": {
    "personality": "string",
    "aptitudeScore": number,
    "interests": ["string", "string", "string"],
    "learningStyle": "string",
    "academicStrengths": ["string", "string"]
  },
  "careerMatches": [
    {
      "id": "c1",
      "title": "string",
      "matchScore": number,
      "demand": "High/Very High/Medium",
      "salary": "string",
      "description": "string",
      "skills": ["string"],
      "category": "string",
      "explanation": "1-2 sentence explainable AI reason why this matches this student"
    }
  ]
}`;

    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanJson);
    res.json(result);
  } catch (error) {
    console.error("AI Recommendations Error:", error.message);
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.json(generateMockRecommendations(req.body?.answers || {}, req.body?.profileContext || {}));
  }
});

export default router;
