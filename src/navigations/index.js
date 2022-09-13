import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import LoginScreen from "../components/pages/auth/LoginPage";
import MessageSent from "../components/pages/auth/MessageSent";
import RecoveryPage from "../components/pages/auth/RecoveryPage";
import ResetPassword from "../components/pages/auth/ResetPassword";
import SignupScreen from "../components/pages/auth/SignupPage";
import AuthLoadingScreen from "../components/pages/AuthLoading";
import FriendsScreen from "../components/pages/main/map/friends/friends";
import Drawer from "../components/pages/main/drawer/drawer";
// import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import Theme from "./theme";
import { background } from "../service/backgroundGeolocation";
import ResetMessageSent from "../components/pages/auth/ResetMessageSent";
import ResetPasswordPage from "../components/pages/auth/ResetPasswordPage";
import NoConnetion from "../components/pages/main/utility/no-connection";
import Test from "../components/pages/Test/Test";
const Stack = createNativeStackNavigator();

function Navigation() {
  useEffect(() => {
    // background();
  }, []);
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator initialRouteName="AuthLoadingScreen">
        <Stack.Screen
          options={{ headerShown: false }}
          name="AuthLoadingScreen"
          component={AuthLoadingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={SignupScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ResetPassword"
          component={ResetPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MessageSent"
          component={MessageSent}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ResetMessageSent"
          component={ResetMessageSent}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ResetPasswordPage"
          component={ResetPasswordPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RecoveryPage"
          component={RecoveryPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={Drawer}
        />
        <Stack.Screen
          options={{ headerShown: false, backgroundColor: "transparent" }}
          name="FriendsScreen"
          component={FriendsScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, backgroundColor: "transparent" }}
          name="NoConnetion"
          component={NoConnetion}
        />
        <Stack.Screen
          options={{ headerShown: false, backgroundColor: "transparent" }}
          name="Test"
          component={Test}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
