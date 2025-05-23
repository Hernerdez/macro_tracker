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
            Authorization: `Bearer ${token}`, // optional, in case you want to protect
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
        {results.map((food, index) => (
          <li key={index}>
            <strong>{food.description}</strong> {food.brandOwner && `(${food.brandOwner})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchFood;
