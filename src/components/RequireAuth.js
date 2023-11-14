// src/components/RequireAuth.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const RequireAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigate('/'); // Redirect to sign-in page if not authenticated
        } else {
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }, [navigate, auth]);

    if (loading) {
      return <div>Loading...</div>; // Or any loading spinner component
    }

    return <Component />;
  };

  return AuthenticatedComponent;
};

export default RequireAuth;
