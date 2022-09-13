import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "react-native-google-signin";

//signe up user
export const signUpUser = async ({ name, email, password }) => {
  try {
    const user = await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        console.log("this is the user to sign up");
        return firestore().collection("users").doc(cred.user.uid).set({
          userName: name,
          userProfile: "",
          currentLocation: "",
          last_Active: firestore.FieldValue.serverTimestamp(),
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      })
      .then((data) => {
        console.log("User added when sign up!", data);
      });
    //
    auth().currentUser.updateProfile({
      displayName: name,
    });
    return { user };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
//Login user
export const loginUser = async ({ email, password }) => {
  try {
    const user = await auth().signInWithEmailAndPassword(email, password);
    console.log("we here user loged in", user);
    return { user };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
//password reset
export const sendEmailWithPassword = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const LogoutUser = async () => {
  try {
    await auth().signOut();
    await GoogleSignin.signOut();
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
