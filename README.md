# Career Platform

A comprehensive career guidance platform designed to help students discover their career paths, access personalized course recommendations, and connect with educational resources. Built with React for the frontend and Node.js for the backend, this application supports multiple user roles including students, parents, and administrators.

## Features

- **User Authentication & Roles**: Secure login system with role-based access for students, parents, and admins
- **Career Exploration**: Browse and explore various career pathways with detailed information
- **Course Recommendations**: Personalized course suggestions based on career interests and student profiles
- **Assessment Wizard**: Interactive assessments to help students identify their strengths and career preferences
- **AI Chatbot**: Integrated chatbot powered by local Ollama models for career guidance and Q&A
- **Parent Dashboard**: Parents can monitor their child's progress and recommendations
- **Admin Dashboard**: Administrative tools for managing users, careers, and courses
- **Responsive Design**: Adaptive UI that works across different devices and age groups
- **Local AI**: Uses Ollama for local LLM inference - no cloud API keys required

## Tech Stack

### Frontend
- React 18
- Vite (build tool)
- CSS Modules
- Context API for state management

### Backend
- Node.js
- Express.js
- JSON file-based data storage
- JWT authentication
- Role-based middleware
- **Ollama** for local AI model inference

### Development Tools
- ESLint for code linting
- Vite for development server
- Ollama (v0.20.0+) for local LLM serving

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- **Ollama** (v0.20.0 or higher) - [Download from ollama.ai](https://ollama.ai)

### Setting up Ollama

#### 1. Download and Install Ollama
- **Windows**: Download from [ollama.ai/download](https://ollama.ai/download)
- **Mac**: `brew install ollama`
- **Linux**: Follow instructions at [ollama.ai](https://ollama.ai)

#### 2. Pull a Model
```bash
# Pull the Qwen 4B model (lightweight, good for laptops)
ollama pull qwen:4b

# Or pull Llama2 for more powerful responses
ollama pull llama2
```

#### 3. Start Ollama Server
```bash
ollama serve
```
This starts the Ollama API server on `http://localhost:11434`

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd career-platform
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure Ollama Settings (Optional)**
   
   Edit `server/.env`:
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/careerplatform
   JWT_SECRET=supersecret123
   OLLAMA_URL=http://localhost:11434
   OLLAMA_MODEL=qwen3:4b
   ```
   
   Supported models:
   - `qwen3:4b` - Smallest, fastest (recommended for laptops)
   - `llama2` - Larger, more capable
   - `mistral` - Balanced performance
   - `neural-chat` - Optimized for conversations

5. **Start Ollama Server** (in a separate terminal)
   ```bash
   ollama serve
   ```

6. **Start the development servers**

   **Backend:**
   ```bash
   cd server
   node index.js
   ```

   **Frontend:**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173` for the frontend (default Vite port)

## Project Structure

```
career-platform/
├── public/                 # Static assets
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── admin/         # Admin-specific components
│   │   ├── auth/          # Authentication components
│   │   ├── careers/       # Career-related components
│   │   ├── courses/       # Course components
│   │   ├── chat/          # AI Chat components
│   │   ├── student/       # Student dashboard
│   │   └── ui/            # Basic UI components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service functions
│   └── utils/             # Utility functions
├── server/                 # Backend Node.js application
│   ├── routes/            # API route handlers (using Ollama)
│   ├── middleware/        # Authentication and role middleware
│   ├── utils/             # Server utilities
│   ├── .env               # Environment variables (Ollama config)
│   └── data/              # JSON data files
├── data/                   # Static data files
└── scripts/                # Utility scripts
```

## Usage

### For Students
- Register and create a profile
- Take assessments to identify career interests
- Browse career pathways and course recommendations
- Use the AI chatbot powered by local Ollama models for guidance

### For Parents
- Link to your child's account
- Monitor progress and recommendations
- Access family-focused career resources

### For Administrators
- Manage user accounts and roles
- Add/edit career and course data
- View platform analytics

## API Endpoints

The backend provides RESTful API endpoints for:
- `/api/auth` - Authentication (login, register)
- `/api/careers` - Career data management
- `/api/courses` - Course recommendations
- `/api/chat` - AI chatbot (powered by Ollama)
- `/api/recommendations` - Career recommendations
- `/api/student` - Student profile management
- `/api/parent` - Parent account linking
- `/api/admin` - Administrative functions

## Troubleshooting Ollama Integration

### Ollama server not connecting?
```bash
# Check if Ollama is running:
curl http://localhost:11434/api/tags

# Start Ollama server:
ollama serve

# Check available models:
ollama list
```

### Models not downloading?
```bash
# List available models:
ollama list

# Pull a model:
ollama pull qwen3:4b
```

### API returning fallback responses?
- Check that Ollama server is running (`ollama serve`)
- Verify the model is installed (`ollama list`)
- Check `server/.env` has correct `OLLAMA_URL` and `OLLAMA_MODEL`
- The API automatically falls back to mock responses if Ollama is unavailable

## Development

### Scripts
- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run lint` - Run ESLint

### Backend Development
```bash
cd server
node index.js          # Start server
npm run dev            # Start with auto-reload (if configured)
```

### Adding New Features
1. Create components in appropriate directories under `src/components/`
2. Add API routes in `server/routes/` (with Ollama fallback support)
3. Update data models in `data/` or `server/data/`
4. Test thoroughly across different user roles

## Performance Tips

- **Use qwen3:4b** on laptops for faster responses
- **Use llama2** on desktop/server for better quality
- Keep Ollama running in a separate terminal to avoid blocking the app
- First response may be slower as Ollama loads the model into memory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.