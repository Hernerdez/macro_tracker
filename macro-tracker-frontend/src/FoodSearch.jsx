import { useState, useEffect } from 'react';
import axios from 'axios';

function SearchFood() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState({});

  useEffect(() => {
    const fetchMeals = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('https://macro-tracker-api.onrender.com/meals/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMeals(res.data);
      } catch (err) {
        console.error('Failed to fetch meals:', err);
      }
    };

    fetchMeals();
  }, []);

  const handleMealSelect = (foodIndex, mealId) => {
    setSelectedMeals(prev => ({
      ...prev,
      [foodIndex]: mealId
    }));
  };

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

  const handleLogFood = async (food, index) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const selectedMealId = selectedMeals[index];
    if (!selectedMealId) {
      alert('Please select a meal first');
      return;
    }

    const getNutrientValue = (id) => {
      const nutrient = food.foodNutrients?.find(n => n.nutrientId === id);
      return nutrient ? nutrient.value : 0;
    };

    const payload = {
      name: food.description,
      protein: Math.round(getNutrientValue(1003)),
      carbs: Math.round(getNutrientValue(1005)),
      fats: Math.round(getNutrientValue(1004)),
      calories: Math.round(getNutrientValue(1008)),
      meal_id: selectedMealId
    };

    try {
      await axios.post('https://macro-tracker-api.onrender.com/foods/', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(`${food.description} logged!`);
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

              <div style={{ marginTop: '0.5rem' }}>
                <select
                  value={selectedMeals[index] || ''}
                  onChange={(e) => handleMealSelect(index, e.target.value)}
                  style={{ marginRight: '0.5rem' }}
                >
                  <option value="">Select a meal</option>
                  {meals.map(meal => (
                    <option key={meal.id} value={meal.id}>
                      {meal.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleLogFood(food, index)}
                  disabled={!selectedMeals[index]}
                >
                  Log This
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchFood;
