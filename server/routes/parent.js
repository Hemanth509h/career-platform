import express from 'express';
import { auth } from '../middleware/auth.js';
import { checkRole } from '../middleware/roles.js';
import * as db from '../utils/db.js';

const router = express.Router();
const checkParent = checkRole('parent');

// GET /parent/dashboard
router.get('/dashboard', auth, checkParent, async (req, res) => {
  try {
    const studentId = req.user.linkedStudentId;
    if (!studentId) {
        return res.status(400).json({ message: "No student linked to this parent account" });
    }

    const student = await db.findUserById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Linked student not found" });
    }
    
    // Remove password
    const { password, ...studentData } = student;

    const profile = await db.findProfileByUserId(studentId);
    
    // Populate careers if profile exists
    let populatedProfile = { savedCareers: [], selectedCareers: [], recommendations: [], lastAssessment: null };
    if (profile) {
        const [saved, selected, recs, matches] = await Promise.all([
          Promise.all((profile.savedCareers || []).map(id => db.resolveCareer(id))),
          Promise.all((profile.selectedCareers || []).map(id => db.resolveCareer(id))),
          Promise.all((profile.recommendations || []).map(id => db.resolveCareer(id))),
          profile.lastAssessment?.matches 
            ? Promise.all(profile.lastAssessment.matches.map(async m => {
                const res = await db.resolveCareer(m.id || m._id || m.title);
                return res ? { ...res, matchScore: m.matchScore, explanation: m.explanation } : m;
              }))
            : Promise.resolve(null)
        ]);

        populatedProfile = {
            ...profile,
            savedCareers: saved.filter(Boolean),
            selectedCareers: selected.filter(Boolean),
            recommendations: recs.filter(Boolean)
        };
        
        if (matches) {
          populatedProfile.lastAssessment = { ...profile.lastAssessment, matches };
        }
    }
    
    res.json({
      student: studentData,
      profile: populatedProfile
    });
  } catch (error) {
    console.error('Error loading parent dashboard:', error.message);
    res.status(500).json({ message: 'Error loading dashboard' });
  }
});

// POST /parent/feedback
router.post('/feedback', auth, checkParent, async (req, res) => {
  try {
    const { message } = req.body;
    const feedback = await db.addFeedback({
      studentId: req.user.linkedStudentId,
      parentId: req.user.id || req.user._id,
      message
    });
    res.status(201).json({ message: 'Feedback sent successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error sending feedback' });
  }
});

// POST /parent/preferences
router.post('/preferences', auth, checkParent, async (req, res) => {
  try {
    const { budget, location, mode } = req.body;
    const parentId = req.user.id || req.user._id;
    
    await db.updatePreferences(parentId, { budget, location, mode });
    const prefs = await db.findPreferencesByParentId(parentId);
    
    res.json({ message: 'Preferences updated', prefs });
  } catch (error) {
    res.status(500).json({ message: 'Error updating preferences' });
  }
});

export default router;
