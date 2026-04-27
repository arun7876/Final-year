// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../firebase';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered!", userCredential.user);
      // Redirect to login after successful registration
      navigate('/login');
    } catch (err) {
      console.error("Error registering user:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '100px auto', 
      padding: '30px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          required
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: loading ? '#ccc' : '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login here</Link>
      </p>
    </div>
  );
}

export default Register;
