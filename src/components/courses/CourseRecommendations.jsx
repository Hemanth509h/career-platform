import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen, Star, Clock, MapPin, Award, TrendingUp, X, BarChart2, ChevronDown } from 'lucide-react';
import Card from '../ui/Card';
import { allCourses, filterCourses } from '../../services/courseData';

const ModeTag = ({ mode }) => {
  const colors = { Online: { bg: 'rgba(99,102,241,0.1)', text: 'var(--accent-color)' }, Offline: { bg: 'rgba(251,191,36,0.1)', text: 'var(--warning-color)' }, Hybrid: { bg: 'rgba(16,185,129,0.1)', text: 'var(--success-color)' } };
  const c = colors[mode] || colors['Online'];
  return <span style={{ background: c.bg, color: c.text, padding: '3px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600 }}>{mode}</span>;
};

const PlacementBar = ({ rate }) => (
  <div style={{ marginTop: '4px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Placement Rate</span>
      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--success-color)' }}>{rate}%</span>
    </div>
    <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
      <div style={{ height: '100%', width: `${rate}%`, background: 'linear-gradient(90deg, var(--success-color), var(--accent-color))', borderRadius: '2px' }} />
    </div>
  </div>
);

const CourseCard = ({ course, selected, onToggleCompare, compareDisabled }) => (
  <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', height: '100%' }}>
    {/* Provider badge */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '8px' }}>
      <div style={{ fontSize: '0.78rem', color: 'var(--accent-color)', fontWeight: 600, background: 'rgba(99,102,241,0.08)', padding: '4px 10px', borderRadius: '20px' }}>{course.category}</div>
      <ModeTag mode={course.mode} />
    </div>

    <h3 style={{ fontSize: '1.05rem', marginBottom: '6px', lineHeight: 1.3 }}>{course.title}</h3>
    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>{course.provider}</p>
    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', flex: 1, lineHeight: 1.5 }}>{course.description}</p>

    {/* Skills */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
      {(course.skills || []).slice(0, 3).map(s => (
        <span key={s} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '3px 8px', borderRadius: '16px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s}</span>
      ))}
    </div>

    {/* Stats row */}
    <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', flexWrap: 'wrap' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}><Clock size={13} /> {course.duration}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: 'var(--warning-color)', fontWeight: 600 }}><Star size={13} fill="var(--warning-color)" /> {course.rating}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', fontWeight: 700, color: course.fee === 0 ? 'var(--success-color)' : 'white' }}><Award size={13} /> {course.feeLabel}</span>
    </div>

    <PlacementBar rate={course.placementRate} />

    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '10px', marginBottom: '16px' }}>
      <Award size={12} style={{ display: 'inline', marginRight: '4px' }} />{course.accreditation}
    </div>

    {/* Actions */}
    <div style={{ display: 'flex', gap: '8px' }}>
      <button className="btn-primary" style={{ flex: 1, padding: '9px', fontSize: '0.83rem' }}>
        View Details
      </button>
      <button
        onClick={() => onToggleCompare(course)}
        disabled={compareDisabled && !selected}
        style={{
          padding: '9px 14px', borderRadius: '8px', fontSize: '0.8rem', cursor: compareDisabled && !selected ? 'not-allowed' : 'pointer',
          border: `1px solid ${selected ? 'var(--accent-color)' : 'var(--glass-border)'}`,
          background: selected ? 'rgba(99,102,241,0.15)' : 'var(--glass-bg)',
          color: selected ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s', opacity: compareDisabled && !selected ? 0.5 : 1
        }}
      >
        <BarChart2 size={14} />
      </button>
    </div>
  </div>
);

