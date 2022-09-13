import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  LayoutAnimation,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from "react-native";
import { Avatar, Button, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  addAnnouncement,
  addAnnouncementReset,
} from "../../../../redux/actions/announcement/announcement.action";
import { getUserInformation } from "../../../../redux/actions/user/user.action";
import { imageDir } from "../../../../utility/data/constants";
import GetLocation from "../../../../utility/location/getLocation";
import UserSearchCard from "../../../ui/atoms/user/friends-list-card";
import AudioPlayer from "./audio-player";
import GroupAnnouncementCard from "../../../ui/atoms/user/group-announcement-card";
import FriendsAnnouncementCard from "../../../ui/atoms/user/friends-announcement-card";
export default function FinalAnnouncement({ route, navigation }) {
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const { profile, user, addAnnouncementResponse } = useSelector(
    (state) => state
  );
  const { img, description, audio } = route.params;
  const [visible, setVisible] = useState([]);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInformation(dispatch);
  }, []);


  if (addAnnouncementResponse.data || addAnnouncementResponse.error) {
    addAnnouncementReset(dispatch);
    navigation.navigate("Map");
  }

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const data = user.data
    ? [...user.data.friends, ...user.data.userFriends]
    : [];

  console.log("Audio audio audio  >>>>>>>> ", selected);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        height,
        width: width,
      }}
    >
      <ScrollView>
        <View
          style={{
            paddingTop: height / 9,
            paddingHorizontal: 30,
            width: "100%",
          }}
        >

          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: height / 8,
              left: 0,
              right: 0,
              zIndex: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: "#f700e2",
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: "340deg" }],
              }}
            >
              <Icon name="megaphone-outline" color="white" size={25} />
            </View>
          </View>

          <View
            style={{
              // height: height / 5,
              width: "100%",
              backgroundColor: "rgba(32, 32, 32, 0.9)",
              borderRadius: 8,
              paddingTop: height / 25,
              paddingHorizontal: 15,
              flexDirection: "column",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Avatar
                  rounded
                  source={{
                    uri: imageDir(profile?.data?.profileImage),
                  }}
                />
                <View style={{ paddingLeft: 15, width: width / 2.2, paddingBottom: 15 }}>
                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 17,
                      }}
                    >
                      {profile?.data?.username}
                    </Text>
                  </View>
                  <Text
                    style={{ color: "#d3d3d3", fontSize: 12 }}
                    numberOfLines={10}
                    // style={{ flex: 1 }}
                  >
                    {description}
                  </Text>
                </View>
              </View>
              <View style={{ paddingLeft: 10 }}>
                {img ? (
                  <Image
                    style={{
                      borderRadius: 5,
                      borderWidth: 2,
                      borderColor: "rgba(128,128,128,0.8)",
                    }}
                    resizeMode="cover"
                    source={img}
                    width={60}
                    height={60}
                  />
                ) : null}
              </View>
            </View>
            
              <View style={{paddingBottom: 10}}>
              {audio ? <AudioPlayer audio={audio?.uri} /> : null}
              </View>
            
          </View>
        </View>

        <View
          style={{
            paddingTop: height / 30,
            paddingBottom: height / 40,
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <Text style={{ fontWeight: "700" }}>Show announcement to</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        >
          <View>
            <View style={{ paddingBottom: 10 }}>
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
                      <Text style={{ color: "white", fontSize: 18 }}>
                        All Friends
                      </Text>
                      <Text style={{ color: colors.authButtonColor }}>
                        {!open ? `${data.length} friends` : "Selected friends"}
                      </Text>
                    </View>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                      <CheckBox
                        checkedColor="#813be3"
                        containerStyle={{ padding: 0 }}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={checked}
                        onPress={() => {
                          setChecked(!checked);
                          const idArr = data.map((da) => da.id);
                          if (!checked) {
                            setSelected(idArr);
                          } else {
                            setSelected([]);
                          }
                        }}
                      />
                  </View>
                </View>

                {open ? (
                  data.length === 0 ? (
                    <View style={{ paddingTop: 20, alignItems: "center" }}>
                      <Text style={{ color: "red" }}>
                        You have no friends, yet!
                      </Text>
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
                          <FriendsAnnouncementCard
                            isCheckBox={true}
                            style={{ paddingTop: 10 }}
                            key={index}
                            friend={friend}
                            selected={selected}
                            setUnChecked={(id) => {
                              const filteredArr = selected.filter((item) => item !== id);
                              setSelected([...filteredArr]);  
                            }}
                            setChecked={(id) => {
                              const temp = selected;
                              selected.push(id);
                              setSelected([...temp]);
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
            {user.loading ? (
              <View
                style={{
                  paddingTop: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator color={colors.authButtonColor} size={50} />
              </View>
            ) : user.data ? (
              user.data.groups.length === 0 ? null : (
                user.data.groups.map((group) => (
                  <View style={{ paddingTop: 10 }}>
                    <GroupAnnouncementCard
                      selected={visible}
                      group={group}
                      online="5 online"
                      handleShow={() => setVisible([group.id, ...visible])}
                      handleHide={() => {
                        const fil = visible.filter((vis) => vis !== group.id);
                        setVisible(fil);
                      }}
                      handleModal={() => console.log("AAAA")}
                    />
                  </View>
                ))
              )
            ) : null}
            <View>
              {user.loading ? (
                <View
                  style={{
                    paddingTop: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator color={colors.authButtonColor} size={50} />
                </View>
              ) : user.data ? (
                user.data.ugroups.map((group) => (
                  <View style={{ paddingTop: 10 }}>
                    <GroupAnnouncementCard
                      selected={visible}
                      group={group}
                      online="5 online"
                      handleShow={() => setVisible([group.id, ...visible])}
                      handleHide={() => {
                        const fil = visible.filter((vis) => vis !== group.id);
                        setVisible(fil);
                      }}
                      handleModal={() => {
                        setSelected(group);
                        setOpen(true);
                      }}
                    />
                  </View>
                ))
              ) : null}
            </View>
          </View>
        </ScrollView>

        <View style={{ paddingHorizontal: 20, width: "100%" }}>
          <View style={{ paddingHorizontal: 60, paddingTop: 20 }}>
            <Button
              title="Send Announcement"
              TouchableComponent={TouchableWithoutFeedback}
              loading={addAnnouncementResponse.loading}
              buttonStyle={{
                backgroundColor: "#813be3",
                borderRadius: 25,
                height: 50,
              }}
              titleStyle={{
                color: "white",
                fontSize: 16,
              }}
              onPress={() => {
                if (selected.length > 0 || visible.length > 0) {
                  let participators = [...new Set([...selected, ...visible])]
                  GetLocation.then((res) => {
                    const data = new FormData();
                    if (audio)
                      data.append("audio", {
                        uri: audio?.uri,
                        type: "audio/mpeg",
                        name: `${Date.now()}_announcement.mp3`,
                      });
                    if (img)
                      data.append("image", {
                        uri: img.uri,
                        type: img.mime,
                        name: img.uri.split("/")[img.uri.split("/").length - 1],
                      });
                    if (description) data.append("description", description);
                    data.append("latitude", res["coords"]["latitude"]);
                    data.append("longitude", res["coords"]["longitude"]);
                    data.append("creator_id", profile?.data?.id);
                    data.append("participators", participators.join("--"));
                    addAnnouncement(data, dispatch);
                  }).catch((err) => console.log(err));
                } else {
                }
              }}
            />
          </View>
        </View>
      </ScrollView>

      <View style={{ position: "absolute", right: 15, top: 15 }}>
        <TouchableHighlight onPress={() => navigation.goBack()}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              backgroundColor: "rgba(128,128,128,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="close-outline" size={20} color="white" />
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}
