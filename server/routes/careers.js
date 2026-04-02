import express from 'express';
import { readCareers, readRoadmaps, resolveCareer } from '../utils/db.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper to generate AI roadmap
const generateAIRoadmap = async (career) => {
    const prompt = `
        You are a career expert specializing in the Indian job market. 
        Generate a detailed 4-stage learning roadmap and a list of top hiring companies for the career: "${career.title}".
        Career Description: ${career.description}
        Target Skills: ${career.skills.join(', ')}

        Return ONLY a JSON object with this exact structure:
        {
            "topCompanies": ["Company 1", "Company 2", "Company 3", "Company 4", "Company 5"],
            "steps": [
                {
                    "stage": "Foundation",
                    "title": "Short title for stage 1",
                    "description": "What to learn first in the Indian context",
                    "courses": ["Resource/Course 1", "Resource/Course 2"]
                },
                {
                    "stage": "Skill Building",
                    "title": "Short title for stage 2",
                    "description": "Deeper technical skills",
                    "courses": ["Project/Certification 1", "Certification 2"]
                },
                {
                    "stage": "Practical Experience",
                    "title": "Short title for stage 3",
                    "description": "Internships or projects",
                    "courses": ["Platform 1", "Portfolio task"]
                },
                {
                    "stage": "Job Ready",
                    "title": "Short title for stage 4",
                    "description": "Interview prep and final steps",
                    "courses": ["Job portal", "Networking tip"]
                }
            ]
        }
    `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Could not parse AI response");
    } catch (error) {
        console.error("AI Roadmap Error:", error.message);
        // Fallback roadmap
        return {
            topCompanies: ["TATA", "Reliance", "Infosys", "Wipro", "HCL"],
            steps: [
                { stage: "Foundation", title: "Core Fundamentals", description: "Learn the basic principles of " + career.title, courses: ["YouTube Tutorials", "Introduction Courses"] },
                { stage: "Skill Building", title: "Professional Tools", description: "Master the essential tools and software.", courses: ["Coursera", "Udemy Certs"] },
                { stage: "Practical Experience", title: "Hands-on Projects", description: "Build a portfolio with real-world tasks.", courses: ["Personal Projects", "Freelance"] },
                { stage: "Job Ready", title: "Placement Prep", description: "Prepare for Indian market interviews.", courses: ["Naukri.com", "LinkedIn Networking"] }
            ]
        };
    }
};

// GET /api/careers - Get all careers (optionally filter by category) with pagination and projection
router.get('/', async (req, res) => {
    try {
        const careers = await readCareers();
        const { category, page = 1, limit = 10, lean = false } = req.query;
        
        let careerList = Object.entries(careers).map(([id, data]) => ({
            id,
            ...data
        }));

        if (category) {
            careerList = careerList.filter(c => c.category === category);
        }

        // Projection (Payload Optimization)
        if (lean === 'true' || lean === true) {
            careerList = careerList.map(c => ({
                id: c.id,
                _id: c.id,
                title: c.title,
                category: c.category,
                demand: c.demand,
                salary: c.salary
            }));
        }

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const total = careerList.length;
        
        const results = careerList.slice(startIndex, startIndex + limitNum);
        
        res.json({
            total,
            page: pageNum,
            limit: limitNum,
            pages: Math.ceil(total / limitNum),
            data: results
        });
    } catch (error) {
        console.error("Careers Fetch Error:", error.message);
        res.status(500).json({ message: 'Failed to fetch careers' });
    }
});

// GET /api/careers/:id - Get full career roadmap
router.get('/:id', async (req, res) => {
    try {
        const resolved = await resolveCareer(req.params.id);
        
        if (!resolved) {
            return res.status(404).json({ message: 'Career not found' });
        }
        
        const career = { ...resolved };
        const careerId = resolved.id;
        const roadmaps = await readRoadmaps();
        
        // Check for static roadmap first
        const staticRoadmap = roadmaps[careerId];
        if (staticRoadmap) {
            career.steps = staticRoadmap.steps;
            career.topCompanies = staticRoadmap.topCompanies;
            career.isHighFidelity = true;
        } 
        // If not found in static database and doesn't belong in the career object itself, generate on the fly
        else if (!career.steps || !career.topCompanies) {
            const aiData = await generateAIRoadmap(career);
            career.steps = aiData.steps;
            career.topCompanies = aiData.topCompanies;
            career.poweredByAI = true;
        }
        
        res.json({
            id: req.params.id,
            ...career
        });
    } catch (error) {
        console.error("Error in career detail:", error);
        res.status(500).json({ message: 'Failed to fetch career details' });
    }
});

export default router;
