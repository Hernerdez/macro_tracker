import { useState } from 'react';
import axios from 'axios';

const UNITS = ['oz', 'gram', 'lbs', 'kg', 'ml', 'cup', 'tbsp', 'tsp'];
const MEAL_TYPES = [
  { id: 1, name: 'Breakfast' },
  { id: 2, name: 'Lunch' },
  { id: 3, name: 'Dinner' },
  { id: 4, name: 'Sweet Treats' }
];

function SearchFood() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFood, setModalFood] = useState(null);
  const [form, setForm] = useState({
    servingSize: '',
    unit: 'gram',
    servings: 1,
    time: '',
    mealType: ''
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to search.');
      return;
    }

    try {
      const res = await axios.get(
        `https://macro-tracker-api.onrender.com/search-food/`,
        {
          params: { query },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResults(res.data.foods || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch food data.');
    }
  };

  const openModal = (food) => {
    setModalFood(food);
    setForm({
      servingSize: '',
      unit: 'gram',
      servings: 1,
      time: '',
      mealType: ''
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalFood(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogFood = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;
    if (!form.mealType) {
      alert('Please select a meal type.');
      return;
    }
    if (!form.servingSize || !form.unit || !form.servings) {
      alert('Please fill out all fields.');
      return;
    }
    const getNutrientValue = (id) => {
      const nutrient = modalFood.foodNutrients?.find(n => n.nutrientId === id);
      return nutrient ? nutrient.value : 0;
    };
    const payload = {
      name: modalFood.description,
      protein: Math.round(getNutrientValue(1003)),
      carbs: Math.round(getNutrientValue(1005)),
      fats: Math.round(getNutrientValue(1004)),
      calories: Math.round(getNutrientValue(1008)),
      meal_id: form.mealType,
      serving_size: form.servingSize,
      serving_unit: form.unit,
      servings: form.servings,
      ...(form.time ? { time_logged: form.time } : {})
    };
    try {
      await axios.post('https://macro-tracker-api.onrender.com/foods/', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(`${modalFood.description} logged!`);
      closeModal();
    } catch (err) {
      console.error(err);
      alert('Failed to log food.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Search Foods</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., banana, chicken"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {results.map((food, index) => {
          const getNutrient = (id) => {
            const nutrient = food.foodNutrients?.find(n => n.nutrientId === id);
            return nutrient ? `${Math.round(nutrient.value)} ${nutrient.unitName}` : 'N/A';
          };

          return (
            <li key={index} style={{ marginBottom: '1.5rem' }}>
              <strong>{food.description}</strong> {food.brandOwner && `(${food.brandOwner})`}
              <ul style={{ marginTop: '0.5rem' }}>
                <li>Calories: {getNutrient(1008)}</li>
                <li>Protein: {getNutrient(1003)}</li>
                <li>Carbs: {getNutrient(1005)}</li>
                <li>Fat: {getNutrient(1004)}</li>
              </ul>
              <button
                onClick={() => openModal(food)}
                style={{ marginTop: '0.5rem' }}
              >
                Log This
              </button>
            </li>
          );
        })}
      </ul>

      {modalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#222', padding: '2rem', borderRadius: '10px', minWidth: 320, color: '#fff', position: 'relative' }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: 10, right: 10, background: 'none', color: '#fff', border: 'none', fontSize: 20, cursor: 'pointer' }}>&times;</button>
            <h2>Log Food</h2>
            <form onSubmit={handleLogFood}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Serving Size: </label>
                <input type="number" name="servingSize" min="0.01" step="0.01" value={form.servingSize} onChange={handleFormChange} required style={{ width: 80 }} />
                <select name="unit" value={form.unit} onChange={handleFormChange} style={{ marginLeft: 8 }}>
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Number of Servings: </label>
                <input type="number" name="servings" min="1" step="1" value={form.servings} onChange={handleFormChange} required style={{ width: 60 }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Time Eaten (optional): </label>
                <input type="datetime-local" name="time" value={form.time} onChange={handleFormChange} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Meal Type: </label>
                <select name="mealType" value={form.mealType} onChange={handleFormChange} required>
                  <option value="">Select a meal</option>
                  {MEAL_TYPES.map(meal => (
                    <option key={meal.id} value={meal.id}>{meal.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" style={{ marginTop: '1rem' }}>Log Food</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchFood;