const CompareModal = ({ courses, onClose }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={e => e.target === e.currentTarget && onClose()}>
    <div className="glass-panel" style={{ width: '100%', maxWidth: '900px', maxHeight: '85vh', overflowY: 'auto', padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h2 style={{ margin: 0 }}>Course Comparison</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px' }}><X size={22} /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${courses.length}, 1fr)`, gap: '20px' }}>
        {courses.map(course => (
          <div key={course.id}>
            <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>{course.title}</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--accent-color)', marginBottom: '20px' }}>{course.provider}</p>
            {[
              ['Mode', course.mode],
              ['Duration', course.duration],
              ['Fee', course.feeLabel],
              ['Rating', `${course.rating} / 5`],
              ['Placement Rate', `${course.placementRate}%`],
              ['Accreditation', course.accreditation],
              ['Category', course.category],
            ].map(([label, val]) => (
              <div key={label} style={{ marginBottom: '12px', padding: '10px 14px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>{val}</div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Key Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {course.skills?.map(s => <span key={s} style={{ background: 'rgba(99,102,241,0.1)', padding: '3px 8px', borderRadius: '16px', fontSize: '0.75rem', color: 'var(--accent-color)' }}>{s}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CourseRecommendations = () => {
  const [searchParams] = useSearchParams();
  const careerId = searchParams.get('careerId');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ mode: 'All', maxFee: 999999, maxMonths: 99, category: 'All' });
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = allCourses.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.provider.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchMode = filters.mode === 'All' || c.mode === filters.mode;
    const matchFee = c.fee <= filters.maxFee;
    const matchMonths = c.durationMonths <= filters.maxMonths;
    const matchCategory = filters.category === 'All' || c.category === filters.category;
    const matchCareer = !careerId || c.relatedCareers.includes(careerId);
    return matchSearch && matchMode && matchFee && matchMonths && matchCategory && matchCareer;
  });

  const toggleCompare = (course) => {
    setCompareList(prev => prev.find(c => c.id === course.id) ? prev.filter(c => c.id !== course.id) : prev.length < 3 ? [...prev, course] : prev);
  };

  const feeBuckets = [
    { label: 'Any Budget', value: 999999 },
    { label: 'Free', value: 0 },
    { label: 'Under ₹20K', value: 20000 },
    { label: 'Under ₹50K', value: 50000 },
    { label: 'Under ₹1.5L', value: 150000 },
  ];

  const durationBuckets = [
    { label: 'Any Duration', value: 99 },
    { label: 'Under 1 month', value: 1 },
    { label: '1–3 months', value: 3 },
    { label: '3–6 months', value: 6 },
    { label: '6–12 months', value: 12 },
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '40px auto', padding: '0 32px 60px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 className="text-gradient" style={{ marginBottom: '8px' }}>Course Finder</h1>
        <p>Compare top courses from IIT, IIM, Google, Coursera, and more. Filter by budget, mode, and duration.</p>
      </div>

      {/* Search + filter toggle */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by course name, skill, or provider..."
            style={{ width: '100%', padding: '12px 14px 12px 44px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', fontFamily: 'inherit', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-color)'}
            onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary"
          style={{ padding: '12px 20px', gap: '8px' }}
        >
          <Filter size={16} /> Filters {showFilters ? <ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} /> : <ChevronDown size={14} />}
        </button>
        {compareList.length >= 2 && (
          <button onClick={() => setShowCompare(true)} className="btn-primary" style={{ padding: '12px 20px', gap: '8px' }}>
            <BarChart2 size={16} /> Compare {compareList.length}
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Study Mode</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['All', 'Online', 'Offline', 'Hybrid'].map(m => (
                <button key={m} onClick={() => setFilters(f => ({ ...f, mode: m }))} style={{ padding: '7px 14px', borderRadius: '20px', border: `1px solid ${filters.mode === m ? 'var(--accent-color)' : 'var(--glass-border)'}`, background: filters.mode === m ? 'rgba(99,102,241,0.15)' : 'transparent', color: filters.mode === m ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem', transition: 'all 0.2s' }}>{m}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Budget</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {feeBuckets.map(b => (
                <button key={b.label} onClick={() => setFilters(f => ({ ...f, maxFee: b.value }))} style={{ padding: '7px 14px', borderRadius: '20px', border: `1px solid ${filters.maxFee === b.value ? 'var(--accent-color)' : 'var(--glass-border)'}`, background: filters.maxFee === b.value ? 'rgba(99,102,241,0.15)' : 'transparent', color: filters.maxFee === b.value ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem', transition: 'all 0.2s' }}>{b.label}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Duration</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {durationBuckets.map(b => (
                <button key={b.label} onClick={() => setFilters(f => ({ ...f, maxMonths: b.value }))} style={{ padding: '7px 14px', borderRadius: '20px', border: `1px solid ${filters.maxMonths === b.value ? 'var(--accent-color)' : 'var(--glass-border)'}`, background: filters.maxMonths === b.value ? 'rgba(99,102,241,0.15)' : 'transparent', color: filters.maxMonths === b.value ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem', transition: 'all 0.2s' }}>{b.label}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Category</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['All', 'Technology', 'Design', 'Business', 'Healthcare', 'Education', 'Science'].map(cat => (
                <button key={cat} onClick={() => setFilters(f => ({ ...f, category: cat }))} style={{ padding: '7px 14px', borderRadius: '20px', border: `1px solid ${filters.category === cat ? 'var(--accent-color)' : 'var(--glass-border)'}`, background: filters.category === cat ? 'rgba(99,102,241,0.15)' : 'transparent', color: filters.category === cat ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem', transition: 'all 0.2s' }}>{cat}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Compare bar */}
      {compareList.length > 0 && (
        <div className="glass-panel" style={{ padding: '14px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Comparing: </span>
          {compareList.map(c => (
            <span key={c.id} style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.82rem', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {c.title}
              <button onClick={() => toggleCompare(c)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', lineHeight: 0 }}><X size={13} /></button>
            </span>
          ))}
          {compareList.length >= 2 && (
            <button onClick={() => setShowCompare(true)} className="btn-primary" style={{ padding: '7px 16px', fontSize: '0.82rem', marginLeft: 'auto' }}>
              Compare Side-by-Side
            </button>
          )}
        </div>
      )}

      {/* Results */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Showing <strong style={{ color: 'white' }}>{filtered.length}</strong> courses {careerId ? '(filtered by career)' : ''}</p>
        {careerId && <Link to="/courses" style={{ fontSize: '0.82rem', color: 'var(--accent-color)' }}>Show all courses</Link>}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
          <BookOpen size={48} color="var(--glass-border)" style={{ marginBottom: '16px' }} />
          <h3>No courses match your filters</h3>
          <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>Try adjusting your budget or mode settings</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              selected={!!compareList.find(c => c.id === course.id)}
              onToggleCompare={toggleCompare}
              compareDisabled={compareList.length >= 3}
            />
          ))}
        </div>
      )}

      {showCompare && <CompareModal courses={compareList} onClose={() => setShowCompare(false)} />}
    </div>
  );
};

export default CourseRecommendations;
