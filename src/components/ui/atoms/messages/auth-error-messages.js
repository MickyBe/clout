import React from "react";
import { View, Text } from "react-native";

export default function AuthErrorMessage({ message }) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#FF4D57",
        marginBottom: 7,
        backgroundColor: "rgba(132,0,0,0.3)",
      }}
    >
      <Text style={{ color: "#FF4D57", fontSize: 12, padding: 8 }}>
        {message}
      </Text>
    </View>
  );
}
