import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

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
        // Filter meals for selected date
        const mealsForDate = (res.data || []).filter(meal => meal.date === selectedDate);
  
        // 1️⃣ Sort meals by the desired order
        const MEAL_ORDER = ['Breakfast', 'Lunch', 'Dinner', 'Sweet Treats'];
        mealsForDate.sort((a, b) => {
          return MEAL_ORDER.indexOf(a.meal_name) - MEAL_ORDER.indexOf(b.meal_name);
        });
  
        setMeals(mealsForDate);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching meals:', err);
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

      <h2>Your Meals for {selectedDate}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : meals.length === 0 ? (
        <p>No meals logged for this date.</p>
      ) : (
        meals.map((meal) => (
          <div key={meal.id} style={{ marginBottom: '2rem' }}>
            <h3>{meal.meal_name}</h3>
            {meal.foods.length === 0 ? (
              <p>No foods logged for this meal.</p>
            ) : (
              <ul>
                {meal.foods.map(food => (
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
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
