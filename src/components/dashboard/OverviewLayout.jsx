import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';
import { TrendingUp, BookOpen, Award, Briefcase, Brain, Zap, Target, ChevronRight, Info, MapPin, Clock, Star, BarChart2, User } from 'lucide-react';

const mockFallbackResult = {
  profile: {
    personality: 'Analytical Thinker (INTP)',
    aptitudeScore: 82,
    interests: ['Technology', 'Problem Solving', 'Data'],
    learningStyle: 'Visual Learner',
    academicStrengths: ['Mathematics', 'Computer Science'],
  },
  careerMatches: [
    { id: 'c2', title: 'Data Scientist', matchScore: 91, demand: 'Very High', salary: '₹12L – ₹35L', description: 'Extract insights from complex datasets and build predictive models.', skills: ['Python', 'Statistics', 'ML', 'SQL'], category: 'Technology', explanation: 'Your high analytical aptitude and interest in data domains make this an exceptional fit.' },
    { id: 'c1', title: 'AI Product Manager', matchScore: 86, demand: 'High', salary: '₹18L – ₹40L', description: 'Bridge engineering and user needs to build intelligent software products.', skills: ['Product Strategy', 'AI/ML', 'Agile', 'Research'], category: 'Technology', explanation: 'Your leadership tendency combined with tech interest is perfect for AI product roles.' },
    { id: 'c9', title: 'Cybersecurity Analyst', matchScore: 80, demand: 'Very High', salary: '₹10L – ₹30L', description: 'Protect digital infrastructure from threats.', skills: ['Network Security', 'Ethical Hacking', 'SIEM'], category: 'Technology', explanation: 'Your systematic thinking and aptitude for structured problem-solving aligns well with cybersecurity.' },
  ]
};

const DemandBadge = ({ demand }) => {
  const colors = { 'Very High': { bg: 'rgba(16,185,129,0.12)', text: 'var(--success-color)' }, 'High': { bg: 'rgba(99,102,241,0.12)', text: 'var(--accent-color)' }, 'Medium': { bg: 'rgba(251,191,36,0.12)', text: 'var(--warning-color)' } };
  const c = colors[demand] || colors['Medium'];
  return <span style={{ background: c.bg, color: c.text, padding: '4px 10px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600 }}>{demand} Demand</span>;
};

const SkillTag = ({ skill }) => (
  <span style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: 'var(--text-secondary)', padding: '3px 10px', borderRadius: '20px', fontSize: '0.78rem' }}>{skill}</span>
);

const OverviewLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const aiResult = location.state?.aiResult || mockFallbackResult;
  const [expandedIdx, setExpandedIdx] = useState(null);

  const profile = aiResult?.profile || mockFallbackResult.profile;
  const matches = aiResult?.careerMatches || mockFallbackResult.careerMatches;
  const topCareer = matches[0];

  const displayName = user?.name || 'Student';

  return (
    <div style={{ maxWidth: '1240px', margin: '40px auto', padding: '0 32px 60px' }}>

      {/* ─── Header ─── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ marginBottom: '6px' }}>Welcome back, <span className="text-gradient">{displayName}</span></h1>
          <p>Your AI-calibrated career profile is ready. Here's what we found.</p>
        </div>
        <Link to="/assessments" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Target size={15} /> Retake Assessment
        </Link>
      </div>

      {/* ─── Profile Summary ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(99,102,241,0.12)', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Brain color="var(--accent-color)" size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>Personality</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'white' }}>{profile.personality}</div>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(16,185,129,0.12)', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BarChart2 color="var(--success-color)" size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>Aptitude Score</div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--success-color)' }}>{profile.aptitudeScore}<span style={{ fontSize: '0.75rem', fontWeight: 400 }}> / 100</span></div>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(168,85,247,0.12)', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Zap color="var(--accent-color-alt)" size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>Learning Style</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'white' }}>{profile.learningStyle || 'Visual Learner'}</div>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(251,191,36,0.12)', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BookOpen color="var(--warning-color)" size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>Top Interest</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'white' }}>{profile.interests?.[0] || 'Technology'}</div>
          </div>
        </div>
      </div>

      {/* ─── Main Grid ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '28px', alignItems: 'start' }}>

        {/* Left: Career Matches */}
        <div>
          <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
            <Briefcase size={20} color="var(--accent-color)" /> Top Career Matches
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {matches.map((career, idx) => (
              <div key={career.id} className="glass-panel" style={{ padding: '24px', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{career.title}</h3>
                      <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', padding: '3px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={11} color="var(--success-color)" fill="var(--success-color)" />
                        <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--success-color)' }}>{career.matchScore}% Match</span>
                      </div>
                      <DemandBadge demand={career.demand} />
                    </div>

                    {/* Match Score Bar */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${career.matchScore}%`, background: 'linear-gradient(90deg, var(--accent-color), var(--accent-color-alt))', borderRadius: '2px' }} />
                      </div>
                    </div>

                    <p style={{ fontSize: '0.9rem', marginBottom: '12px', lineHeight: 1.5 }}>{career.description}</p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                      {(career.skills || []).slice(0, 4).map(s => <SkillTag key={s} skill={s} />)}
                    </div>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Award size={13} /> {career.salary}</span>
                    </div>

                    {/* Explainable AI */}
                    {expandedIdx === idx && career.explanation && (
                      <div style={{ marginTop: '16px', background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px', padding: '14px 16px' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-color)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Why this career fits you</div>
                        <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.6 }}>{career.explanation}</p>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                    <button
                      onClick={() => navigate(`/career-pathway/${career.id}`)}
                      className="btn-primary"
                      style={{ padding: '9px 16px', fontSize: '0.83rem', whiteSpace: 'nowrap' }}
                    >
                      View Roadmap
                    </button>
                    <button
                      onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                      className="btn-secondary"
                      style={{ padding: '8px 16px', fontSize: '0.8rem', gap: '4px', whiteSpace: 'nowrap' }}
                    >
                      <Info size={13} /> {expandedIdx === idx ? 'Less' : 'Why this?'}
                    </button>
                    <Link
                      to={`/courses/${career.id}`}
                      style={{ textAlign: 'center', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center', transition: 'all 0.2s' }}
                    >
                      <BookOpen size={13} /> Courses
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Profile Interests */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} color="var(--accent-color)" /> Profile Summary
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {profile.interests?.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Interest Areas</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {profile.interests.map(i => (
                      <span key={i} style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: 'var(--accent-color)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>{i}</span>
                    ))}
                  </div>
                </div>
              )}
              {profile.academicStrengths?.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Academic Strengths</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {profile.academicStrengths.map(s => (
                      <span key={s} style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--success-color)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} color="var(--accent-color-alt)" /> Quick Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Explore Course Finder', icon: <BookOpen size={15} />, to: `/courses/${topCareer?.id || 'c1'}` },
                { label: `View ${topCareer?.title || 'Top Career'} Roadmap`, icon: <TrendingUp size={15} />, to: `/career-pathway/${topCareer?.id || 'c1'}` },
                { label: 'Browse All Careers', icon: <Briefcase size={15} />, to: '/careers' },
              ].map(action => (
                <Link key={action.label} to={action.to} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white', textDecoration: 'none', fontSize: '0.88rem', transition: 'all 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'var(--glass-bg)'; }}
                >
                  <span style={{ color: 'var(--accent-color)' }}>{action.icon}</span>
                  {action.label}
                  <ChevronRight size={14} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Market Insight */}
          <div className="glass-panel" style={{ padding: '22px', background: 'rgba(99,102,241,0.06)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Platform Impact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[['80%', 'report better career clarity'], ['50%', 'reduction in wrong major picks'], ['30%', 'higher placement rates']].map(([val, label]) => (
                <div key={val} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-color)', minWidth: '42px' }}>{val}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewLayout;
