import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './axios';

interface Food {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  serving_size?: number;
  serving_unit?: string;
  servings?: number;
  time_logged?: string;
}

interface Meal {
  id: number;
  date: string;
  meal_name: string;
  foods: Food[];
}

interface DailyTotals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dailyTotals, setDailyTotals] = useState<DailyTotals>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    api.get('/dashboard/')
      .then(res => {
        const mealsForDate: Meal[] = (res.data || []).filter((meal: Meal) => meal.date === selectedDate);
        const MEAL_ORDER = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
        mealsForDate.sort((a, b) => MEAL_ORDER.indexOf(a.meal_name) - MEAL_ORDER.indexOf(b.meal_name));
        setMeals(mealsForDate);

        // Calculate daily totals
        const totals = mealsForDate.reduce((acc, meal) => {
          meal.foods.forEach(food => {
            acc.calories += food.calories;
            acc.protein += food.protein;
            acc.carbs += food.carbs;
            acc.fats += food.fats;
          });
          return acc;
        }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
        setDailyTotals(totals);
        
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching meals:', err);
        setLoading(false);
      });
  }, [selectedDate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black">Macro Tracker</h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-black">{formatDate(selectedDate)}</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Daily Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-black truncate">Total Calories</dt>
              <dd className="mt-1 text-3xl font-semibold text-black">{dailyTotals.calories}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-black truncate">Protein</dt>
              <dd className="mt-1 text-3xl font-semibold text-black">{dailyTotals.protein}g</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-black truncate">Carbs</dt>
              <dd className="mt-1 text-3xl font-semibold text-black">{dailyTotals.carbs}g</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-black truncate">Fats</dt>
              <dd className="mt-1 text-3xl font-semibold text-black">{dailyTotals.fats}g</dd>
            </div>
          </div>
        </div>

        {/* Meals Section */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
              <p className="mt-4 text-black">Loading your meals...</p>
            </div>
          ) : meals.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-black">No meals logged for this date</h3>
              <p className="mt-2 text-black">Start tracking your nutrition by adding a meal!</p>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                  Add Meal
                </button>
              </div>
            </div>
          ) : (
            meals.map((meal) => (
              <div key={meal.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-black">{meal.meal_name}</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  {meal.foods.length === 0 ? (
                    <p className="text-black text-center py-4">No foods logged for this meal</p>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {meal.foods.map((food) => (
                        <li key={food.id} className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-black truncate">{food.name}</p>
                              <p className="text-sm text-black">
                                {food.calories} kcal • {food.protein}g protein • {food.carbs}g carbs • {food.fats}g fat
                                {food.serving_size && food.serving_unit && (
                                  <span className="ml-2">
                                    ({food.serving_size} {food.serving_unit}{food.servings ? ` x${food.servings}` : ''})
                                  </span>
                                )}
                              </p>
                            </div>
                            {food.time_logged && (
                              <div className="ml-4 flex-shrink-0">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-black">
                                  {new Date(food.time_logged).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="px-4 py-4 sm:px-6 bg-gray-50">
                  <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                    Add Food
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 