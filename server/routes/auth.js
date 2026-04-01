import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) return res.status(400).json({ message: "User already exists" });

    // For mock MVP (without DB running):
    const token = jwt.sign({ email, name }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.status(201).json({ user: { name, email }, token });
    
    /* 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user: { id: newUser._id, name, email }, token });
    */
  } catch (error) {
    res.status(500).json({ message: "Server error during registration" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // For mock MVP (without DB running):
    const token = jwt.sign({ email, name: email.split('@')[0] }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.status(200).json({ user: { email, name: email.split('@')[0] }, token });
    
    /*
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ user: { id: user._id, name: user.name, email: user.email }, token });
    */
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;
