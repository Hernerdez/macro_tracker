// src/FoodSearch.jsx
import { useState } from 'react';
import axios from 'axios';

const FoodSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.get(
        `https://macro-tracker-api.onrender.com/search-food/`,
        {
          params: { query },
        }
      );
      setResults(res.data.foods || []);
    } catch (err) {
      console.error(err);
      setError('Error fetching food data');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Search Foods</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {results.map((food) => (
          <li key={food.fdcId}>
            {food.description} — {food.foodCategory}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodSearch;
