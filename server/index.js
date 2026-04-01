import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CareerAI Mentor API is running', port: PORT });
});

// Routes
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import recommendationsRoutes from './routes/recommendations.js';
import coursesRoutes from './routes/courses.js';

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/courses', coursesRoutes);

app.listen(PORT, 'localhost', () => {
  console.log(`CareerAI Mentor API running on http://localhost:${PORT}`);
});
