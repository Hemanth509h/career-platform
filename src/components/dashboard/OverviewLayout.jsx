import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Brain, Target, Lightbulb, BookOpen, TrendingUp, ChevronRight, Briefcase, Zap, LayoutDashboard, ArrowRight, Map } from 'lucide-react';
import Card from '../ui/Card';
import { useAuth } from '../../context/AuthContext';
import { mockUser } from '../../services/mockData';

const ScoreRing = ({ score, size = 80 }) => {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={7} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#scoreGrad)" strokeWidth={7} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      <defs><linearGradient id="scoreGrad" x1="0%" y1="0%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
    </svg>
  );
};

const DemandBadge = ({ demand }) => {
  const colors = {
    'Very High': { bg: 'rgba(16,185,129,0.15)', text: 'var(--success-color)', border: 'rgba(16,185,129,0.3)' },
    'High': { bg: 'rgba(99,102,241,0.12)', text: 'var(--accent-color)', border: 'rgba(99,102,241,0.25)' },
    'Medium': { bg: 'rgba(251,191,36,0.1)', text: 'var(--warning-color)', border: 'rgba(251,191,36,0.25)' },
    'Stable': { bg: 'rgba(6,182,212,0.1)', text: '#06b6d4', border: 'rgba(6,182,212,0.25)' },
  };
  const c = colors[demand] || colors['Medium'];
  return <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600 }}>{demand} Demand</span>;
};

const OverviewLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [aiResult, setAiResult] = useState(null);
  const [expandedCareer, setExpandedCareer] = useState(null);

  useEffect(() => {
    if (location.state?.aiResult) {
      setAiResult(location.state.aiResult);
      localStorage.setItem('aiResult', JSON.stringify(location.state.aiResult));
    } else {
      const saved = localStorage.getItem('aiResult');
      if (saved) setAiResult(JSON.parse(saved));
      else setAiResult({ profile: mockUser.profile, careerMatches: mockUser.careerMatches });
    }
  }, [location.state]);

  const profile = aiResult?.profile || mockUser.profile;
  const matches = aiResult?.careerMatches || mockUser.careerMatches;
  const topMatch = matches?.[0];

  if (!aiResult) {
    return (
      <div style={{ maxWidth: '700px', margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', margin: '0 auto 24px', borderRadius: '32px', background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LayoutDashboard size={30} color="white" />
        </div>
        <h1 className="text-gradient" style={{ marginBottom: '16px' }}>Your Dashboard</h1>
        <p style={{ lineHeight: 1.7, marginBottom: '28px' }}>Take the assessment to see your personalised career matches, roadmaps, and course recommendations.</p>
        <Link to="/assessments" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', textDecoration: 'none' }}>
          Take Assessment <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 32px 60px' }}>
      {/* Welcome banner */}
      <div className="glass-panel" style={{ padding: '28px 36px', marginBottom: '32px', background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div style={{ fontSize: '0.82rem', color: 'var(--accent-color)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Welcome back</div>
          <h1 style={{ margin: '0 0 6px', fontSize: '1.8rem' }}>Hey, {user?.name?.split(' ')[0] || 'there'} 👋</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Your 6-dimension career profile is ready. Here are your personalised Indian career matches.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/assessments" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem', textDecoration: 'none' }}>Retake Assessment</Link>
          <Link to="/courses" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem', textDecoration: 'none' }}>Find Courses <ArrowRight size={15} /></Link>
        </div>
      </div>

      {/* Profile cards row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <Card glass style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <ScoreRing score={profile.aptitudeScore} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800 }}>{profile.aptitudeScore}</div>
          </div>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Aptitude Score</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>out of 100</div>
        </Card>

        <Card glass style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(99,102,241,0.12)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Brain size={22} color="var(--accent-color)" />
          </div>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Personality Type</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{profile.personality}</div>
        </Card>

        <Card glass style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(16,185,129,0.12)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Zap size={22} color="var(--success-color)" />
          </div>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Learning Style</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{profile.learningStyle}</div>
        </Card>

        <Card glass style={{ padding: '24px' }}>
          <div style={{ background: 'rgba(251,191,36,0.12)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <Lightbulb size={22} color="var(--warning-color)" />
          </div>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Top Interests</div>
          {(profile.interests || []).slice(0, 3).map((i, idx) => (
            <div key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: ['var(--accent-color)', 'var(--accent-color-alt)', 'var(--success-color)'][idx], flexShrink: 0 }} />
              {i}
            </div>
          ))}
        </Card>

        <Card glass style={{ padding: '24px' }}>
          <div style={{ background: 'rgba(168,85,247,0.12)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <BookOpen size={22} color="var(--accent-color-alt)" />
          </div>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Academic Strengths</div>
          {(profile.academicStrengths || []).slice(0, 2).map((s, idx) => (
            <div key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-color-alt)', flexShrink: 0 }} />
              {s}
            </div>
          ))}
        </Card>
      </div>

      {/* Career Matches */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Your Indian Career Matches</h2>
          <Link to="/careers" style={{ fontSize: '0.88rem', color: 'var(--accent-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Browse all careers <ChevronRight size={15} />
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {(matches || []).slice(0, 5).map((career, idx) => (
            <div
              key={career.id}
              className="glass-panel"
              style={{ padding: '22px 28px', cursor: 'pointer', border: expandedCareer === idx ? '1px solid rgba(99,102,241,0.4)' : '1px solid var(--glass-border)', transition: 'border-color 0.2s' }}
              onClick={() => setExpandedCareer(expandedCareer === idx ? null : idx)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                {/* Rank badge */}
                <div style={{
                  width: '34px', height: '34px', borderRadius: '17px', flexShrink: 0,
                  background: idx === 0 ? 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))' : 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem'
                }}>{idx + 1}</div>

                {/* Career info */}
                <div style={{ flex: 1, minWidth: '160px' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '5px' }}>{career.title}</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <DemandBadge demand={career.demand} />
                    <span style={{ fontSize: '0.78rem', color: 'var(--success-color)', fontWeight: 600 }}>{career.salary}</span>
                  </div>
                </div>

                {/* Match % */}
                <div style={{ textAlign: 'center', minWidth: '70px' }}>
                  <div style={{ fontSize: '1.7rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{career.matchScore}%</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Match</div>
                </div>

                {/* Progress bar */}
                <div style={{ minWidth: '100px', flex: 0.4 }}>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${career.matchScore}%`, background: 'linear-gradient(90deg, var(--accent-color), var(--accent-color-alt))', borderRadius: '3px' }} />
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <Link to={`/career-pathway/${career.id}`} className="btn-secondary" style={{ padding: '7px 14px', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={e => e.stopPropagation()}>
                    <Map size={13} /> Roadmap
                  </Link>
                  <Link to="/courses" className="btn-primary" style={{ padding: '7px 14px', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={e => e.stopPropagation()}>
                    <BookOpen size={13} /> Courses
                  </Link>
                </div>
              </div>

              {/* Expandable: Explainable AI + Skills */}
              {expandedCareer === idx && (
                <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: '1px solid var(--glass-border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Brain size={12} /> Why This Matches You
                    </div>
                    <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{career.explanation || career.description}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Key Skills to Build</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {(career.skills || []).map(s => (
                        <span key={s} style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick navigation cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {[
          { to: '/careers', icon: <Briefcase size={20} color="var(--accent-color)" />, bg: 'rgba(99,102,241,0.12)', title: 'Explore Careers', sub: '25 real Indian careers' },
          { to: '/courses', icon: <BookOpen size={20} color="var(--success-color)" />, bg: 'rgba(16,185,129,0.12)', title: 'Find Courses', sub: 'IIT, Google, Coursera & more' },
          { to: topMatch ? `/career-pathway/${topMatch.id}` : '/careers', icon: <TrendingUp size={20} color="var(--accent-color-alt)" />, bg: 'rgba(168,85,247,0.12)', title: 'View Roadmap', sub: 'Skills → Certs → Jobs' },
          { to: '/assessments', icon: <Target size={20} color="var(--warning-color)" />, bg: 'rgba(251,191,36,0.1)', title: 'Retake Assessment', sub: 'Update your profile' },
        ].map(item => (
          <Link key={item.to} to={item.to} style={{ textDecoration: 'none' }}>
            <Card glass style={{ padding: '22px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', height: '100%', boxSizing: 'border-box' }}>
              <div style={{ background: item.bg, width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: '3px', fontSize: '0.92rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.sub}</div>
              </div>
              <ChevronRight size={15} color="var(--text-secondary)" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OverviewLayout;
