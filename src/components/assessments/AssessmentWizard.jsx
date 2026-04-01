import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Brain, Target, Lightbulb, BookOpen, Zap, MapPin, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';

// Phase 1: Personality
const PERSONALITY_Qs = [
  { id: 'p1', text: 'I enjoy planning and organizing projects from start to finish.' },
  { id: 'p2', text: 'Helping others and working in teams gives me energy.' },
  { id: 'p3', text: 'I am comfortable taking the lead and making group decisions.' },
  { id: 'p4', text: 'I remain calm and perform well under pressure or tight deadlines.' },
  { id: 'p5', text: 'I prefer having variety in my tasks rather than focusing on one thing.' },
  { id: 'p6', text: 'I am highly detail-oriented and notice small errors easily.' },
  { id: 'p7', text: 'I enjoy thinking about future possibilities and long-term vision.' },
  { id: 'p8', text: 'I value stability and security in a career more than high risk.' },
  { id: 'p9', text: 'I am curious about how things work and enjoy solving puzzles.' },
  { id: 'p10', text: 'I find it easy to adapt to new environments and changing situations.' },
];

const APTITUDE_Qs = [
  { id: 'a1', text: 'I can quickly identify logical patterns in numbers or shapes.' },
  { id: 'a2', text: 'I find it easy to communicate complex ideas in simple terms.' },
  { id: 'a3', text: 'I am quick to learn and master new software or technology tools.' },
  { id: 'a4', text: 'I have a strong sense of spatial relationships and 3D visualization.' },
  { id: 'a5', text: 'I excel at budget planning and managing financial assets.' },
  { id: 'a6', text: 'I can synthesize large amounts of information from multiple sources.' },
  { id: 'a7', text: 'I have strong verbal reasoning and vocabulary skills.' },
  { id: 'a8', text: 'I am good at fixing physical objects or troubleshooting mechanical issues.' },
  { id: 'a9', text: 'I can detect nuances in tone and emotion during social interactions.' },
  { id: 'a10', text: 'I am skilled at calculating probabilities and weighing risks.' },
];

// Phase 3: Interest Domains (rated 1–5)
const INTEREST_DOMAINS = [
  { id: 'i1', label: 'Technology & Software', icon: '💻' },
  { id: 'i2', label: 'Data & Analytics', icon: '📊' },
  { id: 'i3', label: 'Design & Creativity', icon: '🎨' },
  { id: 'i4', label: 'Healthcare & Medicine', icon: '🏥' },
  { id: 'i5', label: 'Business & Finance', icon: '💼' },
  { id: 'i6', label: 'Science & Engineering', icon: '🔬' },
  { id: 'i7', label: 'Education & Teaching', icon: '📚' },
  { id: 'i8', label: 'Social Impact & NGO', icon: '🌍' },
];

// Phase 4: Academic Strengths
const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Psychology', 'History & Arts', 'English & Communication', 'Statistics'];

// Phase 5: Learning Style Qs
const LEARNING_Qs = [
  { id: 'l1', text: 'I learn best by watching videos or visual diagrams.', styles: ['Visual', 'Reading'] },
  { id: 'l2', text: 'I prefer hands-on practice over reading theory.', styles: ['Kinesthetic', 'Auditory'] },
  { id: 'l3', text: 'I retain information better in structured instructor-led sessions.', styles: ['Auditory', 'Reading'] },
  { id: 'l4', text: 'I prefer self-paced learning I can control.', styles: ['Visual', 'Kinesthetic'] },
];

const PHASES = [
  { id: 1, title: 'Personality & Mindset', icon: <Brain size={20} />, color: '99,102,241', desc: 'Understand how you think and work' },
  { id: 2, title: 'Aptitude & Skills', icon: <Target size={20} />, color: '168,85,247', desc: 'Gauge your natural abilities' },
  { id: 3, title: 'Interests & Passions', icon: <Lightbulb size={20} />, color: '251,191,36', desc: 'What excites and motivates you' },
  { id: 4, title: 'Academic Strengths', icon: <BookOpen size={20} />, color: '16,185,129', desc: 'Subjects you excel in' },
  { id: 5, title: 'Learning Style', icon: <Zap size={20} />, color: '6,182,212', desc: 'How you absorb knowledge best' },
  { id: 6, title: 'Your Context', icon: <MapPin size={20} />, color: '244,63,94', desc: 'Practical constraints and goals' },
];

