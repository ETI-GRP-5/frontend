import { useEffect } from 'react';
import { useAuth } from 'provider/AuthProvider';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import useSWR from 'swr';

const Auth = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        // Redirect to sign-in page if user is null
        return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  if (user !== null) {
    return <Outlet />;
  } else{
    // Only redirect if there is no error
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }
};

export default Auth;
