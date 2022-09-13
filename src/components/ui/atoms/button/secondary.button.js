import React from "react";
import { Button } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

export default function SecondaryButton(props) {
  const { colors } = useTheme();
  const { label, loading } = props;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <Button
      {...props}
      TouchableComponent={TouchableWithoutFeedback}
      type="outline"
      title={label}
      buttonStyle={{
        borderColor: colors.authButtonColor,
        borderWidth: 2,
        borderRadius: 25,
        height: 50,
        width: width / 2,
      }}
      titleStyle={{
        color: colors.authButtonColor,
        fontSize: 16,
      }}
      // containerStyle={{ borderRadius: 20 }}
      loading={loading}
      onPress={() => props.onClick()}
    />
  );
}
