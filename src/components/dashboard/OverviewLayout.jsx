import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Brain, Target, Lightbulb, BookOpen, TrendingUp, ChevronRight, Briefcase, Zap, LayoutDashboard, ArrowRight, Map } from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Radar, Doughnut, Bar } from 'react-chartjs-2';
import Card from '../ui/Card';
import { useAuth } from '../../context/AuthContext';
import { mockUser } from '../../services/mockData';
import { allCourses } from '../../services/courseData';
import { Star, Clock, Trophy } from 'lucide-react';

ChartJS.register(
  RadialLinearScale, PointElement, LineElement, Filler,
  Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement
);

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

const AptitudeDoughnut = ({ score }) => {
  const data = {
    datasets: [{
      data: [score, 100 - score],
      backgroundColor: ['rgba(99,102,241,0.9)', 'rgba(255,255,255,0.04)'],
      borderColor: ['rgba(99,102,241,1)', 'rgba(255,255,255,0.05)'],
      borderWidth: 1,
      hoverOffset: 4,
    }],
  };
  const options = {
    cutout: '72%',
    animation: { animateRotate: true, duration: 1400, easing: 'easeInOutQuart' },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    responsive: true,
    maintainAspectRatio: true,
  };
  return (
    <div style={{ position: 'relative', width: 90, height: 90 }}>
      <Doughnut data={data} options={options} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '1.3rem', fontWeight: 800, background: 'linear-gradient(135deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{score}</span>
        <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>/100</span>
      </div>
    </div>
  );
};

const ProfileRadar = ({ profile }) => {
  const data = {
    labels: ['Aptitude', 'Analytical', 'Creative', 'Social', 'Technical', 'Leadership'],
    datasets: [{
      label: 'Your Profile',
      data: [
        profile.aptitudeScore || 78,
        profile.analyticalScore || 82,
        profile.creativeScore || 65,
        profile.socialScore || 70,
        profile.technicalScore || 88,
        profile.leadershipScore || 72,
      ],
      fill: true,
      backgroundColor: 'rgba(99,102,241,0.15)',
      borderColor: 'rgba(99,102,241,0.8)',
      pointBackgroundColor: '#6366f1',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#6366f1',
      pointRadius: 4,
    }],
  };
  const options = {
    scales: {
      r: {
        min: 0, max: 100,
        ticks: { display: false, stepSize: 25 },
        grid: { color: 'rgba(255,255,255,0.06)' },
        angleLines: { color: 'rgba(255,255,255,0.06)' },
        pointLabels: { color: 'rgba(255,255,255,0.6)', font: { size: 11 } },
      }
    },
    animation: { duration: 1600, easing: 'easeInOutQuart' },
    plugins: { legend: { display: false } },
    responsive: true,
    maintainAspectRatio: true,
  };
  return <Radar data={data} options={options} />;
};

const MatchBarChart = ({ matches }) => {
  const top5 = (matches || []).slice(0, 5);
  const data = {
    labels: top5.map(m => m.title?.split(' ').slice(0, 2).join(' ') || ''),
    datasets: [{
      label: 'Match %',
      data: top5.map(m => m.matchScore),
      backgroundColor: [
        'rgba(99,102,241,0.75)',
        'rgba(168,85,247,0.7)',
        'rgba(6,182,212,0.65)',
        'rgba(16,185,129,0.65)',
        'rgba(251,191,36,0.65)',
      ],
      borderColor: [
        'rgba(99,102,241,1)',
        'rgba(168,85,247,1)',
        'rgba(6,182,212,1)',
        'rgba(16,185,129,1)',
        'rgba(251,191,36,1)',
      ],
      borderWidth: 1,
      borderRadius: 8,
      borderSkipped: false,
    }],
  };
  const options = {
    indexAxis: 'y',
    scales: {
      x: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } } },
      y: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.7)', font: { size: 12 } } },
    },
    animation: { duration: 1400, easing: 'easeInOutQuart' },
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.raw}% match` } } },
    responsive: true,
    maintainAspectRatio: false,
  };
  return <Bar data={data} options={options} />;
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
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 32px 60px', position: 'relative' }}>
      {/* Floating orbs */}
      <div className="orb orb-1" style={{ position: 'absolute', zIndex: 0 }} />
      <div className="orb orb-2" style={{ position: 'absolute', zIndex: 0 }} />

      {/* Welcome banner */}
      <div className="glass-panel" style={{ padding: '28px 36px', marginBottom: '32px', background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: 1 }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
        <Card glass style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
          <div style={{ marginBottom: '12px' }}>
            <AptitudeDoughnut score={profile.aptitudeScore} />
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

      {/* ── CHARTS ROW ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '20px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
        {/* Radar chart */}
        <Card glass style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Brain size={13} /> 6-Dimension Profile
          </div>
          <div style={{ maxWidth: '280px', margin: '0 auto' }}>
            <ProfileRadar profile={profile} />
          </div>
        </Card>

        {/* Horizontal bar chart */}
        <Card glass style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={13} /> Career Match Scores
          </div>
          <div style={{ height: '220px' }}>
            <MatchBarChart matches={matches} />
          </div>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 1 }}>
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
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '30px', overflow: 'hidden' }}>
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

      {/* Recommended Courses Section */}
      {topMatch && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 700 }}>Recommended for Your Path</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Top-rated courses to kickstart your journey as a {topMatch.title}</p>
            </div>
            <Link to={`/courses?careerId=${topMatch.id}`} className="btn-secondary" style={{ textDecoration: 'none', padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {allCourses
              .filter(c => c.relatedCareers.includes(topMatch.id))
              .slice(0, 3)
              .map((course, cIdx) => (
                <Card key={course.id} glass style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(99,102,241,0.1)', padding: '4px 10px', borderRadius: '20px' }}>{course.category}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--warning-color)' }}>
                      <Star size={14} fill="var(--warning-color)" /> {course.rating}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', margin: '0 0 8px 0', lineHeight: 1.3 }}>{course.title}</h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>{course.provider}</div>

                  <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <Clock size={14} /> {course.duration}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'white', fontWeight: 600 }}>
                      <Trophy size={14} color="var(--success-color)" /> {course.fee === 0 ? 'Free' : course.feeLabel}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
                    {course.skills.slice(0, 3).map(s => (
                      <span key={s} style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>{s}</span>
                    ))}
                  </div>

                  <a href={course.url || '#'} className="btn-primary" style={{ width: '100%', display: 'flex', textAlign: 'center', justifyContent: 'center', textDecoration: 'none', padding: '10px', fontSize: '0.88rem' }}>
                    Start Learning
                  </a>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Quick navigation cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', position: 'relative', zIndex: 1 }}>
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
