import React, { useEffect, useState } from "react";
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import Slider from "react-native-slider-custom";
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from "react-native-audio-recorder-player";
import Icon from "react-native-vector-icons/Ionicons";
import RNFetchBlob from "rn-fetch-blob";

const CANCEL_RECORDING_SLIDER_VALUE = 0.8;
const MAX_AUDIO_DURATION = 180000; // ms = 180000=3m

let audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1);

const AudioRecorder = ({}) => {
  const [androidGranted, setAndroidGranted] = useState(false);
  const [recordSlidingValue, setRecordSlidingValue] = useState(0);
  const [recordTime, setRecordTime] = useState("00:00:00");
  const [isRecording, setIsRecording] = useState(false);
  const [audio, setAudio] = useState();

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
        ios: "hello.m4a",
        android: `${dirs.CacheDir}/hello.mp3`,
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
    console.log("Stop result >>>>> ", result);

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

  console.log(recordTime);

  // Renders
  return (
    <View style={{ flex: 1, backgroundColor: "gray" }}>
      <View style={{ margin: 30 }}>
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
                      {justifyContent: "center", alignItems: "center"},
                      { opacity: 1 - recordSlidingValue },
                    ]}
                  />
                  <Icon
                    name="trash-outline"
                    color="white"
                    size={20}
                    style={[
                      {justifyContent: "center", alignItems: "center"},
                      {
                        opacity:
                          recordSlidingValue > CANCEL_RECORDING_SLIDER_VALUE
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
                  <Icon name="mic-outline" size={20} style={{justifyContent: "center", alignItems: "center"}} />
              </View>
            )
          }
          thumbStyle={[
            {
              backgroundColor:
                recordSlidingValue > CANCEL_RECORDING_SLIDER_VALUE
                  ? "red"
                  : "blue",
            },
          ]}
          style={styles.swipeableButton}
          animateTransitions
        />

        <View style={[styles.recorder, { opacity: 1 - recordSlidingValue }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                // ...TextStyle.caption,
                color: "white",
                marginLeft: 40 + 8,
              }}
            >
              {isRecording ? "Right to cancel" : "Press to record"}
            </Text>
          </View>

          {isRecording && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "red",
              }}
            >
              <Text
                style={{
                  // ...TextStyle.body1,
                  marginRight: 10,
                }}
              >
                {recordTime}
              </Text>
              <Icon name="recording-outline" />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default AudioRecorder;

const styles = StyleSheet.create({
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
    alignItems: "center"
  },
  animatedIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
