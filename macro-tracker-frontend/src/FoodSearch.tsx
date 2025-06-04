import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Food {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  serving_size?: number;
  serving_unit?: string;
}

interface SearchResult extends Food {}

const FoodSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!query) { 
      setResults([]);
      return;
    }
    setLoading(true);
    setError('');
    axios.get(`https://macro-tracker-api.onrender.com/food/search?q=${encodeURIComponent(query)}`)
      .then(res => {
        setResults(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching food data');
        setLoading(false);
      });
  }, [query]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Optionally trigger search here if you want to only search on submit
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Food Search</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for food..."
          className="border rounded px-3 py-2 mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </form>
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {results.map(food => (
          <li key={food.id} className="p-4 bg-white rounded shadow">
            <strong>{food.name}</strong> — {food.calories} kcal, {food.protein}g protein, {food.carbs}g carbs, {food.fats}g fat
            {food.serving_size && food.serving_unit && (
              <> ({food.serving_size} {food.serving_unit})</>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodSearch; 