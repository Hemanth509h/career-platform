const dict = {
  // Navigation / Dashboard
  Analytics: { child: 'Your Superpowers 🦸‍♂️', teen: 'Your Strengths Profile', adult: 'Career Analytics' },
  SavedCareers: { child: 'My Favorites ⭐', teen: 'Saved Careers', adult: 'Saved Careers' },
  BestMatches: { child: 'Best Jobs For You 🌟', teen: 'Top Top Matches', adult: 'Top Matches' },
  CareerRecommendations: { child: 'Jobs to Explore ✨', teen: 'Career Options', adult: 'Career Recommendations' },
  
  // Assessments
  TakeAssessment: { child: 'Play the Fun Quiz! 🎮', teen: 'Start Skills Quiz', adult: 'Take Skill Assessment' },
  AssessmentResults: { child: 'Your Awesome Results 🎉', teen: 'Quiz Results', adult: 'Assessment Results' },

  // Career Details
  MarketDemand: { child: 'Easy to Find Jobs ✨', teen: 'Job Popularity', adult: 'Market Demand' },
  ExpectedSalary: { child: 'Pocket Money 💰', teen: 'Future Earnings', adult: 'Expected Salary' },
  SkillsRequired: { child: 'What to Learn 📚', teen: 'Key Skills', adult: 'Skills Required' },
  StudyMode: { child: 'How to Learn 🏫', teen: 'Study Format', adult: 'Study Mode' },

  // General Actions
  ViewMore: { child: 'Show Me More 👀', teen: 'View Details', adult: 'View Details' },
  ViewRoadmap: { child: 'Your Adventure Map 🗺️', teen: 'View Pathway', adult: 'View Roadmap' },
};

/**
 * Returns a simplified or complex string based on the current user's age group.
 * @param {string} key - The dictionary key
 * @param {string} ageGroup - 'child', 'teen', or 'adult'
 * @returns {string} The text content for that age group.
 */
export const adaptiveText = (key, ageGroup = 'adult') => {
  if (!dict[key]) return key;
  return dict[key][ageGroup] || dict[key]['adult'];
};
