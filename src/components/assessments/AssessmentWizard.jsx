import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Brain, Target, Lightbulb, BookOpen, Zap, MapPin, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';

// Phase 1: Personality
const PERSONALITY_Qs = [
  { id: 'p1', text: 'I prefer planning and structure over going with the flow.' },
  { id: 'p2', text: 'I get energy from working with and helping other people.' },
  { id: 'p3', text: 'I enjoy taking charge and leading group decisions.' },
  { id: 'p4', text: 'I stay calm and composed under deadline pressure.' },
  { id: 'p5', text: 'I prefer exploring many ideas rather than mastering one deeply.' },
];

// Phase 2: Aptitude
const APTITUDE_Qs = [
  { id: 'a1', text: 'I can spot patterns in data or numerical sequences easily.' },
  { id: 'a2', text: 'I can clearly explain complex topics to someone unfamiliar with them.' },
  { id: 'a3', text: 'I find it easy to learn and apply new software tools quickly.' },
  { id: 'a4', text: 'I can manage a budget or financial plan effectively.' },
  { id: 'a5', text: 'I can visualize how objects fit together in 3D space.' },
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
  const [pIdx, setPIdx] = useState(0); // question index within personality/aptitude/learning phases
  const [answers, setAnswers] = useState({});
  const [interests, setInterests] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [learningAnswers, setLearningAnswers] = useState({});
  const [context, setContext] = useState({ budget: '', location: '', studyMode: 'Online', educationLevel: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const totalProgress = ((phase - 1) / PHASES.length) * 100;

  const handlePersonalityAnswer = (val) => {
    const q = PERSONALITY_Qs[pIdx];
    const updated = { ...answers, [q.id]: val };
    setAnswers(updated);
    if (pIdx < PERSONALITY_Qs.length - 1) setPIdx(pIdx + 1);
    else { setPhase(2); setPIdx(0); }
  };

  const handleAptitudeAnswer = (val) => {
    const q = APTITUDE_Qs[pIdx];
    const updated = { ...answers, [q.id]: val };
    setAnswers(updated);
    if (pIdx < APTITUDE_Qs.length - 1) setPIdx(pIdx + 1);
    else { setPhase(3); setPIdx(0); }
  };

  const handleLearningAnswer = (val) => {
    const q = LEARNING_Qs[pIdx];
    const updated = { ...learningAnswers, [q.id]: val };
    setLearningAnswers(updated);
    if (pIdx < LEARNING_Qs.length - 1) setPIdx(pIdx + 1);
    else setPhase(6);
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
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="text-gradient">Career Discovery Assessment</h1>
        <p style={{ marginTop: '8px' }}>6 dimensions · 10 minutes · Personalised results</p>
      </div>

      {/* Phase indicator */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {PHASES.map(p => (
          <div key={p.id} style={{ flex: 1, minWidth: '80px', background: phase === p.id ? `rgba(${p.color},0.15)` : phase > p.id ? 'rgba(16,185,129,0.1)' : 'var(--glass-bg)', border: `1px solid ${phase === p.id ? `rgba(${p.color},0.4)` : phase > p.id ? 'rgba(16,185,129,0.3)' : 'var(--glass-border)'}`, borderRadius: '10px', padding: '10px', textAlign: 'center', transition: 'all 0.3s' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: phase === p.id ? `rgb(${p.color})` : phase > p.id ? 'var(--success-color)' : 'var(--text-secondary)' }}>
              {phase > p.id ? <CheckCircle2 size={14} color="var(--success-color)" /> : p.id}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'none' }}>{p.title}</div>
          </div>
        ))}
      </div>

      {/* Phase title */}
      <div className="glass-panel" style={{ padding: '20px 28px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ background: `rgba(${PHASES[phase - 1].color},0.15)`, width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: `rgb(${PHASES[phase - 1].color})`, flexShrink: 0 }}>
          {PHASES[phase - 1].icon}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: `rgb(${PHASES[phase - 1].color})` }}>Phase {phase} of {PHASES.length}</div>
          <h2 style={{ margin: '2px 0 0', fontSize: '1.25rem' }}>{PHASES[phase - 1].title}</h2>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{PHASES[phase - 1].desc}</div>
      </div>

      {/* ─── PHASE 1: Personality ─── */}
      {phase === 1 && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ marginBottom: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Question {pIdx + 1} of {PERSONALITY_Qs.length}</div>
          <ScaleSelector
            question={PERSONALITY_Qs[pIdx].text}
            value={answers[PERSONALITY_Qs[pIdx].id]}
            onChange={handlePersonalityAnswer}
          />
        </div>
      )}

      {/* ─── PHASE 2: Aptitude ─── */}
      {phase === 2 && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ marginBottom: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Question {pIdx + 1} of {APTITUDE_Qs.length}</div>
          <ScaleSelector
            question={APTITUDE_Qs[pIdx].text}
            value={answers[APTITUDE_Qs[pIdx].id]}
            onChange={handleAptitudeAnswer}
          />
        </div>
      )}

      {/* ─── PHASE 3: Interests ─── */}
      {phase === 3 && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <p style={{ marginBottom: '28px', color: 'white', fontSize: '1.1rem', fontWeight: 500 }}>Rate your interest level in each domain (1 = Not at all, 5 = Love it)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {INTEREST_DOMAINS.map(domain => (
              <div key={domain.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '1.5rem', width: '32px', flexShrink: 0 }}>{domain.icon}</span>
                <span style={{ minWidth: '200px', fontSize: '0.95rem', color: 'white' }}>{domain.label}</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      onClick={() => setInterests(prev => ({ ...prev, [domain.id]: val }))}
                      style={{
                        width: '40px', height: '40px', borderRadius: '8px',
                        border: `2px solid ${interests[domain.id] >= val ? 'var(--accent-color)' : 'var(--glass-border)'}`,
                        background: interests[domain.id] >= val ? 'rgba(99,102,241,0.2)' : 'var(--glass-bg)',
                        color: interests[domain.id] >= val ? 'white' : 'var(--text-secondary)',
                        fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.15s'
                      }}
                    >{val}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" style={{ padding: '12px 28px' }} onClick={() => setPhase(4)}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ─── PHASE 4: Academic Strengths ─── */}
      {phase === 4 && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <p style={{ marginBottom: '8px', color: 'white', fontSize: '1.1rem', fontWeight: 500 }}>Select up to 4 subjects you excel in or enjoy most</p>
          <p style={{ marginBottom: '28px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Selected: {selectedSubjects.length} / 4</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
            {SUBJECTS.map(s => {
              const active = selectedSubjects.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleSubject(s)}
                  style={{
                    padding: '10px 20px', borderRadius: '24px',
                    border: `2px solid ${active ? 'var(--accent-color)' : 'var(--glass-border)'}`,
                    background: active ? 'rgba(99,102,241,0.15)' : 'var(--glass-bg)',
                    color: active ? 'white' : 'var(--text-secondary)',
                    fontWeight: active ? 600 : 400, cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s',
                  }}
                >{active && <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />}{s}</button>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <button className="btn-secondary" style={{ padding: '12px 28px' }} onClick={() => setPhase(3)}>
              <ChevronLeft size={18} /> Back
            </button>
            <button className="btn-primary" style={{ padding: '12px 28px' }} onClick={() => { setPhase(5); setPIdx(0); }}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ─── PHASE 5: Learning Style ─── */}
      {phase === 5 && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ marginBottom: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Question {pIdx + 1} of {LEARNING_Qs.length}</div>
          <ScaleSelector
            question={LEARNING_Qs[pIdx].text}
            value={learningAnswers[LEARNING_Qs[pIdx].id]}
            onChange={handleLearningAnswer}
          />
        </div>
      )}

      {/* ─── PHASE 6: Context ─── */}
      {phase === 6 && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 500, marginBottom: '28px' }}>Help us personalise your course recommendations</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'block', marginBottom: '10px' }}>Monthly Budget for Education</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['Free only', 'Under ₹5,000/mo', '₹5,000–₹15,000/mo', '₹15,000–₹50,000/mo', '₹50,000+/mo'].map(b => (
                  <button key={b} onClick={() => setContext(c => ({ ...c, budget: b }))} style={{ padding: '9px 16px', borderRadius: '20px', border: `2px solid ${context.budget === b ? 'var(--accent-color)' : 'var(--glass-border)'}`, background: context.budget === b ? 'rgba(99,102,241,0.15)' : 'var(--glass-bg)', color: context.budget === b ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s' }}>{b}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'block', marginBottom: '10px' }}>Preferred Study Mode</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Online', 'Offline', 'Hybrid', 'No preference'].map(m => (
                  <button key={m} onClick={() => setContext(c => ({ ...c, studyMode: m }))} style={{ padding: '9px 20px', borderRadius: '20px', border: `2px solid ${context.studyMode === m ? 'var(--accent-color)' : 'var(--glass-border)'}`, background: context.studyMode === m ? 'rgba(99,102,241,0.15)' : 'var(--glass-bg)', color: context.studyMode === m ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s' }}>{m}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'block', marginBottom: '10px' }}>Current Education Level</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Class 10–12', 'Undergraduate (1st–2nd yr)', 'Undergraduate (3rd–4th yr)', 'Graduate/Post-grad', 'Working Professional'].map(e => (
                  <button key={e} onClick={() => setContext(c => ({ ...c, educationLevel: e }))} style={{ padding: '9px 16px', borderRadius: '20px', border: `2px solid ${context.educationLevel === e ? 'var(--accent-color)' : 'var(--glass-border)'}`, background: context.educationLevel === e ? 'rgba(99,102,241,0.15)' : 'var(--glass-bg)', color: context.educationLevel === e ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s' }}>{e}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'block', marginBottom: '8px' }}>Your City / State (optional)</label>
              <input
                type="text"
                value={context.location}
                onChange={e => setContext(c => ({ ...c, location: e.target.value }))}
                placeholder="e.g. Mumbai, Chennai, Jaipur..."
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white', fontFamily: 'inherit', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent-color)'}
                onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '36px', gap: '12px' }}>
            <button className="btn-secondary" style={{ padding: '12px 28px' }} onClick={() => { setPhase(5); setPIdx(LEARNING_Qs.length - 1); }}>
              <ChevronLeft size={18} /> Back
            </button>
            <button className="btn-primary" style={{ padding: '14px 36px', fontSize: '1rem' }} onClick={handleSubmit}>
              Analyse My Profile <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentWizard;
