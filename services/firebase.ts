import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const firebaseConfig = require('@/firebase_env');

const app = initializeApp(firebaseConfig as Record<string, unknown>);

export const auth = (() => {
	if (Platform.OS === 'web') {
		return getAuth(app);
	}

	try {
		return initializeAuth(app, {
			persistence: getReactNativePersistence(ReactNativeAsyncStorage),
		});
	} catch {
		return getAuth(app);
	}
})();
export const db = getFirestore(app);

export default app;
