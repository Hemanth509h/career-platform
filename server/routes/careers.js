import express from 'express';
import { readCareers, readRoadmaps, resolveCareer } from '../utils/db.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// GET /api/careers - Get all careers (optionally filter by category) with pagination and projection
router.get('/', async (req, res) => {
    try {
        const careers = await readCareers();
        const { category, page = 1, limit = 10, lean = false } = req.query;
        
        let careerList = Object.entries(careers).map(([id, data]) => ({
            id,
            title: data.title,
            category: data.category,
            description: data.description,
            demand: data.demand,
            salary: data.salary,
            skills: data.skills,
            ...(lean ? {} : data)
        }));
        
        if (category) {
            careerList = careerList.filter(c => c.category.toLowerCase() === category.toLowerCase());
        }
        
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedCareers = careerList.slice(startIndex, endIndex);
        
        res.json({
            careers: paginatedCareers,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: careerList.length,
                pages: Math.ceil(careerList.length / limit)
            }
        });
    } catch (error) {
        console.error("Error fetching careers:", error);
        res.status(500).json({ message: 'Failed to fetch careers' });
    }
});

// GET /api/careers/search/:keyword - Search careers by keyword (before :id routes)
router.get('/search/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword.toLowerCase();
        const careers = await readCareers();
        
        const results = Object.entries(careers)
            .map(([id, data]) => ({
                id,
                ...data
            }))
            .filter(c => 
                c.title.toLowerCase().includes(keyword) ||
                c.description.toLowerCase().includes(keyword) ||
                c.category.toLowerCase().includes(keyword) ||
                (c.skills && c.skills.some(s => s.toLowerCase().includes(keyword)))
            )
            .slice(0, 10);

        res.json({ results, count: results.length });
    } catch (error) {
        console.error("Error searching careers:", error);
        res.status(500).json({ message: 'Search failed' });
    }
});

// GET /api/careers/:id/related - Get related careers (before general :id route)
router.get('/:id/related', async (req, res) => {
    try {
        const career = await resolveCareer(req.params.id);
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }

        const careers = await readCareers();
        const relatedCareers = Object.entries(careers)
            .map(([id, data]) => ({
                id,
                title: data.title,
                category: data.category,
                description: data.description,
                demand: data.demand,
                salary: data.salary,
                skills: data.skills,
                similarity: 0
            }))
            .map(c => {
                // Calculate similarity score
                let similarity = 0;
                if (c.category === career.category) similarity += 30;
                if (career.skills && c.skills) {
                    const commonSkills = career.skills.filter(s => c.skills.includes(s)).length;
                    similarity += commonSkills * 15;
                }
                c.similarity = similarity;
                return c;
            })
            .filter(c => c.id !== req.params.id && c.similarity > 0)
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 6);

        res.json({ relatedCareers });
    } catch (error) {
        console.error("Error finding related careers:", error);
        res.status(500).json({ message: 'Failed to find related careers' });
    }
});

// GET /api/careers/:id - Get detailed career information with roadmap (last :id route)
router.get('/:id', async (req, res) => {
    try {
        const career = await resolveCareer(req.params.id);
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        
        const roadmaps = await readRoadmaps();
        const staticRoadmap = roadmaps[req.params.id];
        
        if (staticRoadmap) {
            career.steps = staticRoadmap.steps;
            career.topCompanies = staticRoadmap.topCompanies;
            career.isHighFidelity = true;
        }
        // Use fallback if no static data available
        else if (!career.steps || !career.topCompanies) {
            career.steps = [
                { stage: "Foundation", title: "Core Fundamentals", description: "Learn the basic principles", courses: ["Online Tutorials", "Introduction Courses"] },
                { stage: "Skill Building", title: "Professional Tools", description: "Master essential tools and software", courses: ["Coursera", "Udemy Certifications"] },
                { stage: "Practical Experience", title: "Hands-on Projects", description: "Build a portfolio with real-world tasks", courses: ["Personal Projects", "Freelance Work"] },
                { stage: "Job Ready", title: "Placement Prep", description: "Prepare for job market interviews", courses: ["Job Portals", "Networking"] }
            ];
            career.topCompanies = ["TATA", "Reliance", "Infosys", "Wipro", "HCL"];
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
