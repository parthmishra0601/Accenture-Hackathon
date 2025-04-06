import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && password) {
      // Save credentials to localStorage
      const user = { name, email, password };
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to login
      navigate('/login');
    } else {
      setError('Please fill out all fields');
    }
  };

  return (
    <motion.div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: 'linear-gradient(to right, #43cea2, #185a9d)',
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
        <h3 className="text-center mb-4" style={{ color: '#185a9d' }}>
          Create Account ✨
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ borderRadius: '8px' }}
            />
          </div>
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
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: '8px' }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              borderRadius: '8px',
              backgroundColor: '#185a9d',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
            }}
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#185a9d', fontWeight: 'bold' }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
