import React from "react";
import { View, Text } from "react-native";
// import { Avatar } from "react-native-elements";
import Avatar from "../../atoms/user/avatar";
import MorePeople from "../../atoms/user/more-people";
import { imageDir } from "../../../../utility/data/constants";

export default function FriendsList({ height, data, userClicked }) {
  return (
    <View
      style={{
        position: "absolute",
        right: 15,
        top: 10,
        height: height / 3,
        // justifyContent: "flex-start",
      }}
    >
      {data.map((userData) => (
        <View
        key={userData.id}
        style={{
          marginBottom:10,
          opacity: userData.disconnected ? 0.5 : 1
        }}
        >
          <Avatar
            key={userData.id}
            onPress={() => userClicked(userData.location)}
            name={userData.name.toUpperCase()}
            source={ imageDir(userData.image)}
            nameColor={userData.color}
            disconnected={userData.disconnected}
          />
        </View>
      ))}
      {
        (data.length>5)?
          <MorePeople count={data.length-5}/>:null
      }
    </View>
  );
}
