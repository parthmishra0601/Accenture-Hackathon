import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signInWithGoogle, useAuthState } from '../firebase'; // Adjust the path as needed

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, loadingUser] = useAuthState(); // Firebase hook to get auth status

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const { user, error: googleError } = await signInWithGoogle();
    setLoading(false);

    if (googleError) {
      console.error('Google Sign-in Error:', googleError);
      setError(googleError.message || googleError.code || 'Google Sign-in failed.');
    } else if (user) {
      navigate('/dashboard');
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

        <button
          className="btn btn-danger w-100"
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{ borderRadius: '8px', fontWeight: 'bold', transition: '0.3s' }}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            'Sign in with Google'
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Login;
