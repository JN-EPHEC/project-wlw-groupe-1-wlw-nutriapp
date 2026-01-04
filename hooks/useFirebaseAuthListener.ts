import { useEffect, useState } from 'react';

import type { User } from 'firebase/auth';

import { onAuthStateChange } from '@/services/authService';

export function useFirebaseAuthListener() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });

    return () => unsubscribe?.();
  }, []);

  return { user, initializing };
}

export default useFirebaseAuthListener;
