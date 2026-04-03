import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BrainCircuit, Target, Lightbulb, Users, TrendingUp, BookOpen, Star, ChevronRight, Compass, Shield, Zap } from 'lucide-react';
import Card from '../ui/Card';
import AnimateOnScroll from '../ui/AnimateOnScroll';

const StatCard = ({ value, label, delay }) => (
  <AnimateOnScroll animation="animate-pop-in" delay={delay} style={{ textAlign: 'center' }}>
    <div style={{ fontSize: '2.2rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>{value}</div>
    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{label}</div>
  </AnimateOnScroll>
);

const FeatureCard = ({ icon, title, description, accent, delay }) => (
  <AnimateOnScroll animation="animate-slide-up" delay={delay}>
    <Card glass className="hover-lift" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px', height: '100%' }}>
      <div className="icon-bounce" style={{ background: `rgba(${accent}, 0.1)`, width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>{description}</p>
    </Card>
  </AnimateOnScroll>
);

const TestimonialCard = ({ name, role, text, rating, delay }) => (
  <AnimateOnScroll animation="animate-scale-in" delay={delay}>
    <Card glass className="hover-lift" style={{ padding: '28px', height: '100%' }}>
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
  </AnimateOnScroll>
);

const HeroSection = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* ─── HERO ─── */}
      <section style={{ padding: '100px 40px 80px', textAlign: 'center', maxWidth: '900px', width: '100%', position: 'relative', zIndex: 1 }}>
        <AnimateOnScroll animation="animate-pop-in">
          <div className="glass-panel" style={{ padding: '8px 20px', borderRadius: '50px', marginBottom: '28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={15} className="animate-pulse" color="var(--accent-color)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>AI-Powered Career Guidance — No guesswork, just clarity</span>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-slide-up" delay="delay-100">
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '24px', lineHeight: 1.05, fontWeight: 800 }}>
            Find Your Perfect Career Path<br />
            <span className="text-gradient">with AI Precision</span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-slide-up" delay="delay-200">
          <p style={{ fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto 48px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            Stop guessing about your future. CareerAI Mentor builds a deep profile of your personality, aptitude, and goals — then matches you with careers, courses, and a personalised roadmap.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-slide-up" delay="delay-300">
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '80px' }}>
            <Link id="hero-register-btn" to="/register" className="btn-primary btn-ripple" style={{ padding: '16px 40px', fontSize: '1.05rem', textDecoration: 'none' }}>
              Start Free Assessment <ArrowRight size={20} />
            </Link>
            <Link id="hero-explore-btn" to="/careers" className="btn-secondary" style={{ padding: '16px 40px', fontSize: '1.05rem', textDecoration: 'none' }}>
              Explore Careers
            </Link>
            <Link to="/parent-signup" className="btn-secondary" style={{ padding: '16px 40px', fontSize: '1.05rem', textDecoration: 'none', borderColor: 'rgba(234,179,8,0.4)', color: '#eab308' }}>
              For Parents <Users size={20} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </AnimateOnScroll>

        {/* Stats row */}
        <AnimateOnScroll animation="animate-fade-in" delay="delay-400">
          <div className="glass-panel" style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', padding: '32px 48px', borderRadius: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <StatCard value="500+" label="Career Pathways" delay="delay-100" />
            <div style={{ width: '1px', background: 'var(--glass-border)' }} />
            <StatCard value="95%" label="Student Satisfaction" delay="delay-200" />
            <div style={{ width: '1px', background: 'var(--glass-border)' }} />
            <StatCard value="80%" label="Clarity Improvement" delay="delay-300" />
            <div style={{ width: '1px', background: 'var(--glass-border)' }} />
            <StatCard value="50%" label="Less Major Switching" delay="delay-400" />
          </div>
        </AnimateOnScroll>

        <div className="scroll-indicator" style={{ marginTop: '60px', opacity: 0.6 }}>
          <div style={{ width: '24px', height: '40px', border: '2px solid var(--text-secondary)', borderRadius: '12px', margin: '0 auto', position: 'relative' }}>
            <div style={{ width: '4px', height: '8px', background: 'var(--text-secondary)', borderRadius: '2px', position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)' }} />
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section style={{ width: '100%', maxWidth: '1100px', padding: '100px 40px 60px' }}>
        <AnimateOnScroll animation="animate-slide-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="glow-border" style={{ display: 'inline-block', background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '6px 16px', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>The Problem</div>
          <h2 style={{ fontSize: '2.8rem', marginBottom: '20px' }}>Why Students Struggle with <span className="text-gradient">Career Decisions</span></h2>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>With 50,000+ academic programs and emerging careers in AI, sustainability, and beyond — students are overwhelmed, under-informed, and often given conflicting advice.</p>
        </AnimateOnScroll>

        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {[
            { emoji: '🌀', title: 'Information Overload', text: '40–60% of students change their major at least once, wasting time and money on the wrong path.' },
            { emoji: '🧭', title: 'No Personalised Guidance', text: '1 school counselor for every 400+ students means generic advice that ignores your unique strengths.' },
            { emoji: '🏘️', title: 'Rural Access Gap', text: 'Students outside metro areas have virtually no access to quality career counseling or mentors.' },
            { emoji: '📉', title: 'Industry Mismatch', text: 'Graduates enter fields with no market demand, leading to low salaries and high dropout rates.' },
          ].map((item, i) => (
            <AnimateOnScroll key={i} animation="animate-slide-up" delay={`delay-${(i + 1) * 100}`}>
              <div className="glass-panel" style={{ padding: '32px', height: '100%', borderLeft: '4px solid rgba(239,68,68,0.3)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{item.emoji}</div>
                <h3 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7 }}>{item.text}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section style={{ width: '100%', background: 'rgba(99,102,241,0.03)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <AnimateOnScroll animation="animate-slide-left">
            <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.15)', color: 'var(--accent-color)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>Our Solution</div>
            <h2 style={{ fontSize: '2.8rem', marginBottom: '24px', lineHeight: 1.1 }}>An AI Mentor That <span className="text-gradient">Knows You</span></h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '32px' }}>CareerAI Mentor goes beyond a simple quiz. It builds a multi-dimensional profile — analysing your personality type, cognitive aptitude, subject strengths, learning style, and real-world context — then generates explainable career matches with a step-by-step roadmap.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {['Deep 6-dimension profiling', 'Explainable AI career matches', 'Personalised course recommendations', 'Full learning roadmap (skills → jobs)', 'AI career advisor chatbot'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="icon-bounce" style={{ width: '26px', height: '26px', borderRadius: '13px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ChevronRight size={14} color="var(--success-color)" />
                  </div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="animate-slide-right" className="stagger-children" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { icon: <BrainCircuit size={28} color="var(--accent-color)" />, label: 'Personality', val: 'Analytical Thinker', accent: '99,102,241' },
              { icon: <Target size={28} color="var(--accent-color-alt)" />, label: 'Aptitude Score', val: '88 / 100', accent: '168,85,247' },
              { icon: <Zap size={28} color="var(--warning-color)" />, label: 'Top Match', val: 'Data Scientist 94%', accent: '251,191,36' },
              { icon: <BookOpen size={28} color="var(--success-color)" />, label: 'Courses Ready', val: '6 Recommended', accent: '16,185,129' },
            ].map((item, i) => (
              <Card key={i} glass className="animate-pop-in hover-lift" style={{ padding: '24px', textAlign: 'center', borderBottom: `2px solid rgba(${item.accent}, 0.3)` }}>
                <div style={{ background: `rgba(${item.accent},0.1)`, width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>{item.icon}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>{item.label}</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>{item.val}</div>
              </Card>
            ))}
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ width: '100%', maxWidth: '1100px', padding: '100px 40px' }}>
        <AnimateOnScroll animation="animate-slide-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(168,85,247,0.1)', color: 'var(--accent-color-alt)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>Core Features</div>
          <h2 style={{ fontSize: '2.8rem', marginBottom: '20px' }}>Everything You Need to <span className="text-gradient">Chart Your Path</span></h2>
        </AnimateOnScroll>
        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <FeatureCard icon={<BrainCircuit size={28} color="var(--accent-color)" />} title="6-Dimension Profiling" description="We assess personality, aptitude, interests, academic strength, learning style, and socio-economic context for a complete picture." accent="99,102,241" delay="delay-100" />
          <FeatureCard icon={<Target size={28} color="var(--accent-color-alt)" />} title="Explainable AI Matches" description="Every career recommendation comes with a clear reason — not a black box. Understand exactly why AI thinks it's right for you." accent="168,85,247" delay="delay-200" />
          <FeatureCard icon={<BookOpen size={28} color="var(--success-color)" />} title="Smart Course Finder" description="Filter courses by budget, mode, location, and duration. Compare options side-by-side from top providers like IIT, Google, and Coursera." accent="16,185,129" delay="delay-300" />
          <FeatureCard icon={<TrendingUp size={28} color="var(--warning-color)" />} title="Career Roadmaps" description="Step-by-step roadmaps showing the exact skills to build, certifications to earn, and internships to pursue on the way to your goal." accent="251,191,36" delay="delay-400" />
          <FeatureCard icon={<Compass size={28} color="#06b6d4" />} title="AI Career Chatbot" description="Ask our AI advisor anything — from salary expectations to which certification to take next. Available 24/7, personalised to your profile." accent="6,182,212" delay="delay-500" />
          <FeatureCard icon={<Shield size={28} color="#f43f5e" />} title="Demand & Salary Insights" description="Real market data on job demand trends, salary ranges, and growth projections so you can make financially informed decisions." accent="244,63,94" delay="delay-600" />
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ width: '100%', background: 'rgba(168,85,247,0.02)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <AnimateOnScroll animation="animate-slide-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(251,191,36,0.1)', color: 'var(--warning-color)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>Student Stories</div>
            <h2 style={{ fontSize: '2.8rem' }}>Paths Discovered. <span className="text-gradient">Lives Changed.</span></h2>
          </AnimateOnScroll>
          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <TestimonialCard name="Priya S." role="Now: Data Scientist at Flipkart" rating={5} text="I had no idea data science was even an option from my small town in Rajasthan. CareerAI showed me exactly what courses to take and I landed my dream role in 18 months." delay="delay-100" />
            <TestimonialCard name="Arjun M." role="Now: UX Designer at Swiggy" rating={5} text="The explainable AI feature was a game changer. It told me WHY UX design suited my empathetic personality — not just that it did. That clarity changed everything." delay="delay-200" />
            <TestimonialCard name="Fatima K." role="Now: Cybersecurity Analyst" rating={4} text="I was about to take a B.Com just because everyone around me was. The assessment revealed my analytical skills would thrive in cybersecurity. Best decision ever." delay="delay-300" />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <AnimateOnScroll animation="animate-pop-in" style={{ width: '100%', maxWidth: '800px', padding: '120px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3.2rem', marginBottom: '24px', fontWeight: 800 }}>Ready to Discover <span className="text-gradient">Your Career?</span></h2>
        <p style={{ marginBottom: '48px', fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>Take the free 6-dimension assessment and get your personalised career matches in under 10 minutes.</p>
        <Link id="footer-cta-btn" to="/register" className="btn-primary animate-pulse" style={{ padding: '20px 56px', fontSize: '1.15rem', textDecoration: 'none', display: 'inline-flex', borderRadius: '16px', boxShadow: '0 12px 40px rgba(99,102,241,0.4)' }}>
          Start Your Free Assessment <ArrowRight size={22} />
        </Link>
      </AnimateOnScroll>

      {/* ─── FOOTER ─── */}
      <footer style={{ width: '100%', borderTop: '1px solid var(--glass-border)', padding: '48px 40px', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="logo-icon" style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Compass color="white" size={22} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.4rem' }} className="text-gradient">CareerAI Mentor</span>
          </div>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <Link to="/careers" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', textDecoration: 'none' }}>Explore Careers</Link>
            <Link to="/assessments" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', textDecoration: 'none' }}>Take Assessment</Link>
            <Link to="/courses" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', textDecoration: 'none' }}>Find Courses</Link>
            <Link to="/register" className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', textDecoration: 'none' }}>Sign Up Free</Link>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            © 2026 CareerAI Mentor. Built with advanced AI.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;
