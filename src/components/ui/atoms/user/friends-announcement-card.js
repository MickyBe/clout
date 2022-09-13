import React from "react";
import { Text, View } from "react-native";
import { Avatar, CheckBox } from "react-native-elements";
import { imageDir } from "../../../../utility/data/constants";

export default function FriendsAnnouncementCard({
  isCheckBox,
  friend,
  iconClicked,
  style,
  selected,
  setUnChecked,
  setChecked,
  ...props
}) {
  return (
    <View
      {...props}
      key={Date.now()}
      style={{
        ...style,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        width:"100%",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Avatar
            overlayContainerStyle={{ backgroundColor: "blue" }}
            size={40}
            rounded
            source={{
              uri: imageDir(friend?.profileImage),
            }}
          />
        </View>
        <View style={{ paddingLeft: 20 }}>
          <Text style={{ color: "white", fontSize: 18 }}>
            {friend.username}
          </Text>
        </View>
      </View>

      <View style={{  }}>
        <CheckBox
          checkedColor="#813be3"
          containerStyle={{ padding: 0 }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={selected.includes(friend.id)}
          onPress={() => {
            if (selected.includes(friend.id)) {
              setUnChecked(friend.id);
            } else {
              setChecked(friend.id);
            }
          }}
        />
      </View>

    </View>
  );
}
