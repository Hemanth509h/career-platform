import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, TrendingUp, Award, Briefcase, BookOpen, Building2, ChevronRight, Zap, Users, MapPin } from 'lucide-react';
import Card from '../ui/Card';
import { mockPathways } from '../../services/mockData';

const StageColors = {
  Foundation: { color: '#6366f1', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)' },
  'Skill Building': { color: '#a855f7', bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.25)' },
  'Practical Experience': { color: '#06b6d4', bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.25)' },
  'Job Ready': { color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)' },
};

const DemandBadge = ({ demand }) => {
  const colors = { 'Very High': 'var(--success-color)', 'High': 'var(--accent-color)', 'Medium': 'var(--warning-color)', 'Stable': '#06b6d4' };
  return <span style={{ background: `${colors[demand] || 'var(--accent-color)'}20`, color: colors[demand] || 'var(--accent-color)', border: `1px solid ${colors[demand] || 'var(--accent-color)'}40`, padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>{demand} Demand</span>;
};

const CareerPathway = () => {
  const { id } = useParams();
  const pathway = mockPathways[id];

  if (!pathway) {
    return (
      <div style={{ maxWidth: '700px', margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
        <h2 className="text-gradient" style={{ marginBottom: '16px' }}>Career not found</h2>
        <p style={{ marginBottom: '28px', color: 'var(--text-secondary)' }}>This career pathway doesn't exist in our database yet.</p>
        <Link to="/careers" className="btn-primary" style={{ textDecoration: 'none', padding: '12px 28px' }}>
          <ArrowLeft size={16} /> Browse All Careers
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 24px 60px' }}>
      {/* Back button */}
      <Link to="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '32px', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} /> Back to All Careers
      </Link>

      {/* Hero card */}
      <div className="glass-panel" style={{ padding: '36px', marginBottom: '32px', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.06))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.1)', color: 'var(--accent-color)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {pathway.category}
            </div>
            <h1 style={{ fontSize: '2rem', margin: '0 0 12px', lineHeight: 1.2 }}>{pathway.title}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0, maxWidth: '600px' }}>{pathway.description}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Salary Range</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success-color)', marginBottom: '10px' }}>{pathway.salary}</div>
            <DemandBadge demand={pathway.demand} />
          </div>
        </div>

        {/* Quick info row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Key Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(pathway.skills || []).map(s => (
                <span key={s} style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', color: 'var(--accent-color)' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Companies */}
      {pathway.topCompanies && (
        <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: '32px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={14} /> Top Hiring Companies in India
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {pathway.topCompanies.map(co => (
              <span key={co} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', color: 'white' }}>{co}</span>
            ))}
          </div>
        </div>
      )}

      {/* Learning Roadmap */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '8px', fontSize: '1.5rem' }}>Your Learning Roadmap</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '0.95rem' }}>A structured path from beginner to job-ready — with real Indian resources and certifications.</p>

        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: '23px', top: '48px', bottom: '48px', width: '2px', background: 'linear-gradient(180deg, rgba(99,102,241,0.5), rgba(168,85,247,0.3), rgba(6,182,212,0.3), rgba(16,185,129,0.5))', zIndex: 0 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {(pathway.steps || []).map((step, idx) => {
              const stageKey = step.stage;
              const sc = StageColors[stageKey] || StageColors.Foundation;
              return (
                <div key={idx} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  {/* Stage icon */}
                  <div style={{ width: '48px', height: '48px', borderRadius: '24px', background: sc.bg, border: `2px solid ${sc.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                    {idx === 0 && <Zap size={20} color={sc.color} />}
                    {idx === 1 && <BookOpen size={20} color={sc.color} />}
                    {idx === 2 && <Users size={20} color={sc.color} />}
                    {idx === 3 && <Award size={20} color={sc.color} />}
                  </div>

                  <div className="glass-panel" style={{ flex: 1, padding: '24px 28px', border: `1px solid ${sc.border}` }}>
                    {/* Stage label */}
                    <div style={{ display: 'inline-block', background: sc.bg, color: sc.color, padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                      Step {idx + 1}: {step.stage}
                    </div>

                    <h3 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>{step.title}</h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>{step.description}</p>

                    {/* Courses/Resources */}
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: '10px' }}>Recommended Resources</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(step.courses || []).map((course, ci) => (
                          <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '10px 14px' }}>
                            <CheckCircle2 size={14} color={sc.color} style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.06))' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '1.3rem' }}>Ready to start your journey?</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>Find the best courses for {pathway.title} — filtered by your budget and preferred mode.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/courses" className="btn-primary" style={{ padding: '12px 28px', textDecoration: 'none', fontSize: '0.95rem' }}>
            <BookOpen size={17} /> Find Courses
          </Link>
          <Link to="/dashboard" className="btn-secondary" style={{ padding: '12px 28px', textDecoration: 'none', fontSize: '0.95rem' }}>
            View My Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CareerPathway;
