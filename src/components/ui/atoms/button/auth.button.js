import React from "react";
import { Button } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { Dimensions, TouchableWithoutFeedback } from "react-native";

export default function AuthButton({label, loading, type, onClick, icon=null}) {
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <Button
      title={label}
      TouchableComponent={TouchableWithoutFeedback}
      buttonStyle={{
        backgroundColor: colors.authButtonColor,
        borderRadius: 25,
        height: 50,
        width: type
          ? type === "confirmation"
            ? width / 2
            : 150
          : 150,
      }}
      titleStyle={{
        color: "white",
        fontSize: 16,
      }}
      // containerStyle={{ borderRadius: 20 }}
      loading={loading}
      onPress={() => onClick()}
    />
  );
}
