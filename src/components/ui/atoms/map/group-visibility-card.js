import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SvgEyeClosed from "../icons/eye_closed";

export default function GroupVisibilityCard({ selected, data, handlePress }) {
  if (data.id === selected.id) {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#4b4b4b",
            width: "100%",
            padding: 15,
            justifyContent: "space-between",
            borderRadius: 7,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text>{data.emoji}</Text>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                {data.title}
              </Text>
              <Text style={{ fontSize: 12 }}>{data.text}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => handlePress()}>
            <View style={{ justifyContent: "center" }}>
              <Icon name="eye-outline" size={25} color={"white"} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            borderColor: "#4b4b4b",
            width: "100%",
            padding: 13,
            justifyContent: "space-between",
            borderRadius: 7,
            borderWidth: 2,
          }}
        >
          <View style={{ flexDirection: "row", flex: 4 }}>
            <View>
              <Text style={{ color: "black" }}>{data.emoji}</Text>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ color: "white", fontSize: 18 }}>{data.title}</Text>
              <Text style={{ fontSize: 12 }}>{data.text}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => handlePress()}>
            <View
              style={{
                // flex: 1,
                // alignItems: "flex-end",
                justifyContent: "center",
                paddingTop: 10,
                paddingLeft: 2,
              }}
            >
              <SvgEyeClosed />
              {/* <Icon name="eye-off-outline" size={25} color={"white"} /> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
