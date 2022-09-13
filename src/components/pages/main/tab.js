import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Test from "../../pages/TestPage";
import Map from "./map/map";
import Activity from "./activity/activity";
import Notification from "./notification/notification";
import Chat from "./chat/chat";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {useSelector} from "react-redux";
import auth from "@react-native-firebase/auth";
import { socket } from "../../../service/socket";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const userAuth = auth().currentUser;
  const { colors } = useTheme();
  const request = useSelector((state) => state.request);
  const userRequests = request.data?.userFriends ? request.data?.userFriends?.length : 0;
  const groupRequests = request.data?.groups ? request?.data?.groups?.length : 0;
  const numberOfRequests = userRequests + groupRequests;
  const [annoucementData, setAnnouncementData] = useState([]);
  useEffect(() => {
    socket.on(`announcement-${userAuth.uid}`, (msg) => {
      const data = JSON.parse(msg.message);
      let temp = annoucementData;
      temp.push(data);
      setAnnouncementData([...temp]);
    });
  }, []);

  const count = (numberOfRequests + annoucementData.length === 0) ? null : (numberOfRequests + annoucementData.length);
  console.log("Count >>>>>>> ", count); 
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#9700e5",
        tabBarInactiveTintColor: "#bbbbbb",
        tabBarActiveBackgroundColor: colors.backgroundColor,
        tabBarInactiveBackgroundColor: colors.backgroundColor,
        tabBarStyle: {
          borderTopColor: "transparent",
          borderTopWidth: 0,
        },
      }}
      labeled={false}
    >
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          animationTypeForReplace: "pop",
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="location-outline" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="chatbubble-ellipses-outline" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarBadge: count,
          tabBarIcon: ({ color }) => (
            <Icon name="notifications-outline" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="analytics-outline" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
