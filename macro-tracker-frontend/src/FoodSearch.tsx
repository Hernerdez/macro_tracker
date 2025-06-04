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
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState<SearchResult | null>(null);
  const [servingSize, setServingSize] = useState(1);
  const [servingUnit, setServingUnit] = useState('grams');
  const [servings, setServings] = useState(1);
  const [timeLogged, setTimeLogged] = useState('');
  const [mealType, setMealType] = useState('Breakfast');
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

  const handleAddClick = (food: SearchResult) => {
    setSelectedFood(food);
    setShowModal(true);
    setServingSize(1);
    setServingUnit('grams');
    setServings(1);
    setTimeLogged('');
    setMealType('Breakfast');
  };

  const handleAddFoodWithDetails = async () => {
    setError('');
    setSuccess('');
    // Find or create the meal for the selected mealType and date
    const today = new Date().toISOString().slice(0, 10);
    let meal = meals.find(m => m.meal_name === mealType && m.date === today);
    if (!meal) {
      // Create the meal if it doesn't exist
      const res = await api.post('/meals/', {
        date: today,
        meal_name: mealType,
      });
      meal = res.data;
      setMeals([...meals, meal]);
    }
    try {
      await api.post('/foods/', {
        meal_id: meal.id,
        name: selectedFood!.name,
        calories: selectedFood!.calories,
        protein: selectedFood!.protein,
        carbs: selectedFood!.carbs,
        fats: selectedFood!.fats,
        serving_size: servingSize,
        serving_unit: servingUnit,
        servings: servings,
        time_logged: timeLogged ? `${today}T${timeLogged}` : null,
      });
      setSuccess('Food added to your meal!');
    } catch (err) {
      setError('Error adding food to meal.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-black">
      <h1 className="text-2xl font-bold mb-4 text-black">Food Search</h1>
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
            <span className="text-black">
              <strong>{food.name}</strong> — {food.calories} kcal, {food.protein}g protein, {food.carbs}g carbs, {food.fats}g fat
              {food.serving_size && food.serving_unit && (
                <> ({food.serving_size} {food.serving_unit})</>
              )}
            </span>
            <button
              onClick={() => handleAddClick(food)}
              className="ml-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
      {/* Modal for food details */}
      {showModal && selectedFood && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-2">{selectedFood.name}</h2>
            <div className="mb-2">
              <label className="block mb-1">Serving Size</label>
              <input
                type="number"
                min={0}
                value={servingSize}
                onChange={e => setServingSize(Number(e.target.value))}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Serving Unit</label>
              <select
                value={servingUnit}
                onChange={e => setServingUnit(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="grams">grams</option>
                <option value="ounces">ounces</option>
                <option value="ml">ml</option>
                <option value="serving">serving</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1">Number of Servings</label>
              <input
                type="number"
                min={1}
                value={servings}
                onChange={e => setServings(Number(e.target.value))}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Time Logged (optional)</label>
              <input
                type="time"
                value={timeLogged}
                onChange={e => setTimeLogged(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Meal Type</label>
              <select
                value={mealType}
                onChange={e => setMealType(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Sweet Treats">Sweet Treats</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={async () => {
                  await handleAddFoodWithDetails();
                  setShowModal(false);
                }}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodSearch; 