import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const SENDER_ID = process.env.GOOGLE_SENDER_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'my-awesomeproject-first.firebaseapp.com',
  databaseURL: '<https://my-awesomeproject-first.firebaseio.com>',
  projectId: 'my-awesomeproject-first',
  storageBucket: 'my-awesomeproject-first.appspot.com',
  messagingSenderId: SENDER_ID,
  // appId: 'app-id',
  // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);