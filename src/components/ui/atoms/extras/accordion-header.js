import React from "react";
import { View, Text, Dimensions, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function AccordionHeader({
  open,
  title,
  count,
  handleAccordion,
  style,
}) {
  const width = Dimensions.get("window").width;
  return (
    <TouchableWithoutFeedback onPress={handleAccordion}>
      <View
        style={{
          ...style,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ paddingRight: 10 }}>
            <Text style={{ fontSize: 17, color: "white" }}>{title} </Text>
          </View>

          <View
            style={{
              backgroundColor: "rgba(128,128,128, 0.5)",
              alignItems: "center",
              borderRadius: 5,
              justifyContent: "center",
              height: 30,
              width: 30,
            }}
          >
            <Text style={{ color: "white", padding: 6 }}>{count}</Text>
          </View>
        </View>
        <View>
          <Icon
            name={open ? "chevron-up-outline" : "chevron-down-outline"}
            color="white"
            size={25}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
