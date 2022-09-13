import {
  SIGNUP_USER,
  SIGNUP_USER_ERROR,
  SIGNUP_USER_RESET,
  LOADING_SIGNUP_USER,
} from "./signup.type";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import axios from "axios";
import { userUrl } from "../../../../config/url/api.url";

export const signup = (credentials, dispatch) => {
  dispatch({ type: SIGNUP_USER_RESET });
  dispatch({ type: LOADING_SIGNUP_USER });
  // auth()
  //   .createUserWithEmailAndPassword(credentials.email, credentials.password)
  //   .then((cred) => {
      axios
        .post(
          userUrl,
          {
            username: "sdfvsdjf",
            uid: "sdfkbjsdkf",
            email: "ab@gmail.com",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${"sdfkbjsdkf"}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch({
            type: SIGNUP_USER,
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: SIGNUP_USER_ERROR, payload: err });
        });
    // })
    // .then((err) => {
    //   dispatch({ type: SIGNUP_USER_ERROR, payload: err });
    // });
};

export const signupReset = (dispatch) => dispatch({ type: SIGNUP_USER_RESET });
