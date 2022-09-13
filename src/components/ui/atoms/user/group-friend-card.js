import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { imageDir } from "../../../../utility/data/constants";

export default function GroupFriendCard({ data }) {
  // const image = data.profileImage
  //   ? imageDir(data.profileImage)
  //   : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Xdf9OyXn9BpWL30gb6cpyLnkiCCbSaH8wVB1007o9WpYBDgb6J1_afDQTdJuqwgE3xM&usqp=CAU";
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(72,72,72, 0.8)",
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Avatar
            size="medium"
            rounded
            source={{
              uri: imageDir(data?.profileImage),
            }}
          />
        </View>
        <View style={{ paddingLeft: 15 }}>
          <Text style={{ color: "white" }}>{data?.username}</Text>
          <Text style={{ color: "#BFBFBF", fontSize: 12 }}>{data?.bio}</Text>
        </View>
      </View>
      <View>
        <Icon name="eye-outline" size={25} color="white" />
      </View>
    </View>
  );
}
