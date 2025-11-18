// Service d'authentification Firebase
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './firebase';
import { createPatientProfile } from './userService';

/**
 * Inscription avec email/password
 */
export const signUpWithEmail = async (email, password, userData = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Créer le profil patient dans Firestore
    await createPatientProfile(user.uid, {
      ...userData,
      email: user.email,
    });

    return { success: true, user };
  } catch (error) {
    console.error('Error signing up:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Connexion avec email/password
 */
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Connexion avec Google
 */
export const signInWithGoogle = async (idToken) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;

    // Vérifier si le profil existe, sinon le créer
    // TODO: Vérifier l'existence du profil avant de créer
    try {
      await createPatientProfile(user.uid, {
        email: user.email,
        displayName: user.displayName,
      });
    } catch (profileError) {
      // Le profil existe peut-être déjà, ce n'est pas grave
      console.log('Profile may already exist:', profileError);
    }

    return { success: true, user };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Déconnexion
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Écouter les changements d'état d'authentification
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

