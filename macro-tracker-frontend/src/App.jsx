// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './Navbar';
import FoodSearch from './FoodSearch';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Welcome to Macro Tracker</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <FoodSearch />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
