# Career Platform

A comprehensive career guidance platform designed to help students discover their career paths, access personalized course recommendations, and connect with educational resources. Built with React for the frontend and Node.js for the backend, this application supports multiple user roles including students, parents, and administrators.

## Features

- **User Authentication & Roles**: Secure login system with role-based access for students, parents, and admins
- **Career Exploration**: Browse and explore various career pathways with detailed information
- **Course Recommendations**: Personalized course suggestions based on career interests and student profiles
- **Assessment Wizard**: Interactive assessments to help students identify their strengths and career preferences
- **AI Chatbot**: Integrated chatbot for career guidance and Q&A
- **Parent Dashboard**: Parents can monitor their child's progress and recommendations
- **Admin Dashboard**: Administrative tools for managing users, careers, and courses
- **Responsive Design**: Adaptive UI that works across different devices and age groups

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

### Development Tools
- ESLint for code linting
- Vite for development server

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

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

4. **Start the development servers**

   **Frontend:**
   ```bash
   npm run dev
   ```

   **Backend:**
   ```bash
   cd server
   npm start
   ```

5. **Open your browser**
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
│   │   ├── student/       # Student dashboard
│   │   └── ui/            # Basic UI components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service functions
│   └── utils/             # Utility functions
├── server/                 # Backend Node.js application
│   ├── routes/            # API route handlers
│   ├── middleware/        # Authentication and role middleware
│   ├── utils/             # Server utilities
│   └── data/              # JSON data files
├── data/                   # Static data files
└── scripts/                # Utility scripts
```

## Usage

### For Students
- Register and create a profile
- Take assessments to identify career interests
- Browse career pathways and course recommendations
- Use the AI chatbot for guidance

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
- `/auth` - Authentication (login, register)
- `/careers` - Career data management
- `/courses` - Course recommendations
- `/students` - Student profile management
- `/parents` - Parent account linking
- `/admin` - Administrative functions

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Adding New Features
1. Create components in appropriate directories under `src/components/`
2. Add API routes in `server/routes/`
3. Update data models in `data/` or `server/data/`
4. Test thoroughly across different user roles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.