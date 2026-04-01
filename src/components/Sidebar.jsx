import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Briefcase, GraduationCap } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Assessments', path: '/assessments', icon: <ClipboardList size={20} /> },
    { name: 'Career Matches', path: '/careers', icon: <Briefcase size={20} /> },
    { name: 'Courses', path: '/courses', icon: <GraduationCap size={20} /> },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="logo-container">
        <div className="logo-icon">✨</div>
        <h2 className="text-gradient">Pathfinder AI</h2>
      </div>
      
      <nav className="nav-menu">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">JS</div>
          <div className="user-info">
            <h4>Jane Student</h4>
            <p>11th Grade</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
