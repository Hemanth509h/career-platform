import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bookmark, Star, Briefcase, MessageSquare, TrendingUp, BookOpen, ChevronDown } from 'lucide-react';
import { useAgeGroup } from '../../hooks/useAgeGroup';
import AdaptiveView from '../ui/AdaptiveView';
import { adaptiveText } from '../../utils/textMap';

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
  const { group, isChild } = useAgeGroup();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card hover-lift" style={{ border: '1px solid var(--glass-border)', borderRadius: '16px', padding: isChild ? '24px' : '20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '16px', cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
        <h4 style={{ fontWeight: 800, marginBottom: '8px', fontSize: isChild ? '1.2rem' : '1rem' }}>{career.title || 'Career Title'} {isChild && '🌟'}</h4>
        
        <AdaptiveView showFor={['adult', 'teen']}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {expanded ? career.description : (career.description?.slice(0, 80) + '...')}
          </p>
          {!expanded && <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>Read More <ChevronDown size={12}/></div>}
        </AdaptiveView>
        <AdaptiveView showFor={['child']}>
          {expanded && <p style={{ fontSize: '0.9rem', color: 'white', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px' }}>{career.description}</p>}
        </AdaptiveView>
      </div>

      <div style={{ marginTop: 'auto' }}>
        {careerId && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <Link to={`/career-pathway/${careerId}`}
              className="btn-primary"
              style={{ width: '100%', textDecoration: 'none', padding: isChild ? '14px' : '10px' }}>
              <TrendingUp size={16} /> {adaptiveText('ViewRoadmap', group)}
            </Link>
            <AdaptiveView showFor={['adult', 'teen']}>
              <Link to={`/courses?careerId=${careerId}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '10px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '8px', color: 'var(--success-color)', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s' }}>
                <BookOpen size={14} /> Recommended Courses
              </Link>
            </AdaptiveView>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => onSave(careerId)} style={{ flex: 1, padding: isChild ? '12px' : '8px 12px', borderRadius: '8px', border: `1px solid ${saved ? '#6366f1' : 'var(--glass-border)'}`, background: saved ? 'rgba(99,102,241,0.15)' : 'transparent', color: saved ? '#6366f1' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Bookmark size={13} /> {saved ? 'Saved' : 'Save'}
          </button>
          <button onClick={() => onSelect(careerId)} style={{ flex: 1, padding: isChild ? '12px' : '8px 12px', borderRadius: '8px', border: `1px solid ${selected ? '#22c55e' : 'var(--glass-border)'}`, background: selected ? 'rgba(34,197,94,0.12)' : 'transparent', color: selected ? '#22c55e' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Star size={13} /> {selected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const { group, isChild } = useAgeGroup();
  const token = localStorage.getItem('token');
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState([]);
  const [careers, setCareers] = useState([]);
  const [activeTab, setActiveTab] = useState('recommended');

  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    fetch(`${API}/student/saved-careers`, { headers: authHeaders }).then(r => r.json()).then(d => setSaved(Array.isArray(d) ? d : [])).catch(() => { });
    fetch(`${API}/student/selected-careers`, { headers: authHeaders }).then(r => r.json()).then(d => setSelected(Array.isArray(d) ? d : [])).catch(() => { });

    // Fetch both assessment profile and global careers
    Promise.all([
      fetch(`${API}/student/profile`, { headers: authHeaders }).then(r => r.json()),
      fetch(`${API}/careers?limit=50`).then(r => r.json())
    ]).then(([profile, careersResult]) => {
      const matches = profile?.lastAssessment?.matches || [];
      // Handle paginated response: careersResult.careers is the array
      const global = Array.isArray(careersResult) ? careersResult : (careersResult?.careers || []);

      // Matches are already enriched by the backend resolver
      setCareers(matches.length > 0 ? matches : global.slice(0, 12));
    }).catch(() => { });
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

  const tabs = ['recommended', 'saved', 'selected'];

  return (
    <div className="animate-fade-in" style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div className="animate-slide-up" style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: isChild ? '2.4rem' : '2rem', fontWeight: 900, marginBottom: '6px' }}>
          Welcome back, <span style={{ background: 'linear-gradient(90deg, var(--accent-color), var(--accent-color-alt))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user?.name}</span> {isChild ? '🎈' : '👋'}
        </h1>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          <AdaptiveView showFor={['child']}>We're so happy you're here! Let's explore some fun jobs! 🚀</AdaptiveView>
          <AdaptiveView showFor={['teen']}>Your personalized career hub. Let's find your path.</AdaptiveView>
          <AdaptiveView showFor={['adult']}>Your personalized career hub and analytics dashboard</AdaptiveView>
        </div>
      </div>

      {/* Stats */}
      <div className="animate-slide-up delay-100" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <StatCard icon={<Briefcase />} label={adaptiveText('CareerRecommendations', group)} value={careers.length} color="#6366f1" />
        <StatCard icon={<Bookmark />} label={adaptiveText('SavedCareers', group)} value={saved.length} color="#8b5cf6" />
        <StatCard icon={<Star />} label="Selected" value={`${selected.length}/3`} color="#22c55e" />
      </div>

      {/* Tabs */}
      <div className="animate-slide-up delay-150" style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0' }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: isChild ? '1rem' : '0.9rem', fontWeight: 700, color: activeTab === tab ? 'var(--accent-color)' : 'var(--text-secondary)', borderBottom: activeTab === tab ? '2px solid var(--accent-color)' : '2px solid transparent', marginBottom: '-1px', textTransform: 'capitalize' }}>
            {tab === 'recommended' ? adaptiveText('BestMatches', group) : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'recommended' && (
        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {careers.map(c => (
            <div key={c._id || c.careerId} className="animate-slide-up">
              <CareerCard career={c}
                onSave={handleSave} onSelect={handleSelect}
                saved={saved.includes(c._id)} selected={selected.includes(c._id)} />
            </div>
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
