import { Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login'; // You can add this if you haven’t already

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
