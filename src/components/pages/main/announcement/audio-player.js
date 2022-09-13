import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Slider from "react-native-slider-custom";
import { useFocusEffect } from "@react-navigation/native";

import AudioRecorderPlayer from "react-native-audio-recorder-player";
import theme from "../../../../navigations/theme";
import Icon from "react-native-vector-icons/Ionicons";

let audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1);

const AudioPlayer = ({ audio }) => {
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState("00:00:00");
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);


  useFocusEffect(
    useCallback(() => {
      return () => {
        onStopPlay();
      };
    }, [])
  );

  useEffect(() => {
    return () => {
      onStopPlay();
    };
  }, []);

  // Actions
  const onPlayPause = () => {
    if (!loading) {
      if (isPlaying) {
        onPausePlay();
      } else {
        onStartPlay();
      }
    }
  };

  const onStartPlay = useCallback(async () => {
    const path = Platform.select({
      ios: audio ? audio : "akkerman_voice_message.m4a",
      android: audio ? audio : "sdcard/akkerman_voice_message.mp4",
    });

    setLoading(true);
    await audioRecorderPlayer.startPlayer(path);

    setLoading(false);
    setIsPlaying(true);

    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        setIsPlaying(false);
        onStopPlay();
      }


      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));

      return;
    });
  }, [audioRecorderPlayer]);

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
    setIsPlaying(false); 
  };

  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  // Renders
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Pressable style={[{}, { marginRight: 12 }]} onPress={onPlayPause}>
        {loading ? (
          <ActivityIndicator size={24} color="black" />
        ) : isPlaying ? (
          <Icon name="pause-outline" size={20} />
        ) : (
          <Icon name="play-outline" size={20} />
        )}
      </Pressable>
      <View style={{ flex: 1 }}>
        <Slider
          maximumValue={Math.floor(currentDurationSec)}
          value={Math.floor(currentPositionSec)}
          minimumTrackTintColor={theme.colors.authButtonColor}
          maximumTrackTintColor={"white"}
          thumbStyle={{
            width: 12,
            height: 12,
            backgroundColor: theme.colors.authButtonColor,
          }}
          style={{ height: 12 + 8 }}
          disabled
        />
        <Text style={{ ...{}, color: "white" }}>{playTime}</Text>
      </View>
    </View>
  );
};

export default AudioPlayer;
