import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Routes
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import recommendationsRoutes from './routes/recommendations.js';
import coursesRoutes from './routes/courses.js';
import careersRoutes from './routes/careers.js';
import studentRoutes from './routes/student.js';
import parentRoutes from './routes/parent.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3001;

// Performance & Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development convenience
}));
app.use(compression());
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: "Too many requests from this IP, please try again after 15 minutes" }
});
app.use('/api/', limiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CareerAI Mentor API is running', port: PORT });
});

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 CareerAI Mentor API running on http://localhost:${PORT}`);
    console.log(`📁 Data directory: ${DATA_DIR}`);
});

