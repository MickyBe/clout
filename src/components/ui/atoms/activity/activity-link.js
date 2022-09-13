import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function ActivityLink({
  style,
  frontIcon,
  label,
  endIcon,
  withMap,
  handlePress,
}) {
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={{
          ...style,
          backgroundColor: "#4b4b4b",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          borderRadius: withMap ? 0 : 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name={frontIcon} color="white" size={20} />
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
              paddingLeft: 10,
            }}
          >
            {label}
          </Text>
        </View>
        <View>
          <Icon name={endIcon} color="white" size={20} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
