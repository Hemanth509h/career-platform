import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as db from '../utils/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    const user = await db.findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password, ...userWithoutPassword } = user;
    
    // Attach profile data for students
    if (user.role === 'student') {
      const profile = await db.findProfileByUserId(user._id || user.id);
      if (profile) {
        userWithoutPassword.profile = profile.profile;
        if (profile.lastAssessment && profile.lastAssessment.matches) {
           profile.lastAssessment.matches = await db.enrichCareerMatches(profile.lastAssessment.matches);
        }
        userWithoutPassword.lastAssessment = profile.lastAssessment;
        userWithoutPassword.savedCareers = await db.enrichCareerMatches((profile.savedCareers || []).map(id => ({ id })));
        userWithoutPassword.selectedCareers = await db.enrichCareerMatches((profile.selectedCareers || []).map(id => ({ id })));
      }
    }
    
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, dob } = req.body;
    
    const existingUser = await db.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Calculate age
    let age = null;
    let isMinor = false;
    let parentLinked = false;
    let parentCode = null;

    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      isMinor = age < 18;
      if (isMinor) {
        parentLinked = false;
        parentCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = await db.addUser({
      name,
      email,
      password: hashedPassword,
      dob,
      age,
      isMinor,
      parentLinked,
      parentCode,
      role: 'student'
    });
    
    const payload = { id: newUser._id, email: newUser.email, role: newUser.role, isMinor: newUser.isMinor, parentLinked: newUser.parentLinked };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    
    res.status(201).json({ 
      user: { id: newUser._id, name, email, role: newUser.role, isMinor: newUser.isMinor, parentLinked: newUser.parentLinked, parentCode: newUser.parentCode }, 
      token 
    });
    
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: "Server error during registration" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (user.isMinor && !user.parentLinked) {
      return res.status(403).json({ message: "Parent approval required. Please complete parent linking." });
    }

    const payload = { id: user._id, email: user.email, role: user.role, isMinor: user.isMinor, parentLinked: user.parentLinked };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    
    const userData = { id: user._id, name: user.name, email: user.email, role: user.role, isMinor: user.isMinor, parentLinked: user.parentLinked };
    
    // Attach profile data for students
    if (user.role === 'student') {
      const profile = await db.findProfileByUserId(user._id || user.id);
      if (profile) {
        userData.profile = profile.profile;
        if (profile.lastAssessment && profile.lastAssessment.matches) {
           profile.lastAssessment.matches = await db.enrichCareerMatches(profile.lastAssessment.matches);
        }
        userData.lastAssessment = profile.lastAssessment;
        userData.savedCareers = await db.enrichCareerMatches((profile.savedCareers || []).map(id => ({ id })));
        userData.selectedCareers = await db.enrichCareerMatches((profile.selectedCareers || []).map(id => ({ id })));
      }
    }

    res.status(200).json({ 
      user: userData, 
      token 
    });

  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: "Server error during login" });
  }
});

router.post('/link-parent', async (req, res) => {
  try {
    const { parentCode, name, email, password } = req.body;
    const cleanCode = parentCode?.trim().toUpperCase();

    const users = await db.readUsers();
    console.log(`[Auth] Parent Link Attempt. Code: "${cleanCode}". Available codes:`, users.filter(u => u.parentCode).map(u => u.parentCode));
    
    const studentIndex = users.findIndex(u => u.parentCode === cleanCode && u.isMinor === true);
    
    if (studentIndex === -1) {
      console.warn(`[Auth] Link failed: No student found with code "${cleanCode}"`);
      return res.status(404).json({ message: "Invalid parent code or student not found" });
    }
    
    const student = users[studentIndex];

    const existingParent = await db.findUserByEmail(email);
    if (existingParent) {
      return res.status(400).json({ message: "Parent email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newParent = {
      _id: `u${Date.now()}`,
      id: `u${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role: 'parent',
      linkedStudentId: student._id || student.id,
      createdAt: new Date().toISOString()
    };

    // Update student AND add parent in the same array instance
    const initialCount = users.length;
    student.parentLinked = true;
    users.push(newParent);
    const finalCount = users.length;
    
    console.log(`[Auth] Linking complete. User count: ${initialCount} -> ${finalCount}`);
    await db.saveUsers(users);

    const payload = { id: newParent._id, email: newParent.email, role: newParent.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    res.status(201).json({
      message: "Parent linked successfully",
      user: { id: newParent._id, name: newParent.name, email: newParent.email, role: newParent.role, linkedStudentId: student._id },
      token
    });

  } catch (error) {
    console.error('Link Parent Error:', error.message);
    res.status(500).json({ message: "Server error during parent linking" });
  }
});

export default router;
