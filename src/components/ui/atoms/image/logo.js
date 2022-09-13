import React from "react";
import { Image } from "react-native-elements";
import { Dimensions } from "react-native";

export default function Logo() {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <Image
      source={require("../../../../../assets/kliq-logo.png")}
      // source={require("../../../../../assets/Group_1751.svg")}
      style={{ width: 110, height: 110, resizeMode:'contain' }}
    />
  );
}
