// src/FoodSearch.jsx
import { useState } from 'react';
import axios from 'axios';

function FoodSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);

    try {
      const res = await axios.get(`https://macro-tracker-api.onrender.com/search-food/`, {
        params: { query },
      });
      setResults(res.data.foods || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch food data.');
    }
  };

  return (
    <div>
      <h2>Search Food</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for food"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {results.map((food) => (
          <li key={food.fdcId}>
            <strong>{food.description}</strong> ({food.brandOwner || 'Generic'})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodSearch;
