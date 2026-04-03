import express from 'express';
import { auth } from '../middleware/auth.js';
import { readCareers, saveUserAssessment, resolveCareer, enrichCareerMatches } from '../utils/db.js';

const router = express.Router();

/**
 * Smart fallback logic to match careers if AI is unavailable.
 */
const generateMockRecommendations = (careersList, answers = {}, profileContext = {}) => {
  const CAREER_DATABASE = Object.values(careersList);
  
  // 1. Strict Aptitude Calculation (0-100 based on a1-a10)
  const aptitudeKeys = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10'];
  const aptSum = aptitudeKeys.reduce((s, k) => s + (Number(answers[k]) || 3), 0);
  const aptitudeScore = Math.round((aptSum / 50) * 100);

  // 2. High-Sensitivity Dimension Mapping
  const analyticalScore = (['p1', 'a1', 'a4', 'a7', 'a9'].reduce((s, k) => s + (Number(answers[k]) || 3), 0) / 25) * 100;
  const creativeScore = (['p5', 'a5', 'i3', 'a6'].reduce((s, k) => s + (Number(answers[k]) || 3), 0) / 20) * 100;
  const socialScore = (['p2', 'a2', 'i4', 'i7', 'i8', 'a10'].reduce((s, k) => s + (Number(answers[k]) || 3), 0) / 30) * 100;
  const techScore = (['a3', 'i1', 'i2', 'i6', 'a8'].reduce((s, k) => s + (Number(answers[k]) || 3), 0) / 25) * 100;
  const leadershipScore = (['p3', 'p4', 'i5'].reduce((s, k) => s + (Number(answers[k]) || 3), 0) / 15) * 100;

  // Normalized values (0-1) for matching
  const analytical = analyticalScore / 100;
  const creative = creativeScore / 100;
  const social = socialScore / 100;
  const tech = techScore / 100;
  const leadership = leadershipScore / 100;

  const categoryScores = {
    Technology: 0.2 + tech * 0.8,
    Finance: 0.2 + analytical * 0.6 + tech * 0.2,
    Business: 0.2 + leadership * 0.6 + analytical * 0.2,
    Design: 0.2 + creative * 0.8,
    Healthcare: 0.2 + social * 0.6 + (profileContext.academicStrengths?.includes('Biology') ? 0.3 : 0),
    Engineering: 0.2 + analytical * 0.5 + tech * 0.3,
    Government: 0.3 + leadership * 0.4 + social * 0.3,
    Education: 0.2 + social * 0.8,
    Law: 0.3 + analytical * 0.5 + leadership * 0.2,
    Science: 0.2 + analytical * 0.7 + tech * 0.1,
    Media: 0.2 + creative * 0.5 + social * 0.3,
  };

  // 3. Ultra-Boost Interests
  const interests = profileContext.interests || [];
  const interestBoost = { Technology: 0, Finance: 0, Business: 0, Design: 0, Healthcare: 0, Engineering: 0, Government: 0, Education: 0, Law: 0, Science: 0, Media: 0 };
  
  interests.forEach(i => {
    const norm = i.toLowerCase();
    if (norm.includes('tech')) interestBoost.Technology += 0.4;
    if (norm.includes('data') || norm.includes('ai') || norm.includes('software')) interestBoost.Technology += 0.35;
    if (norm.includes('design')) interestBoost.Design += 0.4;
    if (norm.includes('health')) interestBoost.Healthcare += 0.4;
    if (norm.includes('business') || norm.includes('marketing')) interestBoost.Business += 0.4;
    if (norm.includes('finance') || norm.includes('bank')) interestBoost.Finance += 0.4;
    if (norm.includes('engi') || norm.includes('mechanic') || norm.includes('civil')) interestBoost.Engineering += 0.4;
    if (norm.includes('edu') || norm.includes('teach')) interestBoost.Education += 0.4;
    if (norm.includes('public') || norm.includes('social') || norm.includes('gov')) interestBoost.Government += 0.4;
    if (norm.includes('sci') || norm.includes('resea')) interestBoost.Science += 0.4;
    if (norm.includes('media') || norm.includes('arts') || norm.includes('content')) interestBoost.Media += 0.4;
  });

  const scored = CAREER_DATABASE.map(c => {
    const baseCatScore = categoryScores[c.category] || 0.4;
    const boost = interestBoost[c.category] || 0;
    // Add significant variance back for uniqueness
    const variance = (Math.random() * 15 - 7.5) / 100;
    const score = Math.min(99, Math.max(45, Math.round((baseCatScore + boost + variance) * 100)));
    return { ...c, matchScore: score };
  }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);

  const personality = creative > 0.65 ? 'Creative Visionary' : leadership > 0.65 ? 'Strategic Leader' : analytical > 0.65 ? 'Analytical Thinker' : social > 0.65 ? 'Empathetic Guide' : 'Systematic Builder';
  
  return {
    profile: {
      personality,
      aptitudeScore,
      analyticalScore: Math.round(analyticalScore),
      creativeScore: Math.round(creativeScore),
      socialScore: Math.round(socialScore),
      technicalScore: Math.round(techScore),
      leadershipScore: Math.round(leadershipScore),
      interests: interests.length ? interests : ['Innovation', 'Problem Solving'],
      learningStyle: profileContext.learningStyle || 'Visual Learner',
      academicStrengths: profileContext.academicStrengths || [],
      visualSummaryUrl: `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
        type: 'radar',
        data: {
          labels: ['Analytical', 'Creative', 'Social', 'Technical', 'Leadership'],
          datasets: [{
            label: 'Your Profile',
            data: [
              Math.round(analyticalScore),
              Math.round(creativeScore),
              Math.round(socialScore),
              Math.round(techScore),
              Math.round(leadershipScore)
            ],
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: 'rgba(99, 102, 241, 1)'
          }]
        },
        options: {
          legend: { display: false },
          scale: {
            ticks: { display: false, min: 0, max: 100, stepSize: 25 },
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' },
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            pointLabels: { fontSize: 10, fontColor: '#94a3b8' }
          }
        }
      }))}`
    },
    careerMatches: scored.map(c => ({
      ...c,
      explanation: `Your profile matches ${c.title} with a ${c.matchScore}% confidence score based on your high ${c.category} aptitude and alignment with your stated interests.`,
    })),
  };
};

router.post('/', auth, async (req, res) => {
  try {
    const { answers, profileContext } = req.body;
    const careersData = await readCareers();

    // Use mock recommendations logic
    await new Promise(r => setTimeout(r, 2000));
    const aiResult = generateMockRecommendations(careersData, answers || {}, profileContext || {});

    // Resolve career IDs to ensure Roadmap links work instantly
    aiResult.careerMatches = await enrichCareerMatches(aiResult.careerMatches);

    // Save to user profile if logged in
    if (req.user && req.user.id) {
      await saveUserAssessment(req.user.id, aiResult);
    }

    return res.json(aiResult);
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({ message: 'Error generating recommendations.' });
  }
});

export default router;
