import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { UserPlus, AlertCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/assessments');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--glass-border)',
    borderRadius: '8px',
    color: 'white',
    fontFamily: 'inherit',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
      {/* Background Orbs */}
      <div className="orb orb-1" style={{ top: '5%', right: '5%', width: '350px', height: '350px', background: 'var(--accent-color-alt)', opacity: 0.15 }} />
      <div className="orb orb-2" style={{ bottom: '15%', left: '10%', width: '300px', height: '300px' }} />

      <Card glass style={{ width: '100%', maxWidth: '440px', padding: '48px 40px', position: 'relative', zIndex: 1 }} className="animate-pop-in">
        <div className="stagger-children" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="icon-bounce" style={{ background: 'rgba(168, 85, 247, 0.1)', width: '64px', height: '64px', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
            <UserPlus color="var(--accent-color-alt)" size={30} />
          </div>
          <h2 className="animate-slide-up" style={{ marginBottom: '8px', fontSize: '1.8rem', fontWeight: 800 }}>Create Account</h2>
          <p className="animate-slide-up delay-100" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Start your personalized career journey today</p>
        </div>

        {error && (
          <div className="animate-shake" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '14px 18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', fontSize: '0.9rem' }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div className="animate-slide-up delay-200">
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
            <input id="register-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Rivera" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color-alt)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <div className="animate-slide-up delay-300">
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
            <input id="register-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@university.edu" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color-alt)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <div className="animate-slide-up delay-400">
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
            <input id="register-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color-alt)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <Button id="register-submit" type="submit" variant="primary" className="btn-ripple animate-slide-up delay-500" style={{ marginTop: '10px', padding: '16px', fontSize: '1rem', fontWeight: 700, borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent-color-alt), #8b5cf6)' }} disabled={loading}>
            {loading ? 'Processing...' : 'Create My Free Account'}
          </Button>
        </form>

        <div className="animate-fade-in delay-600" style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 700, color: 'var(--accent-color)', textDecoration: 'none' }} className="hover-underline">Sign in</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
