

import React from "react";
import { useNavigate, navigate } from "react-router-dom";
import RequireAuth from "../RequireAuth";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Work in Progress
function Friends() {
  const navigate = useNavigate();
  const handleFriends= () => {
    
    navigate('/UserProfile');
  };
  return (
    <div>
      <h1>Profile Updated!</h1>
      <button className="button" onClick={handleFriends}>Return to Page</button>
      <Footer />
    </div>
  );
}

export default RequireAuth(Friends);
