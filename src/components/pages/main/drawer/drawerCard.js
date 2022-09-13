import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function DrawerCard({
  height,
  icon,
  text,
  handleClick,
  rotate,
}) {
  return (
    <TouchableOpacity onPress={() => handleClick()}>
      <View
        style={{
          height: height / 15,
          backgroundColor: "#4b4b4b",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 15,
          paddingRight: 15,
          borderRadius: 5,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {rotate ? (
            <Icon
              name={icon}
              color="#a5a5a5"
              size={25}
              style={{ transform: [{ rotate: "340deg" }] }}
            />
          ) : (
            <Icon name={icon} color="#a5a5a5" size={25} />
          )}

          <Text style={{ paddingLeft: 10, color: "white", fontSize: 15 }}>
            {text}
          </Text>
        </View>
        <View>
          <Icon name="chevron-forward-outline" color="white" size={25} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
