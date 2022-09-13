import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { imageDir } from "../../../../utility/data/constants";

export default function ProfileButton(props) {
  const { profile } = useSelector((state) => state);
  const { colors } = useTheme();
  return (
    <TouchableWithoutFeedback onPress={() => props.handleClick()}>
      <View style={{ paddingTop: props.pad === "no" ? 0 : 14 }}>
        <Avatar
          {...props}
          rounded
          source={{
            uri: imageDir(profile?.data?.profileImage),
          }}
          size={30}
        />
        <Badge
          status="success"
          containerStyle={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
          badgeStyle={{ backgroundColor: "#60eb20" }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
