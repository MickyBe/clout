import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";

export default function MorePeople(count) {
  const remaining = `+${count}`;
  return (
    <View>
      <Avatar
        rounded
        title={remaining}
        overlayContainerStyle={{ backgroundColor: "gray" }}
        size={35}
      />
    </View>
  );
}