const ScaleSelector = ({ value, onChange, question }) => (
  <div>
    <p style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '28px', lineHeight: 1.5, color: 'white' }}>{question}</p>
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {[
        { val: 1, label: 'Strongly Disagree' },
        { val: 2, label: 'Disagree' },
        { val: 3, label: 'Neutral' },
        { val: 4, label: 'Agree' },
        { val: 5, label: 'Strongly Agree' },
      ].map(opt => (
        <button
          key={opt.val}
          onClick={() => onChange(opt.val)}
          style={{
            flex: 1,
            minWidth: '100px',
            padding: '14px 8px',
            borderRadius: '12px',
            border: `2px solid ${value === opt.val ? 'var(--accent-color)' : 'var(--glass-border)'}`,
            background: value === opt.val ? 'rgba(99,102,241,0.15)' : 'var(--glass-bg)',
            color: value === opt.val ? 'white' : 'var(--text-secondary)',
            fontWeight: value === opt.val ? 600 : 400,
            fontSize: '0.88rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
        >
          {opt.val}<br /><span style={{ fontSize: '0.75rem' }}>{opt.label}</span>
        </button>
      ))}
    </div>
  </div>
);

const AssessmentWizard = () => {
  const [phase, setPhase] = useState(1);
  const [pIdx, setPIdx] = useState(0); // question index within phases
  const [answers, setAnswers] = useState({});
  const [interests, setInterests] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [learningAnswers, setLearningAnswers] = useState({});
  const [context, setContext] = useState({ budget: '', location: '', studyMode: 'Online', educationLevel: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  // Granular progress calculation
  const getQuestionProgress = () => {
    const questionsPerPhase = [
      PERSONALITY_Qs.length, 
      APTITUDE_Qs.length, 
      INTEREST_DOMAINS.length, 
      1, // Subject selection
      LEARNING_Qs.length, 
      4 // Context fields
    ];
    
    let completed = 0;
    for (let i = 0; i < phase - 1; i++) completed += questionsPerPhase[i];
    
    if (phase === 1 || phase === 2 || phase === 5) completed += pIdx;
    else if (phase === 3) completed += Object.keys(interests).length;
    else if (phase === 4) completed += selectedSubjects.length > 0 ? 1 : 0;
    
    const total = questionsPerPhase.reduce((a, b) => a + b, 0);
    return Math.min((completed / total) * 100, 100);
  };

  const handlePrev = () => {
    if (pIdx > 0) {
      setPIdx(pIdx - 1);
    } else if (phase > 1) {
      const prevPhase = phase - 1;
      setPhase(prevPhase);
      // Set pIdx to the last question of the previous phase if applicable
      if (prevPhase === 1) setPIdx(PERSONALITY_Qs.length - 1);
      else if (prevPhase === 2) setPIdx(APTITUDE_Qs.length - 1);
      else if (prevPhase === 5) setPIdx(LEARNING_Qs.length - 1);
      else setPIdx(0);
    }
  };

  const handlePersonalityAnswer = (val) => {
    const q = PERSONALITY_Qs[pIdx];
    setAnswers(prev => ({ ...prev, [q.id]: val }));
    if (pIdx < PERSONALITY_Qs.length - 1) setPIdx(pIdx + 1);
    else { setPhase(2); setPIdx(0); }
  };

  const handleAptitudeAnswer = (val) => {
    const q = APTITUDE_Qs[pIdx];
    setAnswers(prev => ({ ...prev, [q.id]: val }));
    if (pIdx < APTITUDE_Qs.length - 1) setPIdx(pIdx + 1);
    else { setPhase(3); setPIdx(0); }
  };

  const handleLearningAnswer = (val) => {
    const q = LEARNING_Qs[pIdx];
    setLearningAnswers(prev => ({ ...prev, [q.id]: val }));
    if (pIdx < LEARNING_Qs.length - 1) setPIdx(pIdx + 1);
    else { setPhase(6); setPIdx(0); }
  };

  const toggleSubject = (subject) => {
    setSelectedSubjects(prev =>
      prev.includes(subject) ? prev.filter(s => s !== subject) : prev.length < 4 ? [...prev, subject] : prev
    );
  };

  const deriveInterestLabels = () => {
    return Object.entries(interests)
      .filter(([, v]) => v >= 4)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([id]) => INTEREST_DOMAINS.find(d => d.id === id)?.label)
      .filter(Boolean);
  };

  const deriveLearningStyle = () => {
    const counts = { Visual: 0, Auditory: 0, Kinesthetic: 0, Reading: 0 };
    LEARNING_Qs.forEach(q => {
      if ((learningAnswers[q.id] || 3) >= 4) q.styles.forEach(s => counts[s]++);
    });
    return Object.entries(counts).sort(([, a], [, b]) => b - a)[0]?.[0] || 'Visual';
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    const profileContext = {
      interests: deriveInterestLabels(),
      academicStrengths: selectedSubjects,
      learningStyle: deriveLearningStyle() + ' Learner',
      budget: context.budget,
      location: context.location,
      studyMode: context.studyMode,
      educationLevel: context.educationLevel,
    };
    localStorage.setItem('profileContext', JSON.stringify(profileContext));

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ answers: { ...answers, ...learningAnswers }, profileContext }),
      });
      const aiResult = await res.json();
      navigate('/dashboard', { state: { aiResult } });
    } catch (err) {
      console.error(err);
      navigate('/dashboard');
    }
  };

  if (isAnalyzing) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', margin: '0 auto 24px', borderRadius: '32px', background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Brain size={32} color="white" />
        </div>
        <h1 className="text-gradient" style={{ marginBottom: '16px' }}>Analysing Your Profile</h1>
        <div style={{ margin: '20px auto', width: '48px', height: '48px', border: '4px solid rgba(99, 102, 241, 0.2)', borderTopColor: 'var(--accent-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>Our AI is processing your 6-dimension profile against 500+ career pathways to find your best matches...</p>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '860px', margin: '40px auto', padding: '0 20px 60px' }}>
      {/* Sticky Progress Bar */}
      <div style={{ position: 'sticky', top: '20px', zIndex: 100, marginBottom: '32px' }}>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${getQuestionProgress()}%`, 
              background: 'linear-gradient(90deg, var(--accent-color), var(--accent-color-alt))', 
              transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)'
            }} 
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          <span>Overall Progress</span>
          <span style={{ color: 'white' }}>{Math.round(getQuestionProgress())}%</span>
        </div>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Career Discovery Assessment</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Discover your perfect path through 6 deep-dive dimensions</p>
      </div>

      {/* Phase indicator */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {PHASES.map(p => {
          const isActive = phase === p.id;
          const isCompleted = phase > p.id;
          return (
            <div key={p.id} style={{ 
              flex: 1, 
              minWidth: '80px', 
              background: isActive ? `rgba(${p.color},0.12)` : isCompleted ? 'rgba(16,185,129,0.08)' : 'var(--glass-bg)', 
              border: `1px solid ${isActive ? `rgba(${p.color},0.4)` : isCompleted ? 'rgba(16,185,129,0.3)' : 'var(--glass-border)'}`, 
              borderRadius: '12px', 
              padding: '12px 8px', 
              textAlign: 'center', 
              transition: 'all 0.3s' 
            }}>
              <div style={{ 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                color: isActive ? `rgb(${p.color})` : isCompleted ? 'var(--success-color)' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}>
                {isCompleted ? <CheckCircle2 size={14} /> : p.id}
                <span className="hide-mobile" style={{ fontSize: '0.65rem' }}>{p.title.split(' ')[0]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Phase title area */}
      <div className="glass-panel" style={{ padding: '24px 32px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '18px', background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))' }}>
        <div style={{ 
          background: `rgba(${PHASES[phase - 1].color},0.15)`, 
          width: '52px', height: '52px', borderRadius: '14px', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          color: `rgb(${PHASES[phase - 1].color})`, flexShrink: 0,
          boxShadow: `0 8px 16px rgba(${PHASES[phase - 1].color}, 0.1)`
        }}>
          {PHASES[phase - 1].icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.2px', color: `rgb(${PHASES[phase - 1].color})`, marginBottom: '4px' }}>Phase {phase} of {PHASES.length}</div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>{PHASES[phase - 1].title}</h2>
        </div>
        <div className="hide-mobile" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '200px', textAlign: 'right', fontStyle: 'italic' }}>{PHASES[phase - 1].desc}</div>
      </div>

      {/* ─── PHASE 1: Personality ─── */}
      {phase === 1 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Question {pIdx + 1} of {PERSONALITY_Qs.length}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {PERSONALITY_Qs.map((_, i) => (
                <div key={i} style={{ width: '20px', height: '4px', borderRadius: '2px', background: i === pIdx ? 'var(--accent-color)' : i < pIdx ? 'rgba(99,102,241,0.3)' : 'var(--glass-border)' }} />
              ))}
            </div>
          </div>
          <ScaleSelector
            question={PERSONALITY_Qs[pIdx].text}
            value={answers[PERSONALITY_Qs[pIdx].id]}
            onChange={handlePersonalityAnswer}
          />
          {pIdx > 0 && (
            <button 
              onClick={handlePrev}
              style={{ marginTop: '24px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
              className="hover-lift"
            >
              <ChevronLeft size={16} /> Previous Question
            </button>
          )}
        </div>
      )}

      {/* ─── PHASE 2: Aptitude ─── */}
      {phase === 2 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Question {pIdx + 1} of {APTITUDE_Qs.length}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {APTITUDE_Qs.map((_, i) => (
                <div key={i} style={{ width: '20px', height: '4px', borderRadius: '2px', background: i === pIdx ? 'var(--primary-color, rgb(168,85,247))' : i < pIdx ? 'rgba(168,85,247,0.3)' : 'var(--glass-border)' }} />
              ))}
            </div>
          </div>
          <ScaleSelector
            question={APTITUDE_Qs[pIdx].text}
            value={answers[APTITUDE_Qs[pIdx].id]}
            onChange={handleAptitudeAnswer}
          />
          <button 
            onClick={handlePrev}
            style={{ marginTop: '24px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
            className="hover-lift"
          >
            <ChevronLeft size={16} /> Previous
          </button>
        </div>
      )}

      {/* ─── PHASE 3: Interests ─── */}
      {phase === 3 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '40px' }}>
          <p style={{ marginBottom: '28px', color: 'white', fontSize: '1.2rem', fontWeight: 600 }}>What fields excite you most?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {INTEREST_DOMAINS.map(domain => (
              <div key={domain.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '12px 20px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '1.6rem', width: '32px', flexShrink: 0 }}>{domain.icon}</span>
                <span style={{ flex: 1, fontSize: '1rem', color: 'white', fontWeight: 500 }}>{domain.label}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      onClick={() => setInterests(prev => ({ ...prev, [domain.id]: val }))}
                      style={{
                        width: '38px', height: '38px', borderRadius: '10px',
                        border: `2px solid ${interests[domain.id] >= val ? 'var(--accent-color)' : 'var(--glass-border)'}`,
                        background: interests[domain.id] >= val ? 'rgba(99,102,241,0.2)' : 'transparent',
                        color: interests[domain.id] >= val ? 'white' : 'var(--text-secondary)',
                        fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s'
                      }}
                    >{val}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn-secondary" style={{ padding: '12px 28px' }} onClick={handlePrev}>
              <ChevronLeft size={18} /> Back
            </button>
            <button 
              className="btn-primary" 
              style={{ padding: '12px 32px' }} 
              onClick={() => setPhase(4)}
              disabled={Object.keys(interests).length < 3}
            >
              Next Phase <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ─── PHASE 4: Academic Strengths ─── */}
      {phase === 4 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '40px' }}>
          <p style={{ marginBottom: '8px', color: 'white', fontSize: '1.2rem', fontWeight: 600 }}>Select your favorite subjects</p>
          <p style={{ marginBottom: '28px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Choose up to 4 subjects where you naturally excel. (Selected: {selectedSubjects.length}/4)</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', marginBottom: '36px' }}>
            {SUBJECTS.map(s => {
              const active = selectedSubjects.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleSubject(s)}
                  style={{
                    padding: '14px 18px', borderRadius: '16px', textAlign: 'left',
                    border: `2px solid ${active ? 'var(--accent-color)' : 'var(--glass-border)'}`,
                    background: active ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.02)',
                    color: active ? 'white' : 'var(--text-secondary)',
                    fontWeight: active ? 600 : 400, cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '10px'
                  }}
                >
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid currentColor', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {active && <CheckCircle2 size={12} />}
                  </div>
                  {s}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <button className="btn-secondary" style={{ padding: '12px 28px' }} onClick={handlePrev}>
              <ChevronLeft size={18} /> Back
            </button>
            <button 
              className="btn-primary" 
              style={{ padding: '12px 32px' }} 
              onClick={() => { setPhase(5); setPIdx(0); }}
              disabled={selectedSubjects.length === 0}
            >
              Next Step <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ─── PHASE 5: Learning Style ─── */}
      {phase === 5 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Question {pIdx + 1} of {LEARNING_Qs.length}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {LEARNING_Qs.map((_, i) => (
                <div key={i} style={{ width: '20px', height: '4px', borderRadius: '2px', background: i === pIdx ? 'var(--accent-color-alt, #06b6d4)' : i < pIdx ? 'rgba(6,182,212,0.3)' : 'var(--glass-border)' }} />
              ))}
            </div>
          </div>
          <ScaleSelector
            question={LEARNING_Qs[pIdx].text}
            value={learningAnswers[LEARNING_Qs[pIdx].id]}
            onChange={handleLearningAnswer}
          />
          <button 
            onClick={handlePrev}
            style={{ marginTop: '24px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
            className="hover-lift"
          >
            <ChevronLeft size={16} /> Previous
          </button>
        </div>
      )}

      {/* ─── PHASE 6: Context ─── */}
      {phase === 6 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '40px' }}>
          <p style={{ color: 'white', fontSize: '1.2rem', fontWeight: 600, marginBottom: '28px' }}>Final Step: Personalize your roadmap</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>Monthly Budget for Learning (INR)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['Free only', 'Under ₹5,000', '₹5,000–₹15,000', '₹15,000–₹50,000', '₹50,000+'].map(b => (
                  <button key={b} onClick={() => setContext(c => ({ ...c, budget: b }))} style={{ padding: '10px 18px', borderRadius: '24px', border: `2px solid ${context.budget === b ? 'var(--accent-color)' : 'var(--glass-border)'}`, background: context.budget === b ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.02)', color: context.budget === b ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.88rem', transition: 'all 0.2s', fontWeight: context.budget === b ? 600 : 400 }}>{b}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>Current Learning Mode</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Online', 'Offline', 'Hybrid'].map(m => (
                  <button key={m} onClick={() => setContext(c => ({ ...c, studyMode: m }))} style={{ padding: '10px 22px', borderRadius: '24px', border: `2px solid ${context.studyMode === m ? 'var(--accent-color)' : 'var(--glass-border)'}`, background: context.studyMode === m ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.02)', color: context.studyMode === m ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.88rem', transition: 'all 0.2s', fontWeight: context.studyMode === m ? 600 : 400 }}>{m}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>Education Level</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['School Student', 'College (UG)', 'Graduate (PG)', 'Professional'].map(e => (
                  <button key={e} onClick={() => setContext(c => ({ ...c, educationLevel: e }))} style={{ padding: '10px 18px', borderRadius: '24px', border: `2px solid ${context.educationLevel === e ? 'var(--accent-color)' : 'var(--glass-border)'}`, background: context.educationLevel === e ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.02)', color: context.educationLevel === e ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.88rem', transition: 'all 0.2s', fontWeight: context.educationLevel === e ? 600 : 400 }}>{e}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Your Location (City/State)</label>
              <input
                type="text"
                value={context.location}
                onChange={e => setContext(c => ({ ...c, location: e.target.value }))}
                placeholder="Where are you based?"
                style={{ width: '100%', padding: '14px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '14px', color: 'white', fontFamily: 'inherit', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent-color)'}
                onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', gap: '12px' }}>
            <button className="btn-secondary" style={{ padding: '14px 30px' }} onClick={handlePrev}>
              <ChevronLeft size={18} /> Back
            </button>
            <button 
              className="btn-primary" 
              style={{ padding: '14px 44px', fontSize: '1.05rem', boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)' }} 
              onClick={handleSubmit}
              disabled={!context.budget || !context.educationLevel}
            >
              Analyze My Profile <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentWizard;
