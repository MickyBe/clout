import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import EditGroupUserCard from "../../../../ui/atoms/cards/edit-group-user-card";
import { useSelector, useDispatch } from "react-redux";
import {
  RemoveFriendFromGroup,
  resetRemoveFriendFromGroup,
  updateGroup,
} from "../../../../../redux/actions/group/group.action";
import { getUserInformation } from "../../../../../redux/actions/user/user.action";
import EmojiSelector from "react-native-emoji-selector";

export default function EditGroups({ route, navigation }) {
  const height = Dimensions.get("window").height;
  const { profile, removeMemberResponse } = useSelector((state) => state);
  const { group } = route.params;
  const [openEdit, setOpenEdit] = useState(false);
  const [groupName, setGroupName] = useState(group?.name);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [emoji, setEmoji] = useState(group?.emoji);
  const { updateGroupResponse } = useSelector((state) => state);
  const dispatch = useDispatch();

  if (removeMemberResponse.data) {
    resetRemoveFriendFromGroup(dispatch);
    getUserInformation(dispatch);
    navigation.navigate("Test");
  }

  useEffect(() => {
    if (
      updateGroupResponse.data === true &&
      updateGroupResponse.loading === false
    ) {
      getUserInformation(dispatch);
    }
  }, [updateGroupResponse]);


  return (
    <View style={{ flex: 1, backgroundColor: "#2b2b2b" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginVertical: 15,
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Test")}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="chevron-back-outline" color="white" size={26} />
            <Text style={{ fontSize: 18, paddingLeft: 15, color: "white" }}>
              Edit Group Details
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "#3a3a3a",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon size={15} color="white" name="search-outline" />
          </View>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "#3a3a3a",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Icon size={15} color="white" name="ellipsis-vertical-outline" />
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 22 }}>{emoji}</Text>
          <TouchableWithoutFeedback onPress={() => setIsEmojiOpen(true)}>
            <Icon
              name="chevron-down-outline"
              size={30}
              style={{ marginLeft: 10 }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ paddingTop: 15, flexDirection: "row" }}>
          {!openEdit ? (
            <Text style={{ fontSize: 20 }}>{groupName}</Text>
          ) : (
            <Input
              placeholder="Group name"
              selectionColor="red"
              containerStyle={{ width: 200 }}
              labelStyle={{
                fontSize: 15,
                color: "#c2c2c2",
              }}
              value={groupName}
              onChangeText={(val) => setGroupName(val)}
              inputStyle={{
                borderRadius: 3,
                paddingLeft: 0,
                fontSize: 15,
                color: "white",
              }}
            />
          )}
          {openEdit ? (
            <TouchableWithoutFeedback onPress={() => setOpenEdit(!openEdit)}>
              <Icon name="checkmark-outline" color="white" size={30} />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() => setOpenEdit(!openEdit)}>
              <Icon
                name="pencil-outline"
                size={22}
                style={{ marginLeft: 20 }}
              />
            </TouchableWithoutFeedback>
          )}
        </View>
        <View
          style={{
            marginTop: 15,
            paddingHorizontal: 25,
            paddingVertical: 5,
            backgroundColor: "#242424",
            borderRadius: 20,
          }}
        >
          <Text>{group?.members.length} members</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 25, paddingTop: 0 }}>
        <EditGroupUserCard data={profile.data} owner={true} />
        {group?.members.map((member, index) => (
          <EditGroupUserCard
            key={index}
            data={member}
            removeFromGroup={() =>
              RemoveFriendFromGroup(group?.id, member.id, dispatch)
            }
          />
        ))}
      </View>

      <Modal animationType="slide" transparent={true} visible={isEmojiOpen}>
        <View style={{ padding: 15, borderRadius: 50, paddingTop: 200 }}>
          <View style={{ height: height / 1, backgroundColor: "#2b2b2b" }}>
            <EmojiSelector
              showSearchBar={false}
              showHistory={false}
              showTabs={false}
              onEmojiSelected={(emoji) => {
                setEmoji(emoji);
                setIsEmojiOpen(false);
              }}
            />
          </View>
        </View>
      </Modal>

      {groupName !== group?.name || emoji !== group?.emoji ? (
        <View style={{ position: "absolute", bottom: 15, right: 15 }}>
          {updateGroupResponse.loading ? (
            <ActivityIndicator size={40} color="#813BE3" />
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                updateGroup(
                  group?.id,
                  { name: groupName, emoji: emoji },
                  dispatch
                );
              }}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  backgroundColor: "#813BE3",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon name="save-outline" color="white" size={20} />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
