import {
  GET_FRIENDS,
  GET_FRIENDS_ERROR,
  GET_FRIENDS_LOADING,
  GET_FRIENDS_RESET,
} from "./friend.type";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const getFriends = (dispatch) => {
  const user = auth().currentUser;
  dispatch({ type: GET_FRIENDS_RESET });
  dispatch({ type: GET_FRIENDS_LOADING });
  firestore()
    .collection("users")
    .doc(user.uid)
    .collection("friends")
    .get()
    .then((querySnapshot) => {
      const Friends = [];
      querySnapshot.forEach((documentSnapshot) => {
        Friends.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      dispatch({
        type: GET_FRIENDS,
        payload: Friends,
      });
    })
    .catch((err) => dispatch({ type: GET_FRIENDS_ERROR, payload: err }));
};
