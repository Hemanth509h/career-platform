import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// Static comprehensive course catalog
const courseCatalog = [
  { id: "co1", title: "Machine Learning & AI Fundamentals", provider: "Coursera (Stanford)", category: "Technology", relatedCareers: ["c1","c2","c13"], duration: "12 weeks", durationMonths: 3, mode: "Online", fee: 0, feeLabel: "Free (Audit)", accreditation: "Stanford Certificate", placementRate: 87, rating: 4.8, skills: ["Python","Machine Learning","Neural Networks"], description: "Master ML and AI fundamentals from Professor Andrew Ng." },
  { id: "co2", title: "Full Stack Web Development Bootcamp", provider: "Scaler Academy", category: "Technology", relatedCareers: ["c13","c28"], duration: "9 months", durationMonths: 9, mode: "Online", fee: 120000, feeLabel: "₹1.2 Lakh", accreditation: "Industry Certificate", placementRate: 94, rating: 4.7, skills: ["React","Node.js","MongoDB"], description: "Intensive bootcamp with guaranteed placement assistance." },
  { id: "co3", title: "Cybersecurity Analyst Certificate", provider: "Google (Coursera)", category: "Technology", relatedCareers: ["c13","c5"], duration: "6 months", durationMonths: 6, mode: "Online", fee: 15000, feeLabel: "₹15,000", accreditation: "Google Certificate", placementRate: 82, rating: 4.6, skills: ["Network Security","SIEM","Threat Analysis"], description: "Industry-recognized certificate for cybersecurity careers." },
  { id: "co4", title: "Data Science with Python", provider: "IIT Madras (NPTEL)", category: "Technology", relatedCareers: ["c2","c1"], duration: "12 weeks", durationMonths: 3, mode: "Online", fee: 3000, feeLabel: "₹3,000", accreditation: "IIT Madras Certificate", placementRate: 79, rating: 4.5, skills: ["Python","Pandas","Statistics"], description: "Rigorous data science curriculum from IIT Madras faculty." },
  { id: "co5", title: "Google UX Design Certificate", provider: "Google (Coursera)", category: "Design", relatedCareers: ["c3","c16"], duration: "6 months", durationMonths: 6, mode: "Online", fee: 15000, feeLabel: "₹15,000", accreditation: "Google Certificate", placementRate: 80, rating: 4.7, skills: ["Figma","User Research","Prototyping"], description: "Comprehensive UX design certificate from Google." },
  { id: "co6", title: "UI/UX Design Masterclass", provider: "DesignBoat (Mumbai)", category: "Design", relatedCareers: ["c3","c16"], duration: "4 months", durationMonths: 4, mode: "Hybrid", fee: 80000, feeLabel: "₹80,000", accreditation: "Industry Certificate", placementRate: 90, rating: 4.8, skills: ["Figma","Adobe XD","Design Systems"], description: "Hands-on hybrid program with direct recruiter access." },
  { id: "co7", title: "AI Product Management Specialization", provider: "Duke University (Coursera)", category: "Business", relatedCareers: ["c1","c24"], duration: "4 months", durationMonths: 4, mode: "Online", fee: 25000, feeLabel: "₹25,000", accreditation: "Duke University Certificate", placementRate: 85, rating: 4.6, skills: ["Product Strategy","AI/ML Basics","Agile"], description: "Learn to manage AI products from Duke University." },
  { id: "co8", title: "PG Program in Management (Finance)", provider: "IIM Bangalore (Emeritus)", category: "Business", relatedCareers: ["c14","c17","c24"], duration: "11 months", durationMonths: 11, mode: "Online", fee: 350000, feeLabel: "₹3.5 Lakh", accreditation: "IIM Bangalore Certificate", placementRate: 96, rating: 4.7, skills: ["Financial Modelling","Corporate Finance","Leadership"], description: "Executive management program from IIM Bangalore." },
  { id: "co9", title: "Health Informatics Specialist", provider: "Johns Hopkins (Coursera)", category: "Healthcare", relatedCareers: ["c6","c18","c25"], duration: "8 months", durationMonths: 8, mode: "Online", fee: 30000, feeLabel: "₹30,000", accreditation: "Johns Hopkins Certificate", placementRate: 78, rating: 4.5, skills: ["EHR Systems","Clinical Data","HL7 FHIR"], description: "Bridge tech and healthcare with health informatics." },
  { id: "co10", title: "Biomedical Science Diploma", provider: "AIIMS (Delhi Campus)", category: "Healthcare", relatedCareers: ["c6","c25"], duration: "12 months", durationMonths: 12, mode: "Offline", fee: 50000, feeLabel: "₹50,000", accreditation: "AIIMS Certificate", placementRate: 88, rating: 4.8, skills: ["Lab Techniques","Pathology","Molecular Biology"], description: "World-class biomedical training from AIIMS Delhi." },
  { id: "co11", title: "B.Ed. in Educational Technology", provider: "IGNOU (Online)", category: "Education", relatedCareers: ["c7","c10","c19"], duration: "24 months", durationMonths: 24, mode: "Online", fee: 15000, feeLabel: "₹15,000", accreditation: "IGNOU Degree", placementRate: 82, rating: 4.3, skills: ["Curriculum Design","E-Learning","Educational Psychology"], description: "Affordable B.Ed. from India's largest open university." },
  { id: "co12", title: "EdTech Product Design Certificate", provider: "Teach For India (Mumbai)", category: "Education", relatedCareers: ["c7","c27"], duration: "3 months", durationMonths: 3, mode: "Hybrid", fee: 20000, feeLabel: "₹20,000", accreditation: "Industry Certificate", placementRate: 75, rating: 4.4, skills: ["EdTech Product","LMS Platforms","Learning Analytics"], description: "Design impactful digital learning products." },
  { id: "co13", title: "Sustainable Engineering & Green Tech", provider: "IIT Bombay (NPTEL)", category: "Science", relatedCareers: ["c5","c8","c23"], duration: "8 weeks", durationMonths: 2, mode: "Online", fee: 0, feeLabel: "Free", accreditation: "IIT Bombay Certificate", placementRate: 74, rating: 4.5, skills: ["Renewable Energy","Carbon Footprint","Green Materials"], description: "Focus on climate solutions from IIT Bombay." },
  { id: "co14", title: "Cloud Architecture & DevOps Professional", provider: "AWS Training", category: "Technology", relatedCareers: ["c13","c11"], duration: "3 months", durationMonths: 3, mode: "Online", fee: 45000, feeLabel: "₹45,000", accreditation: "AWS Certified Solutions Architect", placementRate: 92, rating: 4.8, skills: ["AWS","Terraform","Docker","Kubernetes"], description: "Prepare for AWS Solutions Architect with hands-on labs." },
  { id: "co15", title: "Digital Marketing & Growth Hacking", provider: "upGrad", category: "Business", relatedCareers: ["c14","c17"], duration: "5 months", durationMonths: 5, mode: "Online", fee: 60000, feeLabel: "₹60,000", accreditation: "Industry Certificate", placementRate: 83, rating: 4.5, skills: ["SEO","SEM","Social Media","Analytics"], description: "Master full-spectrum digital marketing with live projects." }
];

