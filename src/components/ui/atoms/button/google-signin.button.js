import React from "react";
import { SocialIcon } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";

export default function GoogleSignin(props) {
  const { colors } = useTheme();
  return (
    <SocialIcon
      TouchableComponent={TouchableWithoutFeedback}
      onPress={() => props.onClick()}
      title="Signin with google"
      button
      type="google"
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: colors.backgroundColor,
        borderColor: "white",
        borderWidth: 2,
      }}
    />
  );
}
