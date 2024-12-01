import React, { useState } from 'react';
import { auth } from '../src/lib/firebase'; // Ensure the path is correct
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle email/password login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      window.location.href = '/profile'; // Redirect to profile page
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Login failed: ' + error.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Google Sign-In successful!');
      window.location.href = '/profile'; // Redirect to profile page
    } catch (error) {
      console.error('Google Sign-In failed:', error.message);
      alert('Google Sign-In failed: ' + error.message);
    }
  };

  return (
    <div style={{ margin: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#7941057a', padding: '20px' }}>
      <div style={{
        width: '400px',
        margin: '60px auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ margin: 0, textAlign: 'left' }}>Login</h2>
        <a href="/register" style={{
          textAlign: 'center',
          display: 'block',
          margin: '10px 0',
          color: '#cd6f16',
          textDecoration: 'none',
        }}>Or Create an account</a>
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '75%',
            height: '40px',
            margin: '10px 0',
            padding: '10px',
            border: 'none',
            borderBottom: '2px solid #cd6f16',
            borderRadius: '0',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '75%',
            height: '40px',
            margin: '10px 0',
            padding: '10px',
            border: 'none',
            borderBottom: '2px solid #cd6f16',
            borderRadius: '0',
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            height: '40px',
            margin: '10px 0',
            backgroundColor: '#cd6f16',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        <button
          onClick={handleGoogleSignIn}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '40px',
            margin: '10px 0',
            backgroundColor: '#ffffff',
            color: '#cd6f16',
            border: '2px solid #cd6f16',
            borderRadius: '10px',
            cursor: 'pointer',
            textDecoration: 'none',
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          <img src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="Google Logo" width="20" style={{ marginRight: '10px' }} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;