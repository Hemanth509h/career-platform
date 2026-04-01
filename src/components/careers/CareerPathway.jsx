import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockPathways } from '../../services/mockData';
import Card from '../ui/Card';
import { ArrowLeft, CheckCircle2, TrendingUp, Award, Briefcase, ChevronRight } from 'lucide-react';

const CareerPathway = () => {
  const { id } = useParams();
  const pathway = mockPathways[id];

  if (!pathway) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Pathway not found.</h2>
        <Link to="/dashboard" className="btn-primary" style={{ display: 'inline-flex', marginTop: '20px' }}>Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 40px' }}>
      <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>
      
      <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.05, transform: 'translate(20%, -20%)' }}>
          <Briefcase size={240} />
        </div>
        
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{pathway.title}</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', marginBottom: '24px' }}>{pathway.description}</p>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.1)', padding: '8px 16px', borderRadius: '12px' }}>
            <Award color="var(--accent-color)" size={18} />
            <span style={{ fontWeight: 600 }}>{pathway.salary}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', padding: '8px 16px', borderRadius: '12px' }}>
            <TrendingUp color="var(--success-color)" size={18} />
            <span style={{ fontWeight: 600, color: 'var(--success-color)' }}>{pathway.demand} Demand</span>
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: '24px' }}>Your Learning Roadmap</h2>
      
      <div style={{ position: 'relative' }}>
        {/* Timeline line */}
        <div style={{ position: 'absolute', left: '24px', top: '24px', bottom: '24px', width: '2px', background: 'var(--glass-border)' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {pathway.steps.map((step, index) => (
            <div key={index} style={{ display: 'flex', gap: '24px', position: 'relative' }}>
              
              {/* Timeline dot */}
              <div style={{ width: '48px', flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '16px', 
                  background: 'var(--bg-color)', border: '2px solid var(--accent-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 2, marginTop: '12px'
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-color)' }}>{index + 1}</span>
                </div>
              </div>

              <Card glass style={{ flex: 1 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  Stage: {step.stage}
                </div>
                <h3 style={{ marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ marginBottom: '20px' }}>{step.description}</p>
                
                <div style={{ background: 'var(--glass-bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>Recommended Courses</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {step.courses.map((course, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <CheckCircle2 size={16} color="var(--success-color)" />
                        <span style={{ fontSize: '0.95rem' }}>{course}</span>
                        <ChevronRight size={14} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerPathway;
