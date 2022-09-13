import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function NavigateButton() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#383838",
        borderRadius: 6,
        padding: 5,
        // height: 40,
      }}
    >
      <View>
        <Icon name="navigate-circle" size={17} />
      </View>
      <View>
        <Text style={{ paddingLeft: 10, fontSize: 13 }}>NAVIGATE</Text>
      </View>
    </View>
  );
}
