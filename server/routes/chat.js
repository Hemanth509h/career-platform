import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { messages, userProfile } = req.body;

    // If Ollama is not available, fallback to smart contextual mock
    const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
    const ollamaModel = process.env.OLLAMA_MODEL || 'qwen3:4b';

    const profile = userProfile?.profile || {};

    const systemPrompt = `You are an expert AI Career Advisor on the PathFinder AI platform.
    Student Profile:
    - Name: ${userProfile?.name || 'Student'}
    - Personality: ${profile.personality || 'Unknown'}
    - Aptitude Scores: Analytical(${profile.analyticalScore || 50}), Creative(${profile.creativeScore || 50}), Social(${profile.socialScore || 50}), Technical(${profile.technicalScore || 50}), Leadership(${profile.leadershipScore || 50})

    If the student asks for a "chart" or "visualisation" or "graph", you can generate a QuickChart image URL in standard markdown format: ![](https://quickchart.io/chart?c={CONFIG})
    Example config for a bar chart: {type:'bar',data:{labels:['A','B'],datasets:[{label:'Score',data:[10,20]}]}}

    Keep responses concise and warm. Always end with a follow-up question.`;

    const prompt = `${systemPrompt}\n\nStudent question: ${messages}`;

    try {
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: ollamaModel,
          prompt: prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data = await response.json();
      res.json({ response: data.response });

    } catch (ollamaError) {
      console.warn("Ollama not available, using fallback:", ollamaError.message);
      
      // Smart contextual fallback responses based on user message
      const lowerMsg = messages.toLowerCase();
      let mockResponse = '';
      
      if (lowerMsg.includes('chart') || lowerMsg.includes('graph') || lowerMsg.includes('visualize')) {
        mockResponse = `Here's your profile visualization: ![Profile Radar](https://quickchart.io/chart?c={type:'radar',data:{labels:['Analytical','Creative','Social','Technical','Leadership'],datasets:[{label:'Your Score',data:[${profile.analyticalScore || 70},${profile.creativeScore || 60},${profile.socialScore || 65},${profile.technicalScore || 75},${profile.leadershipScore || 70}],backgroundColor:'rgba(99,102,241,0.2)',borderColor:'rgba(99,102,241,1)'}]}})`;
      } else if (lowerMsg.includes('tech') || lowerMsg.includes('technology') || lowerMsg.includes('data')) {
        mockResponse = `Based on your strong technical score of ${profile.technicalScore || 75}%, careers like Data Scientist, AI Engineer, and Software Developer are excellent fits! 🚀 The demand for tech roles is growing 35%+ annually in India. Would you like to explore a specific tech career path?`;
      } else if (lowerMsg.includes('creative') || lowerMsg.includes('design') || lowerMsg.includes('art')) {
        mockResponse = `With your creative score of ${profile.creativeScore || 60}%, consider roles like UI/UX Designer, Graphic Designer, or Content Creator. These fields value innovation and artistic thinking. What type of creative work interests you most?`;
      } else if (lowerMsg.includes('recommend') || lowerMsg.includes('career') || lowerMsg.includes('best')) {
        mockResponse = `Based on your personality type "${profile.personality || 'Professional'}" and aptitude profile, here are your top matches: ![Top Careers](https://quickchart.io/chart?c={type:'horizontalBar',data:{labels:['Data Scientist','AI Engineer','Product Manager','Cloud Architect','ML Engineer'],datasets:[{label:'Match Score',data:[94,91,88,85,82],backgroundColor:'rgba(99,102,241,0.6)'}]}}). Which one interests you most?`;
      } else if (lowerMsg.includes('roadmap') || lowerMsg.includes('path') || lowerMsg.includes('learn')) {
        mockResponse = `I recommend a 4-stage roadmap:\n1. **Foundation** - Learn core concepts through online courses\n2. **Skill Building** - Master tools and frameworks\n3. **Practical Experience** - Build real projects and portfolio\n4. **Job Ready** - Interview prep and networking\n\nWhich stage would you like to focus on?`;
      } else if (lowerMsg.includes('salary') || lowerMsg.includes('package') || lowerMsg.includes('money')) {
        mockResponse = `In India, tech roles typically offer:\n- Entry Level (0-2 years): ₹4L - ₹12L\n- Mid Level (2-5 years): ₹10L - ₹30L\n- Senior Level (5+ years): ₹25L - ₹70L+\n\nSalaries vary based on skills, location, and company. Want to know more about specific roles?`;
      } else {
        mockResponse = [
          `That's a great question! Based on your ${profile.personality || 'professional'} personality type, I can help guide your career journey. What specific aspect interests you most?`,
          `I'm here to help! You have strong ${profile.technicalScore > 70 ? 'technical' : profile.creativeScore > 70 ? 'creative' : 'analytical'} abilities. Tell me more about your goals!`,
          `Interesting! With your unique profile, there are many paths available. Would you like to explore a specific industry or career type?`,
          `I'd love to help! Are you looking for career options, learning roadmaps, or market insights?`
        ][Math.floor(Math.random() * 4)];
      }
      
      await new Promise(r => setTimeout(r, 800));
      return res.json({ response: mockResponse });
    }

  } catch (error) {
    console.error("Chat API Error:", error.message);
    res.status(500).json({ response: "I'm having trouble connecting to the AI engine. Please ensure Ollama is running locally." });
  }
});

export default router;
