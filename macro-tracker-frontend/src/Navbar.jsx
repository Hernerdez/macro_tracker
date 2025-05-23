import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
  <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>

  {!token && <Link to="/signup" style={{ marginRight: '1rem' }}>Signup</Link>}
  {!token && <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>}
  {token && <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>}
  {token && <Link to="/search" style={{ marginRight: '1rem' }}>Food Search</Link>}

  {token && (
    <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
      Logout
    </button>
  )}
</nav>

  );
};

export default Navbar;
