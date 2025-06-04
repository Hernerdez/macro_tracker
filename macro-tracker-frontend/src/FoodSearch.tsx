import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import api from './axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [success, setSuccess] = useState<string>('');
  const [meals, setMeals] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's meals for today (to get meal IDs)
    api.get('/dashboard/')
      .then(res => setMeals(res.data || []))
      .catch(() => setMeals([]));
  }, []);

  useEffect(() => {
    if (!query) { 
      setResults([]);
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    axios.get(`https://macro-tracker-api.onrender.com/search-food/?query=${encodeURIComponent(query)}`)
      .then(res => {
        // Map USDA foods to your SearchResult interface
        const foods = (res.data.foods || []).map((food: any) => ({
          id: food.fdcId,
          name: food.description,
          calories: extractNutrient(food, 1008), // Energy
          protein: extractNutrient(food, 1003),  // Protein
          carbs: extractNutrient(food, 1005),    // Carbs
          fats: extractNutrient(food, 1004),     // Fat
        }));
        setResults(foods);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching food data');
        setLoading(false);
      });
  }, [query]);

  // Helper function to extract nutrient value by nutrient number
  function extractNutrient(food: any, nutrientNumber: number) {
    const nutrient = (food.foodNutrients || []).find((n: any) => n.nutrientNumber == nutrientNumber || n.nutrientId == nutrientNumber);
    return nutrient ? nutrient.value : 0;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Optionally trigger search here if you want to only search on submit
  };

  const handleAddFood = async (food: SearchResult) => {
    setError('');
    setSuccess('');
    if (!meals.length) {
      setError('No meal found for today. Please create a meal first.');
      return;
    }
    // Add to the most recent meal
    const mealId = meals[meals.length - 1].id;
    try {
      await api.post('/foods/', {
        meal_id: mealId,
        name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fats: food.fats,
        serving_size: 1,
        serving_unit: 'serving',
        servings: 1,
      });
      setSuccess('Food added to your meal!');
    } catch (err) {
      setError('Error adding food to meal.');
    }
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
      {success && <p className="text-green-600">{success}</p>}
      <ul className="space-y-2">
        {results.map(food => (
          <li key={food.id} className="p-4 bg-white rounded shadow flex items-center justify-between">
            <span>
              <strong>{food.name}</strong> — {food.calories} kcal, {food.protein}g protein, {food.carbs}g carbs, {food.fats}g fat
              {food.serving_size && food.serving_unit && (
                <> ({food.serving_size} {food.serving_unit})</>
              )}
            </span>
            <button
              onClick={() => handleAddFood(food)}
              className="ml-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodSearch; 