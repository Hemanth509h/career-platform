import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, LogOut, Menu, X, BookOpen, LayoutDashboard, Briefcase, ClipboardList, Users, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAgeGroup } from '../../hooks/useAgeGroup';
import { useTheme } from '../../context/ThemeContext';
import AdaptiveView from '../ui/AdaptiveView';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { group, isChild } = useAgeGroup();
  const { theme, toggleTheme } = useTheme();
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
    <header className="glass-panel" style={{
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
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white', textDecoration: 'none' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}>
          <Compass color="white" size={22} />
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }} className="text-gradient">CareerAI Mentor</span>
      </Link>

      {/* Desktop Nav */}
      <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link to="/careers" className="nav-link" style={linkStyle('/careers')}>
          <Briefcase size={isChild ? 18 : 16} /> {isChild ? 'Explore Jobs' : 'Explore Careers'}
          {isActive('/careers') && <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '2px', background: 'var(--accent-color)' }} />}
        </Link>
        {isAuthenticated && (
          <>
            {user?.role !== 'parent' && (
              <AdaptiveView showFor={['teen', 'adult']}>
                <Link to="/assessments" className="nav-link" style={linkStyle('/assessments')}>
                  <ClipboardList size={16} /> Assessment
                  {isActive('/assessments') && <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '2px', background: 'var(--accent-color)' }} />}
                </Link>
              </AdaptiveView>
            )}
            <Link to="/courses" className="nav-link" style={linkStyle('/courses')}>
              <BookOpen size={16} /> Courses
              {isActive('/courses') && <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '2px', background: 'var(--accent-color)' }} />}
            </Link>
            <Link to="/dashboard" className="nav-link" style={linkStyle('/dashboard')}>
              <LayoutDashboard size={16} /> Dashboard
              {isActive('/dashboard') && <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '2px', background: 'var(--accent-color)' }} />}
            </Link>
          </>
        )}
      </nav>

      {/* Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button onClick={toggleTheme} className="hover-lift" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-primary)' }}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {isAuthenticated ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '50px', border: '1px solid var(--glass-border)' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '14px', background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: 'white', border: '2px solid rgba(255,255,255,0.1)' }}>
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{user?.name}</span>
            </div>
            <button onClick={logout} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', gap: '6px', borderRadius: '12px' }}>
              <LogOut size={14} /> Exit
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/parent-signup" style={{ color: '#eab308', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(234,179,8,0.1)', borderRadius: '10px', border: '1px solid rgba(234,179,8,0.2)' }}>
              <Users size={14} /> Parents
            </Link>
            <div style={{ width: '1px', height: '16px', background: 'var(--glass-border)', margin: '0 4px' }} />
            <Link to="/login" className="nav-link" style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none', transition: 'color 0.2s' }}>Log In</Link>
            <Link id="nav-get-started" to="/register" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, boxShadow: '0 4px 15px rgba(99,102,241,0.2)' }}>
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
