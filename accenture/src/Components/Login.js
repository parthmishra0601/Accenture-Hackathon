import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get stored credentials from localStorage
    const storedEmail = localStorage.getItem('signupEmail');
    const storedPassword = localStorage.getItem('signupPassword');

    if (email === storedEmail && password === storedPassword) {
      navigate('/'); // redirect to Dashboard
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <motion.div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
        padding: '20px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '15px',
          backgroundColor: '#ffffffee',
        }}
      >
        <h3 className="text-center mb-4" style={{ color: '#4e54c8' }}>
          Welcome Back 👋
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: '8px' }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              borderRadius: '8px',
              backgroundColor: '#4e54c8',
              border: 'none',
              fontWeight: 'bold',
              transition: '0.3s',
            }}
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#4e54c8', fontWeight: 'bold' }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
