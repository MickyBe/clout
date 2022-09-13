import auth from "@react-native-firebase/auth";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { socket } from "../../service/socket";
import { background } from "../../service/backgroundGeolocation";
import NetInfo from "@react-native-community/netinfo";

export default function AuthLoadingScreen({ navigation }) {
  const { colors } = useTheme();
  auth().onAuthStateChanged( (user) => {
    if (user) {
      socket.emit("signin", {
        id: user.uid,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
      background();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  });

  NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      navigation.navigate("NoConnetion");
    }
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.backgroundColor,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.authButtonColor} />
    </SafeAreaView>
  );
}
