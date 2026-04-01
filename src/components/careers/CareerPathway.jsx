import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, TrendingUp, Award, Briefcase, BookOpen, Users, Zap, GraduationCap, Building2 } from 'lucide-react';
import Card from '../ui/Card';

// Full career roadmap database
const ROADMAPS = {
  c1: {
    title: 'AI Product Manager',
    salary: '₹18L – ₹40L',
    demand: 'High',
    description: 'Bridge engineering and user needs to build the next generation of intelligent software products.',
    category: 'Technology',
    timeToRole: '12–24 months',
    stages: [
      {
        id: 1, stage: 'Foundation', icon: '📚', color: '99,102,241',
        title: 'Product & Business Fundamentals',
        description: 'Build the core product thinking and business understanding every PM needs.',
        duration: '2–3 months',
        skills: ['Agile/Scrum', 'Product Roadmapping', 'Market Research', 'User Stories'],
        certifications: ['Google Project Management Certificate', 'Agile Fundamentals (PMI)'],
        courses: [{ name: 'AI Product Management (Duke via Coursera)', fee: '₹25,000', mode: 'Online' }, { name: 'Product Management Fundamentals (Udemy)', fee: '₹1,500', mode: 'Online' }],
        resources: ['Book: Inspired by Marty Cagan', 'Podcast: Lenny\'s Podcast'],
      },
      {
        id: 2, stage: 'Specialisation', icon: '🧠', color: '168,85,247',
        title: 'AI & ML Knowledge for PMs',
        description: 'Understand AI/ML concepts well enough to work with engineering teams and make data-informed decisions.',
        duration: '2–3 months',
        skills: ['ML Basics (no-code)', 'Data Analysis', 'A/B Testing', 'SQL', 'AI Ethics'],
        certifications: ['AI for Everyone (Coursera)', 'Google Analytics Certified'],
        courses: [{ name: 'AI for Product Managers (LinkedIn Learning)', fee: '₹2,000/mo', mode: 'Online' }, { name: 'Data Science for PM (Udacity)', fee: '₹35,000', mode: 'Online' }],
        resources: ['Book: Continuous Discovery Habits', 'Tool: Mixpanel, Amplitude'],
      },
      {
        id: 3, stage: 'Practical Experience', icon: '💼', color: '16,185,129',
        title: 'Internships & Live Projects',
        description: 'Apply your skills in real environments — build a portfolio of PM work.',
        duration: '3–6 months',
        skills: ['PRD Writing', 'Feature Prioritization', 'Stakeholder Comms', 'Metrics Definition'],
        certifications: ['Product School PM Certificate'],
        courses: [{ name: 'PM Internship (Startup, Stipend ₹15K–25K/mo)', fee: 'Paid', mode: 'In-person/Remote' }],
        resources: ['Platform: AngelList, LinkedIn, Internshala', 'Build 2 product case studies'],
      },
      {
        id: 4, stage: 'Job Ready', icon: '🚀', color: '244,63,94',
        title: 'Land Your First PM Role',
        description: 'Polish your portfolio, ace PM interviews, and negotiate your offer.',
        duration: '1–2 months',
        skills: ['PM Interview Prep', 'System Design (high level)', 'Portfolio Creation'],
        certifications: ['Reforge Growth Series (optional)'],
        courses: [{ name: 'Cracking the PM Interview (Book)', fee: '₹800', mode: 'Self-study' }],
        resources: ['Target: Startups → Mid-size → FAANG', 'Salary: ₹18L–40L (entry to senior)'],
        companies: ['Swiggy', 'Razorpay', 'CRED', 'Google India', 'Microsoft India'],
      },
    ]
  },
  c2: {
    title: 'Data Scientist',
    salary: '₹12L – ₹35L',
    demand: 'Very High',
    description: 'Extract insights from complex datasets and build predictive models that drive business decisions.',
    category: 'Technology',
    timeToRole: '12–18 months',
    stages: [
      {
        id: 1, stage: 'Foundation', icon: '📚', color: '99,102,241',
        title: 'Mathematics & Programming',
        description: 'Build the mathematical and coding foundation every data scientist needs.',
        duration: '2–3 months',
        skills: ['Python', 'Statistics', 'Linear Algebra', 'Probability'],
        certifications: ['Python for Everybody (Coursera)', 'Khan Academy Statistics'],
        courses: [{ name: 'Data Science with Python (IIT Madras/NPTEL)', fee: '₹3,000', mode: 'Online' }, { name: 'CS50 Python (Harvard, edX)', fee: 'Free', mode: 'Online' }],
        resources: ['Book: Python for Data Analysis', 'Practice: HackerRank Python'],
      },
      {
        id: 2, stage: 'Specialisation', icon: '🧠', color: '168,85,247',
        title: 'Machine Learning & Data Engineering',
        description: 'Master core ML algorithms, model building, and working with real datasets.',
        duration: '3–4 months',
        skills: ['Pandas', 'scikit-learn', 'TensorFlow/PyTorch', 'SQL', 'Feature Engineering'],
        certifications: ['Machine Learning Specialization (Stanford/Coursera)', 'IBM Data Science Certificate'],
        courses: [{ name: 'ML Fundamentals (Stanford via Coursera)', fee: 'Free/₹4,000', mode: 'Online' }, { name: 'Applied Data Science (IBM via Coursera)', fee: '₹12,000', mode: 'Online' }],
        resources: ['Platform: Kaggle competitions', 'Book: Hands-On ML with Scikit-Learn'],
      },
      {
        id: 3, stage: 'Practical Experience', icon: '💼', color: '16,185,129',
        title: 'Projects & Kaggle Portfolio',
        description: 'Build 3–5 end-to-end data science projects and publish them on GitHub and Kaggle.',
        duration: '2–3 months',
        skills: ['EDA', 'Model Deployment', 'Streamlit', 'Git/GitHub', 'Communication'],
        certifications: ['Kaggle Certificates', 'AWS Cloud Practitioner (for deployment)'],
        courses: [{ name: 'End-to-End DS Projects (Udemy)', fee: '₹1,500', mode: 'Online' }],
        resources: ['Build: Prediction models, NLP projects, dashboards', 'Internship via Unstop or AngelList'],
      },
      {
        id: 4, stage: 'Job Ready', icon: '🚀', color: '244,63,94',
        title: 'DS Interview Prep & Placement',
        description: 'Master case studies, statistics questions, and ML system design interviews.',
        duration: '1–2 months',
        skills: ['SQL Interview', 'ML System Design', 'Case Studies', 'Resume Building'],
        certifications: ['DeepLearning.AI TensorFlow Developer'],
        courses: [{ name: 'DS Interview Prep (Interviewbit)', fee: 'Free', mode: 'Online' }],
        resources: ['Salary: ₹12L–35L (entry to senior)'],
        companies: ['Flipkart', 'PhonePe', 'Meesho', 'Mu Sigma', 'Deloitte Analytics'],
      },
    ]
  },
  c3: {
    title: 'UX Researcher',
    salary: '₹8L – ₹22L',
    demand: 'High',
    description: 'Understand user behavior through qualitative and quantitative research to create better products.',
    category: 'Design',
    timeToRole: '8–14 months',
    stages: [
      { id: 1, stage: 'Foundation', icon: '📚', color: '99,102,241', title: 'Psychology & HCI Fundamentals', description: 'Understand human behavior and interaction principles.', duration: '1–2 months', skills: ['Cognitive Psychology', 'HCI Basics', 'Design Thinking'], certifications: ['Design Thinking (IDEO/Coursera)'], courses: [{ name: 'Human-Computer Interaction (Coursera)', fee: 'Free', mode: 'Online' }], resources: ['Book: The Design of Everyday Things'] },
      { id: 2, stage: 'Specialisation', icon: '🧠', color: '168,85,247', title: 'Research Methods & Tools', description: 'Master qualitative and quantitative UX research techniques.', duration: '2–3 months', skills: ['User Interviews', 'Usability Testing', 'Survey Design', 'Figma'], certifications: ['Google UX Design Certificate'], courses: [{ name: 'Google UX Design (Coursera)', fee: '₹15,000', mode: 'Online' }], resources: ['Tool: Maze, Hotjar, UserZoom'] },
      { id: 3, stage: 'Practical Experience', icon: '💼', color: '16,185,129', title: 'Research Portfolio Projects', description: 'Conduct 2–3 real research studies and document findings.', duration: '2–3 months', skills: ['Research Reports', 'Journey Mapping', 'Persona Creation'], certifications: ['UXPA Member Research Certificate'], courses: [{ name: 'UX Research Portfolio (Designlab)', fee: '₹20,000', mode: 'Online' }], resources: ['Volunteer research for NGOs or startups'] },
      { id: 4, stage: 'Job Ready', icon: '🚀', color: '244,63,94', title: 'UX Research Interviews', description: 'Prepare a strong portfolio and ace research case study interviews.', duration: '1 month', skills: ['Portfolio Presentation', 'Case Study Walkthroughs'], certifications: [], courses: [{ name: 'UX Interview Prep (Springboard)', fee: 'Free', mode: 'Online' }], resources: ['Salary: ₹8L–22L'], companies: ['Swiggy', 'Ola', 'Nykaa', 'MakeMyTrip', 'BigBasket'] },
    ]
  },
  c9: {
    title: 'Cybersecurity Analyst',
    salary: '₹10L – ₹30L',
    demand: 'Very High',
    description: 'Protect digital infrastructure from cyber threats, breaches, and vulnerabilities.',
    category: 'Technology',
    timeToRole: '10–18 months',
    stages: [
      { id: 1, stage: 'Foundation', icon: '📚', color: '99,102,241', title: 'Networking & OS Fundamentals', description: 'Build foundational knowledge of networks, operating systems, and security basics.', duration: '2–3 months', skills: ['TCP/IP', 'Linux', 'Windows Security', 'Firewalls'], certifications: ['CompTIA Network+', 'CompTIA Security+'], courses: [{ name: 'Google Cybersecurity Certificate (Coursera)', fee: '₹15,000', mode: 'Online' }, { name: 'CompTIA Security+ Prep (Udemy)', fee: '₹2,000', mode: 'Online' }], resources: ['Platform: TryHackMe Beginner Path'] },
      { id: 2, stage: 'Specialisation', icon: '🧠', color: '168,85,247', title: 'Ethical Hacking & Threat Analysis', description: 'Learn offensive and defensive cybersecurity techniques.', duration: '3–4 months', skills: ['Ethical Hacking', 'Pen Testing', 'SIEM', 'Incident Response', 'Cryptography'], certifications: ['CEH (Certified Ethical Hacker)', 'eJPT (eLearnSecurity)'], courses: [{ name: 'Ethical Hacking Bootcamp (Udemy)', fee: '₹2,500', mode: 'Online' }], resources: ['Platform: HackTheBox, TryHackMe'] },
      { id: 3, stage: 'Practical Experience', icon: '💼', color: '16,185,129', title: 'CTF Competitions & Internships', description: 'Participate in Capture The Flag competitions and gain real-world SOC experience.', duration: '3–4 months', skills: ['SOC Analysis', 'Malware Analysis', 'SIEM Tools (Splunk)'], certifications: ['Splunk Core Certified User'], courses: [{ name: 'SOC Analyst Training (SANS, virtual)', fee: '₹40,000', mode: 'Online' }], resources: ['Compete: picoCTF, CTFtime.org'] },
      { id: 4, stage: 'Job Ready', icon: '🚀', color: '244,63,94', title: 'Cybersecurity Placement', description: 'Apply to SOC Analyst, Security Analyst, and Junior Pen Tester roles.', duration: '1–2 months', skills: ['Resume', 'Technical Interview Prep'], certifications: ['OSCP (optional, advanced)'], courses: [{ name: 'Cyber Career Prep (TCM Security)', fee: 'Free', mode: 'Online' }], resources: ['Salary: ₹10L–30L'], companies: ['Wipro CyberSecurity', 'HCL', 'Deloitte', 'KPMG', 'CERT-In'] },
    ]
  },
};

