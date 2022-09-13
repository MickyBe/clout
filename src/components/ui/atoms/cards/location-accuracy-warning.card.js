import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function AccuracyWarningCard({}) {
  return (
    <View style={{ backgroundColor: "#424242", padding: 18, borderRadius: 5 }}>
      <View style={{ flexDirection: "row" }}>
        <Icon
          style={{ transform: [{ rotate: "270deg" }] }}
          name="battery-charging-outline"
          size={20}
          color="#fefefe"
        />
        <Text style={{ fontSize: 20, fontWeight: "400", paddingLeft: 10 }}>
          Warning
        </Text>
      </View>
      <View style={{ paddingTop: 5 }}>
        <Text style={{ fontSize: 12, fontWeight: "300" }}>
          Please note that the faster your location updates, the more
          battery-intensive it is.
        </Text>
      </View>
    </View>
  );
}
