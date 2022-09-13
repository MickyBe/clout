import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Modal,
  LayoutAnimation,
  UIManager,
  Image,
} from "react-native";
import { Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import MyAnnouncementCard from "../../../../ui/atoms/cards/my-announcement-card";
import { getAnnouncements } from "../../../../../redux/actions/announcement/announcement.action";
import { useSelector, useDispatch } from "react-redux";
import { isSameDate, isNotSameDate } from "../../../../../utility/date/index";
import { isNil } from "lodash";
import { imageDir } from "../../../../../utility/data/constants";
import AudioPlayer from "../../announcement/audio-player";
import theme from "../../../../../navigations/theme";

export default function MyAnnouncements({ navigation }) {
  const { width, height } = Dimensions.get("screen");
  const [newOpen, setNewOpen] = useState(false);
  const [oldOpen, setOldOpen] = useState(false);
  const [imageDetail, setImageDetail] = useState(null);
  const { announcement } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getAnnouncements(dispatch);
  }, []);

  console.log("CHECKEMENT >>>> ", !isNil(imageDetail));

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <View style={{ height, flex: 1, backgroundColor: "#2b2b2b" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 13,
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="chevron-back-outline" color="white" size={27} />
            <Text style={{ fontSize: 19, color: "white", marginLeft: 10 }}>
              My announcements
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Icon name="search-outline" color="white" size={27} />
        </View>
      </View>
      <Divider orientation="horizontal" color="white" />
      {announcement.loading ? (
        <View style={{ paddingTop: 150 }}>
          <ActivityIndicator size={50} color="#813be3" />
        </View>
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: 18 }}>
            <TouchableWithoutFeedback
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                setNewOpen(!newOpen);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 15,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyCenter: "center",
                  }}
                >
                  <Text style={{ fontSize: 18, color: "white" }}>Today</Text>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#424242",
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        borderRadius: 5,
                        color: "white",
                        marginVertical: 2,
                        marginHorizontal: 6,
                      }}
                    >
                      {
                        announcement?.data.filter((announ) =>
                          isSameDate(announ.createdAt)
                        ).length
                      }
                    </Text>
                  </View>
                </View>
                <View>
                  {!newOpen ? (
                    <Icon name="chevron-down-outline" color="white" size={25} />
                  ) : (
                    <Icon name="chevron-up-outline" color="white" size={25} />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>

            {newOpen ? (
              announcement?.data
                .filter((announ) => isSameDate(announ.createdAt))
                .reverse()
                .map((announ, index) => (
                  <MyAnnouncementCard
                    data={announ}
                    setOpenImage={(image) => setImageDetail(image)}
                    key={index}
                  />
                ))
            ) : (
              <></>
            )}

            <TouchableWithoutFeedback
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                setOldOpen(!oldOpen);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 15,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyCenter: "center",
                  }}
                >
                  <Text style={{ fontSize: 18, color: "white" }}>Older</Text>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#424242",
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        borderRadius: 5,
                        color: "white",
                        marginVertical: 2,
                        marginHorizontal: 6,
                      }}
                    >
                      {
                        announcement?.data.filter((announ) =>
                          isNotSameDate(announ.createdAt)
                        ).length
                      }
                    </Text>
                  </View>
                </View>
                <View>
                  {!oldOpen ? (
                    <Icon name="chevron-down-outline" color="white" size={25} />
                  ) : (
                    <Icon name="chevron-up-outline" color="white" size={25} />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>

            {oldOpen ? (
              announcement?.data
                .filter((announ) => isNotSameDate(announ.createdAt))
                .map((announ, index) => (
                  <MyAnnouncementCard
                    data={announ}
                    setOpenImage={(image) => setImageDetail(image)}
                    key={index}
                  />
                ))
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      )}

      <Modal
        animationType="none"
        transparent={true}
        visible={imageDetail ? true : false}
      >
        <View
          style={{
            // flex: 1,
            paddingTop: height / 5,
            padding: 50,
            // alignItems: "center",
            backgroundColor: "transparent",
            // backgroundColor: "#2b2b2b",
          }}
        >
          <View
            style={{
              backgroundColor: "#2b2b2b",
              padding: 10,
              // height: height / 4,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
              }}
            >
              <Image
                source={{
                  uri: imageDir(imageDetail?.image),
                  width: 200,
                  height: 200,
                }}
                style={{ borderWidth: 2, borderColor: "gray" }}
              />
            </View>
            {imageDetail?.audio ? (
              <View style={{ paddingVertical: 20 }}>
                <AudioPlayer audio={imageDir(imageDetail?.audio)} />
              </View>
            ) : (
              <></>
            )}
            <TouchableWithoutFeedback onPress={() => setImageDetail(null)}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View style={{ paddingVertical: 10 }}>
                  <View
                    style={{
                      backgroundColor: theme.colors.authButtonColor,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 100,
                    }}
                  >
                    <Text
                      style={{
                        padding: 5,
                        color: "white",
                        fontSize: 12,
                      }}
                    >
                      Close
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>

      {/* <View
        style={{
          alignItems: "center",
          backgroundColor: "#ede3f2",
          padding: 100,
        }}
      >
        <Modal
          animationType="none"
          transparent={false}
          visible={!isNil(imageDetail)}
          onRequestClose={() => {
            setImageDetail();
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#f7021a",
              padding: 100,
            }}
          >
            <Text
              style={{
                color: "#3f2949",
                marginTop: 10,
              }}
            >
              Modal is open!
            </Text>
          </View>
        </Modal>
      </View>
    </View> */}
    </View>
  );
}
