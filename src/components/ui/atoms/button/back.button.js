import React from "react";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback } from "react-native";

export default function BackButton(props) {
  return (
    <Button
      TouchableComponent={TouchableWithoutFeedback}
      icon={<Icon name="chevron-back-outline" size={15} color="white" />}
      title="back"
      type="clear"
      onPress={() => props.onClick()}
      titleStyle={{
        paddingLeft: 15,
        fontWeight: "100",
        fontSize: 15,
        color: "white",
      }}
    />
  );
}
