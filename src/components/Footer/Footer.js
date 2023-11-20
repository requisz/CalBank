import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'; 

function Footer() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/'); // Navigate to SignUp page after logging out.
    }).catch((error) => {
      // An error happened or handle log out differently
      console.error('Logout Error:', error);
    });
  };

  return (
    <footer className="footer">
      Contact me: <a href="mailto:prk3479@gmail.com">prk3479@gmail.com</a>
      <button onClick={handleLogOut}>Log Out</button>
    </footer>
  );
}

export default Footer;