// GET all courses with optional filters
router.get('/', (req, res) => {
  const { mode, maxFee, maxMonths, category, careerId } = req.query;

  let filtered = [...courseCatalog];

  if (careerId) filtered = filtered.filter(c => c.relatedCareers.includes(careerId));
  if (mode && mode !== 'All') filtered = filtered.filter(c => c.mode === mode);
  if (maxFee !== undefined) filtered = filtered.filter(c => c.fee <= Number(maxFee));
  if (maxMonths !== undefined) filtered = filtered.filter(c => c.durationMonths <= Number(maxMonths));
  if (category && category !== 'All') filtered = filtered.filter(c => c.category === category);

  res.json(filtered);
});

// POST recommended courses for a career goal using AI
router.post('/recommend', async (req, res) => {
  const { careerGoal, budget, mode, location, profile } = req.body;

  // Always return relevant courses from catalog first
  const relevant = courseCatalog.filter(c =>
    (careerGoal ? c.category.toLowerCase().includes(careerGoal.toLowerCase()) || c.title.toLowerCase().includes(careerGoal.toLowerCase()) : true) &&
    (budget ? c.fee <= budget : true) &&
    (mode && mode !== 'All' ? c.mode === mode : true)
  ).slice(0, 6);

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
    return res.json({ courses: relevant.length > 0 ? relevant : courseCatalog.slice(0, 4), aiNote: "Showing best-matched courses from our catalog." });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `A student wants to pursue: ${careerGoal}. Their budget is ₹${budget || 'flexible'}, preferred mode: ${mode || 'Any'}, location: ${location || 'Any'}. From the following course catalog, pick the top 3 most relevant and explain why each is a great fit in one sentence. Catalog: ${JSON.stringify(courseCatalog.map(c => ({ id: c.id, title: c.title, provider: c.provider, mode: c.mode, fee: c.fee })))}. Respond ONLY as valid JSON: { "topCourseIds": ["co1","co2","co3"], "reasons": { "co1": "reason", "co2": "reason", "co3": "reason" } }`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    const clean = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    const aiData = JSON.parse(clean);

    const topCourses = aiData.topCourseIds
      .map(id => {
        const course = courseCatalog.find(c => c.id === id);
        return course ? { ...course, aiReason: aiData.reasons[id] } : null;
      })
      .filter(Boolean);

    res.json({ courses: topCourses.length > 0 ? topCourses : relevant, aiNote: "AI-curated selection." });
  } catch (err) {
    res.json({ courses: relevant.length > 0 ? relevant : courseCatalog.slice(0, 4), aiNote: "Showing best-matched courses from our catalog." });
  }
});

export default router;
