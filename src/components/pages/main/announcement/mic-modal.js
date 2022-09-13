import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from "react-native-audio-recorder-player";
import { Button } from "react-native-elements/dist/buttons/Button";
import Slider from "react-native-slider-custom";
import Icon from "react-native-vector-icons/Ionicons";
import RNFetchBlob from "rn-fetch-blob";
import theme from "../../../../navigations/theme";
import AudioPlayer from "./audio-player";
const CANCEL_RECORDING_SLIDER_VALUE = 0.8;
const MAX_AUDIO_DURATION = 180000; // ms = 180000=3m

let audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1);

const MicModal = ({ show, setShow, setMainAudio }) => {
  const { height, width } = Dimensions.get("window");
  const [androidGranted, setAndroidGranted] = useState(false);
  const [recordSlidingValue, setRecordSlidingValue] = useState(0);
  const [recordTime, setRecordTime] = useState("00:00:00");
  const [isRecording, setIsRecording] = useState(false);
  const [audio, setAudio] = useState(null);

  // Effects
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android") {
        const hasPermissionWrite = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        const hasPermissionRecord = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );

        if (hasPermissionRecord && hasPermissionWrite) {
          setAndroidGranted(true);
        } else {
          setAndroidGranted(false);
        }
      } else {
        setAndroidGranted(true);
      }
    })();
  }, []);

  // Handlers
  const handleSlidingStart = () => {
    onStartRecord();
  };

  const handleSlidingChange = (value) => {
    setRecordSlidingValue(value);
  };

  const handleSlidingComplete = (value) => {
    onStopRecord(value);
  };

  // Actions
  const onStartRecord = async () => {
    if (!androidGranted) {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          ToastAndroid.show(
            "Please enable microphone permission",
            ToastAndroid.LONG
          );
          return false;
        }
      }

      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          ToastAndroid.show("Storage is not allowed", ToastAndroid.LONG);
          return false;
        }
      }

      setAndroidGranted(true);
    } else {
      const dirs = RNFetchBlob.fs.dirs;
      const path = Platform.select({
        ios: "announcement.m4a",
        android: `${dirs.CacheDir}/announcement.mp3`,
      });

      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };

      await audioRecorderPlayer.startRecorder(path, audioSet);

      setIsRecording(true);
      audioRecorderPlayer.addRecordBackListener((e) => {
        setRecordTime(
          audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
        );

        // Stop and save recording
        if (e.current_position > MAX_AUDIO_DURATION) {
          onStopRecord(0);
        }

        return;
      });
    }

    return;
  };

  const onStopRecord = async (value) => {
    const result = await audioRecorderPlayer.stopRecorder();

    setRecordSlidingValue(0);
    setIsRecording(false);
    audioRecorderPlayer.removeRecordBackListener();

    if (value > CANCEL_RECORDING_SLIDER_VALUE) {
      // Cancel recording
      setAudio(null);
    } else {
      // Save recording
      if (!result.includes("stop")) {
        setAudio({ duration: recordTime, uri: result });
      }
    }
  };


  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        setShow(!show);
      }}
    >
      <View
        style={{
          flex: 1,
          paddingTop: height / 3,
          paddingHorizontal: 30,
          height: 500,
        }}
      >
        <View
          style={{
            backgroundColor: "#2b2b2b",
            borderRadius: 3,
            paddingHorizontal: 30,
            paddingVertical: 15,
            width: "100%"
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <View>
              <Slider
                value={recordSlidingValue}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
                onSlidingStart={handleSlidingStart}
                onSlidingComplete={handleSlidingComplete}
                onValueChange={handleSlidingChange}
                customThumb={
                  isRecording ? (
                    <View style={styles.animatedIconsContainer}>
                      <View
                        style={[
                          styles.animatedIconsBG,
                          { opacity: recordSlidingValue },
                        ]}
                      />
                      <View style={[styles.animatedIconsWrap]}>
                        <Icon
                          name="mic-outline"
                          color="white"
                          size={20}
                          style={[
                            {
                              justifyContent: "center",
                              alignItems: "center",
                            },
                            { opacity: 1 - recordSlidingValue },
                          ]}
                        />
                        <Icon
                          name="trash-outline"
                          color="white"
                          size={20}
                          style={[
                            {
                              justifyContent: "center",
                              alignItems: "center",
                            },
                            {
                              opacity:
                                recordSlidingValue >
                                CANCEL_RECORDING_SLIDER_VALUE
                                  ? 1
                                  : recordSlidingValue,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 120,
                      }}
                    >
                      <Icon
                        name="mic-outline"
                        size={20}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    </View>
                  )
                }
                thumbStyle={[
                  {
                    backgroundColor:
                      recordSlidingValue > CANCEL_RECORDING_SLIDER_VALUE
                        ? "red"
                        : theme.colors.authButtonColor,
                  },
                ]}
                style={styles.swipeableButton}
                animateTransitions
              />

              <View
                style={[styles.recorder, { opacity: 1 - recordSlidingValue }]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      // ...TextStyle.caption,
                      color: "white",
                      marginLeft: 40 + 8,
                    }}
                  >
                    {isRecording ? "Right to cancel" : !audio ? "Press to record" : "Slide to cancel"}
                  </Text>
                </View>

                {isRecording && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        marginRight: 10,
                        color: "white",
                      }}
                    >
                      {recordTime}
                    </Text>
                    <Icon
                      name="recording-outline"
                      size={20}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </View>
                )}
              </View>
            </View>

            {audio ? (
              <View style={{ paddingTop: 30 }}>
                <AudioPlayer audio={audio?.uri} />
              </View>
            ) : (
              <></>
            )}

            <View
              style={{
                paddingTop: 30,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "stretch",
                width: "100%",
              }}
            >
              <TouchableWithoutFeedback onPress={() => {setAudio(null); setShow(false);}}>
                <View>
                  <Text style={{ color: "white", margin: 5, borderRadius: 3 }}>
                    Cancel
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              {audio ? <TouchableWithoutFeedback onPress={() => {audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener(); setMainAudio(audio); setShow(false)}}>
                <View>
                  <Text style={{ color: "white", margin: 5, borderRadius: 3 }}>
                    Ok
                  </Text>
                </View>
              </TouchableWithoutFeedback> : <></>}
              <View>
                <Icon icon="checkmark-outline" color="white" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  secondCounter: {
    // justifyContent: "center",
    // alignItems: "center",
  },
  modalView: {
    width: "90%",
    backgroundColor: "#455A64",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  recordBtnWrapper: {
    flexDirection: "row",
  },
  txt: {
    color: "white",
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  btn: {
    borderColor: "white",
    borderWidth: 1,
  },
  txtRecordCounter: {
    marginTop: 32,
    color: "white",
    fontSize: 20,
    textAlignVertical: "center",
    fontWeight: "200",
    fontFamily: "Helvetica Neue",
    letterSpacing: 3,
  },
  recorder: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  swipeableButton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 40,
    zIndex: 1,
  },
  animatedIconsContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  animatedIconsBG: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "red",
  },
  animatedIconsWrap: {
    position: "relative",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default MicModal;
