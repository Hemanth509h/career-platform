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
    fontWeight: isActive(path) ? 600 : 400,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.92rem',
    transition: 'color 0.2s',
    textDecoration: 'none',
    padding: '6px 0',
  });

  return (
    <header className="glass-panel" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 32px',
      margin: '16px 24px 0 24px',
      borderRadius: '20px',
      position: 'sticky',
      top: '16px',
      zIndex: 100,
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', textDecoration: 'none' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Compass color="white" size={20} />
        </div>
        <span style={{ fontSize: '1.15rem', fontWeight: 700 }} className="text-gradient">CareerAI Mentor</span>
      </Link>

      {/* Desktop Nav */}
      <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        <Link to="/careers" style={linkStyle('/careers')}>
          <Briefcase size={15} /> Explore Careers
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/assessments" style={linkStyle('/assessments')}>
              <ClipboardList size={15} /> Assessment
            </Link>
            <Link to="/courses" style={linkStyle('/courses')}>
              <BookOpen size={15} /> Courses
            </Link>
            <Link to="/dashboard" style={linkStyle('/dashboard')}>
              <LayoutDashboard size={15} /> Dashboard
            </Link>
          </>
        )}
      </nav>

      {/* Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isAuthenticated ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{user?.name}</span>
            </div>
            <button onClick={logout} className="btn-secondary" style={{ padding: '7px 14px', fontSize: '0.85rem', gap: '5px', borderRadius: '8px' }}>
              <LogOut size={14} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.92rem', textDecoration: 'none' }}>Log In</Link>
            <Link to="/register" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.88rem', borderRadius: '10px', textDecoration: 'none' }}>
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
