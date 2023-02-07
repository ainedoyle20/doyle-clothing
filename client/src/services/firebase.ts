import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDD61kl9EOdsHw5toEZMqYa4hofQjWrCNo",
  authDomain: "pin-it-69ab6.firebaseapp.com",
  projectId: "pin-it-69ab6",
  storageBucket: "pin-it-69ab6.appspot.com",
  messagingSenderId: "1067820271469",
  appId: "1:1067820271469:web:9a2bb7d91a7a262fb2fc64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

type AuthInfo = {
  email: string;
  password: string;
}

type FirebaseUser = {
  userId: string;
  email: string | null;
}

export const registerUser = async (registerInfo: AuthInfo): Promise<FirebaseUser | undefined> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, registerInfo.email, registerInfo.password);
    const { uid, email } = user;
    return { userId: uid, email };
  } catch (error) {
    console.log("Error registering user with firebase: ", error);
  }
}

export const loginUser = async (loginInfo: AuthInfo): Promise<FirebaseUser | undefined> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
    const { uid, email } = user;
    return { userId: uid, email };
  } catch (error) {
    console.log("Error logging in user to firebase: ", error);
  }
}

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error logging out user from firebase: ", error);
  }
}
