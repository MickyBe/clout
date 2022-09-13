import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, TouchableWithoutFeedback, View } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

export default function FriendTopBar({ onSearchFriends, handleBack }) {
  const width = Dimensions.get("window").width;
  const { colors } = useTheme();
  const [searchKey, setsearchKey] = useState([]);
  return (
    <View
      style={{
        // flex: 1,
        flexDirection: "row",
        // justifyContent: "center",
        backgroundColor: "black",

        // alignItems: "center",

        paddingTop: 15,
        paddingBottom: 0,
        // width: "100%",
      }}
    >
      <TouchableWithoutFeedback onPress={handleBack}>
        <View
          style={{
            backgroundColor: "rgba(128,128,128, 0.5)",
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="chevron-back-outline" size={30} color="white" />
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          width: width / 1.3,
          // borderColor: "red",
          // borderWidth: 1,
          height: 45,
        }}
      >
        <Input
          name="email"
          style={{
            // marginTop: 10,
            // paddingTop: 5,
            // width: "100%",
            height: 20,
            borderRadius: 50,
          }}
          // value={searchKey}
          selectionColor={colors.inputLabelColor}
          inputStyle={{
            backgroundColor: "rgba(128,128,128, 0.5)",
            // borderRadius: 3,
            paddingLeft: 15,
            color: colors.inputLabelColor,
          }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={(text) => onSearchFriends(text)}
        />
      </View>
    </View>
  );
}
