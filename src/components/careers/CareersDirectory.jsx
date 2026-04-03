import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import { Search, Briefcase, TrendingUp, ChevronRight, Loader2, ChevronLeft } from 'lucide-react';

const CATEGORY_COLORS = {
  Technology: { bg: 'rgba(99,102,241,0.1)', text: 'var(--accent-color)', border: 'rgba(99,102,241,0.25)' },
  Finance: { bg: 'rgba(16,185,129,0.1)', text: 'var(--success-color)', border: 'rgba(16,185,129,0.25)' },
  Business: { bg: 'rgba(168,85,247,0.1)', text: 'var(--accent-color-alt)', border: 'rgba(168,85,247,0.25)' },
  Government: { bg: 'rgba(251,191,36,0.1)', text: 'var(--warning-color)', border: 'rgba(251,191,36,0.25)' },
  Healthcare: { bg: 'rgba(244,63,94,0.1)', text: '#f43f5e', border: 'rgba(244,63,94,0.25)' },
  Engineering: { bg: 'rgba(6,182,212,0.1)', text: '#06b6d4', border: 'rgba(6,182,212,0.25)' },
  Design: { bg: 'rgba(249,115,22,0.1)', text: '#f97316', border: 'rgba(249,115,22,0.25)' },
  Law: { bg: 'rgba(139,92,246,0.1)', text: '#8b5cf6', border: 'rgba(139,92,246,0.25)' },
  Education: { bg: 'rgba(20,184,166,0.1)', text: '#14b8a6', border: 'rgba(20,184,166,0.25)' },
  Science: { bg: 'rgba(234,179,8,0.1)', text: '#eab308', border: 'rgba(234,179,8,0.25)' },
  Media: { bg: 'rgba(236,72,153,0.1)', text: '#ec4899', border: 'rgba(236,72,153,0.25)' },
  Mixed: { bg: 'rgba(255,255,255,0.05)', text: 'var(--text-secondary)', border: 'var(--glass-border)' },
};

const DEMAND_COLORS = {
  'Very High': 'var(--success-color)',
  'High': 'var(--accent-color)',
  'Medium': 'var(--warning-color)',
  'Stable': '#06b6d4',
};

const ALL_CATEGORIES = ['All', 'Technology', 'Finance', 'Business', 'Healthcare', 'Engineering', 'Design', 'Law', 'Government', 'Education', 'Science', 'Media'];

