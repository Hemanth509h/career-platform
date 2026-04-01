import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* 
// Database connection (Uncomment when MongoDB URI is ready in .env)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
*/

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Career AI Platform API is running' });
});

// Import and use routes below
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import recommendationsRoutes from './routes/recommendations.js';

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/recommendations', recommendationsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
