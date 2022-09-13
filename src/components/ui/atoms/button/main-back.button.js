import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Header } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function MainBackButton({ navigation, handleBack }) {
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handleBack();
      }}
    >
      <View
        style={{
          height: height / 15,
          paddingLeft: 30,
          paddingRight: 15,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Icon name="chevron-back-outline" size={20} color="white" />
          <Text style={{ color: "#fefefe", fontSize: 18, paddingLeft: 20 }}>
            Location Accuracy
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
