import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/landing/HeroSection';
import AssessmentWizard from './components/assessments/AssessmentWizard';
import OverviewLayout from './components/dashboard/OverviewLayout';
import CareerPathway from './components/careers/CareerPathway';
import CareersDirectory from './components/careers/CareersDirectory';
import AIChatbot from './components/chat/AIChatbot';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container" style={{ flexDirection: 'column' }}>
          <Navbar />
          <main className="main-content" style={{ padding: '0' }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HeroSection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/careers" element={<CareersDirectory />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/assessments" element={<AssessmentWizard />} />
                <Route path="/dashboard" element={<OverviewLayout />} />
                <Route path="/career-pathway/:id" element={<CareerPathway />} />
              </Route>
            </Routes>
          </main>
          <AIChatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
