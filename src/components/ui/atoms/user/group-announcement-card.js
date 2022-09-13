import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SvgEyeClosed from "../../atoms/icons/eye_closed";

export default function GroupAnnouncementCard({
  selected,
  group,
  online,
  handleShow,
  handleHide,
  handleModal,
}) {
  if (selected.includes(group.id)) {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "rgba(47,47,47, 0.9)",
            width: "100%",
            padding: 20,
            justifyContent: "space-between",
            borderRadius: 7,
          }}
        >
          <TouchableWithoutFeedback onPress={handleModal}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text>{group.emoji}</Text>
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
                >
                  {group.name}
                </Text>
                {/* <Text style={{ color: "#27BD7E", fontWeight: "bold" }}>
                  {online}
                </Text> */}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleHide}>
            <View style={{ justifyContent: "center" }}>
              <Icon name="checkmark-done-circle-outline" size={25} color={"white"} />
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
            padding: 18,
            justifyContent: "space-between",
            borderRadius: 7,
            borderWidth: 2,
          }}
        >
          <TouchableWithoutFeedback onPress={handleModal}>
            <View style={{ flexDirection: "row", borderWidth: 2 }}>
              <View>
                <Text style={{ color: "black" }}>{group.emoji}</Text>
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ color: "white", fontSize: 18 }}>
                  {group.name}
                </Text>
                {/* <Text style={{ color: "gray" }}>{online}</Text> */}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ justifyContent: "center" }}>
            <TouchableWithoutFeedback onPress={handleShow}>
            <View style={{ justifyContent: "center" }}>
              <Icon name="ellipse-outline" size={25} color={"white"} />
            </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}
