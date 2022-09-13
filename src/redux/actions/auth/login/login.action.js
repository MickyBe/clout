import {
  LOADING_LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER,
  LOGIN_USER_RESET,
} from "./login.type";
import auth from "@react-native-firebase/auth";

export const login = (credentials, dispatch) => {
  dispatch({ type: LOGIN_USER_RESET });
  dispatch({ type: LOADING_LOGIN_USER });
  auth()
    .signInWithEmailAndPassword(credentials.userName, credentials.password)
    .then((res) =>
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      })
    )
    .catch((err) => dispatch({ type: LOGIN_USER_ERROR, payload: err }));
};

export const loginReset = (dispatch) => dispatch({ type: LOGIN_USER_RESET });
