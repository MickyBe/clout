// import firebase from 'firebase/app'
// import 'firebase/auth'
// import * as firebasee from "firebase";
// import "firebase/firestore";
import * as firebase from "firebase";
import "firebase/firestore";

//search for frindes
 export const getfriends = async (values) => {
    console.log('get frindes');
      try {
      const subscriber = await firebase.firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.forEach(documentSnapshot => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
        console.log("this is the id",documentSnapshot.id)
      });
      
      return users;
    });
    } catch (err) {
          console.log("There is something wrong!!!!", err.message);
    }
  };
  //send frind request to friends
  export const addfriends = async (values) => {
    firebase.firestore()
    .collection('users')
    .doc(userId)
    .set({
      name: 'test user',
      age: 30,
    })
    .then((data) => {
      console.log('User added!',data);
    });
  };
