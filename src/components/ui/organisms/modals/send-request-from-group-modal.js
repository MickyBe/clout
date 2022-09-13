import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserInformation,
  processRequest,
} from "../../../../redux/actions/user/user.action";
import {
  AddMembers,
  resetAddMemebers,
} from "../../../../redux/actions/group/group.action";
import { Avatar, CheckBox } from "react-native-elements";
import { imageDir } from "../../../../utility/data/constants";

export default function SendRequestFromGroup({
  open,
  handleOpen,
  handleClose,
  members,
  group_id,
  handleSuccess,
  navigation,
}) {
  const { height, width } = Dimensions.get("screen");
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const { addMembersResponse } = useSelector((state) => state);
  const [selected, setSelected] = useState([]);

  console.log(addMembersResponse);
  if (addMembersResponse.data) {
    setSelected([]);
    resetAddMemebers(dispatch);
    getUserInformation(dispatch);
    handleClose();
  }

  useEffect(() => {
    getUserInformation(dispatch);
  }, []);
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        handleClose();
      }}
      propagateSwipe={true}
    >
      <ScrollView vertical>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "rgba(9,9,9,0.9)",
          }}
        >
          <View
            style={{
              height: height,
              width: width,
              paddingHorizontal: 20,
              paddingTop: 60,
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(47,47,47,0.8)",
              }}
            >
              <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Icon size={20} name="people-outline" color="white" />
                  </View>
                  <View style={{ paddingLeft: 10 }}>
                    <Text>All Friends</Text>
                    <Text style={{ color: "#813be3" }}>- friends</Text>
                  </View>
                </View>
              </View>
              <View style={{ paddingTop: 10 }}>
                <View
                  style={{ backgroundColor: "rgba(59,59,59,1)", height: 2 }}
                ></View>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  paddingHorizontal: 30,
                  paddingBottom: 20,
                }}
              >
                {userInfo.loading ? (
                  <ActivityIndicator size={30} color="#813be3" />
                ) : userInfo.data ? (
                  userInfo.data.friends.length === 0 &&
                  userInfo.data.userFriends.length === 0 ? (
                    <Text style={{ color: "red" }}>You have no friends</Text>
                  ) : (
                    [...userInfo.data.friends, ...userInfo.data.userFriends]
                      .filter(
                        (fri) => !members.map((mem) => mem.id).includes(fri.id)
                      )
                      .map((friend) => (
                        <RenderUserCard
                          data={friend}
                          selected={selected}
                          handleSelect={() => {
                            if (selected.includes(friend)) {
                              const fil = selected.filter(
                                (sel) => sel.id !== friend.id
                              );
                              setSelected(fil);
                            } else {
                              setSelected([...selected, friend]);
                            }
                          }}
                        />
                      ))
                  )
                ) : null}
              </View>
              <View style={{ alignItems: "center", paddingBottom: 20 }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (selected.length > 0) {
                      AddMembers(
                        group_id,
                        selected.map((select) => select.id),
                        dispatch
                      );
                    }
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#813be3",
                      // width: "1%",
                      paddingHorizontal: 30,
                      paddingVertical: 7,
                      borderRadius: 5,
                    }}
                  >
                    {addMembersResponse.loading ? (
                      <ActivityIndicator />
                    ) : (
                      <Text style={{ color: "white" }}>OK</Text>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

const RenderUserCard = ({ data, selected, handleSelect }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          rounded
          source={{
            uri: imageDir(data?.profileImage),
          }}
        />
        <Text style={{ color: "white", paddingLeft: 15 }}>{data.username}</Text>
      </View>
      <View>
        <CheckBox
          center
          iconType="ionicon"
          checkedIcon="radio-button-on-outline"
          uncheckedIcon="ellipse-outline"
          checked={selected.includes(data)}
          onPress={handleSelect}
          checkedColor="#813be3"
        />
      </View>
    </View>
  );
};
