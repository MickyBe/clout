import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

export default function UserMarker() {
  return (
    <View
      style={{
        height: 22,
        width: 22,
        borderRadius: 22 / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#813BE3",
        borderWidth: 1,
        borderColor: "white",
      }}
    />
  );
}
