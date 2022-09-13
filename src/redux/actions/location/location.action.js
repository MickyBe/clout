import {
  GET_FRIENDS_LOCATION,
  GET_FRIENDS_LOCATION_ERROR,
  GET_FRIENDS_LOCATION_LOADING,
  GET_FRIENDS_LOCATION_RESET,
  SEND_LOCATION,
  SEND_LOCATION_RESET,
  SEND_LOCATION_ERROR,
  SEND_LOCATION_LOADING 
} from "./location.type";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const getFriendsLocation = (dispatch) => {
  const user = auth().currentUser;
  dispatch({ type: GET_FRIENDS_LOCATION_RESET });
  dispatch({ type: GET_FRIENDS_LOCATION_LOADING });
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
        type: GET_FRIENDS_LOCATION,
        payload: Friends,
      });
    })
    .catch((err) => dispatch({ type: GET_FRIENDS_LOCATION_ERROR, payload: err }));
};
//
export const sendUserLocation = (values, dispatch) => {
   
  const user = auth().currentUser;
  const userId = user.uid;
  const { key, ...data } = values;
  const { displayName, photoURL } = user;
  dispatch({ type: SEND_LOCATION_RESET });
  dispatch({ type: SEND_LOCATION_LOADING });
  firestore()
    .collection("users")
    .doc(userId)
    .collection("friendRequestSent")
    .doc(key)
    .set({
      ...data,
    })
    .then((data) => {
      firestore()
        .collection("users")
        .doc(key)
        .collection("friendRequestRecived")
        .doc(userId)
        .set({
          name: displayName,
          photoURL: photoURL,
        })
        .then((data) => {
          searchFriends(values.name, dispatch);
          dispatch({ type: SEND_LOCATION, payload: data });
        })
        .catch((err) => dispatch({ type: SEND_LOCATION_ERROR, payload: err }));
    })
    .catch((err) => dispatch({ type: SEND_LOCATION_ERROR, payload: err }));
};
//
export const searchFriends = (values, dispatch) => {
  const user = auth().currentUser;
  const userId = user.uid;
  const { displayName, photoURL } = user;
  dispatch({ type: SEARCH_FRIENDS_LOCATION_RESET });
  dispatch({ type: SEARCH_FRIENDS_LOCATION_LOADING });
  firestore()
    .collection("users")
    .doc(userId)
    .collection("friends")
    .get()
    .then((querySnapshot) => {
      const Friends = [];
      querySnapshot.forEach((documentSnapshot) => {
        Friends.push({
          key: documentSnapshot.id,
        });
      });
      firestore()
        .collection("users")
        .orderBy("name")
        .startAt(values)
        .startAfter(values)
        .endBefore(values + "\uf8ff")
        .endAt(values + "\uf8ff")
        .get()
        .then((querySnapshot) => {
          const users = [];
          const usersFriends = [];
          querySnapshot.forEach((documentSnapshot) => {
            let isFriend = false;
            for (let i = 0; i < Friends.length; i++) {
              if (Friends[i].key == documentSnapshot.id) {
                console.log("is friend", Friends[i].key, documentSnapshot.id);
                users.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
                isFriend = true;
                break;
              } else {
                console.log("not friend", Friends[i].key, documentSnapshot.id);
              }
            }
            if (!isFriend) {
              usersFriends.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            }
          });
          dispatch({ type: SEARCH_FRIENDS_LOCATION, payload: { users, usersFriends } });
          // setUsers(users);
          // setUsersFriends(usersFriends);
        })
        .catch((err) => dispatch({ type: SEARCH_FRIENDS_LOCATION_ERROR, payload: err }));
    })
    .catch((err) => dispatch({ type: SEARCH_FRIENDS_LOCATION_ERROR, payload: err }));
};
