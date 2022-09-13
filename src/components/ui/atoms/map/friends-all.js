import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  UIManager,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import UserSearchCard from "../../atoms/user/friends-list-card";
import { CheckBox } from "react-native-elements";
import { ChangeVisibilityType } from "../../../../utility/data/constants";

export default function FriendsAll({ data, onlineFriends, offlineFriends, changeVisibilityAction, acceptLoading }) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <View>
      <View
        style={{
          backgroundColor: "rgba(47,47,47, 0.9)",
          width: "100%",
          paddingRight: 20,
          paddingLeft: 20,
          paddingTop: 20,
          borderRadius: 7,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Icon name="people" size={26} color={"white"} />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ color: "white", fontSize: 18 }}>All Friends</Text>
              <Text style={{ color: colors.authButtonColor }}>
                {!open ? `${data.length} friends` : "Selected friends"}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center" }}>
            {!open ? (
              <Icon name="eye-outline" size={25} color={"white"} />
            ) : (
              <CheckBox
                // center
                checkedColor="#813be3"
                containerStyle={{ padding: 0 }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={checked}
                onPress={() => {
                  // setChecked(!checked);
                  // const idArr = data.map((da) => da.id);
                  // if (!checked) {
                  //   setSelected(idArr);
                  // } else {
                  //   setSelected([]);
                  // }
                }}
              />
            )}
          </View>
        </View>

        {open ? (
          data.length === 0 ? (
            <View style={{ paddingTop: 20, alignItems: "center" }}>
              <Text style={{ color: "red" }}>You have no friends, yet!</Text>
            </View>
          ) : (
            <View
              style={{
                borderTopColor: "gray",
                borderTopWidth: 1,
                marginTop: 10,
              }}
            >
              <View style={{ paddingTop: 15 }}>
                {data.map((friend, index) => (
                  <UserSearchCard
                    style={{ paddingTop: 10 }}
                    key={friend.id}
                    friend={friend}
                    iconClicked={(friend) => console.log(friend)}
                    onlineFriends={onlineFriends}
                    offlineFriends={offlineFriends}
                    acceptLoading={acceptLoading}
                    openVisibility={(userType) => {
                      changeVisibilityAction(
                        ChangeVisibilityType.ACCEPT_VISIBLE,
                        friend.id,
                        userType);
                    }
                    }
                    closeVisibility={(userType) => {
                      changeVisibilityAction(
                        ChangeVisibilityType.REJECT_VISIBLE,
                        friend.id,
                        userType);
                    }}
                  />
                ))}
              </View>
            </View>
          )
        ) : null}

        <TouchableWithoutFeedback
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setOpen(!open);
          }}
        >
          <View
            style={{
              paddingTop: 15,
              paddingBottom: 12,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "gray",
                height: 3,
                width: 150,
                borderRadius: 5,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
