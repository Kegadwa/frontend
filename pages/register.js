import React, { useState } from 'react';
import { db, auth } from '../src/lib/firebase'; // Ensure this path is correct
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user data to Firestore (if needed)
      const userRef = collection(db, 'users');
      await addDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      });

      alert("Google Sign-In successful!");
      window.location.href = '/profile'; // Redirect user to chat or another page
    } catch (error) {
      console.error("Error with Google Sign-In: ", error);
      alert("Google Sign-In failed: " + error.message);
    }
  };console.log('Name:', name);
console.log('Email:', email);
console.log('Password:', password);

  const handleRegister = async () => {
    // Basic email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user details to Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        email,
      });

      alert("Registration successful!");
      // Reset input fields
      setName('');
      setEmail('');
      setPassword('');
      // Redirect to chat page or login page
      window.location.href = '/profile'; // Adjust the path as necessary
    } catch (error) {
      console.error("Error during registration: ", error);
      alert("Registration failed: " + error.message);
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
        <h2 style={{ margin: 0, textAlign: 'left' }}>Registration</h2>
        <p>
          <a href="/login" style={{ float: 'right', color: '#cd6f16', textDecoration: 'none' }}>Have an account? Login</a>
        </p>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          placeholder="Password (6+ characters)"
          required
          minLength="6"
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
          onClick={handleRegister}
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
          Submit
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
          textAlign: 'center',
        }}>
          <img src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="Google Logo" width="20" style={{ marginRight: '10px' }} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Register;