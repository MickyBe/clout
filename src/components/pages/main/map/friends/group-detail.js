import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import GroupFriendCard from "../../../../ui/atoms/user/group-friend-card";
import { useSelector, useDispatch } from "react-redux";
import SendRequestFromGroup from "../../../../ui/organisms/modals/send-request-from-group-modal";
import Popover from "react-native-popover-view";
import {
  deleteGroup,
  resetDeleteMemeber,
} from "../../../../../redux/actions/group/group.action";
import { getUserInformation } from "../../../../../redux/actions/user/user.action";
import { color } from "react-native-reanimated";

export default function GroupDetail({ route, navigation }) {
  const { height, width } = Dimensions.get("screen");
  const { data } = route.params;
  const { profile, addMembersResponse, removeGroupResponse } = useSelector(
    (state) => state
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const showConfirmationAlert = () => {
    Alert.alert("Delete group", "Are you sure you want to delete group?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteGroup(data?.id, dispatch) },
    ]);
  };

  if (removeGroupResponse.data) {
    resetDeleteMemeber(dispatch);
    getUserInformation(dispatch);
    navigation.navigate("Test");
  }

  console.log(data);
  return (
    // <Modal
    //   animationType="none"
    //   transparent={true}
    //   visible={open}
    //   onRequestClose={() => {
    //     handleClose();
    //   }}
    //   propagateSwipe={true}
    // >
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(9,9,9,0.9)",
        width: width,
        paddingHorizontal: 20,
      }}
    >
      <View style={{ position: "absolute", top: 15, right: 25 }}>
        <View style={{ flexDirection: "row" }}>
          {profile?.data?.id === data?.owner_id ? (
            <Popover
              arrowStyle={{ backgroundColor: "#2b2b2b" }}
              from={(sourceRef, showPopover) => (
                <TouchableWithoutFeedback onPress={showPopover}>
                  <View
                    style={{
                      backgroundColor: "rgba(72,72,72, 0.8)",
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={18} name="ellipsis-vertical-outline" style={{color:"white"}}/>
                  </View>
                </TouchableWithoutFeedback>
              )}
            >
              <View style={{ padding: 10, backgroundColor: "#2b2b2b" }}>
                <TouchableWithoutFeedback onPress={showConfirmationAlert}>
                  <View
                    style={{ backgroundColor: "red", paddingHorizontal: 20 }}
                  >
                    <Text>Delete</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </Popover>
          ) : null}

          <View style={{ paddingLeft: 10 }}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <View
                style={{
                  backgroundColor: "rgba(72,72,72, 0.8)",
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={18} name="close-outline" style={{color:"white"}}/>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "rgba(47,47,47,0.8)",
          paddingVertical: 15,
          paddingBottom: 30,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {profile?.data?.id === data?.owner_id ? (
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 13 ,color:"white"}}>All Visible</Text>
                <Icon name="eye-outline" size={15} style={{ marginLeft: 5 ,color:"white"}} />
              </View>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("EditGroup", { group: data })
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      height: 34,
                      width: 34,
                      borderRadius: 17,
                      backgroundColor: "#3a3a3a",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name="create-outline" color="white" size={18} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : null}

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20 ,color:"white"}}>{data?.emoji}</Text>
            <Text style={{ fontSize: 18 ,color:"white"}}>{data?.name}</Text>
            <View style={{ paddingTop: 5 }}>
              <View
                style={{
                  backgroundColor: "#242424",
                  paddingHorizontal: 20,
                  paddingVertical: 3,
                  justifyContent: "center",
                  borderRadius: 8,
                }}
              >
                {data ? (
                  data.members ? (
                    data.members.length > 0 ? (
                      <Text style={{ fontSize: 12 ,color:"white"}}>{`${data.members.length} ${
                        data.members.length === 1 ? "member" : "members"
                      }`}</Text>
                    ) : null
                  ) : null
                ) : null}
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 15, paddingTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "rgba(72,72,72, 0.8)",
                width: "100%",
                padding: 10,
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  name="megaphone-outline"
                  size={20}
                  style={{ transform: [{ rotate: "340deg" }] ,color:"white"}}
                />
                <Text style={{ paddingLeft: 25, fontSize: 15 ,color:"white"}}>
                  View Announcements
                </Text>
              </View>
              <View>
                <Icon name="chevron-forward-outline" size={20} style={{color:"white"}}/>
              </View>
            </View>
          </View>

          <View style={{ paddingTop: 15 }}>
            {data?.members.length > 0 ? (
              data?.members.map((member) => (
                <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
                  <GroupFriendCard data={member} />
                </View>
              ))
            ) : (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  You have no memebers!
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {profile?.data?.id === data?.owner_id ? (
        <TouchableWithoutFeedback onPress={() => setOpen(true)}>
          <View style={{ position: "absolute", bottom: 15, right: 25 }}>
            <View
              style={{
                backgroundColor: "#813BE3",
                height: 50,
                width: 50,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="add-outline" size={30} color="white" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : null}

      <SendRequestFromGroup
        open={open}
        members={data?.members}
        group_id={data?.id}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
        navigation={navigation}
      />
    </View>
    // </Modal>
  );
}
