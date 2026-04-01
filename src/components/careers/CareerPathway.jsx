import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, TrendingUp, Award, Briefcase, BookOpen, Building2, ChevronRight, Zap, Users, MapPin } from 'lucide-react';
import Card from '../ui/Card';
import AnimateOnScroll from '../ui/AnimateOnScroll';
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
      <div className="animate-fade-in" style={{ maxWidth: '700px', margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
        <h2 className="text-gradient" style={{ marginBottom: '16px' }}>Career not found</h2>
        <p style={{ marginBottom: '28px', color: 'var(--text-secondary)' }}>This career pathway doesn't exist in our database yet.</p>
        <Link to="/careers" className="btn-primary" style={{ textDecoration: 'none', padding: '12px 28px' }}>
          <ArrowLeft size={16} /> Browse All Careers
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 24px 60px', position: 'relative' }}>
      {/* Background decoration */}
      <div className="orb orb-1" style={{ width: '400px', height: '400px', top: '-100px', left: '-100px', opacity: 0.1 }} />

      {/* Back button */}
      <Link to="/careers" className="animate-fade-in hover-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '32px', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} /> Back to All Careers
      </Link>

      {/* Hero card */}
      <div className="glass-panel animate-fade-in" style={{ padding: '36px', marginBottom: '32px', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.06))', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <div className="animate-slide-left">
            <div className="tag-hover" style={{ display: 'inline-block', background: 'rgba(99,102,241,0.1)', color: 'var(--accent-color)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {pathway.category}
            </div>
            <h1 style={{ fontSize: '2.5rem', margin: '0 0 12px', lineHeight: 1.1, fontWeight: 800 }}>{pathway.title}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0, maxWidth: '600px' }}>{pathway.description}</p>
          </div>
          <div className="animate-slide-right" style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Average Salary</div>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--success-color)', marginBottom: '10px' }}>{pathway.salary}</div>
            <DemandBadge demand={pathway.demand} />
          </div>
        </div>

        {/* Quick info row */}
        <div className="animate-fade-in delay-200" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 700, marginBottom: '10px' }}>Core Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(pathway.skills || []).map(s => (
                <span key={s} className="tag-hover" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.8rem', color: 'white' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative shimmer */}
        <div className="shimmer" style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }} />
      </div>

      {/* Top Companies */}
      {pathway.topCompanies && (
        <AnimateOnScroll animation="animate-slide-up">
          <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: '32px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={15} color="var(--accent-color)" /> Top Hiring Companies in India
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {pathway.topCompanies.map(co => (
                <span key={co} className="tag-hover" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', color: 'white', fontWeight: 500 }}>{co}</span>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      )}

      {/* Learning Roadmap */}
      <div style={{ marginBottom: '32px' }}>
        <AnimateOnScroll animation="animate-slide-up" style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '8px', fontSize: '1.8rem', fontWeight: 800 }}>Your Learning Roadmap</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>A structured 4-stage path from beginner to job-ready — with curated Indian resources and certifications.</p>
        </AnimateOnScroll>

        <div style={{ position: 'relative' }}>
          {/* Vertical line with draw-in animation */}
          <div
            className="animate-fade-in"
            style={{
              position: 'absolute', left: '23px', top: '24px', bottom: '24px', width: '2px',
              background: 'linear-gradient(180deg, var(--accent-color), var(--accent-color-alt), #06b6d4, var(--success-color))',
              zIndex: 0, opacity: 0.4
            }}
          />

          <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {(pathway.steps || []).map((step, idx) => {
              const stageKey = step.stage;
              const sc = StageColors[stageKey] || StageColors.Foundation;
              const icons = [<Zap size={22} />, <BookOpen size={22} />, <Users size={22} />, <Award size={22} />];

              return (
                <AnimateOnScroll key={idx} animation="animate-slide-up" threshold={0.2} style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
                  {/* Stage icon */}
                  <div className="icon-bounce" style={{
                    width: '48px', height: '48px', borderRadius: '50px', background: sc.bg, border: `2px solid ${sc.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, marginTop: '4px',
                    color: sc.color, boxShadow: `0 0 20px ${sc.bg}`
                  }}>
                    {icons[idx] || <CheckCircle2 size={22} />}
                  </div>

                  <div className="glass-panel" style={{ flex: 1, padding: '28px', borderLeft: `4px solid ${sc.color}`, transition: 'transform 0.3s ease' }}>
                    {/* Stage label */}
                    <div style={{ display: 'inline-block', background: sc.bg, color: sc.color, padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                      Stage {idx + 1}: {step.stage}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: 700 }}>{step.title}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>{step.description}</p>

                    {/* Courses/Resources */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '20px', border: '1px solid var(--glass-border)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <BookOpen size={13} color={sc.color} /> Top Rated Resources
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(step.courses || []).map((course, ci) => (
                          <div key={ci} className="hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 0' }}>
                            <CheckCircle2 size={16} color="var(--success-color)" style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: '0.9rem', color: 'white' }}>{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <AnimateOnScroll animation="animate-pop-in">
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.06))', position: 'relative', overflow: 'hidden' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '1.5rem', fontWeight: 800 }}>Ready to start your journey?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 32px' }}>Find the best-rated courses for {pathway.title} — filtered by your budget and preferred mode.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/courses" className="btn-primary" style={{ padding: '14px 32px', textDecoration: 'none', fontSize: '1rem' }}>
              <BookOpen size={18} /> Find Recommended Courses
            </Link>
            <Link to="/dashboard" className="btn-secondary" style={{ padding: '14px 32px', textDecoration: 'none', fontSize: '1rem' }}>
              Return to Dashboard
            </Link>
          </div>
          <div className="shimmer" style={{ position: 'absolute', inset: 0, opacity: 0.05 }} />
        </div>
      </AnimateOnScroll>
    </div>
  );
};

export default CareerPathway;
