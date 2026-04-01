import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { UserPlus, AlertCircle, CheckCircle, Copy } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [registeredUser, setRegisteredUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password, dob);
    if (result.success) {
      if (result.requireParentLink) {
        setRegisteredUser(result.user);
      } else {
        navigate(result.user?.role === 'admin' ? '/admin-dashboard' : '/student-dashboard', { state: { isNewUser: true } });
      }
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(registeredUser.parentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  };

  // Show parent code screen for minors after registration
  if (registeredUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)', padding: '40px' }}>
        <Card glass style={{ width: '100%', maxWidth: '480px', padding: '48px 40px' }} className="animate-pop-in">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ background: 'rgba(234, 179, 8, 0.1)', width: '72px', height: '72px', borderRadius: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(234, 179, 8, 0.3)' }}>
              <CheckCircle color="#eab308" size={36} />
            </div>
            <h2 style={{ marginBottom: '8px', fontSize: '1.7rem', fontWeight: 800 }}>Account Created! 🎉</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Since you're under 18, your parent or guardian must approve your account before you can log in.
            </p>
          </div>

          <div style={{ background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.25)', borderRadius: '16px', padding: '24px', marginBottom: '28px' }}>
            <p style={{ fontSize: '0.82rem', color: '#eab308', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Your Parent Code</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '6px', color: 'white', flex: 1 }}>{registeredUser.parentCode}</span>
              <button
                onClick={copyCode}
                style={{ background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '10px 14px', color: copied ? '#22c55e' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s' }}
              >
                <Copy size={14} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
            <p style={{ fontWeight: 700, color: 'white', marginBottom: '8px' }}>Next Steps:</p>
            <ol style={{ paddingLeft: '18px', margin: 0 }}>
              <li>Share the code above with your parent or guardian</li>
              <li>Ask them to visit <strong style={{ color: 'var(--accent-color)' }}>/parent-signup</strong></li>
              <li>Once they approve, you can log in!</li>
            </ol>
          </div>

          <Link to="/login" style={{ display: 'block', textAlign: 'center', padding: '14px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: 'var(--accent-color)', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
            Go to Login
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
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

        <form onSubmit={handleRegister} className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="animate-slide-up delay-200">
            <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
            <input id="register-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Rivera" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color-alt)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <div className="animate-slide-up delay-250">
            <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date of Birth</label>
            <input id="register-dob" type="date" required value={dob} onChange={(e) => setDob(e.target.value)} style={{ ...inputStyle, colorScheme: 'dark' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color-alt)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '6px' }}>Used to determine if parental approval is required (under 18)</p>
          </div>
          <div className="animate-slide-up delay-300">
            <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
            <input id="register-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@university.edu" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color-alt)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <div className="animate-slide-up delay-400">
            <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
            <input id="register-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color-alt)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <Button id="register-submit" type="submit" variant="primary" className="btn-ripple animate-slide-up delay-500" style={{ marginTop: '6px', padding: '16px', fontSize: '1rem', fontWeight: 700, borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent-color-alt), #8b5cf6)' }} disabled={loading}>
            {loading ? 'Processing...' : 'Create My Free Account'}
          </Button>
        </form>

        <div className="animate-fade-in delay-600" style={{ textAlign: 'center', marginTop: '28px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 700, color: 'var(--accent-color)', textDecoration: 'none' }} className="hover-underline">Sign in</Link>
        </div>
        <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
            <span style={{ padding: '0 10px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Or</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
          </div>
          <Link to="/parent-signup" style={{ display: 'block', padding: '14px', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', borderRadius: '12px', color: '#eab308', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
            Register as Parent
          </Link>
          <div style={{ marginTop: '16px' }}>
            Parent already have a code? <Link to="/parent-signup" style={{ fontWeight: 700, color: '#eab308', textDecoration: 'none' }}>Link account here</Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;


