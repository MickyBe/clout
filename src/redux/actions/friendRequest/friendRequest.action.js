import {
  FRIEND_REQUEST_RECIEVED,
  FRIEND_REQUEST_RECIEVED_RESET,
  FRIEND_REQUEST_RECIEVED_ERROR,
  FRIEND_REQUEST_RECIEVED_LOADING,
  ACCEPT_REQUEST,
  ACCEPT_REQUEST_ERROR,
  ACCEPT_REQUEST_LOADING,
  ACCEPT_REQUEST_RESET,
  REJECT_REQUEST,
  REJECT_REQUEST_ERROR,
  REJECT_REQUEST_LOADING,
  REJECT_REQUEST_RESET,
  SEND_REQUEST,
  SEND_REQUEST_RESET,
  SEND_REQUEST_ERROR,
  SEND_REQUEST_LOADING,
  SEARCH_FRIENDS,
  SEARCH_FRIENDS_ERROR,
  SEARCH_FRIENDS_RESET,
  SEARCH_FRIENDS_LOADING,
} from "./friendRequest.type";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const getFriendRequest = async (dispatch) => {
  const user = auth().currentUser;
  const userId = user.uid;
  dispatch({ type: FRIEND_REQUEST_RECIEVED_RESET });
  dispatch({ type: FRIEND_REQUEST_RECIEVED_LOADING });
  try {
    firestore()
      .collection("users")
      .doc(userId)
      .collection("friendRequestRecived")
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        dispatch({
          type: FRIEND_REQUEST_RECIEVED,
          payload: users,
        });
      });
  } catch (err) {
    dispatch({ type: FRIEND_REQUEST_RECIEVED_ERROR, payload: err });
  }
};

export const acceptFriendRequest = (values, dispatch) => {
  const user = auth().currentUser;
  const userId = user.uid;
  const { key, ...data } = values;
  const { displayName, photoURL } = user;
  dispatch({ type: ACCEPT_REQUEST_RESET });
  dispatch({ type: ACCEPT_REQUEST_LOADING });
  firestore()
    .collection("users")
    .doc(userId)
    .collection("friends")
    .doc(key)
    .set({
      ...data,
    })
    .then((data) => {
      firestore()
        .collection("users")
        .doc(key)
        .collection("friends")
        .doc(userId)
        .set({
          name: displayName,
          photoURL: photoURL,
        })
        .then((data) => {
          dispatch({ type: ACCEPT_REQUEST });
          rejectFriendRequest(values, dispatch);
        })
        .catch((err) => dispatch({ type: ACCEPT_REQUEST_ERROR, payload: err }));
    })
    .catch((err) => dispatch({ type: ACCEPT_REQUEST_ERROR, payload: err }));
};

export const rejectFriendRequest = (values, dispatch) => {
  const { key, ...data } = values;
  const user = auth().currentUser;
  const userId = user.uid;
  dispatch({ type: REJECT_REQUEST_RESET });
  dispatch({ type: REJECT_REQUEST_LOADING });
  firestore()
    .collection("users")
    .doc(userId)
    .collection("friendRequestRecived")
    .doc(key)
    .delete()
    .then((data) => {
      firestore()
        .collection("users")
        .doc(key)
        .collection("friendRequestRecived")
        .doc(userId)
        .delete()
        .then((data) => {
          dispatch({ type: REJECT_REQUEST });
          getFriendRequest(dispatch);
        })
        .catch((err) => dispatch({ type: REJECT_REQUEST_ERROR, payload: err }));
    })
    .catch((err) => dispatch({ type: REJECT_REQUEST_ERROR, payload: err }));
};

export const sendFriendRequest = (values, dispatch) => {
  const user = auth().currentUser;
  const userId = user.uid;
  const { key, ...data } = values;
  const { displayName, photoURL } = user;
  dispatch({ type: SEND_REQUEST_RESET });
  dispatch({ type: SEND_REQUEST_LOADING });
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
          dispatch({ type: SEND_REQUEST, payload: data });
        })
        .catch((err) => dispatch({ type: SEND_REQUEST_ERROR, payload: err }));
    })
    .catch((err) => dispatch({ type: SEND_REQUEST_ERROR, payload: err }));
};

export const searchFriends = (values, dispatch) => {
  const user = auth().currentUser;
  const userId = user.uid;
  const { displayName, photoURL } = user;
  dispatch({ type: SEARCH_FRIENDS_RESET });
  dispatch({ type: SEARCH_FRIENDS_LOADING });
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
          dispatch({ type: SEARCH_FRIENDS, payload: { users, usersFriends } });
          // setUsers(users);
          // setUsersFriends(usersFriends);
        })
        .catch((err) => dispatch({ type: SEARCH_FRIENDS_ERROR, payload: err }));
    })
    .catch((err) => dispatch({ type: SEARCH_FRIENDS_ERROR, payload: err }));
};
