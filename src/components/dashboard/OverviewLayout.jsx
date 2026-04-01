import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockUser } from '../../services/mockData';
import Card from '../ui/Card';
import { TrendingUp, BookOpen, Clock, Award, Briefcase } from 'lucide-react';

const OverviewLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const aiResult = location.state?.aiResult;

  const displayUser = mockUser;
  const currentProfile = aiResult?.profile || displayUser.profile;
  const currentMatches = aiResult?.careerMatches || displayUser.careerMatches;

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 40px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ marginBottom: '8px' }}>Welcome back, <span className="text-gradient">{displayUser.name}</span></h1>
          <p>Your AI-calibrated career profile is ready for review.</p>
        </div>
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Personality Match</div>
            <div style={{ fontWeight: 600, color: 'var(--accent-color)' }}>{currentProfile.personality}</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--glass-border)', paddingLeft: '24px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Aptitude Score</div>
            <div style={{ fontWeight: 600, color: 'var(--success-color)' }}>{currentProfile.aptitudeScore}%</div>
          </div>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: '40px' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase color="var(--accent-color)" /> Top Career Matches
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentMatches.map((career) => (
              <Card key={career.id} glass style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0 }}>{career.title}</h3>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '4px 8px', borderRadius: '100px' }}>
                      {career.matchScore}% Match
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>{career.description}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={14} /> {career.demand} Demand</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Award size={14} /> Expected: {career.salary}</span>
                  </div>
                </div>
                <button className="btn-secondary" style={{ marginLeft: '24px' }} onClick={() => navigate(`/career-pathway/${career.id}`)}>View Pathway</button>
              </Card>
            ))}
          </div>
        </div>

        <div>
           <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen color="var(--accent-color-alt)" /> Learning Roadmap
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mockUser.recommendedCourses.map(course => (
              <Card key={course.id} style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-color-alt)', fontWeight: 600, marginBottom: '8px' }}>{course.type}</div>
                <h4 style={{ marginBottom: '4px', fontSize: '1.1rem' }}>{course.title}</h4>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>{course.provider}</div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'var(--glass-bg)', padding: '8px', borderRadius: '8px' }}>
                  <Clock size={14} /> {course.duration}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default OverviewLayout;
