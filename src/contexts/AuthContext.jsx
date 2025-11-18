import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChange } from '@/src/services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Écouter les changements d'état d'authentification Firebase
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      if (firebaseUser) {
        setIsLoggedIn(true);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = async () => {
    const { signOut } = await import('@/src/services/authService');
    await signOut();
    setIsLoggedIn(false);
    setUser(null);
  };

  // Fonction temporaire pour forcer la connexion
  const forceLogin = () => {
    setIsLoggedIn(true);
    setUser({
      uid: 'temp-user-id',
      email: 'temp@example.com',
      displayName: 'Utilisateur Test',
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, forceLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

