import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../../ui/atoms/button/button";
import FriendsAll from "../../../../ui/atoms/map/friends-all";
import FriendsButton from "../../../../ui/atoms/map/friends-button";
import FriendsButtonIcon from "../../../../ui/atoms/map/friends-button-icons";
import GroupCard from "../../../../ui/atoms/user/group-card";
import ProfileButton from "../../../../ui/atoms/user/profile-button";
import {
  getUserInformation,
  changeVisibility,
  resetChangeVisibility,
} from "../../../../../redux/actions/user/user.action";
import {
  changeGroupVisibility,
  resetChangeGroupVisibility,
} from "../../../../../redux/actions/group/group.action";
import { socket } from "../../../../../service/socket";

export default function Friends(props) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state);
  const [visible, setVisible] = useState([]);
  const [offlineFriends, setOfflineFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [open, setOpen] = useState(false);
  const changeVisibilityResponse = useSelector((state) => state.change);
  const changeGroupVisibilityResponse = useSelector(
    (state) => state.changeGroupVisibility
  );

  //for friend visibility change
  if (changeVisibilityResponse.data) {
    // resetChangeVisibility(dispatch);
    // getUserInformation(dispatch);
  }
  //for group visability change
  if (changeGroupVisibilityResponse.data) {
    // resetChangeGroupVisibility(dispatch);
    // getUserInformation(dispatch);
  }
  useEffect(() => {
    getUserInformation(dispatch);
  }, []);
  useEffect(() => {
    socket.on("friend-visibility", (msg) => {
      console.log("BBBBBBBBBBBB Message", msg);
      //0ff-on second time problem off[2] on[]
      if (msg.online) {
        if (!onlineFriends.includes(msg.fid)) {
          // offlineFriends.filter(item => item != msg.fid);
          // onlineFriends.push(msg.fid);
          const index = offlineFriends.findIndex((x) => x == msg.fid);
          setOnlineFriends([...onlineFriends, msg.fid]);
          setOfflineFriends([...offlineFriends.splice(index, 1)]);
          setOfflineFriends([...offlineFriends]);
          console.log(
            "==============change the visability 1=========",
            msg.fid,
            msg.online
          );
        }
      } else {
        if (!offlineFriends.includes(msg.fid)) {
          // offlineFriends.push(msg.fid);
          // onlineFriends.filter(item => item != msg.fid);
          const index = onlineFriends.findIndex((x) => x == msg.fid);
          setOfflineFriends([...offlineFriends, msg.fid]);
          setOnlineFriends([...onlineFriends.splice(index, 1)]);
          setOnlineFriends([...onlineFriends]);
          setOfflineFriends([...offlineFriends]);
          console.log(
            "==============change the visability 2=========",
            msg.fid,
            msg.online
          );
        }
      }
    });
    console.log("we are here for the first time friend");
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        flex: 1,
        height: height,
      }}
    >
      {user.loading ? (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            paddingTop: "80%",
          }}
        >
          <ActivityIndicator size={50} color="#813be3" />
        </View>
      ) : (
        <View>
          <View
            style={{
              position: "absolute",
              left: 15,
              top: 0,
              width: width / 2.5,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ProfileButton handleClick={() => props.navigation.openDrawer()} />
            <FriendsButton handleClick={() => props.navigation.goBack()} />
          </View>
          <View
            style={{
              position: "absolute",
              right: 15,
              top: 6,
              width: width / 4.5,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FriendsButtonIcon
              handleClickSearch={() =>
                props.navigation.navigate("FriendsSearch")
              }
              handleClickGroup={() => props.navigation.navigate("CreateGroups")}
            />
          </View>
          <View
            style={{
              paddingTop: height / 12,
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: "space-between",
              height: height,
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{}}
              contentContainerStyle={{
                paddingBottom: 50,
              }}
            >
              <View>
                <View style={{ paddingBottom: 10 }}>
                  <FriendsAll
                    data={
                      user.data
                        ? [...user.data.friends, ...user.data.userFriends]
                        : []
                    }
                    offlineFriends={offlineFriends}
                    onlineFriends={onlineFriends}
                    changeVisibilityAction={(actionType, friend_id, userType) =>
                      changeVisibility(
                        actionType,
                        friend_id,
                        userType,
                        dispatch
                      )
                    }
                    acceptLoading={changeVisibilityResponse.loading}
                  />
                </View>

                <View style={{ paddingTop: 15 }}>
                  <Text style={{ color: "white", fontSize: 15 }}>
                    My groups
                  </Text>
                </View>

                <View>
                  {user.data ? (
                    user.data.ugroups.length === 0 ? (
                      <View
                        style={{
                          paddingTop: 10,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "red" }}>
                          You have no group, yet!
                        </Text>
                      </View>
                    ) : (
                      user.data.ugroups.map((group) => (
                        <View style={{ paddingTop: 10 }}>
                          <GroupCard
                            key={group.id}
                            selected={group.ownerVisible}
                            group={group}
                            online={`${group?.members.length} members`}
                            handleShow={() =>
                              setVisible([group.id, ...visible])
                            }
                            handleHide={() => {
                              const fil = visible.filter(
                                (vis) => vis !== group.id
                              );
                              setVisible(fil);
                            }}
                            handleModal={() =>
                              props.navigation.navigate("GroupDetail", {
                                data: group,
                              })
                            }
                            changeGroupVisibilityAction={(
                              actionType,
                              friend_id,
                              userType
                            ) => {
                              changeGroupVisibility(
                                actionType,
                                friend_id,
                                userType,
                                dispatch
                              );
                              actionType == "ACCEPT_VISIBLE"
                                ? (group.ownerVisible = true)
                                : (group.ownerVisible = false);
                            }}
                            acceptLoading={
                              changeGroupVisibilityResponse.loading
                            }
                          />
                        </View>
                      ))
                    )
                  ) : null}
                </View>

                <View
                  style={{
                    marginTop: 15,
                    height: 1,
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: 5,
                  }}
                ></View>

                {user.data
                  ? user.data.groups.length === 0
                    ? null
                    : user.data.groups.map((group) => (
                        <View style={{ paddingTop: 10 }}>
                          <GroupCard
                            key={group.id}
                            selected={
                              group.members.find(function (item) {
                                return item.UserGroup.UserId === user.data.id;
                              })?.UserGroup.userVisible
                            }
                            group={group}
                            online={`${group?.members.length} member${group?.members.length === 1 ? "" : "s"}`}
                            handleShow={() =>
                              setVisible([group.id, ...visible])
                            }
                            handleHide={() => {
                              const fil = visible.filter(
                                (vis) => vis !== group.id
                              );
                              setVisible(fil);
                            }}
                            handleModal={() =>
                              props.navigation.navigate("GroupDetail", {
                                data: group,
                              })
                            }
                            changeGroupVisibilityAction={(
                              actionType,
                              friend_id,
                              userType
                            ) => {
                              changeGroupVisibility(
                                actionType,
                                friend_id,
                                userType,
                                dispatch
                              );
                              const index = group.members.findIndex(
                                (item) => item.UserGroup.UserId === user.data.id
                              );
                              if (actionType == "ACCEPT_VISIBLE") {
                                group.members[
                                  index
                                ].UserGroup.userVisible = true;
                                // group.members.find( (item)=> item.UserGroup.UserId === user.data.id)?.UserGroup.userVisible = true;
                              } else {
                                group.members[
                                  index
                                ].UserGroup.userVisible = false;
                                // group.members.find((item) => item.UserGroup.UserId === user.data.id)?.UserGroup.userVisible=false;
                              }
                            }}
                            acceptLoading={
                              changeGroupVisibilityResponse.loading
                            }
                          />
                        </View>
                      ))
                  : null}
              </View>
            </ScrollView>
            <View style={{ alignItems: "center", paddingBottom: 30 }}>
              <Button
                label="Back to map"
                onClick={() => props.navigation.goBack()}
              />
            </View>
          </View>
        </View>
      )}
      {/* <GroupDetailModal
        data={selected}
        open={open}
        handleOpen={() => setOpen(true)}
        handleClose={() => setOpen(false)}
        navigation={props.navigation}
      /> */}
    </SafeAreaView>
  );
}
