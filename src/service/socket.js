import io from "socket.io-client";
import auth from "@react-native-firebase/auth";
import { socketUrl } from "../config/url/api.url";

export const socket = io.connect(socketUrl, {reconnect: true, transports : ['websocket']});

socket.on("connect_error", (err) => {
  console.log(" >>>>>>>>>>> socket connection error >>>>>>>>>>>>");
  console.log(err.message);
  // socket.disconnect();
});


export default socket;


// socket.on("connect", () => {
//   const user = auth().currentUser;
//   console.log("socket.id");
//   console.log("user", user);
//   if (user != null) {
//     console.log("socket.id");
//     console.log(socket.id);
//     socket.emit("signin", {
//       id: user.uid,
//       name: user.displayName,
//       location: ["location.longitude", "location.latitude"],
//     });
//   }
//   console.log("socket.id");
//   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
// });
