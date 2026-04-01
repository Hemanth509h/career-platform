import express from 'express';
import { auth } from '../middleware/auth.js';
import * as db from '../utils/db.js';

const router = express.Router();

// GET /student/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user.id);
    
    // Enrich matches with database IDs
    if (profile.lastAssessment && profile.lastAssessment.matches) {
      profile.lastAssessment.matches = await db.enrichCareerMatches(profile.lastAssessment.matches);
    }
    
    res.json(profile);
  } catch (error) {
    console.error('Profile Fetch Error:', error.message);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Helper to get or create profile
const getOrCreateProfile = async (userId) => {
  let profile = await db.findProfileByUserId(userId);
  if (!profile) {
    profile = await db.updateProfile(userId, { savedCareers: [], selectedCareers: [], recommendations: [] });
  }
  return profile;
};

// GET /student/saved-careers
router.get('/saved-careers', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user.id);
    const savedIds = profile.savedCareers || [];
    
    const savedCareers = await Promise.all(savedIds.map(async id => {
        const resolution = await db.resolveCareer(id);
        return resolution || { id, _id: id, title: 'Unknown Career' };
    }));
    
    res.json(savedCareers);
  } catch (error) {
    console.error('Error fetching saved careers:', error.message);
    res.status(500).json({ message: 'Error fetching saved careers' });
  }
});

// POST /student/save-career
router.post('/save-career', auth, async (req, res) => {
  try {
    const { careerId } = req.body;
    const profile = await getOrCreateProfile(req.user.id);
    
    if (!profile.savedCareers.includes(careerId)) {
      profile.savedCareers.push(careerId);
      await db.updateProfile(req.user.id, { savedCareers: profile.savedCareers });
    }
    res.json({ message: 'Career saved successfully', savedCareers: profile.savedCareers });
  } catch (error) {
    res.status(500).json({ message: 'Error saving career' });
  }
});

// GET /student/selected-careers
router.get('/selected-careers', auth, async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user.id);
    const selectedIds = profile.selectedCareers || [];
    
    const selectedCareers = await Promise.all(selectedIds.map(async id => {
        const resolution = await db.resolveCareer(id);
        return resolution || { id, _id: id, title: 'Unknown Career' };
    }));

    res.json(selectedCareers);
  } catch (error) {
    console.error('Error fetching selected careers:', error.message);
    res.status(500).json({ message: 'Error fetching selected careers' });
  }
});

// POST /student/select-career
router.post('/select-career', auth, async (req, res) => {
  try {
    const { careerId } = req.body;
    const profile = await getOrCreateProfile(req.user.id);
    
    if (!profile.selectedCareers.includes(careerId)) {
      if (profile.selectedCareers.length >= 3) {
        return res.status(400).json({ message: 'Cannot select more than 3 careers' });
      }
      profile.selectedCareers.push(careerId);
      await db.updateProfile(req.user.id, { selectedCareers: profile.selectedCareers });
    }
    
    res.json({ message: 'Career selected successfully', selectedCareers: profile.selectedCareers });
  } catch (error) {
    res.status(500).json({ message: 'Error selecting career' });
  }
});

export default router;
