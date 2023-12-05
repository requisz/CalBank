import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import '../../App.css'


function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/main");
    } catch (error) {
      console.error("Error signing in with email and password", error);
    }
  };
  const handleSignUp = () => {
    
    navigate("/SignUp");
  };

  return (
    <div className="container">
        <form className="signin-form" onSubmit={handleSignIn}>
            <h2 className="signin-title">Sign In</h2>
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
            <button type="submit" className="button" onClick={handleSignIn}>
              Sign In
            </button>
            <button type="submit" className="button" onClick={handleSignUp}>
              Sign Up
            </button>
        </form>
    </div>
);
}

export default SignIn;