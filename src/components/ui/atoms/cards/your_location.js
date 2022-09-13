import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function YourLocation() {
  return (
    <View
      style={{
        backgroundColor: "#252424",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        height: 25,
      }}
    >
      <View>
        <Icon name="location-outline" color="white" size={11} />
      </View>
      <View style={{ paddingLeft: 15 }}>
        <Text style={{ fontSize: 13 }}>Your Location</Text>
      </View>
    </View>
  );
}
