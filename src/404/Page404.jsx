import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
    const navigate = useNavigate()
  const handleLoginClick = () => {
    if (history) {
      navigate('/login');
    } else {
      console.error('History object not found. Cannot redirect to Login page.');
    }
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', marginLeft: '10px' }}> {/* Inline styles for layout */}
      <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>404 Page Not Found</h2> {/* Inline styles for h2 */}
      <p style={{ fontSize: '1.2rem', color: '#777' }}>Redirecting to <a onClick={handleLoginClick} style={{ color: 'dodgerblue', cursor: 'pointer', textDecoration: 'none' }}>Login Page</a></p> {/* Inline styles for p and anchor */}
    </section>
  );
};

export default Page404;