import React, { createContext, useContext, useMemo, useState } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthed] = useState(false);
  const value = useMemo<AuthContextValue>(
    () => ({ isAuthenticated, signIn: () => setAuthed(true), signOut: () => setAuthed(false) }),
    [isAuthenticated]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
