import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Users, AlertCircle, CheckCircle } from 'lucide-react';

const ParentLink = () => {
  const [parentCode, setParentCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const { linkParent, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await linkParent(parentCode, name, email, password);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/parent-dashboard'), 2000);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--glass-border)',
    borderRadius: '8px', color: 'white',
    fontFamily: 'inherit', fontSize: '1rem',
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  };

  if (success) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)', padding: '40px' }}>
        <Card glass style={{ maxWidth: '440px', width: '100%', padding: '48px 40px', textAlign: 'center' }} className="animate-pop-in">
          <div style={{ background: 'rgba(34,197,94,0.1)', width: '72px', height: '72px', borderRadius: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(34,197,94,0.3)' }}>
            <CheckCircle color="#22c55e" size={36} />
          </div>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '12px' }}>Linked Successfully!</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Your account is now linked. Redirecting to your dashboard…</p>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-1" style={{ top: '10%', left: '10%', width: '300px', height: '300px', background: '#eab308', opacity: 0.08 }} />
      <div className="orb orb-2" style={{ bottom: '10%', right: '10%', width: '350px', height: '350px' }} />

      <Card glass style={{ width: '100%', maxWidth: '440px', padding: '48px 40px', position: 'relative', zIndex: 1 }} className="animate-pop-in">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ background: 'rgba(234, 179, 8, 0.1)', width: '64px', height: '64px', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(234,179,8,0.25)' }}>
            <Users color="#eab308" size={30} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>Parent Sign Up</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Enter the code your child shared with you</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '14px 18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', fontSize: '0.9rem' }}>
            <AlertCircle size={18} />{error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Student's Parent Code</label>
            <input id="parent-code" type="text" required maxLength={6} value={parentCode} onChange={(e) => setParentCode(e.target.value.toUpperCase())} placeholder="ABC123"
              style={{ ...inputStyle, fontSize: '1.4rem', letterSpacing: '6px', textAlign: 'center', fontWeight: 800 }}
              onFocus={(e) => e.target.style.borderColor = '#eab308'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Name</label>
            <input id="parent-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Parent Name" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#eab308'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Email</label>
            <input id="parent-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="parent@email.com" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#eab308'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
            <input id="parent-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#eab308'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <Button id="parent-submit" type="submit" variant="primary" style={{ padding: '16px', fontWeight: 700, borderRadius: '12px', marginTop: '4px', background: 'linear-gradient(135deg, #b45309, #eab308)' }} disabled={loading}>
            {loading ? 'Linking...' : 'Link & Create Parent Account'}
          </Button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Student?{' '}
          <Link to="/register" style={{ fontWeight: 700, color: 'var(--accent-color)', textDecoration: 'none' }}>Register here</Link>
        </div>
      </Card>
    </div>
  );
};

export default ParentLink;
