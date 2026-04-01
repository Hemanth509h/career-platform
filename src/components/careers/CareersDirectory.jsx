import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPathways } from '../../services/mockData';
import Card from '../ui/Card';
import { Search, Briefcase, TrendingUp, Award, ChevronRight, ArrowRight } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState('All');

  const careersArray = Object.keys(mockPathways).map(key => ({
    id: key,
    ...mockPathways[key]
  }));

  const filteredCareers = careersArray.filter(career => {
    const matchSearch = !searchTerm ||
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (career.skills || []).some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory = selectedCategory === 'All' || career.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const existingCategories = ALL_CATEGORIES.filter(cat => cat === 'All' || careersArray.some(c => c.category === cat));

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 32px 60px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="text-gradient" style={{ marginBottom: '12px', fontSize: '2.2rem' }}>Explore Real Indian Careers</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.7 }}>
          Browse 25 real, in-demand career pathways with accurate salary ranges, top Indian companies, and step-by-step roadmaps.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '560px', margin: '0 auto' }}>
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

      {/* Category filter chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px', justifyContent: 'center' }}>
        {existingCategories.map(cat => {
          const cc = CATEGORY_COLORS[cat] || CATEGORY_COLORS.Technology;
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '7px 18px', borderRadius: '50px', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s', fontWeight: active ? 600 : 400,
                border: active ? `1px solid ${cat === 'All' ? 'var(--accent-color)' : cc.border}` : '1px solid var(--glass-border)',
                background: active ? (cat === 'All' ? 'rgba(99,102,241,0.15)' : cc.bg) : 'transparent',
                color: active ? (cat === 'All' ? 'var(--accent-color)' : cc.text) : 'var(--text-secondary)',
              }}
            >{cat === 'All' ? `All (${careersArray.length})` : cat}</button>
          );
        })}
      </div>

      {/* Results count */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Showing <strong style={{ color: 'white' }}>{filteredCareers.length}</strong> career{filteredCareers.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
        {selectedCategory !== 'All' && (
          <button onClick={() => setSelectedCategory('All')} style={{ fontSize: '0.82rem', color: 'var(--accent-color)', background: 'none', border: 'none', cursor: 'pointer' }}>
            Clear filter ✕
          </button>
        )}
      </div>

      {/* Career cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredCareers.map(career => {
          const cc = CATEGORY_COLORS[career.category] || CATEGORY_COLORS.Technology;
          const demandColor = DEMAND_COLORS[career.demand] || 'var(--accent-color)';
          return (
            <Card key={career.id} glass style={{ display: 'flex', flexDirection: 'column', padding: '26px' }}>
              {/* Category badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ background: cc.bg, color: cc.text, border: `1px solid ${cc.border}`, padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {career.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: demandColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp size={13} /> {career.demand}
                </span>
              </div>

              {/* Career icon + title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                <div style={{ background: cc.bg, border: `1px solid ${cc.border}`, width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Briefcase size={20} color={cc.text} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.3 }}>{career.title}</h3>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', flex: 1, lineHeight: 1.6 }}>{career.description}</p>

              {/* Top skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
                {(career.skills || []).slice(0, 3).map(s => (
                  <span key={s} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', padding: '3px 8px', borderRadius: '8px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{s}</span>
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

      {filteredCareers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <Briefcase size={48} color="var(--text-secondary)" style={{ marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px' }}>No careers found</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Try a different search or category filter.</p>
          <button className="btn-secondary" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>Clear all filters</button>
        </div>
      )}
    </div>
  );
};

export default CareersDirectory;
