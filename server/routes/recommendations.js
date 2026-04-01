import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { auth } from '../middleware/auth.js';
import { saveUserAssessment } from '../utils/db.js';

const router = express.Router();

// Real Indian Career Database
const CAREER_DATABASE = [
  { id: "ind01", title: "Software Engineer", demand: "Very High", salary: "₹5L – ₹50L", category: "Technology", skills: ["DSA", "Java/Python", "System Design", "Git", "SQL"], description: "Design and build software powering India's IT sector and startup boom." },
  { id: "ind02", title: "Data Scientist", demand: "Very High", salary: "₹8L – ₹45L", category: "Technology", skills: ["Python", "ML", "SQL", "Statistics", "Tableau"], description: "Extract insights from large datasets using statistics and machine learning." },
  { id: "ind03", title: "AI / ML Engineer", demand: "Very High", salary: "₹12L – ₹65L", category: "Technology", skills: ["Deep Learning", "TensorFlow/PyTorch", "MLOps", "NLP", "Cloud"], description: "Build and deploy AI/ML systems for real-world products." },
  { id: "ind04", title: "Cybersecurity Analyst", demand: "Very High", salary: "₹6L – ₹35L", category: "Technology", skills: ["Ethical Hacking", "SIEM", "Linux", "CEH", "Incident Response"], description: "Protect India's digital infrastructure from cyber threats." },
  { id: "ind05", title: "Cloud Solutions Architect", demand: "Very High", salary: "₹15L – ₹60L", category: "Technology", skills: ["AWS/Azure/GCP", "Terraform", "Kubernetes", "DevOps", "System Design"], description: "Design and manage cloud infrastructure for enterprises and startups." },
  { id: "ind06", title: "Chartered Accountant (CA)", demand: "High", salary: "₹7L – ₹40L", category: "Finance", skills: ["Ind AS", "GST", "Audit", "Corporate Law", "Tally ERP"], description: "India's premier finance qualification — audit, tax, and financial advisory." },
  { id: "ind07", title: "Investment Banker", demand: "High", salary: "₹15L – ₹1Cr+", category: "Finance", skills: ["DCF/LBO Modelling", "Valuation", "M&A", "Capital Markets", "Excel"], description: "Facilitate IPOs, mergers, and capital raising for top Indian corporates." },
  { id: "ind08", title: "Management Consultant", demand: "High", salary: "₹12L – ₹60L", category: "Business", skills: ["Problem Solving", "Case Frameworks", "Business Strategy", "Excel", "Data Analysis"], description: "Solve complex business problems for India's top firms (McKinsey, BCG, Bain)." },
  { id: "ind09", title: "Digital Marketer", demand: "High", salary: "₹3L – ₹25L", category: "Business", skills: ["SEO/SEM", "Meta Ads", "Google Ads", "Analytics", "Content Strategy"], description: "Drive online growth for India's e-commerce, D2C, and startup ecosystem." },
  { id: "ind10", title: "IAS / Civil Services Officer", demand: "Stable", salary: "₹7L – ₹18L + perks", category: "Government", skills: ["General Studies", "Essay Writing", "CSAT", "Current Affairs", "Ethics"], description: "India's most prestigious career — serve the nation through UPSC Civil Services." },
  { id: "ind11", title: "Doctor (MBBS / MD)", demand: "Very High", salary: "₹8L – ₹1Cr+", category: "Healthcare", skills: ["Clinical Medicine", "Diagnosis", "Patient Care", "Pharmacology", "Surgery"], description: "India's most respected career — heal patients and specialise through MD/MS." },
  { id: "ind12", title: "Physiotherapist", demand: "High", salary: "₹3L – ₹15L", category: "Healthcare", skills: ["Manual Therapy", "Exercise Prescription", "Sports Physio", "Neurological Rehab", "Assessment"], description: "Help patients recover from injuries, surgeries, and chronic conditions." },
  { id: "ind13", title: "Civil Engineer", demand: "High", salary: "₹4L – ₹25L", category: "Engineering", skills: ["AutoCAD", "STAAD.Pro", "Structural Analysis", "Project Management", "IS Codes"], description: "Design India's roads, bridges, metros, and smart city infrastructure." },
  { id: "ind14", title: "Mechanical Engineer", demand: "High", salary: "₹4L – ₹22L", category: "Engineering", skills: ["SolidWorks/CATIA", "Thermodynamics", "FEA (ANSYS)", "Manufacturing", "Six Sigma"], description: "Design machines and automotive systems powering India's manufacturing sector." },
  { id: "ind15", title: "Architect", demand: "Medium", salary: "₹4L – ₹25L", category: "Design", skills: ["AutoCAD/Revit", "BIM", "Urban Design", "SketchUp", "Construction Tech"], description: "Design buildings and urban spaces shaping India's rapid urbanisation." },
  { id: "ind16", title: "UX / UI Designer", demand: "High", salary: "₹5L – ₹30L", category: "Design", skills: ["Figma", "User Research", "Prototyping", "Interaction Design", "Design Systems"], description: "Design intuitive digital experiences for India's apps and fintech platforms." },
  { id: "ind17", title: "Product Manager", demand: "Very High", salary: "₹12L – ₹55L", category: "Business", skills: ["Product Strategy", "SQL", "Agile", "User Research", "Stakeholder Mgmt"], description: "Drive product strategy and execution at India's unicorns and tech companies." },
  { id: "ind18", title: "Corporate Lawyer", demand: "High", salary: "₹6L – ₹50L", category: "Law", skills: ["Contract Drafting", "Company Law", "SEBI Regulations", "M&A Law", "Legal Research"], description: "Advise on mergers, IPOs, and contracts for India's top corporates and law firms." },
  { id: "ind19", title: "HR Manager", demand: "Medium", salary: "₹5L – ₹25L", category: "Business", skills: ["Talent Acquisition", "SAP SuccessFactors", "Labour Law", "L&D", "Employee Engagement"], description: "Manage talent and people strategy for India's leading organisations." },
  { id: "ind20", title: "Environmental Scientist", demand: "High", salary: "₹4L – ₹18L", category: "Science", skills: ["EIA", "GIS (ArcGIS)", "ESG Reporting", "Environmental Law", "Air/Water Quality Analysis"], description: "Monitor pollution and drive India's sustainability and climate transition." },
  { id: "ind21", title: "Teacher / Educator", demand: "High", salary: "₹3L – ₹20L", category: "Education", skills: ["Subject Expertise", "Curriculum Design", "EdTech Tools", "Assessment Design", "Communication"], description: "Shape the next generation as a school teacher, professor, or EdTech creator." },
  { id: "ind22", title: "Financial Analyst", demand: "High", salary: "₹5L – ₹30L", category: "Finance", skills: ["Financial Modelling", "Excel", "Equity Research", "Valuation", "Power BI"], description: "Analyse financial data to guide investment decisions at banks and corporates." },
  { id: "ind23", title: "Mobile App Developer", demand: "High", salary: "₹5L – ₹35L", category: "Technology", skills: ["Flutter/React Native", "Kotlin/Swift", "REST APIs", "Firebase", "App Store Deployment"], description: "Build apps for India's 800M+ smartphone users on Android and iOS." },
  { id: "ind24", title: "DevOps / SRE Engineer", demand: "Very High", salary: "₹8L – ₹45L", category: "Technology", skills: ["Linux", "Docker/Kubernetes", "CI/CD", "Terraform", "Prometheus/Grafana"], description: "Bridge dev and ops to build reliable, scalable systems at Indian tech companies." },
  { id: "ind25", title: "Journalist / Content Creator", demand: "Medium", salary: "₹3L – ₹20L", category: "Media", skills: ["Investigative Reporting", "Digital Storytelling", "Video Editing", "Social Media", "SEO for Content"], description: "Report stories and build audiences across digital media and social platforms in India." },
];

