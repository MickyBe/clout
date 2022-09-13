import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

import { logoutUser } from "../../../../logic/controller/authController";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function FriendsRequests(props) {
  return <View></View>;
}

// return (
//   <View
//     style={{
//       // position: 'absolute',
//       // flexDirection: "row",
//       // backgroundColor: "rgba(50,50,50,0.8)",
//       justifyContent: "space-between",
//       width: "100%",
//       // top: 100,
//     }}
//   >
//     {/* all friends */}
//     <View
//       style={{
//         // position: 'relative',
//         justifyContent: "space-around",
//         // backgroundColor: "rgba(50,50,50,0.8)",
//         alignItems: "center",
//         borderRadius: 15,
//       }}
//     >
//       <View
//         style={{
//           // position: 'relative',
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           // margin:5,
//         }}
//       >
//         <View
//           style={{
//             flex: 1,
//             alignItems: "center",
//             // justifyContent: "space-around",
//             flexDirection: "row",
//             padding: 10,
//             // margin:10,
//           }}
//         >
//           <Text style={{ color: "white", fontSize: 18 }}>Requests</Text>
//           <View
//             style={{
//               alignItems: "center",
//               borderWidth: 0,
//               borderRadius: 5,
//               padding: 5,
//               margin: 5,
//               backgroundColor: "rgba(100,100,100,0.9)",
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ color: "white", fontSize: 18 }}>
//               {" "}
//               {props.friendsRequestRecived.length}{" "}
//             </Text>
//           </View>
//         </View>
//         <Icon name="chevron-down" size={26} color={"white"} />
//       </View>
//       {props.friendsRequestRecived.map((item, index) => {
//         return (
//           <View
//             key={index}
//             style={{
//               position: "relative",
//               flexDirection: "row",
//               justifyContent: "space-around",
//               backgroundColor: "rgba(255,255,255,0.3)",
//               // alignItems:'center',
//               margin: 5,
//               paddingLeft: 10,
//               borderRadius: 5,
//               width: "100%",
//             }}
//           >
//             <View style={{ paddingTop: 10 }}>
//               <Avatar
//                 title="MD"
//                 size="large"
//                 rounded
//                 source={{
//                   uri: "data:image/jpeg;base64,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",
//                 }}
//               />
//             </View>
//             <View
//               style={{
//                 flex: 1,
//                 position: "relative",
//                 justifyContent: "space-between",
//                 // alignItems:'center',
//                 padding: 5,
//                 margin: 5,
//               }}
//             >
//               <Text style={{ color: "white", fontSize: 18 }}>
//                 {item.name}
//               </Text>
//               <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>
//                 {item.name}
//               </Text>
//               <View
//                 style={{
//                   position: "relative",
//                   flexDirection: "row",
//                   // justifyContent: "space-between",
//                   // backgroundColor: "rgba(50,50,50,0.8)",
//                   alignItems: "center",
//                   margin: 5,
//                   borderRadius: 15,
//                   // flex: 1,
//                   // alignItems: 'center',
//                   // flexDirection: "row"
//                 }}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                   }}
//                 >
//                   <View style={{ paddingTop: 5 }}>
//                     <Avatar
//                       title="MD"
//                       rounded
//                       source={{
//                         uri: "data:image/jpeg;base64,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",
//                       }}
//                     />
//                   </View>
//                   <View style={{ paddingTop: 5 }}>
//                     <Avatar
//                       rounded
//                       source={{
//                         uri: "https://thumbs.dreamstime.com/b/happy-person-portrait-smiling-woman-tanned-skin-curly-hair-happy-person-portrait-smiling-young-friendly-woman-197501184.jpg",
//                       }}
//                     />
//                   </View>
//                 </View>
//                 <Text
//                   style={{ paddingLeft: 5, color: "white", fontSize: 12 }}
//                 >
//                   Followed by john
//                 </Text>
//               </View>
//             </View>
//             <View
//               style={{
//                 // flex:1,
//                 // justifyContent: "center",
//                 flexDirection: "row",
//                 // alignItems:'center',
//                 padding: 10,
//                 margin: 10,
//               }}
//             >
//               <TouchableWithoutFeedback
//                 onPress={() => props.rejectFriendRequest(item)}
//               >
//                 <View style={{}}>
//                   <Icon
//                     name="close"
//                     size={26}
//                     color={"white"}
//                     style={{
//                       // alignItems: "center",
//                       borderWidth: 0,
//                       borderRadius: 50,
//                       padding: 5,
//                       margin: 5,
//                       backgroundColor: "rgba(100,100,100,0.9)",
//                     }}
//                   />
//                 </View>
//               </TouchableWithoutFeedback>
//               <TouchableWithoutFeedback
//                 onPress={() => props.acceptFriendRequest(item)}
//               >
//                 <View style={{}}>
//                   <Icon
//                     name="add"
//                     size={26}
//                     color={"white"}
//                     style={{
//                       alignItems: "center",
//                       borderWidth: 0,
//                       borderRadius: 50,
//                       padding: 5,
//                       margin: 5,
//                       backgroundColor: "rgba(100,100,100,0.9)",
//                       alignItems: "center",
//                     }}
//                   />
//                 </View>
//               </TouchableWithoutFeedback>
//             </View>
//           </View>
//         );
//       })}
//     </View>
//   </View>
// );
