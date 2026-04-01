import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, addUser } from '../utils/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    const user = await findUserByEmail(req.user.email);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Don't send password
    const { password, ...userData } = user;
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Save to JSON DB
    const newUser = await addUser({
      name,
      email,
      password: hashedPassword,
      profile: {
        personality: null,
        aptitudeScore: null,
        interests: []
      },
      savedCareers: [],
    });
    
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.status(201).json({ user: { id: newUser.id, name, email }, token });
    
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: "Server error during registration" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.status(200).json({ user: { id: user.id, name: user.name, email: user.email }, token });

  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;