/**
 * Smart fallback logic to match careers if AI is unavailable.
 */
const generateMockRecommendations = (answers = {}, profileContext = {}) => {
  const vals = Object.values(answers);
  const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 3;
  const aptitudeScore = Math.min(98, Math.round(45 + avg * 10 + Math.random() * 8));

  // Dimension mapping
  const analyticalQ = ['p1', 'a1', 'a4'].map(k => answers[k] || 3);
  const analytical = analyticalQ.reduce((a, b) => a + b, 0) / analyticalQ.length / 5;
  const creative = ['p5', 'a5', 'i3'].map(k => answers[k] || 3).reduce((a, b) => a + b, 0) / 3 / 5;
  const social = ['p2', 'a2', 'i4', 'i7', 'i8'].map(k => answers[k] || 3).reduce((a, b) => a + b, 0) / 5 / 5;
  const tech = ['a3', 'i1', 'i2', 'i6'].map(k => answers[k] || 3).reduce((a, b) => a + b, 0) / 4 / 5;
  const leadership = ['p3', 'p4', 'i5'].map(k => answers[k] || 3).reduce((a, b) => a + b, 0) / 3 / 5;

  const categoryScores = {
    Technology: 0.3 + tech * 0.7,
    Finance: 0.3 + analytical * 0.4 + tech * 0.2 + leadership * 0.1,
    Business: 0.3 + leadership * 0.5 + analytical * 0.2,
    Design: 0.3 + creative * 0.7,
    Healthcare: 0.3 + social * 0.6 + (profileContext.academicStrengths?.includes('Biology') ? 0.3 : 0),
    Engineering: 0.3 + analytical * 0.4 + tech * 0.3,
    Government: 0.4 + leadership * 0.3 + social * 0.2,
    Education: 0.3 + social * 0.7,
    Law: 0.4 + analytical * 0.4 + leadership * 0.2,
    Science: 0.3 + analytical * 0.6 + tech * 0.1,
    Media: 0.3 + creative * 0.4 + social * 0.3,
  };

  const interests = profileContext.interests || [];
  const interestBoost = { Technology: 0, Finance: 0, Business: 0, Design: 0, Healthcare: 0, Engineering: 0, Government: 0, Education: 0, Law: 0, Science: 0, Media: 0 };
  
  interests.forEach(i => {
    if (i.includes('Tech')) interestBoost.Technology += 0.25;
    if (i.includes('Data')) { interestBoost.Technology += 0.15; interestBoost.Finance += 0.1; }
    if (i.includes('Design')) interestBoost.Design += 0.25;
    if (i.includes('Health')) interestBoost.Healthcare += 0.25;
    if (i.includes('Business') || i.includes('Finance')) { interestBoost.Finance += 0.2; interestBoost.Business += 0.1; }
    if (i.includes('Engi') || i.includes('Science')) interestBoost.Engineering += 0.2;
    if (i.includes('Edu')) interestBoost.Education += 0.25;
    if (i.includes('Social')) { interestBoost.Government += 0.15; interestBoost.Education += 0.1; }
  });

  const scored = CAREER_DATABASE.map(c => {
    const baseCatScore = categoryScores[c.category] || 0.4;
    const boost = interestBoost[c.category] || 0;
    const score = Math.min(98, Math.max(55, Math.round((baseCatScore + boost) * 100 + (Math.random() * 6 - 3))));
    return { ...c, matchScore: score };
  }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);

  const personality = creative > 0.6 ? 'Creative Visionary' : leadership > 0.6 ? 'Strategic Leader' : analytical > 0.6 ? 'Analytical Thinker' : social > 0.6 ? 'Empathetic Guide' : 'Systematic Builder';
  
  return {
    profile: {
      personality,
      aptitudeScore,
      analyticalScore: Math.round(analytical * 100),
      creativeScore: Math.round(creative * 100),
      socialScore: Math.round(social * 100),
      technicalScore: Math.round(tech * 100),
      leadershipScore: Math.round(leadership * 100),
      interests: interests.length ? interests : ['Problem Solving', 'Strategic Thinking'],
      learningStyle: profileContext.learningStyle || 'Visual Learner',
      academicStrengths: profileContext.academicStrengths || [],
    },
    careerMatches: scored.map(c => ({
      ...c,
      explanation: `Your profile shows a ${Math.round(c.matchScore)}% match due to your strong alignment in the ${c.category} sector and your specified interest in ${interests[0] || 'innovation'}.`,
    })),
  };
};

