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
    <div className="p-6 bg-gray-50 min-h-screen text-gray-900 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary animate-fade-in">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition duration-300">
          Logout
        </button>
      </div>
  
      <div className="mb-6">
        <label htmlFor="date-picker" className="block font-semibold text-gray-700 mb-1">Select Date:</label>
        <input
          id="date-picker"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
  
      <h2 className="text-xl font-semibold mb-4">Your Meals for {selectedDate}</h2>
      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : meals.length === 0 ? (
        <p className="text-gray-500">No meals logged for this date.</p>
      ) : (
        meals.map((meal) => (
          <div key={meal.id} className="mb-4 p-4 rounded shadow bg-white transition-transform duration-300 hover:scale-105 animate-fade-in">
            <h3 className="text-lg font-bold mb-2 text-primary">{meal.meal_name}</h3>
            {meal.foods.length === 0 ? (
              <p className="text-gray-500">No foods logged for this meal.</p>
            ) : (
              <ul className="space-y-1">
                {meal.foods.map((food) => (
                  <li key={food.id} className="flex justify-between items-center text-sm">
                    <span>
                      <strong>{food.name}</strong> - {food.calories} kcal, {food.protein}g protein, {food.carbs}g carbs, {food.fats}g fat
                      {food.serving_size && food.serving_unit && (
                        <> ({food.serving_size} {food.serving_unit}{food.servings ? ` x${food.servings}` : ''})</>
                      )}
                      {food.time_logged && (
                        <> @ {new Date(food.time_logged).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>
                      )}
                    </span>
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
