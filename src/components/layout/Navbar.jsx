import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, LogOut, Menu, X, BookOpen, LayoutDashboard, Briefcase, ClipboardList } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const linkStyle = (path) => ({
    color: isActive(path) ? '#fff' : 'var(--text-secondary)',
    fontWeight: isActive(path) ? 600 : 500,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.92rem',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '12px',
    background: isActive(path) ? 'rgba(255,255,255,0.08)' : 'transparent',
    position: 'relative'
  });

  return (
    <header className="glass-panel animate-fade-in" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 32px',
      margin: '16px 24px 0 24px',
      borderRadius: '24px',
      position: 'sticky',
      top: '16px',
      zIndex: 100,
      border: '1px solid var(--glass-border)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
    }}>
      {/* Logo */}
      <Link to="/" className="hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white', textDecoration: 'none' }}>
        <div className="icon-bounce" style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}>
          <Compass color="white" size={22} />
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }} className="text-gradient">CareerAI Mentor</span>
      </Link>

      {/* Desktop Nav */}
      <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link to="/careers" className="nav-link hover-lift" style={linkStyle('/careers')}>
          <Briefcase size={16} /> Explore Careers
          {isActive('/careers') && <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '2px', background: 'var(--accent-color)' }} />}
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/assessments" className="nav-link hover-lift" style={linkStyle('/assessments')}>
              <ClipboardList size={16} /> Assessment
              {isActive('/assessments') && <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '2px', background: 'var(--accent-color)' }} />}
            </Link>
            <Link to="/courses" className="nav-link hover-lift" style={linkStyle('/courses')}>
              <BookOpen size={16} /> Courses
              {isActive('/courses') && <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '2px', background: 'var(--accent-color)' }} />}
            </Link>
            <Link to="/dashboard" className="nav-link hover-lift" style={linkStyle('/dashboard')}>
              <LayoutDashboard size={16} /> Dashboard
              {isActive('/dashboard') && <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '2px', background: 'var(--accent-color)' }} />}
            </Link>
          </>
        )}
      </nav>

      {/* Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {isAuthenticated ? (
          <>
            <div className="hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '50px', border: '1px solid var(--glass-border)' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '14px', background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: 'white', border: '2px solid rgba(255,255,255,0.1)' }}>
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{user?.name}</span>
            </div>
            <button onClick={logout} className="btn-secondary hover-lift" style={{ padding: '8px 16px', fontSize: '0.85rem', gap: '6px', borderRadius: '12px' }}>
              <LogOut size={14} /> Exit
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/login" className="nav-link" style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none', transition: 'color 0.2s' }}>Log In</Link>
            <Link id="nav-get-started" to="/register" className="btn-primary btn-ripple" style={{ padding: '10px 24px', fontSize: '0.9rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, boxShadow: '0 4px 15px rgba(99,102,241,0.2)' }}>
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
