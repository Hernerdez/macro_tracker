// src/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MEAL_TYPE_MAP = {
  1: 'Breakfast',
  2: 'Lunch',
  3: 'Dinner',
  4: 'Sweet Treats'
};

function Dashboard() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [groupedFoods, setGroupedFoods] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

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

  // Fetch foods for selected date
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setLoading(true);
    axios.get('https://macro-tracker-api.onrender.com/dashboard/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        // Filter foods for selected date only (by meal.meal.date or time_logged if available)
        const foodsForDate = (res.data || []).filter(food => {
          if (food.meal && food.meal.date) {
            return food.meal.date === selectedDate;
          }
          if (food.time_logged) {
            return food.time_logged.slice(0, 10) === selectedDate;
          }
          return false;
        });
        setFoods(foodsForDate);
        // Group by meal_id
        const grouped = {};
        foodsForDate.forEach(food => {
          const mealId = food.meal_id;
          if (!grouped[mealId]) grouped[mealId] = [];
          grouped[mealId].push(food);
        });
        setGroupedFoods(grouped);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching foods:', err);
        setLoading(false);
      });
  }, [selectedDate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="date-picker">Select Date: </label>
        <input
          id="date-picker"
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
      </div>

      <h2>Your Foods for {selectedDate}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : Object.keys(groupedFoods).length === 0 ? (
        <p>No foods logged for this date.</p>
      ) : (
        Object.entries(groupedFoods).sort(([a], [b]) => a - b).map(([mealId, foods]) => (
          <div key={mealId} style={{ marginBottom: '2rem' }}>
            <h3>{MEAL_TYPE_MAP[mealId] || 'Other'}</h3>
            <ul>
              {foods.map(food => (
                <li key={food.id}>
                  <strong>{food.name}</strong> - {food.calories} kcal, {food.protein}g protein, {food.carbs}g carbs, {food.fats}g fat
                  {food.serving_size && food.serving_unit && (
                    <> ({food.serving_size} {food.serving_unit}{food.servings ? ` x${food.servings}` : ''})</>
                  )}
                  {food.time_logged && (
                    <> @ {new Date(food.time_logged).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
