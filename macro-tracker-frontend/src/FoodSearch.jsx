import { useState } from 'react';
import axios from 'axios';

function SearchFood() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

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
            return nutrient ? `${nutrient.value} ${nutrient.unitName}` : 'N/A';
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchFood;
