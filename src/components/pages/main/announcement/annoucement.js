import { Formik } from "formik";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar, Input } from "react-native-elements";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import theme from "../../../../navigations/theme";
import { imageDir } from "../../../../utility/data/constants";
import AnnouncementValidationSchema from "../../../../utility/validation/announcement.validation";
import YourLocation from "../../../ui/atoms/cards/your_location";
import AudioPlayer from "./audio-player";
import MicModal from "./mic-modal";

export default function Announcement({ navigation }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [audio, setAudio] = useState(null);
  const [showMic, setShowMic] = useState(false);
  const { profile } = useSelector((state) => state);
  const [img, setImg] = useState();

  // const [textInputValue, setTextInputValue] = useState("");

  const pickSingleWithCamera = (mediaType = "photo") => {
    ImagePicker.openCamera({
      cropping: true,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        setImg({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
      })
      .catch((e) => console.log(e));
  };

  const pickSingleImageGallary = (mediaType = "photo") => {
    ImagePicker.openPicker({
      cropping: true,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        setImg({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
      })
      .catch((e) => console.log(e));
  };

  let announcementHeight = height / 3;
  let announcementPadding = height / 4;
  if (img && audio === null) {
    announcementHeight = height / 2;
    announcementPadding = height / 5;
  } else if (audio !== null && img === undefined) {
    announcementHeight = height / 2.3;
    announcementPadding = height / 5;
  } else if (img && audio) {
    announcementHeight = height / 1.65;
    announcementPadding = height / 7;
  } else {
    announcementHeight = height / 3;
    announcementPadding = height / 4;
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          height,
          width: width,
        }}
      >
        <View
          style={{
            paddingTop: announcementPadding,
            paddingHorizontal: 15,
            width: "100%",
          }}
        >
          <MicModal
            show={showMic}
            setShow={setShowMic}
            setMainAudio={setAudio}
          />
          <View>
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: height / 16,
                left: 0,
                right: 0,
                zIndex: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: "#E03AE3",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: [{ rotate: "340deg" }],
                }}
              >
                <Icon name="megaphone-outline" color="white" size={30} />
              </View>
            </View>
            <View
              style={{
                height: height / 20,
                backgroundColor: "rgba(48,48,48, 1)",
                borderTopWidth: 8,
              }}
            ></View>
          </View>
          <Formik
            initialValues={{
              description: "",
            }}
            validationSchema={AnnouncementValidationSchema}
            onSubmit={(values) =>
              navigation.navigate("FinalAnnouncement", {
                audio,
                img,
                description: values.description,
              })
            }
          >
            {(props) => {
              const { values, handleSubmit, handleChange, errors, status } =
                props;
              return (
                <View
                  style={{
                    height: announcementHeight,
                    backgroundColor: "rgba(48,48,48, 1)",
                    borderBottomWidth: 8,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontFamily: "roboto",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 16,
                        marginTop: 15,
                      }}
                    >
                      Make an Announcement
                    </Text>
                    <View style={{ paddingVertical: 7, width: width / 2.5 }}>
                      <YourLocation />
                    </View>
                    {img ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 10,
                          paddingBottom: 15,
                        }}
                      >
                        <View>
                          <Image
                            style={{
                              borderRadius: 10,
                              borderWidth: 2,
                              borderColor: "rgba(128,128,128,0.8)",
                            }}
                            resizeMode="cover"
                            source={img}
                            width={80}
                            height={height / 7}
                          />
                        </View>

                        <View style={{ paddingLeft: 15 }}>
                          <TouchableHighlight onPress={() => setImg(null)}>
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Icon
                                name="close-outline"
                                color="rgba(255,255,255,1)"
                                size={16}
                              />
                            </View>
                          </TouchableHighlight>
                        </View>
                      </View>
                    ) : (
                      <></>
                    )}
                    {audio ? (
                      <View
                        style={{
                          width: "100%",
                          paddingTop: 20,
                          paddingHorizontal: 20,
                        }}
                      >
                        <View>
                          <AudioPlayer audio={audio?.uri} />
                        </View>
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TouchableHighlight onPress={() => setAudio(null)}>
                            <View
                              style={{
                                backgroundColor: theme.colors.authButtonColor,
                                borderRadius: 5,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: "white",
                                  padding: 5,
                                }}
                              >
                                Cancel
                              </Text>
                            </View>
                          </TouchableHighlight>
                        </View>
                      </View>
                    ) : (
                      <></>
                    )}
                    <View
                      style={{
                        width: "100%",
                        paddingHorizontal: 20,
                        paddingTop: 10,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#292929",
                          height: height / 8,
                          borderRadius: 10,
                          padding: 15,
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Avatar
                          rounded
                          size={25}
                          source={{
                            uri: imageDir(profile?.data?.profileImage),
                          }}
                        />
                        <Input
                          style={{
                            width: "85%",
                            paddingVertical: 0,
                            height: "100%",
                            justifyContent: "flex-start",
                            textAlignVertical: "top",
                          }}
                          labelStyle={{
                            fontSize: 15,
                            color: "#c2c2c2",
                          }}
                          selectionColor="#c2c2c2"
                          inputStyle={{
                            borderRadius: 3,
                            paddingLeft: 0,
                            fontSize: 15,
                            color: "#c2c2c2",
                          }}
                          name="description"
                          value={values.description}
                          onChangeText={handleChange("description")}
                          errorMessage={errors.description}
                          underlineColorAndroid="transparent"
                          placeholder="Type something"
                          placeholderTextColor="grey"
                          numberOfLines={4}
                          multiline={true}
                          maxLength={100}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 25,
                      paddingTop: 10,
                      paddingTop: 15,
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: width / 7,
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableWithoutFeedback
                        onPress={() => pickSingleWithCamera()}
                      >
                        <View
                          style={{
                            height: 25,
                            width: 25,
                            borderRadius: 12.5,
                            backgroundColor: "#292929",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Icon name="camera-outline" color="#aaaaaa" />
                        </View>
                      </TouchableWithoutFeedback>

                      <TouchableWithoutFeedback
                        onPress={() => pickSingleImageGallary()}
                      >
                        <View
                          style={{
                            height: 25,
                            width: 25,
                            borderRadius: 12.5,
                            backgroundColor: "#292929",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Icon name="images-outline" color="#aaaaaa" />
                        </View>
                      </TouchableWithoutFeedback>

                      <TouchableWithoutFeedback
                        onPress={() => setShowMic(true)}
                      >
                        <View
                          style={{
                            height: 25,
                            width: 25,
                            borderRadius: 12.5,
                            backgroundColor: "#292929",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Icon name="mic-outline" color="#aaaaaa" />
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback
                      onPress={handleSubmit}
                    >
                      <View
                        style={{
                          backgroundColor: "#813BE3",
                          height: 25,
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          borderRadius: 20,
                          paddingHorizontal: 15,
                        }}
                      >
                        <View>
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            Next
                          </Text>
                        </View>
                        <View>
                          <Icon
                            style={{ paddingLeft: 20 }}
                            name="arrow-forward-outline"
                            color="white"
                          />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>

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
    </ScrollView>
  );
}
