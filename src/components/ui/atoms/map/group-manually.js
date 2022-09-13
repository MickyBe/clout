import React, { useState } from "react";
import { View, Text, Button, TouchableWithoutFeedback } from "react-native";
import { Card, SearchBar, Input } from "react-native-elements";
import { Avatar } from "react-native-elements";
import NormalInput from "../input/Input";
import { useTheme } from "@react-navigation/native";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function GroupManually({ handleGroupManually }) {
  return (
    <TouchableWithoutFeedback onPress={handleGroupManually}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "rgba(10,10,10, 0.5)",
          margin: 10,
          padding: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
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
            Add manually
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
          <Icon name="people" size={60} color="white" />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            Add Your Friends By selecting their name to join your group
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
