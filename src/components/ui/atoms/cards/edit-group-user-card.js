import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { imageDir } from "../../../../utility/data/constants";

export default function EditGroupUserCard({ data, owner, removeFromGroup }) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 15,
        padding: 20,
        backgroundColor: "#4b4b4b",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar
          size={60}
          rounded
          source={{
            uri: imageDir(data?.profileImage),
          }}
        />
        <View style={{ paddingLeft: 15 }}>
          <Text style={{ color: "white", fontSize: 17 }}>{data?.username}</Text>
          <Text>{data?.bio}</Text>
        </View>
      </View>
      <View>
        {owner ? (
          <Text style={{ color: "#BB8BFF" }}>Owner</Text>
        ) : (
          <TouchableWithoutFeedback onPress={() => removeFromGroup()}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                backgroundColor: "#707070",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="close-outline" size={20} />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
}