const CareersDirectory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  // 1. Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 2. Fetch Data from Server
  const fetchCareers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 12,
        lean: true,
        q: debouncedSearch,
        category: selectedCategory === 'All' ? '' : selectedCategory
      });

      const res = await fetch(`/api/careers?${params.toString()}`);
      const result = await res.json();
      
      if (res.ok) {
        setCareers(result.careers || []);
        setTotal(result.pagination?.total || 0);
        setPages(result.pagination?.pages || 1);
      }
    } catch (err) {
      console.error('Failed to fetch careers:', err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, selectedCategory]);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  const existingCategories = ALL_CATEGORIES; // Use full list for filter UI

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 32px 60px' }}>
      {/* Header */}
      <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="text-gradient animate-slide-up" style={{ marginBottom: '12px', fontSize: '2.2rem' }}>Explore Real Indian Careers</h1>
        <p className="animate-slide-up delay-100" style={{ fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.7 }}>
          Browse {careers.length}+ real, in-demand career pathways with accurate salary ranges, top Indian companies, and step-by-step roadmaps.
        </p>

        {/* Search */}
        <div className="animate-slide-up delay-200" style={{ position: 'relative', maxWidth: '560px', margin: '0 auto' }}>
          <Search color="var(--text-secondary)" size={20} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search careers, skills, or sectors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '15px 18px 15px 50px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', borderRadius: '50px', color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-color)'}
            onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', gap: '16px' }}>
          <Loader2 className="animate-spin" size={40} color="var(--accent-color)" />
          <p style={{ color: 'var(--text-secondary)' }}>Loading 250+ career paths...</p>
        </div>
      ) : (
        <>
          {/* Category filter chips */}
          <div className="animate-fade-in delay-300" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px', justifyContent: 'center' }}>
            {existingCategories.map(cat => {
              const cc = CATEGORY_COLORS[cat] || CATEGORY_COLORS.Mixed;
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={active ? 'btn-ripple' : 'hover-lift'}
                  style={{
                    padding: '7px 18px', borderRadius: '50px', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s', fontWeight: active ? 600 : 400,
                    border: active ? `1px solid ${cat === 'All' ? 'var(--accent-color)' : cc.border}` : '1px solid var(--glass-border)',
                    background: active ? (cat === 'All' ? 'rgba(99,102,241,0.15)' : cc.bg) : 'transparent',
                    color: active ? (cat === 'All' ? 'var(--accent-color)' : cc.text) : 'var(--text-secondary)',
                  }}
                >{cat === 'All' ? `All (${careers.length})` : cat}</button>
              );
            })}
          </div>

          {/* Results count */}
          <div className="animate-fade-in delay-400" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              {loading ? 'Searching...' : (
                <>Showing <strong style={{ color: 'white' }}>{total}</strong> career{total !== 1 ? 's' : ''} {selectedCategory !== 'All' && ` in ${selectedCategory}`}</>
              )}
            </p>
            {selectedCategory !== 'All' && (
              <button onClick={() => setSelectedCategory('All')} style={{ fontSize: '0.82rem', color: 'var(--accent-color)', background: 'none', border: 'none', cursor: 'pointer' }}>
                Clear filter ✕
              </button>
            )}
          </div>

          {/* Career cards grid */}
          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {careers.map((career, idx) => {
              const cc = CATEGORY_COLORS[career.category] || CATEGORY_COLORS.Mixed;
          const demandColor = DEMAND_COLORS[career.demand] || 'var(--accent-color)';
          return (
            <Card key={career.id} glass className="animate-slide-up hover-lift" style={{ display: 'flex', flexDirection: 'column', padding: '26px' }}>
              {/* Category badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="tag-hover" style={{ background: cc.bg, color: cc.text, border: `1px solid ${cc.border}`, padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {career.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: demandColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp size={13} className="animate-pulse" /> {career.demand}
                </span>
              </div>

              {/* Career icon + title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                <div className="icon-bounce" style={{ background: cc.bg, border: `1px solid ${cc.border}`, width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Briefcase size={20} color={cc.text} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.3 }}>{career.title}</h3>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', flex: 1, lineHeight: 1.6 }}>{career.description}</p>

              {/* Top skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
                {(career.skills || []).slice(0, 3).map(s => (
                  <span key={s} className="tag-hover" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', padding: '3px 8px', borderRadius: '8px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{s}</span>
                ))}
              </div>

              {/* Salary + CTA */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Salary Range</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--success-color)' }}>{career.salary}</div>
                </div>
                <button
                  className="btn-secondary"
                  style={{ padding: '9px 16px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => navigate(`/career-pathway/${career.id}`)}
                >
                  Roadmap <ChevronRight size={14} />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

          {/* Pagination Controls */}
          {pages > 1 && (
            <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="btn-secondary" 
                style={{ padding: '10px 18px', opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronLeft size={18} /> Previous
              </button>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Page <strong style={{ color: 'white' }}>{page}</strong> of {pages}
              </div>
              <button 
                disabled={page === pages}
                onClick={() => setPage(p => p + 1)}
                className="btn-secondary" 
                style={{ padding: '10px 18px', opacity: page === pages ? 0.5 : 1, cursor: page === pages ? 'not-allowed' : 'pointer' }}
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          )}

          {careers.length === 0 && !loading && (
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '80px 20px' }}>
              <Briefcase size={48} color="var(--text-secondary)" style={{ marginBottom: '16px', opacity: 0.5 }} />
              <h3 style={{ marginBottom: '8px' }}>No careers found</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Try a different search or category filter.</p>
              <button className="btn-secondary" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>Clear all filters</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CareersDirectory;
