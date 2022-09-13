import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function LogoutButton({ height, icon, text, handleLogout }) {
  return (
    <TouchableOpacity onPress={() => handleLogout()}>
      <View
        style={{
          height: height / 15,
          backgroundColor: "#b30000",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 15,
          paddingRight: 15,
          borderRadius: 5,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ paddingLeft: 10, color: "white", fontSize: 15 }}>
            {text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
