import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="glass-panel" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '16px 40px',
      margin: '16px 40px 0 40px',
      borderRadius: '24px',
      position: 'sticky',
      top: '16px',
      zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
        <Compass color="var(--accent-color)" size={28} />
        <span style={{ fontSize: '1.25rem', fontWeight: 600 }} className="text-gradient">PathFinder AI</span>
      </Link>

      <nav style={{ display: 'flex', gap: '24px' }}>
        <Link to="/" style={{ color: location.pathname === '/' ? '#fff' : 'var(--text-secondary)' }}>Home</Link>
        <Link to="/careers" style={{ color: location.pathname === '/careers' ? '#fff' : 'var(--text-secondary)' }}>Explore Careers</Link>
        {isAuthenticated && (
          <>
            <Link to="/assessments" style={{ color: location.pathname === '/assessments' ? '#fff' : 'var(--text-secondary)' }}>Assessments</Link>
            <Link to="/dashboard" style={{ color: location.pathname === '/dashboard' ? '#fff' : 'var(--text-secondary)' }}>My Dashboard</Link>
          </>
        )}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {isAuthenticated ? (
          <>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Hi, {user?.name}</span>
            <button onClick={logout} className="btn-secondary" style={{ padding: '8px 16px', borderRadius: '8px', gap: '6px' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', fontWeight: 500 }}>Log In</Link>
            <Link to="/register" className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
