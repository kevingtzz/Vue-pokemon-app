import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAC3VTDkQM8kbk1ggCEB1RSjVmH8snaEmQ',
  authDomain: 'pokemon-f60bf.firebaseapp.com',
  projectId: 'pokemon-f60bf',
  storageBucket: 'pokemon-f60bf.appspot.com',
  messagingSenderId: '74517133126',
  appId: '1:74517133126:web:220966e6bd211228aad747',
  measurementId: 'G-2R7WXL6DZ0',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid); // doc parameters: database, callection, unique ID
  const favoritesDocRef = doc(db, 'UsersFavorites', userAuth.uid); // doc parameters: database, callection, unique ID
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    const favorites = {};

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        favorites,
      });
      await setDoc(favoritesDocRef, {});
    } catch (error) {
      console.error('Error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const dbAddFavorite = async (auth, pokemon) => {
  const userId = auth.uid;
  await setDoc(
    doc(db, 'UsersFavorites', userId),
    {
      [pokemon.id]: pokemon,
    },
    { merge: true }
  );
};

export const dbRemoveFavorite = async (auth, pokemon) => {
  const userId = auth.uid;
  const docRef = doc(db, 'UsersFavorites', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    delete data[pokemon.id];
    setDoc(docRef, data);
  }
};

export const getFavorites = async (auth) => {
  if (!auth) return {};
  const userId = auth.uid;
  const docRef = doc(db, 'UsersFavorites', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  } else {
    console.log('No such document!');
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const userAuth = await signInWithEmailAndPassword(auth, email, password);
  return userAuth;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => auth.currentUser;
