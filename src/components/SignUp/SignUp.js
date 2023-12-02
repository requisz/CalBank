import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      navigate("/main"); // Redirect to the main page or a welcome page after successful sign-up
    } catch (error) {
      console.error("Error creating a new user", error);
    }
  };

  return (
    <div className="container">
      <form className="signin-form" onSubmit={handleSignUp}>
        <h2 className="signin-title">Sign Up</h2>
        <div className="form-group">
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
