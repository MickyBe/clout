import React from "react";
import { View, Text, Button, TouchableWithoutFeedback } from "react-native";
import { Card } from "react-native-elements";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

export default function FriendsButtonIcon(props) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 25,
        alignItems: "center",
        height: 50,
        width: 50,
      }}
    >
      <TouchableWithoutFeedback onPress={() => props.handleClickSearch()}>
        <Icon
          name="search"
          size={20}
          color={"white"}
          style={{
            alignItems: "center",
            borderRadius: 50,
            padding: 5,
            margin: 5,
            borderWidth: 0,
            backgroundColor: "rgba(69,69,69,0.6)",
            // justifyContent: "space-around",
          }}
        />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => props.handleClickGroup()}>
        <Icon
          name="add"
          size={20}
          color={"white"}
          style={{
            alignItems: "center",
            borderRadius: 50,
            padding: 5,
            margin: 5,
            borderWidth: 0,
            backgroundColor: "rgba(69,69,69,0.6)",
            // justifyContent: "space-around",
            alignItems: "center",
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}