// Generic fallback roadmap
const buildGenericRoadmap = (careerId) => ({
  title: `Career Pathway`,
  salary: '₹8L – ₹25L',
  demand: 'High',
  description: 'A comprehensive pathway to launch your career in this growing field.',
  category: 'Technology',
  timeToRole: '12–18 months',
  stages: [
    { id: 1, stage: 'Foundation', icon: '📚', color: '99,102,241', title: 'Core Fundamentals', description: 'Build the essential knowledge base for this career.', duration: '2–3 months', skills: ['Domain Basics', 'Tools & Software', 'Industry Overview'], certifications: ['Entry-level certification'], courses: [{ name: 'Introductory Course (Coursera)', fee: 'Free', mode: 'Online' }], resources: ['Start with NPTEL or Coursera free courses'] },
    { id: 2, stage: 'Specialisation', icon: '🧠', color: '168,85,247', title: 'Skill Development', description: 'Deepen your expertise with specialised training.', duration: '3–4 months', skills: ['Advanced Skills', 'Industry Tools', 'Best Practices'], certifications: ['Industry Certificate'], courses: [{ name: 'Specialization Program (Provider)', fee: '₹10,000–₹50,000', mode: 'Online/Hybrid' }], resources: ['Join relevant professional communities'] },
    { id: 3, stage: 'Practical Experience', icon: '💼', color: '16,185,129', title: 'Internships & Projects', description: 'Apply your knowledge through real-world experience.', duration: '3–6 months', skills: ['Applied Skills', 'Team Collaboration', 'Project Management'], certifications: ['Project Portfolio'], courses: [{ name: 'Internship (via Internshala / LinkedIn)', fee: 'Paid role', mode: 'Remote/Hybrid' }], resources: ['Internshala, AngelList, LinkedIn Jobs'] },
    { id: 4, stage: 'Job Ready', icon: '🚀', color: '244,63,94', title: 'Placement & Career Launch', description: 'Polish your profile and land your first role.', duration: '1–2 months', skills: ['Interview Prep', 'Portfolio', 'Networking'], certifications: [], courses: [{ name: 'Interview Preparation (YouTube / Books)', fee: 'Free', mode: 'Self-study' }], resources: ['Use LinkedIn, Naukri, Glassdoor'] },
  ]
});

