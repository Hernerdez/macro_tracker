// src/FoodSearch.jsx
import { useState } from 'react';
import axios from 'axios';

function FoodSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://macro-tracker-api.onrender.com/search-food/`, {
        params: { query },
      });
      setResults(response.data.foods || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error fetching data');
      setResults([]);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search for Food</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. banana"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {results.map((item) => (
          <li key={item.fdcId}>
            <strong>{item.description}</strong> - Brand: {item.brandOwner || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodSearch;
