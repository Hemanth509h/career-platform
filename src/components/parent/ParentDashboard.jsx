import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Bookmark, Star, TrendingUp, Send, Settings, CheckCircle2 } from 'lucide-react';

const API = '/api';

const ParentDashboard = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [prefs, setPrefs] = useState({ budget: '', location: '', mode: 'online' });
  const [prefsSaved, setPrefsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    fetch(`${API}/parent/dashboard`, { headers: authHeaders })
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);




  const inputStyle = { width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontFamily: 'inherit', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' };
  const selectStyle = { ...inputStyle, cursor: 'pointer' };

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-secondary)' }}>Loading dashboard…</div>;

  const student = data?.student;
  const profile = data?.profile;
  const tabs = ['overview', 'matches', 'saved', 'selected'];

  return (
    <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '6px' }}>
          Parent Dashboard{' '}
          <span style={{ background: 'linear-gradient(90deg, #eab308, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>👨‍👩‍👧</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Monitoring {student?.name}'s career journey</p>
      </div>

      {/* Student Info Card */}
      {student && (
        <div style={{ background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: '20px', padding: '24px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(234,179,8,0.15)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User color="#eab308" size={26} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>{student.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{student.email}</p>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{profile?.savedCareers?.length || 0}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>SAVED</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{profile?.selectedCareers?.length || 0}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>SELECTED</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700, color: activeTab === tab ? '#eab308' : 'var(--text-secondary)', borderBottom: activeTab === tab ? '2px solid #eab308' : '2px solid transparent', marginBottom: '-1px', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: '#eab308', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Student Personality</p>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '12px' }}>{profile?.profile?.personality || 'Not Assessed Yet'}</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Based on the AI assessment, {student?.name} excels in {profile?.profile?.interests?.join(', ') || 'various fields'}.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {[
              { icon: <Bookmark color="#6366f1" size={20} />, label: 'Saved Careers', value: profile?.savedCareers?.length || 0, bg: '#6366f1' },
              { icon: <Star color="#22c55e" size={20} />, label: 'Selected Careers', value: `${profile?.selectedCareers?.length || 0}/3`, bg: '#22c55e' },
              { icon: <TrendingUp color="#f97316" size={20} />, label: 'Top Matches', value: profile?.lastAssessment?.matches?.length || 0, bg: '#f97316' },
            ].map(({ icon, label, value, bg }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: `${bg}18`, borderRadius: '12px', padding: '12px' }}>{icon}</div>
                <div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
                  <p style={{ fontSize: '1.8rem', fontWeight: 800 }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'matches' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!profile?.lastAssessment?.matches ? (
            <p style={{ color: 'var(--text-secondary)' }}>Student has not completed the AI assessment yet.</p>
          ) : (
            profile.lastAssessment.matches.map((m, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '18px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#eab308' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{m.title}</h4>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, background: 'rgba(234,179,8,0.1)', color: '#eab308', padding: '4px 10px', borderRadius: '8px' }}>{m.matchScore}% Match</span>
                    {m.id && (
                      <a href={`/career-pathway/${m.id}`} style={{ color: '#eab308', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(234,179,8,0.1)' }}>
                        Roadmap <ChevronRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.6 }}>{m.explanation}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {m.skills?.map(s => (
                    <span key={s} style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', color: 'var(--text-secondary)' }}>{s}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {(profile?.savedCareers || []).length === 0
            ? <p style={{ color: 'var(--text-secondary)' }}>No saved careers yet.</p>
            : profile.savedCareers.map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 700 }}>{c.title || c.careerId}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>{c.description?.slice(0, 80)}…</p>
                  </div>
                  {(c.id || c.careerId) && (
                    <a href={`/career-pathway/${c.id || c.careerId}`} style={{ color: '#eab308', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '6px', background: 'rgba(234,179,8,0.1)' }}>
                      Roadmap <ChevronRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))
          }
        </div>
      )}

      {activeTab === 'selected' && (
        <div>
          {(profile?.selectedCareers || []).length === 0
            ? <p style={{ color: 'var(--text-secondary)' }}>No selected careers yet.</p>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {profile.selectedCareers.map((c, i) => (
                <div key={i} style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                    <div>
                      <p style={{ fontWeight: 700 }}>{c.title || c.careerId}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{c.description?.slice(0, 80)}…</p>
                    </div>
                    {(c.id || c.careerId) && (
                      <a href={`/career-pathway/${c.id || c.careerId}`} style={{ color: '#22c55e', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(34,197,94,0.1)', marginLeft: 'auto', marginRight: '20px' }}>
                        View Roadmap <ChevronRight size={14} />
                      </a>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', fontSize: '0.85rem', fontWeight: 700 }}>
                    <CheckCircle2 size={18} /> Approved
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      )}



    </div>
  );
};

export default ParentDashboard;
