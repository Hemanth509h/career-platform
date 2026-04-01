import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';

const QUESTIONS = [
  { id: 1, text: "I enjoy solving complex problems that require deep logical thinking.", category: "Aptitude" },
  { id: 2, text: "I prefer working in dynamic environments over highly structured ones.", category: "Personality" },
  { id: 3, text: "I find myself naturally leading group activities or discussions.", category: "Personality" },
  { id: 4, text: "I am fascinated by how technology can be used to improve daily life.", category: "Interest" },
  { id: 5, text: "I can easily spot patterns in numbers or data sets.", category: "Aptitude" },
  { id: 6, text: "I enjoy helping others learn and develop their skills.", category: "Interest" },
  { id: 7, text: "I am comfortable taking risks to achieve a bigger reward.", category: "Personality" },
  { id: 8, text: "I often think about how to make processes more efficient.", category: "Aptitude" },
  { id: 9, text: "I like expressing myself creatively through writing, art, or music.", category: "Interest" },
  { id: 10, text: "I stay calm and focused during high-pressure situations.", category: "Personality" },
  { id: 11, text: "I enjoy building or fixing things with my hands.", category: "Interest" },
  { id: 12, text: "I can quickly grasp new software or technical concepts.", category: "Aptitude" },
  { id: 13, text: "I prefer clear instructions and a set routine when working.", category: "Personality" },
  { id: 14, text: "I am interested in understanding human behavior and psychology.", category: "Interest" },
  { id: 15, text: "I excel at managing budgets or making financial plans.", category: "Aptitude" },
  { id: 16, text: "I pay close attention to small details that others might miss.", category: "Personality" },
  { id: 17, text: "I am passionate about environmental conservation or sustainability.", category: "Interest" },
  { id: 18, text: "I can clearly articulate my thoughts to persuade an audience.", category: "Aptitude" },
  { id: 19, text: "I like working independently rather than in a large team.", category: "Personality" },
  { id: 20, text: "I am curious about how businesses operate and make a profit.", category: "Interest" },
];

const AssessmentWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = async (value) => {
    const updatedAnswers = { ...answers, [QUESTIONS[currentStep].id]: value };
    setAnswers(updatedAnswers);
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsAnalyzing(true);
      try {
        const res = await fetch('http://localhost:5000/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: updatedAnswers })
        });
        const aiResult = await res.json();
        navigate('/dashboard', { state: { aiResult } });
      } catch (err) {
        console.error(err);
        navigate('/dashboard');
      }
    }
  };


  const progress = ((currentStep) / QUESTIONS.length) * 100;

  if (isAnalyzing) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ marginBottom: '24px' }}>Analyzing Your Profile</h1>
        <div style={{ margin: '0 auto', width: '50px', height: '50px', border: '4px solid rgba(99, 102, 241, 0.2)', borderTopColor: 'var(--accent-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '24px', color: 'var(--text-secondary)' }}>Our AI is processing your responses against 250+ career pathways...</p>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 className="text-gradient">Career Discovery Matrix</h1>
        <p>Let's uncover your deep strengths and natural tendencies.</p>
      </div>

      <div className="glass-panel" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
        {/* Progress bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, height: '4px', width: '100%', background: 'var(--glass-border)' }}>
          <div style={{ height: '100%', background: 'linear-gradient(to right, var(--accent-color), var(--accent-color-alt))', width: `${progress}%`, transition: 'width 0.4s ease' }} />
        </div>

        <div style={{ marginBottom: '16px', color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {QUESTIONS[currentStep].category} Assessment
        </div>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '40px', minHeight: '80px' }}>
          {QUESTIONS[currentStep].text}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'Strongly Agree', value: 5 },
            { label: 'Agree', value: 4 },
            { label: 'Neutral', value: 3 },
            { label: 'Disagree', value: 2 },
            { label: 'Strongly Disagree', value: 1 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                padding: '16px 24px',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1.1rem',
                textAlign: 'left',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--glass-bg)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
        </div>
      </div>
    </div>
  );
};

export default AssessmentWizard;
