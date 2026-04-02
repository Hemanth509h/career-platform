import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Briefcase, BookOpen, BarChart2, Plus, Edit3, Trash2, ShieldOff, ChevronRight, RefreshCw, Star } from 'lucide-react';

const API = '/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const [activeSection, setActiveSection] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [careers, setCareers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'student', age: 20 });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      if (activeSection === 'analytics') {
        const r = await fetch(`${API}/admin/analytics`, { headers: authHeaders });
        const d = await r.json();
        if (!r.ok) {
           console.error("Admin Analytics Error:", d);
           if (r.status === 401 || r.status === 403) alert("Access Denied or Session Expired. Please log in again.");
           return setAnalytics(null);
        }
        setAnalytics(d);
      } else if (activeSection === 'users') {
        const r = await fetch(`${API}/admin/users`, { headers: authHeaders });
        const d = await r.json();
        if (!r.ok) {
           console.error("Admin Users Error:", d);
           if (r.status === 401 || r.status === 403) alert("Access Denied or Session Expired. Please log in again.");
           return setUsers([]);
        }
        setUsers(Array.isArray(d) ? d : (d?.data || d?.users || []));
      } else if (activeSection === 'careers') {
        const r = await fetch(`${API}/careers?limit=1000`);
        const d = await r.json();
        setCareers(Array.isArray(d) ? d : (d?.data || []));
      } else if (activeSection === 'courses') {
        const r = await fetch(`${API}/courses`, { headers: authHeaders });
        const d = await r.json();
        setCourses(Array.isArray(d) ? d : (d?.data || []));
      }
    } catch (e) {}
    setTimeout(() => setIsRefreshing(false), 600);
  };

  useEffect(() => {
    fetchData();
  }, [activeSection]);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/user`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(newUser)
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(prev => [...prev, data.user]);
        setIsAddingUser(false);
        setNewUser({ name: '', email: '', password: '', role: 'student', age: 20 });
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Create error:', error);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to PERMANENTLY DELETE this user?')) return;
    try {
      const res = await fetch(`${API}/admin/user/${id}`, { method: 'DELETE', headers: authHeaders });
      if (res.ok) {
        setUsers(prev => prev.filter(u => (u._id || u.id) !== id));
      } else if (res.status === 400) {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/user/${editingUser._id || editingUser.id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(editingUser)
      });
      if (res.ok) {
        const updated = await res.json();
        setUsers(prev => prev.map(u => (u._id === updated.user._id || u.id === updated.user.id) ? updated.user : u));
        setEditingUser(null);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const blockUser = async (id, currentStatus) => {
    if (!window.confirm(currentStatus ? 'Unblock user?' : 'Block this user?')) return;
    await fetch(`${API}/admin/block-user/${id}`, { method: 'PATCH', headers: authHeaders });
    setUsers(prev => prev.map(u => (u._id === id || u.id === id) ? { ...u, isBlocked: !currentStatus } : u));
  };

  const sidebarItems = [
    { key: 'analytics', label: 'Analytics', icon: <BarChart2 size={18} /> },
    { key: 'users', label: 'Users', icon: <Users size={18} /> },
    { key: 'careers', label: 'Careers', icon: <Briefcase size={18} /> },
    { key: 'courses', label: 'Courses', icon: <BookOpen size={18} /> },
  ];

  const inputStyle = { width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', background: 'rgba(255,255,255,0.03)', borderRight: '1px solid var(--glass-border)', padding: '28px 16px', flexShrink: 0 }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', paddingLeft: '12px' }}>Admin Panel</p>
        {sidebarItems.map(item => (
          <button key={item.key} onClick={() => setActiveSection(item.key)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '10px', border: 'none', background: activeSection === item.key ? 'rgba(99,102,241,0.15)' : 'transparent', color: activeSection === item.key ? 'var(--accent-color)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', textAlign: 'left', marginBottom: '4px', transition: 'all 0.2s' }}>
            {item.icon}
            {item.label}
            {activeSection === item.key && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
          </button>
        ))}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto', position: 'relative' }}>
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button onClick={fetchData} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Analytics */}
        {activeSection === 'analytics' && (
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '24px' }}>📊 Analytics Overview</h2>
            {analytics ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                {[
                  { label: 'Total Users', value: analytics.totalUsers, color: '#6366f1' },
                  { label: 'Minor Users', value: analytics.minorUsers, color: '#eab308' },
                  { label: 'Adult Users', value: analytics.adultUsers, color: '#22c55e' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '28px 24px' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>{label}</p>
                    <p style={{ fontSize: '2.8rem', fontWeight: 900, color }}>{value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>Loading analytics…</p>
            )}
          </div>
        )}

        {/* Users */}
        {activeSection === 'users' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>👥 User Management</h2>
              <button onClick={() => setIsAddingUser(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s' }}>
                <Plus size={18} /> Add New User
              </button>
            </div>
            
            {/* Admin Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              {users.filter(u => u.role === 'admin').map((admin, idx) => (
                <div key={admin._id || admin.id || idx} style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '18px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Star size={24} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{admin.name} <span style={{ fontSize: '0.7rem', background: 'rgba(99,102,241,0.2)', color: 'var(--accent-color)', padding: '2px 8px', borderRadius: '6px', marginLeft: '6px' }}>ADMIN</span></p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{admin.email}</p>
                  </div>
                  <button onClick={() => setEditingUser(admin)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '8px' }}>
                    <Edit3 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Platform Users</h3>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                    {['Name', 'Email', 'Age', 'Parental Info', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '16px', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.role !== 'admin').map((u, i, filteredList) => {
                    const parent = users.find(p => p.role === 'parent' && p.linkedStudentId === (u._id || u.id));
                    return (
                      <tr key={u._id || u.id || i} style={{ borderBottom: i < filteredList.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                        <td style={{ padding: '16px', fontWeight: 600 }}>{u.name}</td>
                        <td style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{u.email}</td>
                        <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{u.age || '-'}</td>
                        <td style={{ padding: '16px' }}>
                          {u.isMinor ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <span style={{ fontSize: '0.7rem', fontWeight: 900, background: 'rgba(234,179,8,0.1)', color: '#eab308', padding: '2px 8px', borderRadius: '4px', alignSelf: 'flex-start' }}>
                                CODE: {u.parentCode}
                              </span>
                              {parent ? (
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                  P: {parent.name} ({parent.email})
                                </span>
                              ) : (
                                <span style={{ fontSize: '0.7rem', color: '#666', fontStyle: 'italic' }}>Pending Link...</span>
                              )}
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: '#666' }}>Adult Client</span>
                          )}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, background: u.isBlocked ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)', color: u.isBlocked ? '#ef4444' : '#22c55e' }}>
                            {u.isBlocked ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                        <td style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                          <button onClick={() => setEditingUser(u)} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                            <Edit3 size={14} />
                          </button>
                          <button title={u.isBlocked ? "Unblock" : "Block"} onClick={() => blockUser(u._id || u.id, u.isBlocked)} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: u.isBlocked ? '#ef4444' : 'var(--text-secondary)', cursor: 'pointer' }}>
                            <ShieldOff size={14} />
                          </button>
                          <button onClick={() => deleteUser(u._id || u.id)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.05)', color: '#ef4444', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem' }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {users.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>No users found</div>}
            </div>
          </div>
        )}

        {/* Careers */}
        {activeSection === 'careers' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>💼 Career Management</h2>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    {['Title', 'Salary', 'Demand', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {careers.map((c, i) => (
                    <tr key={c._id || i} style={{ borderBottom: i < careers.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 600 }}>{c.title}</td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{c.salary || c.salaryRange || '—'}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>{c.demand || c.demandLevel || 'High'}</span>
                      </td>
                      <td style={{ padding: '14px 16px', display: 'flex', gap: '8px' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 11px', borderRadius: '7px', border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.08)', color: '#6366f1', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                          <Edit3 size={12} /> Edit
                        </button>
                        <button onClick={async () => { if (window.confirm('Delete?')) { await fetch(`${API}/admin/career/${c._id}`, { method: 'DELETE', headers: authHeaders }); setCareers(prev => prev.filter(x => x._id !== c._id)); } }}
                          style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 11px', borderRadius: '7px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', color: '#ef4444', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                          <Trash2 size={12} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {careers.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>No careers found</div>}
            </div>
          </div>
        )}

        {/* Courses */}
        {activeSection === 'courses' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>📚 Course Management</h2>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    {['Name', 'Provider', 'Fees', 'Mode', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c, i) => (
                    <tr key={c.id || i} style={{ borderBottom: i < courses.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 600 }}>{c.title}</td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{c.provider || '—'}</td>
                      <td style={{ padding: '14px 16px', color: '#22c55e', fontWeight: 600 }}>{c.feeLabel || '—'}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, background: 'rgba(99,102,241,0.1)', color: '#6366f1', textTransform: 'capitalize' }}>{c.mode}</span>
                      </td>
                      <td style={{ padding: '14px 16px', display: 'flex', gap: '8px' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 11px', borderRadius: '7px', border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.08)', color: '#6366f1', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                          <Edit3 size={12} /> Edit
                        </button>
                        <button onClick={async () => { if (window.confirm('Delete?')) { await fetch(`${API}/admin/course/${c._id}`, { method: 'DELETE', headers: authHeaders }); setCourses(prev => prev.filter(x => x._id !== c._id)); } }}
                          style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 11px', borderRadius: '7px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', color: '#ef4444', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                          <Trash2 size={12} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {courses.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>No courses found</div>}
            </div>
          </div>
        )}

      </main>

      {/* Edit User Modal */}
      {editingUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '32px', position: 'relative', border: '1px solid var(--accent-color)40' }}>
            <h3 style={{ marginBottom: '24px', fontSize: '1.4rem' }}>Edit User: <span style={{ color: 'var(--accent-color)' }}>{editingUser.name}</span></h3>
            
            <form onSubmit={updateUser} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>Full Name</label>
                <input style={inputStyle} type="text" value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>Email Address</label>
                <input style={inputStyle} type="email" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>Role</label>
                  <select style={inputStyle} value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: e.target.value})}>
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>Age</label>
                  <input style={inputStyle} type="number" value={editingUser.age || ''} onChange={e => setEditingUser({...editingUser, age: parseInt(e.target.value), isMinor: parseInt(e.target.value) < 18})} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>Save Changes</button>
                <button type="button" onClick={() => setEditingUser(null)} className="btn-secondary" style={{ flex: 1, padding: '12px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {isAddingUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '32px', position: 'relative', border: '1px solid #22c55e40' }}>
            <h3 style={{ marginBottom: '24px', fontSize: '1.4rem' }}>Create New User</h3>
            
            <form onSubmit={createUser} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>Full Name</label>
                <input style={inputStyle} type="text" required placeholder="Hemanth Kumar" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>Email Address</label>
                <input style={inputStyle} type="email" required placeholder="user@example.com" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>Password (Optional)</label>
                <input style={inputStyle} type="password" placeholder="••••••••" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>Role</label>
                  <select style={inputStyle} value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>Age</label>
                  <input style={inputStyle} type="number" required value={newUser.age} onChange={e => setNewUser({...newUser, age: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px', background: '#22c55e' }}>Create Account</button>
                <button type="button" onClick={() => setIsAddingUser(false)} className="btn-secondary" style={{ flex: 1, padding: '12px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
