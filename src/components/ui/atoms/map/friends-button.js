import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

export default function FriendButton({ type, handleClick }) {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={{ paddingLeft: 10, paddingTop: 15 }}>
        <View
          style={{
            borderRadius: 15,
            borderWidth: 0,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(69,69,69,0.6)",
            justifyContent: "space-between",
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 5,
            paddingTop: 5,
          }}
        >
          <Text> 🤓 </Text>
          <Text> 🌽 </Text>
          {type === "close" ? (
            <Icon name="chevron-down-outline" color="white" size={20} />
          ) : (
            <Icon name="chevron-up-outline" color="white" size={20} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
