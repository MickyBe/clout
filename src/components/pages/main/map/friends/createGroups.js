import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Modal,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../../ui/atoms/button/button";
import CreateGroupsTopBar from "../../../../ui/atoms/map/create-groups-topbar";
import GroupInputBar from "../../../../ui/atoms/map/group-input-bar";
import GroupManually from "../../../../ui/atoms/map/group-manually";
import GroupQr from "../../../../ui/atoms/map/group-qr";
import GroupVisibilityCard from "../../../../ui/atoms/map/group-visibility-card";
import Icon from "react-native-vector-icons/Ionicons";
import { CheckBox } from "react-native-elements";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import {
  getUserInformation,
  resetUserInformation,
} from "../../../../../redux/actions/user/user.action";
import { useSelector, useDispatch } from "react-redux";
import { addGroupAction } from "../../../../../redux/actions/group/group.action";
import {
  GroupVisibilityTypes,
  imageDir,
} from "../../../../../utility/data/constants";


export default function CreateGroups({ navigation }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [groupName, setGroupName] = useState("");
  const dispatch = useDispatch();
  const [vis, setVis] = useState({
    id: 1,
    type: GroupVisibilityTypes.ONLY_FRIENDS,
    title: "Only my friends",
    subTitle: "This group is only visible to your friends",
  });
  const [selected, setSelected] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [emoji, setEmoji] = useState("🍗");
  const [groupData, setGroupData] = useState([
    {
      id: 1,
      type: GroupVisibilityTypes.ONLY_FRIENDS,
      title: "Only my friends",
      subTitle: "This group is only visible to your friends",
    },
    {
      id: 2,
      type: GroupVisibilityTypes.REQUEST_TO_JOIN,
      title: "Request to join",
      subTitle: "Your group will be visible on explore.",
    },
    {
      id: 3,
      type: GroupVisibilityTypes.PUBLIC,
      title: "Public",
      subTitle: "Anyone can join this group dsfsd.",
    },
  ]);
  const userInfo = useSelector((state) => state.user);
  const addGroupResponse = useSelector((state) => state.addGroup);

  console.log(addGroupResponse);

  useEffect(() => {
    getUserInformation(dispatch);
  }, []);

  const handleCreateGroup = () => {
    const users = selected.map((friend) => friend.id);
    if (
      users.length === 0 ||
      groupName === "" ||
      !groupName ||
      !userInfo.data
    ) {
      console.log("ERROR");
    } else {
      addGroupAction(
        {
          name: groupName,
          emoji: emoji,
          visibility: vis.type,
          users: users,
          owner: userInfo.data.id,
        },
        dispatch
      );
    }
  };

  if (addGroupResponse.data === true) {
    resetUserInformation(dispatch);
    navigation.navigate("Map");
  }

  return (
    <SafeAreaView>
      {userInfo.loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={40} color="#813be3" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            backgroundColor: "#2b2b2b",
            paddingHorizontal: 10,
            // backgroundColor: "grey",
            // alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <CreateGroupsTopBar
              handleBack={() => navigation.goBack()}
              onClick={() => console.log("asd")}
              onSearchFriends={(values) => console.log(values)}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <GroupInputBar
            emoji={emoji}
            setEmoji={setEmoji}
              groupName={groupName}
              onGroupNameChange={(values) => setGroupName(values)}
            />
          </View>
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <GroupManually handleGroupManually={() => setModalVisible(true)} />
            <GroupQr />
          </View>
          {selected.length > 0 ? (
            <View style={{ margin: 10, paddingBottom: 5 }}>
              <View style={{ paddingLeft: 5, paddingBottom: 3 }}>
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                >
                  Selected friends
                </Text>
              </View>
              {selected.map((friend) => (
                <View style={{ paddingTop: 7 }}>
                  <View style={{ backgroundColor: "#4b4b4b", borderRadius: 5 }}>
                    <View style={{ paddingHorizontal: 15 }}>
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
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : null}
          <View style={{ margin: 10, paddingBottom: 30 }}>
            <View style={{ paddingLeft: 5 }}>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                Visibility
              </Text>
              <Text style={{ color: "gray" }}>You can change this later.</Text>
            </View>
            {groupData.map((group, index) => (
              <View style={{ paddingTop: 10 }}>
                <GroupVisibilityCard
                  handlePress={() => setVis(group)}
                  selected={vis}
                  data={group}
                />
              </View>
            ))}
          </View>
          <View style={{ alignItems: "center", margin: 10, paddingBottom: 30 }}>
            <Button
              loading={addGroupResponse.loading}
              label="Let's Party"
              onClick={() => handleCreateGroup()}
            />
          </View>
        </ScrollView>
      )}

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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
                      <Text style={{ color: "#813be3" }}>4 friends</Text>
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
                      [
                        ...userInfo.data.friends,
                        ...userInfo.data.userFriends,
                      ].map((friend) => (
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
                    onPress={() => setModalVisible(false)}
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
                      <Text style={{ color: "white" }}>OK</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
      
    </SafeAreaView>
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
