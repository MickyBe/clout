import React from "react";
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Card } from "react-native-elements";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileButton from "../../atoms/user/profile-button";

export default function NotificationTopbar({count}) {
  const width = Dimensions.get("window").width;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: width / 2.2,
        }}
      >
        <View>
          <ProfileButton pad="no" handleClick={() => console.log("AAAAAA")} />
        </View>
        <View>
          <Text style={{ fontSize: 18, fontFamily: "bold", color: "white" }}>
            Notifications
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "rgba(128,128,128, 0.5)",
            height: 30,
            width: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
          }}
        >
          <Text style={{ padding: 7, color: "white" }}>{count}</Text>
        </View>
      </View>
      <View
        style={{ backgroundColor: "rgba(128,128,128, 0.5)", borderRadius: 20 }}
      >
        <Icon name="search-outline" style={{ padding: 5 }} size={20} color="white" />
      </View>
    </View>
  );
}
