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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)', padding: '40px' }}>
      <Card glass style={{ width: '100%', maxWidth: '420px', padding: '48px 40px' }} className="animate-fade-in">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ background: 'rgba(168, 85, 247, 0.1)', width: '60px', height: '60px', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <UserPlus color="var(--accent-color-alt)" size={28} />
          </div>
          <h2 style={{ marginBottom: '8px' }}>Create Account</h2>
          <p style={{ fontSize: '0.95rem' }}>Start your personalized career journey today</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.9rem' }}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Full Name</label>
            <input id="register-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Rivera" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color-alt)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Email Address</label>
            <input id="register-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@university.edu" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color-alt)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Password</label>
            <input id="register-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color-alt)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <Button id="register-submit" type="submit" variant="primary" style={{ marginTop: '8px', padding: '14px', opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up Free'}
          </Button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '28px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 600, color: 'var(--accent-color)' }}>Log in</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
