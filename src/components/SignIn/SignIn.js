// src/components/SignIn.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust the path if your firebase.js file is located elsewhere

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (event) => {
    navigate('/main');
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/main');
    } catch (error) {
      console.error("Error signing in with email and password", error);
      // Add logic here to display error messages to the user
    }
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
