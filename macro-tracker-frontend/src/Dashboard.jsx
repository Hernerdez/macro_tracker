// src/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Redirect if no token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch meals
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('https://macro-tracker-api.onrender.com/meals/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => setMeals(res.data))
      .catch(err => console.error('Error fetching meals:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Your Meals</h2>
      {meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <ul>
          {meals.map(meal => (
            <li key={meal.id}>
              {meal.meal_name} - {meal.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
