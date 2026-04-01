import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPathways } from '../../services/mockData';
import Card from '../ui/Card';
import { Search, Briefcase, TrendingUp, Award } from 'lucide-react';

const CareersDirectory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const careersArray = Object.keys(mockPathways).map(key => ({
    id: key,
    ...mockPathways[key]
  }));

  const filteredCareers = careersArray.filter(career => 
    career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    career.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 40px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="text-gradient" style={{ marginBottom: '16px' }}>Explore All Careers</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Browse through our database of emerging and high-growth career pathways.</p>
        
        <div style={{ marginTop: '32px', position: 'relative', maxWidth: '600px', margin: '32px auto 0' }}>
          <Search color="var(--text-secondary)" size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search for roles, skills, or industries..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '16px 16px 16px 48px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              border: '1px solid var(--glass-border)', 
              borderRadius: '24px', 
              color: 'white', 
              fontSize: '1rem',
              outline: 'none'
            }} 
          />
        </div>
      </div>

      <div className="grid-3">
        {filteredCareers.map(career => (
          <Card key={career.id} glass style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
               <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '10px', borderRadius: '12px' }}>
                  <Briefcase color="var(--accent-color)" size={20} />
               </div>
               <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{career.title}</h3>
             </div>
             
             <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px', flex: 1 }}>{career.description}</p>
             
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.85rem', marginBottom: '24px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(168, 85, 247, 0.1)', color: 'var(--accent-color-alt)', padding: '6px 12px', borderRadius: '16px' }}>
                  <TrendingUp size={14} /> {career.demand} Demand
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '6px 12px', borderRadius: '16px' }}>
                  <Award size={14} /> {career.salary}
                </span>
             </div>

             <button 
                className="btn-secondary" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => navigate(`/career-pathway/${career.id}`)}
              >
                View Pathway Roadmap
              </button>
          </Card>
        ))}
      </div>

      {filteredCareers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
          <h3>No careers found matching "{searchTerm}"</h3>
        </div>
      )}
    </div>
  );
};

export default CareersDirectory;