router.post('/', auth, async (req, res) => {
  try {
    const { answers, profileContext } = req.body;
    let aiResult;

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
      await new Promise(r => setTimeout(r, 2000));
      aiResult = generateMockRecommendations(answers || {}, profileContext || {});
    } else {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
You are an expert Indian career counselor AI. Analyse this student assessment:

ASSESSMENT ANSWERS (keys=questionId, values=1-5 scale):
${JSON.stringify(answers)}

STUDENT PROFILE CONTEXT:
- Learning Style: ${profileContext?.learningStyle}
- Academic Strengths: ${JSON.stringify(profileContext?.academicStrengths)}
- Budget for Education: ${profileContext?.budget}
- Location: ${profileContext?.location}
- Preferred Study Mode: ${profileContext?.studyMode}
- Education Level: ${profileContext?.educationLevel}
- Interest Areas: ${JSON.stringify(profileContext?.interests)}

CAREER DATABASE (pick best 5 for this student):
${JSON.stringify(CAREER_DATABASE.map(c => ({ id: c.id, title: c.title, category: c.category, skills: c.skills })))}

Respond ONLY as valid JSON (no markdown, no backticks):
{
  "profile": {
    "personality": "string (e.g. Analytical Thinker (INTJ))",
    "aptitudeScore": number,
    "interests": ["string","string","string"],
    "learningStyle": "string",
    "academicStrengths": ["string","string"]
  },
  "careerMatches": [
    {
      "id": "indXX",
      "title": "string",
      "matchScore": number,
      "demand": "string",
      "salary": "string",
      "description": "string",
      "skills": ["string"],
      "category": "string",
      "explanation": "1-2 sentences explaining WHY this matches this specific student's profile"
    }
  ]
}`;

      const response = await ai.models.generateContent({ model: 'gemini-1.5-flash', contents: prompt });
      const clean = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      aiResult = JSON.parse(clean);
    }

    // Save to user profile if logged in
    if (req.user && req.user.id) {
      await saveUserAssessment(req.user.id, aiResult);
    }

    return res.json(aiResult);
  } catch (err) {
    console.error('AI Error:', err.message);
    await new Promise(r => setTimeout(r, 1000));
    const fallback = generateMockRecommendations(req.body?.answers || {}, req.body?.profileContext || {});
    
    // Save fallback to user profile if logged in
    if (req.user && req.user.email) {
      await saveUserAssessment(req.user.email, fallback);
    }
    
    return res.json(fallback);
  }
});

export default router;
