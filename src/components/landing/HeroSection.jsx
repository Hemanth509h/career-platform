import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BrainCircuit, Target, Lightbulb } from 'lucide-react';
import Card from '../ui/Card';

const HeroSection = () => {
  return (
    <div style={{ marginTop: '60px', padding: '0 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      
      <div className="glass-panel animate-fade-in" style={{ padding: '8px 16px', borderRadius: '50px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={16} color="var(--accent-color)" />
        <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Welcome to the Future of Career Guidance</span>
      </div>

      <h1 className="animate-fade-in delay-100" style={{ fontSize: '4rem', maxWidth: '800px', marginBottom: '24px', lineHeight: 1.1 }}>
        Discover Your Path with <span className="text-gradient">AI-Powered Precision</span>.
      </h1>

      <p className="animate-fade-in delay-200" style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '40px' }}>
        Stop guessing with your future. PathFinder AI uses deep personality analysis to match you with emerging careers and personalized learning paths.
      </p>

      <div className="animate-fade-in delay-300" style={{ display: 'flex', gap: '16px', marginBottom: '80px' }}>
        <Link to="/assessments" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', textDecoration: 'none' }}>
          Start Free Assessment <ArrowRight />
        </Link>
        <Link to="/careers" className="btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem', textDecoration: 'none' }}>
          Explore Careers
        </Link>
      </div>

      <div className="glass-panel animate-fade-in delay-300" style={{ maxWidth: '900px', padding: '24px 32px', marginBottom: '60px', borderLeft: '4px solid var(--accent-color)', textAlign: 'left', background: 'rgba(99, 102, 241, 0.05)' }}>
        <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--accent-color-alt)', fontSize: '1.1rem' }}>The Challenge:</strong> As of 2026, there are more than <strong>250 well-defined career options</strong> in India and over <strong>8,000 job roles</strong> across diverse industries. However, most students only know about 8–10 mainstream careers. We bridge this gap.
        </p>
      </div>

      <div className="grid-3 animate-fade-in delay-300" style={{ width: '100%', maxWidth: '1000px', textAlign: 'left' }}>
        <Card glass style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BrainCircuit color="var(--accent-color)" size={24} />
          </div>
          <h3>Intelligent Profiling</h3>
          <p>We analyze your Big Five personality traits, spatial reasoning, and deep interests to build a comprehensive profile.</p>
        </Card>

        <Card glass style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'rgba(168, 85, 247, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target color="var(--accent-color-alt)" size={24} />
          </div>
          <h3>Career Matching</h3>
          <p>Our algorithms match you against 500+ emerging careers considering market demand and earning prospects.</p>
        </Card>

        <Card glass style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lightbulb color="var(--success-color)" size={24} />
          </div>
          <h3>Course Roadmaps</h3>
          <p>Get personalized step-by-step pathways to your dream job, bridging the gap between education and industry.</p>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;
