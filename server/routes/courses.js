import express from 'express';
import * as db from '../utils/db.js';

const router = express.Router();

// GET all courses with optional filters, pagination and projection
router.get('/', async (req, res) => {
  try {
    const { mode, maxFee, maxMonths, category, careerId, q, page = 1, limit = 10, lean = false } = req.query;
    const courses = await db.readCourses();

    let filtered = [...courses];

    // 1. Search Query (Title/Provider)
    if (q) {
      const search = q.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(search) || 
        c.provider.toLowerCase().includes(search)
      );
    }

    // 2. Filters
    if (careerId) filtered = filtered.filter(c => c.relatedCareers && c.relatedCareers.includes(careerId));
    if (mode && mode !== 'All') filtered = filtered.filter(c => c.mode === mode);
    if (maxFee !== undefined && maxFee !== '') filtered = filtered.filter(c => c.fee <= Number(maxFee));
    if (maxMonths !== undefined && maxMonths !== '') filtered = filtered.filter(c => c.durationMonths <= Number(maxMonths));
    if (category && category !== 'All') filtered = filtered.filter(c => c.category === category);

    // 3. Projection (Payload Optimization)
    if (lean === 'true' || lean === true) {
      filtered = filtered.map(c => ({
        id: c.id,
        _id: c._id || c.id,
        title: c.title,
        provider: c.provider,
        category: c.category,
        fee: c.fee,
        duration: c.duration,
        rating: c.rating
      }));
    }

    // 4. Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const total = filtered.length;
    
    const results = filtered.slice(startIndex, endIndex);

    res.json({
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
      data: results
    });
  } catch (error) {
    console.error('Courses Fetch Error:', error.message);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// GET /api/courses/all - return full course catalog
router.get('/all', async (req, res) => {
  try {
    const courses = await db.readCourses();
    res.json({ total: courses.length, courses });
  } catch (error) {
    console.error('Courses Fetch Error:', error.message);
    res.status(500).json({ message: 'Error fetching all courses' });
  }
});

// POST recommended courses for a career goal using AI
router.post('/recommend', async (req, res) => {
  try {
    const { careerGoal, budget, mode, location, profile } = req.body;
    const courses = await db.readCourses();

    // Always return relevant courses from catalog first
    const relevant = courses.filter(c =>
      (careerGoal ? (c.category && c.category.toLowerCase().includes(careerGoal.toLowerCase())) || (c.title && c.title.toLowerCase().includes(careerGoal.toLowerCase())) : true) &&
      (budget ? c.fee <= budget : true) &&
      (mode && mode !== 'All' ? c.mode === mode : true)
    ).slice(0, 6);

    // Use fallback logic without AI
    return res.json({ courses: relevant.length > 0 ? relevant : courses.slice(0, 4), aiNote: "Showing best-matched courses from our catalog." });
  } catch (err) {
    console.error('Courses Recommendation AI Error:', err.message);
    try {
      const courses = await db.readCourses();
      res.json({ courses: courses.slice(0, 4), aiNote: "Showing best-matched courses from our catalog." });
    } catch (fallbackError) {
      res.status(500).json({ message: 'Error recommending courses.' });
    }
  }
});

export default router;
