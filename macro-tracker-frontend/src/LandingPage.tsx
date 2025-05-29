import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  console.log("Landing page is rendering!");
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'lightblue', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ fontSize: '48px', color: 'black' }}>
        LANDING PAGE TEST
      </h1>
      <button 
        onClick={() => navigate('/signup')}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          backgroundColor: 'white',
          border: '1px solid black',
          cursor: 'pointer'
        }}
      >
        Go to Signup
      </button>
    </div>
  );
};

export default LandingPage;