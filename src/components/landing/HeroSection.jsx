import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BrainCircuit, Target, Lightbulb, Users, TrendingUp, BookOpen, Star, ChevronRight, Compass, Shield, Zap } from 'lucide-react';
import Card from '../ui/Card';

const StatCard = ({ value, label }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: '2.2rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>{value}</div>
    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, description, accent }) => (
  <Card glass style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px' }}>
    <div style={{ background: `rgba(${accent}, 0.1)`, width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{title}</h3>
    <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>{description}</p>
  </Card>
);

const TestimonialCard = ({ name, role, text, rating }) => (
  <Card glass style={{ padding: '28px' }}>
    <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={16} fill="var(--warning-color)" color="var(--warning-color)" />
      ))}
    </div>
    <p style={{ fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.7, fontStyle: 'italic' }}>"{text}"</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
        {name[0]}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'white' }}>{name}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{role}</div>
      </div>
    </div>
  </Card>
);

const HeroSection = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* ─── HERO ─── */}
      <section style={{ padding: '80px 40px 60px', textAlign: 'center', maxWidth: '900px', width: '100%' }}>
        <div className="glass-panel animate-fade-in" style={{ padding: '8px 20px', borderRadius: '50px', marginBottom: '28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={15} color="var(--accent-color)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>AI-Powered Career Guidance — No guesswork, just clarity</span>
        </div>

        <h1 className="animate-fade-in delay-100" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', marginBottom: '24px', lineHeight: 1.1 }}>
          Find Your Perfect Career Path<br />
          <span className="text-gradient">with AI Precision</span>
        </h1>

        <p className="animate-fade-in delay-200" style={{ fontSize: '1.15rem', maxWidth: '620px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          Stop guessing about your future. CareerAI Mentor builds a deep profile of your personality, aptitude, and goals — then matches you with careers, courses, and a personalised roadmap.
        </p>

        <div className="animate-fade-in delay-300" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}>
          <Link to="/register" className="btn-primary" style={{ padding: '15px 32px', fontSize: '1rem', textDecoration: 'none' }}>
            Start Free Assessment <ArrowRight size={18} />
          </Link>
          <Link to="/careers" className="btn-secondary" style={{ padding: '15px 32px', fontSize: '1rem', textDecoration: 'none' }}>
            Explore Careers
          </Link>
        </div>

        {/* Stats row */}
        <div className="animate-fade-in delay-300 glass-panel" style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', padding: '28px 40px', borderRadius: '20px', maxWidth: '700px', margin: '0 auto' }}>
          <StatCard value="500+" label="Career Pathways" />
          <div style={{ width: '1px', background: 'var(--glass-border)' }} />
          <StatCard value="95%" label="Student Satisfaction" />
          <div style={{ width: '1px', background: 'var(--glass-border)' }} />
          <StatCard value="80%" label="Clarity Improvement" />
          <div style={{ width: '1px', background: 'var(--glass-border)' }} />
          <StatCard value="50%" label="Less Major Switching" />
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section style={{ width: '100%', maxWidth: '1100px', padding: '60px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '6px 16px', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>The Problem</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Why Students Struggle with <span className="text-gradient">Career Decisions</span></h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>With 50,000+ academic programs and emerging careers in AI, sustainability, and beyond — students are overwhelmed, under-informed, and often given conflicting advice.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {[
            { emoji: '🌀', title: 'Information Overload', text: '40–60% of students change their major at least once, wasting time and money on the wrong path.' },
            { emoji: '🧭', title: 'No Personalised Guidance', text: '1 school counselor for every 400+ students means generic advice that ignores your unique strengths.' },
            { emoji: '🏘️', title: 'Rural Access Gap', text: 'Students outside metro areas have virtually no access to quality career counseling or mentors.' },
            { emoji: '📉', title: 'Industry Mismatch', text: 'Graduates enter fields with no market demand, leading to low salaries and high dropout rates.' },
          ].map((item, i) => (
            <div key={i} className="glass-panel" style={{ padding: '28px', borderLeft: '3px solid rgba(239,68,68,0.3)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.emoji}</div>
              <h3 style={{ marginBottom: '10px', fontSize: '1.05rem' }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section style={{ width: '100%', background: 'rgba(99,102,241,0.04)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.15)', color: 'var(--accent-color)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>Our Solution</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', lineHeight: 1.2 }}>An AI Mentor That <span className="text-gradient">Knows You</span></h2>
            <p style={{ lineHeight: 1.8, marginBottom: '28px' }}>CareerAI Mentor goes beyond a simple quiz. It builds a multi-dimensional profile — analysing your personality type, cognitive aptitude, subject strengths, learning style, and real-world context — then generates explainable career matches with a step-by-step roadmap.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['Deep 6-dimension profiling', 'Explainable AI career matches', 'Personalised course recommendations', 'Full learning roadmap (skills → jobs)', 'AI career advisor chatbot'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '11px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ChevronRight size={12} color="var(--success-color)" />
                  </div>
                  <span style={{ fontSize: '0.95rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { icon: <BrainCircuit size={24} color="var(--accent-color)" />, label: 'Personality', val: 'Analytical Thinker', accent: '99,102,241' },
              { icon: <Target size={24} color="var(--accent-color-alt)" />, label: 'Aptitude Score', val: '88 / 100', accent: '168,85,247' },
              { icon: <Zap size={24} color="var(--warning-color)" />, label: 'Top Match', val: 'Data Scientist 94%', accent: '251,191,36' },
              { icon: <BookOpen size={24} color="var(--success-color)" />, label: 'Courses Ready', val: '6 Recommended', accent: '16,185,129' },
            ].map((item, i) => (
              <div key={i} className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ background: `rgba(${item.accent},0.1)`, width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>{item.icon}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'white' }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ width: '100%', maxWidth: '1100px', padding: '60px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(168,85,247,0.1)', color: 'var(--accent-color-alt)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>Core Features</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Everything You Need to <span className="text-gradient">Chart Your Path</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <FeatureCard icon={<BrainCircuit size={26} color="var(--accent-color)" />} title="6-Dimension Profiling" description="We assess personality, aptitude, interests, academic strength, learning style, and socio-economic context for a complete picture." accent="99,102,241" />
          <FeatureCard icon={<Target size={26} color="var(--accent-color-alt)" />} title="Explainable AI Matches" description="Every career recommendation comes with a clear reason — not a black box. Understand exactly why AI thinks it's right for you." accent="168,85,247" />
          <FeatureCard icon={<BookOpen size={26} color="var(--success-color)" />} title="Smart Course Finder" description="Filter courses by budget, mode, location, and duration. Compare options side-by-side from top providers like IIT, Google, and Coursera." accent="16,185,129" />
          <FeatureCard icon={<TrendingUp size={26} color="var(--warning-color)" />} title="Career Roadmaps" description="Step-by-step roadmaps showing the exact skills to build, certifications to earn, and internships to pursue on the way to your goal." accent="251,191,36" />
          <FeatureCard icon={<Compass size={26} color="#06b6d4" />} title="AI Career Chatbot" description="Ask our AI advisor anything — from salary expectations to which certification to take next. Available 24/7, personalised to your profile." accent="6,182,212" />
          <FeatureCard icon={<Shield size={26} color="#f43f5e" />} title="Demand & Salary Insights" description="Real market data on job demand trends, salary ranges, and growth projections so you can make financially informed decisions." accent="244,63,94" />
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ width: '100%', background: 'rgba(168,85,247,0.03)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(251,191,36,0.1)', color: 'var(--warning-color)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>Student Stories</div>
            <h2 style={{ fontSize: '2rem' }}>Paths Discovered. <span className="text-gradient">Lives Changed.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <TestimonialCard name="Priya S." role="Now: Data Scientist at Flipkart" rating={5} text="I had no idea data science was even an option from my small town in Rajasthan. CareerAI showed me exactly what courses to take and I landed my dream role in 18 months." />
            <TestimonialCard name="Arjun M." role="Now: UX Designer at Swiggy" rating={5} text="The explainable AI feature was a game changer. It told me WHY UX design suited my empathetic personality — not just that it did. That clarity changed everything." />
            <TestimonialCard name="Fatima K." role="Now: Cybersecurity Analyst" rating={4} text="I was about to take a B.Com just because everyone around me was. The assessment revealed my analytical skills would thrive in cybersecurity. Best decision ever." />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ width: '100%', maxWidth: '700px', padding: '80px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '20px' }}>Ready to Discover <span className="text-gradient">Your Career?</span></h2>
        <p style={{ marginBottom: '36px', fontSize: '1.05rem', lineHeight: 1.7 }}>Take the free 6-dimension assessment and get your personalised career matches in under 10 minutes.</p>
        <Link to="/register" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.05rem', textDecoration: 'none', display: 'inline-flex', borderRadius: '14px' }}>
          Start Your Free Assessment <ArrowRight size={18} />
        </Link>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ width: '100%', borderTop: '1px solid var(--glass-border)', padding: '32px 40px', marginTop: '20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', width: '30px', height: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Compass color="white" size={16} />
            </div>
            <span style={{ fontWeight: 600 }} className="text-gradient">CareerAI Mentor</span>
          </div>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <Link to="/careers" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textDecoration: 'none' }}>Explore Careers</Link>
            <Link to="/assessments" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textDecoration: 'none' }}>Take Assessment</Link>
            <Link to="/courses" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textDecoration: 'none' }}>Find Courses</Link>
            <Link to="/register" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textDecoration: 'none' }}>Sign Up Free</Link>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
            © 2026 CareerAI Mentor. Built with AI.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;
