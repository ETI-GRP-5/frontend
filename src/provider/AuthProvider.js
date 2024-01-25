import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        console.log(firebaseUser)
        setUser(firebaseUser);
        setLoading(false);

        if (!firebaseUser) {
            // Redirect to sign-in page if user is null
            navigate('/auth/sign-in');
        }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
