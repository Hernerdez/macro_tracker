import { Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default App;
