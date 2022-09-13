import React from "react";
import { Dimensions, Text, TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CreateGroupsTopBar({ onSearchFriends, handleBack }) {
  const width = Dimensions.get("window").width;
  return (
    <TouchableWithoutFeedback onPress={handleBack}>
      <View
        style={{
          // flex: 1,
          flexDirection: "row",
          // justifyContent: "center",
          // backgroundColor: "black",
          alignItems: "center",
          paddingTop: 8,
          paddingBottom: 0,
          // width: "100%",
        }}
      >
        <View
          style={{
            // backgroundColor: "rgba(128,128,128, 0.5)",
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="chevron-back-outline" size={25} color="white" />
        </View>

        <View
          style={{
            width: width / 1.2,
            // borderColor: "red",
            // borderWidth: 1,
            // height: 45,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Create a Group</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
