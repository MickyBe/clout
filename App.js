import React, { useEffect, useState } from "react";
import Navigation from "./src/navigations";
import { Provider } from "react-redux";
import "firebase/auth";
// import auth from "@react-native-firebase/auth";
import "react-native-gesture-handler";
import { InAppNotificationProvider } from "react-native-in-app-notification";
// import { GoogleSignin } from '@react-native-community/google-signin';
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

import store from "./src/redux/store";

export default function App({}) {

  // GoogleSignin.configure({
  //   webClientId: "1018329247380-kkot1p1prua830tuufh804cfa5qevgij.apps.googleusercontent.com"
  // })

  return (
    <Provider store={store}>
      <InAppNotificationProvider>
        <Navigation />
      </InAppNotificationProvider>
    </Provider>
  );
}
