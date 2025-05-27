import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="w-full flex justify-center pt-4">
        <button
          onClick={handleLogout}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow transition duration-300 hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        {!token && <Link to="/signup" style={{ marginRight: '1rem' }}>Signup</Link>}
        {token && <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>}
        {token && <Link to="/search" style={{ marginRight: '1rem' }}>Food Search</Link>}
      </nav>
    </div>
  );
};

export default Navbar;
