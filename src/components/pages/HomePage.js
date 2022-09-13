import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { logoutUser } from "../../logic/controller/authController";
export default function HomeScreen() {
  const onLogoutPressed = async (values) => {
    console.log("Logout pressed");
    const response = await logoutUser();
    console.log("response", response);
  };
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text> Home Screen </Text>
      <Button title="Logout" onPress={() => onLogoutPressed()} />
    </SafeAreaView>
  );
}
