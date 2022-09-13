import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";

export default function UserAvatar(props) {
  return (
    <View>
      <Avatar
        {...props}
        rounded
        source={{
          uri: props.source,
        }}
        size={35}
      />
      <View style={{ position: "absolute", left: 20, top: 25 }}>
        <View
          style={{
            height: 18,
            width: 18,
            borderRadius: 18 / 2,
            backgroundColor: props.nameColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>{props?.name[0]}</Text>
        </View>
      </View>
    </View>
  );
}
