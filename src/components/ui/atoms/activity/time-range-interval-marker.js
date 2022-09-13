import React from "react";
import { View } from "react-native";

export default function CustomMarker() {
  return (
    <View
      style={{
        backgroundColor: "#ebebeb",
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        width: 6,
        height: 30,
      }}
    />
  );
}
