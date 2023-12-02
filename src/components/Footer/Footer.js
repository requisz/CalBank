import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Footer() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <footer className="footer">
      Contact me:
      <a href="mailto:prk3479@gmail.com">
        <i className="fas fa-envelope"></i> prk3479@gmail.com
      </a>
      <a href="https://www.linkedin.com/in/rakesh-pamulapati-b82836274/" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin"></i> LinkedIn
      </a>
      <a href="https://rakeshp.blog" target="_blank" rel="noopener noreferrer">
        <i className="fas fa-globe"></i> Website
      </a>
      <button type="submit" className="button" onClick={handleLogOut}>
        Log Out
      </button>
    </footer>
  );
}

export default Footer;
