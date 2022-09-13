import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import Button from "../../ui/atoms/button/button";
import Drawer from "./drawer/drawer";
import Friends from "./map/friends/friends";
import FriendsSearch from "./map/friends/friendsSearch";

import Tab from "./tab";
import Announcement from "./announcement/annoucement";
import FinalAnnouncement from "./announcement/finalAnnouncement";
import CreateGroups from "./map/friends/createGroups";
import SavedTrip from "./activity/saved-trip";
import TripHistory from "./activity/trip-history";
import ProfilePage from "./drawer/pages/profile.page";
import MyAnnouncements from "./drawer/pages/my-announcements";
import EditGroups from "./map/friends/editGroups";
import GroupDetail from "./map/friends/group-detail";
import SavedDetail from "./activity/savedDetail";
import AddSavedTrip from "./activity/add-saved-trip";

const Stack = createNativeStackNavigator();

export default function MainNav() {
  return (
    <Stack.Navigator initialRouteName="Tab">
      {/* <Stack.Group> */}
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="LocationAccuracy"
        component={LocationAccuracy}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tab"
        component={Tab}
      />
      <Stack.Screen name="Test1" component={TestScreen} />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
          presentation: "transparentModal",
        }}
        name="Test"
        component={Friends}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
        }}
        name="MyAnnouncement"
        component={MyAnnouncements}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
        }}
        name="EditGroup"
        component={EditGroups}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
          presentation: "transparentModal",
        }}
        name="FriendsSearch"
        component={FriendsSearch}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
          presentation: "transparentModal",
        }}
        name="GroupDetail"
        component={GroupDetail}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
          presentation: "transparentModal",
        }}
        name="AnnouncementPage"
        component={Announcement}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
          presentation: "transparentModal",
        }}
        name="FinalAnnouncement"
        component={FinalAnnouncement}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
          presentation: "transparentModal",
        }}
        name="CreateGroups"
        component={CreateGroups}
      />
      <Stack.Screen name="Drawer" component={Drawer} />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
        }}
        name="SavedTrip"
        component={SavedTrip}
      />
      {/* <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
        }}
        name="SendRequestFromGroup"
        component={SendRequestFromGroup}
      /> */}
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
        }}
        name="TripHistory"
        component={TripHistory}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
          presentation: "transparentModal",
        }}
        name="ProfilePage"
        component={ProfilePage}
      ></Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false, animation: "none" }}
        name="SavedTripDetail"
        component={SavedDetail}
      ></Stack.Screen>

      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
          presentation: "transparentModal",
        }}
        name="AddSavedTrip"
        component={AddSavedTrip}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

const TestScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}> This is the home screen! </Text>
      <Button onPress={() => navigation.navigate("Test")} title="Open Modal" />
    </View>
  );
};
