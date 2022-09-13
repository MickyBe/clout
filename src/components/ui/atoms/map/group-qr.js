import React, { useState } from "react";
import { View, Text, Button, TouchableWithoutFeedback } from "react-native";
import { Card, SearchBar, Input } from "react-native-elements";
import { Avatar } from "react-native-elements";
import NormalInput from "../input/Input";
import { useTheme } from "@react-navigation/native";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function GroupQr({ onSearchFriends, handleBack }) {
  const width = Dimensions.get("window").width;
  const { colors } = useTheme();
  const [searchKey, setsearchKey] = useState([]);
  const updateSearch = async (values) => {
    console.log("search", values);
    onSearchFriends(values);
  };
  return (
    <TouchableWithoutFeedback onPress={handleBack}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          backgroundColor: "rgba(10,10,10, 0.5)",
          margin: 10,
          padding: 20,
          // width: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // backgroundColor: "green",
            // borderColor: "red",
            // borderWidth: 1,
            height: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
              fontSize: 15,
            }}
          >
            With QR Code
          </Text>
        </View>

        <View
          style={{
            flex: 5,
            flexDirection: "row",
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="qr-code-sharp" size={60} color="white" />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 12 }}>
            Add Your Friends By selecting their name to join your group
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
