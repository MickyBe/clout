import {
  createDrawerNavigator,
  DrawerContentScrollView
} from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { Share, Text, useWindowDimensions, View } from "react-native";
import { Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
import { LocationAccuracyTypes } from "../../../../config/location-accuracy";
import { LogoutUser } from "../../../../logic/controller/authController";
import { socket } from "../../../../service/socket";
import { getLocationInterval } from "../../../../service/storage";
import { imageDir } from "../../../../utility/data/constants";
import LocationAccuracy from "../../../ui/atoms/map/location-accuracy";
import MainNav from "../main-nav";
import DrawerCard from "./drawerCard";
import LogoutButton from "./logout-button";
import LocationAccuracyPage from "./pages/location-accuracy.page";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const height = useWindowDimensions().height;
  const { profile } = useSelector((state) => state);
  const [locationAccuracy, setLocationAccuracy] = useState(LocationAccuracyTypes.QUICKSTER);

  // useEffect(() => {
  //   checkLocationAccuracy()
  // }, []);

  const checkLocationAccuracy = async () => {
    try {
      const location = await getLocationInterval();
      console.log("lcoation >>> ", location);
      if (location) setLocationAccuracy(location);
    } catch (err) {
      console.log("ERROR >>> ", err);
    }
  };

  checkLocationAccuracy();

  // let image = "";
  // if (profile?.data?.profileImage) image = imageDir(profile.data.profileImage);
  // image =;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Share kliq social to your friends',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <DrawerContentScrollView style={{ backgroundColor: "#2b2b2b" }} {...props}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ paddingTop: height / 10 }}>
          <Avatar
            containerStyle={{ borderWidth: 2, borderColor: "white" }}
            rounded
            source={{
              uri: imageDir(profile.data.profileImage),
            }}
            size={120}
          />
        </View>
        <View style={{ paddingTop: height / 35 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            {profile?.data?.username ? profile?.data?.username : ""}
          </Text>
        </View>
        <Text style={{ fontSize: 16, color: "#adadad" }}>
          {profile?.data?.bio ? profile?.data?.bio : ""}
        </Text>
        <LocationAccuracy
          type={locationAccuracy}
          height={height}
          handleClick={() => props.navigation.navigate("LocationAccuracyPage")}
        />
        <View
          style={{
            width: "100%",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ paddingTop: 10 }}>
            <DrawerCard
              height={height}
              handleClick={() => props.navigation.navigate("ProfilePage")}
              icon="person-outline"
              text="My Profile"
            />
          </View>
          <View style={{ paddingTop: 10 }}>
            <DrawerCard
              height={height}
              rotate={true}
              handleClick={() => props.navigation.navigate("MyAnnouncement")}
              icon="megaphone-outline"
              text="My announcements"
            />
          </View>
          <View style={{ paddingTop: 10 }}>
            <DrawerCard
              height={height}
              handleClick={onShare}
              icon="people-outline"
              text="Invite Friends"
            />
          </View>
          {/* <View style={{ paddingTop: 10 }}>
            <DrawerCard
              height={height}
              handleClick={() => console.log("testing ...")}
              icon="globe-outline"
              text="Language"
            />
          </View> */}
          <View style={{ paddingTop: 10 }}>
            <DrawerCard
              height={height}
              handleClick={() => console.log("testing ...")}
              icon="settings-outline"
              text="Setting"
            />
          </View>
          <View style={{ paddingTop: 10 }}>
            <LogoutButton
              height={height}
              text="Logout"
              handleLogout={() => {
                socket.emit("logout", {id: profile?.data?.uid ?? '7mZ0WEVtRccGehWG8kZVO5aDRt32'}); 
                socket.disconnect();
                LogoutUser();
              }}
            />
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Homee"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeBackgroundColor: "transparent",
      }}
      // drawerStyle={{ backgroundColor: "transparent" }}
    >
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Homee"
        component={MainNav}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="LocationAccuracyPage"
        component={LocationAccuracyPage}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
