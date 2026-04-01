import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AIChatbot from './components/chat/AIChatbot';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

// Lazy-loaded components for better performance
const HeroSection = lazy(() => import('./components/landing/HeroSection'));
const AssessmentWizard = lazy(() => import('./components/assessments/AssessmentWizard'));
const OverviewLayout = lazy(() => import('./components/dashboard/OverviewLayout'));
const CareerPathway = lazy(() => import('./components/careers/CareerPathway'));
const CareersDirectory = lazy(() => import('./components/careers/CareersDirectory'));
const CourseRecommendations = lazy(() => import('./components/courses/CourseRecommendations'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const ParentLink = lazy(() => import('./components/auth/ParentLink'));
const StudentDashboard = lazy(() => import('./components/student/StudentDashboard'));
const ParentDashboard = lazy(() => import('./components/parent/ParentDashboard'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

// Loading component for Suspense
const PageLoading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column', gap: '20px' }}>
    <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid var(--glass-border)', borderTop: '4px solid var(--accent-color)', borderRadius: '50%' }} />
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading CareerAI Experience...</p>
  </div>
);
// Role-based redirect from /dashboard root
const RoleRedirect = () => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={location.state} />;
  if (user.role === 'admin') return <Navigate to="/admin-dashboard" replace state={location.state} />;
  if (user.role === 'parent') return <Navigate to="/parent-dashboard" replace state={location.state} />;
  return <Navigate to="/student-dashboard" replace state={location.state} />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container" style={{ flexDirection: 'column' }}>
          <Navbar />
          <main className="main-content" style={{ padding: '0' }}>
            <Suspense fallback={<PageLoading />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HeroSection />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/parent-signup" element={<ParentLink />} />
                <Route path="/careers" element={<CareersDirectory />} />

                {/* Role redirect */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<RoleRedirect />} />
                </Route>

                {/* Shared Routes (Student & Parent) */}
                <Route element={<ProtectedRoute allowedRoles={['student', 'parent']} />}>
                  <Route path="/career-pathway/:id" element={<CareerPathway />} />
                  <Route path="/courses" element={<CourseRecommendations />} />
                  <Route path="/courses/:careerId" element={<CourseRecommendations />} />
                </Route>

                {/* Student ONLY Routes */}
                <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                  <Route path="/student-dashboard" element={<OverviewLayout />} />
                  <Route path="/student" element={<StudentDashboard />} />
                  <Route path="/assessments" element={<AssessmentWizard />} />
                </Route>

                {/* Parent ONLY Routes */}
                <Route element={<ProtectedRoute allowedRoles={['parent']} />}>
                  <Route path="/parent-dashboard" element={<ParentDashboard />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Route>
              </Routes>
            </Suspense>
          </main>
          <AIChatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

