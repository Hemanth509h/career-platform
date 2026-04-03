import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const getCareerCount = () => {
  try {
    const filePath = path.join(process.cwd(), 'server', 'data', 'careers.json');
    if (!fs.existsSync(filePath)) return 0;
    const careers = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return Array.isArray(careers) ? careers.length : Object.keys(careers).length;
  } catch (error) {
    return 0;
  }
};

router.post('/', async (req, res) => {
  try {
    const { messages, userProfile } = req.body;

    // If Ollama is not available, fallback to smart contextual mock
    const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
    const ollamaModel = process.env.OLLAMA_MODEL || 'qwen3:4b';

    const profile = userProfile?.profile || {};

    const careerCount = getCareerCount() || 250;
    const systemPrompt = `You are an expert AI Career Advisor on the PathFinder AI platform.
    The platform currently contains ${careerCount} career profiles and curated roadmaps.
    Student Profile:
    - Name: ${userProfile?.name || 'Student'}
    - Personality: ${profile.personality || 'Unknown'}
    - Aptitude Scores: Analytical(${profile.analyticalScore || 50}), Creative(${profile.creativeScore || 50}), Social(${profile.socialScore || 50}), Technical(${profile.technicalScore || 50}), Leadership(${profile.leadershipScore || 50})

    If the student asks for a "chart" or "visualisation" or "graph", you can generate a QuickChart image URL in standard markdown format: ![](https://quickchart.io/chart?c={CONFIG})
    Example config for a bar chart: {type:'bar',data:{labels:['A','B'],datasets:[{label:'Score',data:[10,20]}]}}

    Keep responses concise and warm. Always end with a follow-up question.`;

    const prompt = `${systemPrompt}\n\nStudent question: ${messages}`;

    const extractOllamaText = (data) => {
      if (!data) return '';
      if (typeof data === 'string') return data;
      if (typeof data.response === 'string' && data.response.trim()) return data.response;
      if (typeof data.text === 'string' && data.text.trim()) return data.text;
      if (Array.isArray(data.results) && data.results.length > 0) {
        const textContent = data.results.map(r => r.content || r.text || '').join('\n');
        if (textContent.trim()) return textContent;
      }
      if (typeof data.output === 'string' && data.output.trim()) return data.output;
      if (typeof data.output === 'object' && data.output?.text) return data.output.text;
      return '';
    };

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
          // ensure Ollama returns clean text output in one piece
          options: {
            temperature: 0.9,
            max_tokens: 400,
            stop: null
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data = await response.json();
      const aiText = extractOllamaText(data);
      if (aiText) {
        return res.json({ response: aiText });
      }

      console.warn('Ollama returned empty result, falling back to smart response');
      throw new Error('Empty Ollama response');

    } catch (ollamaError) {
      console.warn("Ollama not available, using fallback:", ollamaError.message);
      
      // Smart contextual fallback responses based on user message
      const lowerMsg = messages.toLowerCase();
      let mockResponse = '';
      
      if (lowerMsg.includes('total careers') || lowerMsg.includes('career count') || lowerMsg.includes('how many careers') || lowerMsg.includes('number of careers')) {
        const totalCareers = careerCount;
        const totalCareerChart = {
          type: 'bar',
          data: {
            labels: ['Careers'],
            datasets: [{
              label: 'Total Careers',
              data: [totalCareers],
              backgroundColor: 'rgba(16,185,129,0.7)',
              borderColor: 'rgba(34,197,94,1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: { display: true, text: 'Total Careers Available' }
            },
            scales: {
              y: { beginAtZero: true, ticks: { stepSize: 10 } }
            }
          }
        };

        mockResponse = `Our platform currently has **${totalCareers} careers** in the catalog.\n\n![Total Careers](https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(totalCareerChart))})\n\nWould you like a breakdown by domain next?`;
      } else if (lowerMsg.includes('chart') || lowerMsg.includes('graph') || lowerMsg.includes('visualize') || lowerMsg.includes('profile')) {
        const chartConfig = {
          type: 'radar',
          data: {
            labels: ['Analytical', 'Creative', 'Social', 'Technical', 'Leadership'],
            datasets: [{
              label: 'Your Scores',
              data: [
                profile.analyticalScore || 70,
                profile.creativeScore || 60, 
                profile.socialScore || 65,
                profile.technicalScore || 75,
                profile.leadershipScore || 70
              ],
              backgroundColor: 'rgba(99,102,241,0.2)',
              borderColor: 'rgba(99,102,241,1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(99,102,241,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(99,102,241,1)'
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Your Career Aptitude Profile'
              }
            },
            scales: {
              r: {
                beginAtZero: true,
                max: 100
              }
            }
          }
        };
        
        mockResponse = `Here's your comprehensive aptitude profile visualization:\n\n![Career Aptitude Profile](https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))})\n\n**Your Strengths:**\n- **Analytical:** ${profile.analyticalScore || 70}% - Problem-solving and logical thinking\n- **Creative:** ${profile.creativeScore || 60}% - Innovation and artistic expression\n- **Social:** ${profile.socialScore || 65}% - Communication and interpersonal skills\n- **Technical:** ${profile.technicalScore || 75}% - Technology and tools proficiency\n- **Leadership:** ${profile.leadershipScore || 70}% - Management and influence\n\nWould you like career recommendations based on this profile?`;
      } else if (lowerMsg.includes('tech') || lowerMsg.includes('technology') || lowerMsg.includes('data')) {
        mockResponse = `Based on your strong technical score of ${profile.technicalScore || 75}%, careers like Data Scientist, AI Engineer, and Software Developer are excellent fits! 🚀 The demand for tech roles is growing 35%+ annually in India. Would you like to explore a specific tech career path?`;
      } else if (lowerMsg.includes('creative') || lowerMsg.includes('design') || lowerMsg.includes('art')) {
        mockResponse = `With your creative score of ${profile.creativeScore || 60}%, consider roles like UI/UX Designer, Graphic Designer, or Content Creator. These fields value innovation and artistic thinking. What type of creative work interests you most?`;
      } else if (lowerMsg.includes('recommend') || lowerMsg.includes('career') || lowerMsg.includes('best') || lowerMsg.includes('ias') || lowerMsg.includes('civil') || lowerMsg.includes('services')) {
        const isCivilServices = lowerMsg.includes('ias') || lowerMsg.includes('civil') || lowerMsg.includes('services');
        
        if (isCivilServices) {
          mockResponse = `Based on your personality type "${profile.personality || 'Professional'}" and aptitude profile, IAS/Civil Services is an excellent fit for your analytical (${profile.analyticalScore || 70}%) and leadership (${profile.leadershipScore || 65}%) strengths!

**Top Civil Services Career Options:**
1. **IAS (Indian Administrative Service)** - ₹8L-₹15L starting, governance & policy
2. **IPS (Indian Police Service)** - ₹6L-₹12L starting, law enforcement
3. **IFS (Indian Foreign Service)** - ₹8L-₹14L starting, diplomacy
4. **IRS (Indian Revenue Service)** - ₹6L-₹12L starting, taxation & finance

**4-Stage Learning Roadmap for IAS:**
1. **Foundation (6-12 months)**: NCERT books, polity, history, geography basics
2. **Preparation (12-18 months)**: UPSC syllabus, mock tests, current affairs
3. **Advanced (6-12 months)**: Optional subject mastery, essay writing, interview prep
4. **Final Stage**: Prelims → Mains → Interview → Service selection

![Civil Services Preparation](https://quickchart.io/chart?c={type:'bar',data:{labels:['Foundation','Preparation','Advanced','Final'],datasets:[{label:'Months Required',data:[9,15,9,3],backgroundColor:'rgba(99,102,241,0.6)'}]}})

Would you like detailed preparation strategies for any specific service?`;
        } else {
          mockResponse = `Based on your personality type "${profile.personality || 'Professional'}" and aptitude profile, here are your top career matches:

**Top Career Options:**
1. **Data Scientist** - High demand, ₹8L-₹25L salary range
2. **AI/ML Engineer** - Growing field, ₹10L-₹30L potential  
3. **Product Manager** - Leadership role, ₹12L-₹35L range
4. **Software Architect** - Senior technical, ₹15L-₹40L+
5. **UX/UI Designer** - Creative tech, ₹6L-₹18L range

![Career Match Scores](https://quickchart.io/chart?c={type:'bar',data:{labels:['Data Scientist','AI Engineer','Product Manager','Software Architect','UX Designer'],datasets:[{label:'Match %',data:[94,91,88,85,82],backgroundColor:'rgba(99,102,241,0.6)'}]}})

**Learning Roadmap (4 stages):**
1. **Foundation** (3-6 months): Programming basics, data structures
2. **Skill Building** (6-12 months): Specialized tools, frameworks  
3. **Projects & Experience** (6-12 months): Real-world applications
4. **Job Ready** (3-6 months): Interview prep, networking

Which career interests you most, or would you like a detailed roadmap for any of these?`;
        }
      } else if (lowerMsg.includes('roadmap') || lowerMsg.includes('path') || lowerMsg.includes('learn') || lowerMsg.includes('how to')) {
        const isCivilServices = lowerMsg.includes('ias') || lowerMsg.includes('civil') || lowerMsg.includes('services') || lowerMsg.includes('upsc');
        
        if (isCivilServices) {
          mockResponse = `**Complete IAS/Civil Services Preparation Roadmap:**

**Stage 1: Foundation Building (6-9 months)**
- NCERT Books (6th-12th): History, Geography, Polity, Economics
- Basic current affairs and newspaper reading
- CSAT preparation: Aptitude, comprehension, math basics
- Daily study: 6-8 hours with weekly mock tests

**Stage 2: Comprehensive Preparation (12-15 months)**  
- Complete UPSC syllabus coverage
- Standard reference books for each subject
- Daily answer writing practice (2 hours)
- Monthly current affairs compilation
- Optional subject selection and preparation

**Stage 3: Advanced Practice (6-9 months)**
- Full-length mock tests (Prelims + Mains)
- Essay writing practice (3 essays/week)
- Previous year question papers analysis
- Interview preparation and personality development
- Revision of weak areas

**Stage 4: Final Stage (3-6 months)**
- Prelims intensive revision
- Mains answer writing under time constraints  
- Interview mock sessions
- Medical examination and document preparation

**Key Success Factors:**
- Consistent daily study routine
- Regular self-assessment and course correction
- Mentorship and peer learning
- Work-life balance to avoid burnout

![IAS Preparation Timeline](https://quickchart.io/chart?c={type:'bar',data:{labels:['Foundation','Preparation','Advanced','Final'],datasets:[{label:'Months',data:[8,14,8,4],backgroundColor:'rgba(16,185,129,0.6)'}]}})

Would you like specific book recommendations or study materials for any stage?`;
        } else {
          mockResponse = `**4-Stage Career Development Roadmap:**

**Stage 1: Foundation Building (3-6 months)**
- Learn core concepts and fundamentals
- Build basic skills in your chosen field
- Complete beginner-level online courses
- Set up development environment/tools

**Stage 2: Skill Development (6-12 months)**
- Master advanced concepts and frameworks
- Work on personal projects and assignments
- Gain practical experience through internships
- Build a portfolio of work samples

**Stage 3: Professional Experience (6-12 months)**
- Apply for junior/entry-level positions
- Network with industry professionals
- Contribute to open-source projects
- Seek mentorship and feedback

**Stage 4: Career Advancement (Ongoing)**
- Pursue certifications and advanced courses
- Take on leadership roles and responsibilities
- Continuous learning and skill updates
- Build professional network and reputation

**Success Tips:**
- Set clear milestones for each stage
- Maintain work-life balance
- Seek regular feedback and mentorship
- Stay updated with industry trends

![Career Growth Stages](https://quickchart.io/chart?c={type:'bar',data:{labels:['Foundation','Skills','Experience','Advancement'],datasets:[{label:'Duration (Months)',data:[5,9,9,12],backgroundColor:'rgba(99,102,241,0.6)'}]}})

Which stage would you like to focus on, or need resources for?`;
        }
      } else if (lowerMsg.includes('salary') || lowerMsg.includes('package') || lowerMsg.includes('money')) {
        mockResponse = `In India, tech roles typically offer:\n- Entry Level (0-2 years): ₹4L - ₹12L\n- Mid Level (2-5 years): ₹10L - ₹30L\n- Senior Level (5+ years): ₹25L - ₹70L+\n\nSalaries vary based on skills, location, and company. Want to know more about specific roles?`;
      } else {
        // Avoid generic fallback response, keep this path only for unchanged communication.
        return res.status(503).json({ response: "Ollama is temporarily unavailable. Please retry in a few seconds." });
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