const StageCard = ({ stage, index, isLast }) => (
  <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
    {/* Timeline */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '48px' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '22px', background: `rgba(${stage.color},0.15)`, border: `2px solid rgba(${stage.color},0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', zIndex: 2, flexShrink: 0 }}>
        {stage.icon}
      </div>
      {!isLast && <div style={{ flex: 1, width: '2px', background: 'linear-gradient(to bottom, rgba(99,102,241,0.3), rgba(168,85,247,0.1))', minHeight: '40px', marginTop: '8px' }} />}
    </div>

    {/* Content */}
    <Card glass style={{ flex: 1, marginBottom: isLast ? 0 : '24px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: `rgb(${stage.color})` }}>{stage.stage}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '2px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Zap size={11} /> {stage.duration}
        </div>
      </div>

      <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>{stage.title}</h3>
      <p style={{ marginBottom: '20px', fontSize: '0.9rem', lineHeight: 1.6 }}>{stage.description}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {/* Skills */}
        <div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={12} /> Skills to Build
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {stage.skills.map(s => <span key={s} style={{ background: `rgba(${stage.color},0.08)`, border: `1px solid rgba(${stage.color},0.2)`, color: `rgb(${stage.color})`, padding: '3px 10px', borderRadius: '20px', fontSize: '0.78rem' }}>{s}</span>)}
          </div>
        </div>

        {/* Certifications */}
        {stage.certifications?.length > 0 && (
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={12} /> Certifications
            </div>
            {stage.certifications.map(c => (
              <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                <CheckCircle2 size={14} color="var(--success-color)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem' }}>{c}</span>
              </div>
            ))}
          </div>
        )}

        {/* Courses */}
        {stage.courses?.length > 0 && (
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={12} /> Recommended Courses
            </div>
            {stage.courses.map(c => (
              <div key={c.name} style={{ padding: '8px 12px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', marginBottom: '6px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'white', marginBottom: '2px' }}>{c.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{c.fee} · {c.mode}</div>
              </div>
            ))}
          </div>
        )}

        {/* Target Companies (stage 4 only) */}
        {stage.companies && (
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={12} /> Target Companies
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {stage.companies.map(c => <span key={c} style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', color: 'var(--warning-color)', padding: '3px 10px', borderRadius: '20px', fontSize: '0.78rem' }}>{c}</span>)}
            </div>
          </div>
        )}
      </div>

      {stage.resources && (
        <div style={{ marginTop: '16px', padding: '10px 14px', background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.1)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {stage.resources.join(' · ')}
        </div>
      )}
    </Card>
  </div>
);

const CareerPathway = () => {
  const { id } = useParams();
  const roadmap = ROADMAPS[id] || buildGenericRoadmap(id);

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 32px 60px' }}>
      <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '0.9rem', textDecoration: 'none' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      {/* Hero */}
      <div className="glass-panel" style={{ padding: '36px', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.04, transform: 'translate(20%,-20%)' }}>
          <Briefcase size={300} />
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{roadmap.category} Career Pathway</div>
        <h1 className="text-gradient" style={{ fontSize: '2.4rem', marginBottom: '16px', lineHeight: 1.2 }}>{roadmap.title}</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: '600px', marginBottom: '28px', lineHeight: 1.7 }}>{roadmap.description}</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', padding: '10px 18px', borderRadius: '12px' }}>
            <Award color="var(--accent-color)" size={18} />
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{roadmap.salary}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.1)', padding: '10px 18px', borderRadius: '12px' }}>
            <TrendingUp color="var(--success-color)" size={18} />
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--success-color)' }}>{roadmap.demand} Demand</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(251,191,36,0.1)', padding: '10px 18px', borderRadius: '12px' }}>
            <Zap color="var(--warning-color)" size={18} />
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--warning-color)' }}>{roadmap.timeToRole} to first role</span>
          </div>
        </div>
      </div>

      {/* Stage Progress Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '40px' }}>
        {roadmap.stages.map((s, i) => (
          <div key={s.id} style={{ textAlign: 'center', padding: '14px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
            <div style={{ fontSize: '1.3rem', marginBottom: '4px' }}>{s.icon}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: `rgb(${s.color})` }}>Stage {i + 1}</div>
            <div style={{ fontSize: '0.8rem', color: 'white', marginTop: '2px' }}>{s.stage}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{s.duration}</div>
          </div>
        ))}
      </div>

      {/* Stages */}
      <h2 style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <GraduationCap color="var(--accent-color)" size={22} /> Your Step-by-Step Roadmap
      </h2>
      <div>
        {roadmap.stages.map((stage, idx) => (
          <StageCard key={stage.id} stage={stage} index={idx} isLast={idx === roadmap.stages.length - 1} />
        ))}
      </div>

      {/* CTA */}
      <div className="glass-panel" style={{ marginTop: '40px', padding: '28px', textAlign: 'center', background: 'rgba(99,102,241,0.05)' }}>
        <h3 style={{ marginBottom: '12px' }}>Ready to start your journey?</h3>
        <p style={{ marginBottom: '20px', fontSize: '0.9rem' }}>Find the perfect courses to begin this roadmap matched to your budget and location.</p>
        <Link to={`/courses/${id}`} className="btn-primary" style={{ textDecoration: 'none', padding: '12px 28px', display: 'inline-flex', gap: '8px' }}>
          <BookOpen size={18} /> Find Courses for This Pathway
        </Link>
      </div>
    </div>
  );
};

export default CareerPathway;
