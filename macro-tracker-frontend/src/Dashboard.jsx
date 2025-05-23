// src/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // ❌ Clear token
    navigate('/login');                // 🔁 Redirect
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // redirect if not logged in
    }
  }, [navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>You are logged in!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
