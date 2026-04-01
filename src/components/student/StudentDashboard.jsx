import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bookmark, Star, Briefcase, MessageSquare, TrendingUp, BookOpen } from 'lucide-react';

const API = '/api';

const StatCard = ({ icon, label, value, color }) => (
  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ background: `${color}18`, border: `1px solid ${color}30`, borderRadius: '12px', padding: '12px', display: 'flex' }}>
      {React.cloneElement(icon, { color, size: 22 })}
    </div>
    <div>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{label}</p>
      <p style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>{value}</p>
    </div>
  </div>
);

const CareerCard = ({ career, onSave, onSelect, saved, selected }) => {
  const careerId = career._id || career.id;
  
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '20px', transition: 'transform 0.2s, border-color 0.2s', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>{career.title || 'Career Title'}</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {career.description?.slice(0, 80)}...
        </p>
      </div>

      <div style={{ marginTop: 'auto' }}>
        {careerId && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <Link to={`/career-pathway/${careerId}`} 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '10px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px', color: 'var(--accent-color)', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s' }}>
              <TrendingUp size={14} /> View Roadmap
            </Link>
            <Link to={`/courses?careerId=${careerId}`} 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '10px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '8px', color: 'var(--success-color)', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s' }}>
              <BookOpen size={14} /> Recommended Courses
            </Link>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => onSave(careerId)} style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: `1px solid ${saved ? '#6366f1' : 'var(--glass-border)'}`, background: saved ? 'rgba(99,102,241,0.15)' : 'transparent', color: saved ? '#6366f1' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Bookmark size={13} /> {saved ? 'Saved' : 'Save'}
          </button>
          <button onClick={() => onSelect(careerId)} style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: `1px solid ${selected ? '#22c55e' : 'var(--glass-border)'}`, background: selected ? 'rgba(34,197,94,0.12)' : 'transparent', color: selected ? '#22c55e' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Star size={13} /> {selected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [careers, setCareers] = useState([]);
  const [activeTab, setActiveTab] = useState('recommended');

  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    fetch(`${API}/student/saved-careers`, { headers: authHeaders }).then(r => r.json()).then(d => setSaved(Array.isArray(d) ? d : [])).catch(() => {});
    fetch(`${API}/student/selected-careers`, { headers: authHeaders }).then(r => r.json()).then(d => setSelected(Array.isArray(d) ? d : [])).catch(() => {});
    
    // Fetch both assessment profile and global careers
    Promise.all([
      fetch(`${API}/student/profile`, { headers: authHeaders }).then(r => r.json()),
      fetch(`${API}/careers?limit=50`).then(r => r.json())
    ]).then(([profile, careersResult]) => {
      const matches = profile?.lastAssessment?.matches || [];
      // Handle paginated response: careersResult.data is the array
      const global = Array.isArray(careersResult) ? careersResult : (careersResult?.data || []);
      
      // Matches are already enriched by the backend resolver
      setCareers(matches.length > 0 ? matches : global.slice(0, 12));
    }).catch(() => {});
  }, []);

  const handleSave = async (careerId) => {
    await fetch(`${API}/student/save-career`, { method: 'POST', headers: authHeaders, body: JSON.stringify({ careerId }) });
    setSaved(prev => prev.includes(careerId) ? prev : [...prev, careerId]);
  };

  const handleSelect = async (careerId) => {
    if (selected.length >= 3 && !selected.includes(careerId)) return alert('Max 3 careers allowed');
    await fetch(`${API}/student/select-career`, { method: 'POST', headers: authHeaders, body: JSON.stringify({ careerId }) });
    setSelected(prev => prev.includes(careerId) ? prev : [...prev, careerId]);
  };

  const tabs = ['recommended', 'saved', 'selected', ...(user?.isMinor ? ['feedback'] : [])];

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '6px' }}>
          Welcome back, <span style={{ background: 'linear-gradient(90deg, var(--accent-color), var(--accent-color-alt))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user?.name}</span> 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Your personalized career hub</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <StatCard icon={<Briefcase />} label="Recommended" value={careers.length} color="#6366f1" />
        <StatCard icon={<Bookmark />} label="Saved" value={saved.length} color="#8b5cf6" />
        <StatCard icon={<Star />} label="Selected" value={`${selected.length}/3`} color="#22c55e" />
        {user?.isMinor && <StatCard icon={<MessageSquare />} label="Feedback" value={feedback.length} color="#eab308" />}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0' }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700, color: activeTab === tab ? 'var(--accent-color)' : 'var(--text-secondary)', borderBottom: activeTab === tab ? '2px solid var(--accent-color)' : '2px solid transparent', marginBottom: '-1px', textTransform: 'capitalize' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'recommended' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {careers.map(c => (
            <CareerCard key={c._id || c.careerId} career={c}
              onSave={handleSave} onSelect={handleSelect}
              saved={saved.includes(c._id)} selected={selected.includes(c._id)} />
          ))}
        </div>
      )}

      {activeTab === 'saved' && (
        saved.length === 0
          ? <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>No saved careers yet. Browse recommendations and save some!</div>
          : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {saved.map((c, i) => <CareerCard key={i} career={c} onSave={handleSave} onSelect={handleSelect} saved={true} selected={selected.includes(c._id)} />)}
            </div>
      )}

      {activeTab === 'selected' && (
        <div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.9rem' }}>You have selected {selected.length}/3 final careers</p>
          {selected.length === 0
            ? <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>No careers selected yet. Select up to 3 final careers.</div>
            : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {selected.map((c, i) => <CareerCard key={i} career={c} onSave={handleSave} onSelect={handleSelect} saved={saved.includes(c?._id)} selected={true} />)}
              </div>
          }
        </div>
      )}

      {activeTab === 'feedback' && user?.isMinor && (
        feedback.length === 0
          ? <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>No messages from your parent yet.</div>
          : <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {feedback.map((f, i) => (
                <div key={i} style={{ background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: '16px', padding: '20px' }}>
                  <p style={{ color: '#eab308', fontSize: '0.78rem', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase' }}>Parent Message</p>
                  <p style={{ color: 'white', lineHeight: 1.6 }}>{f.message}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '10px' }}>{new Date(f.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
      )}
    </div>
  );
};

export default StudentDashboard;
