import auth from "@react-native-firebase/auth";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
import { Avatar, SpeedDial } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../../redux/actions/user/user.action";
import { socket } from "../../../../service/socket";
import GetLocation from "../../../../utility/location/getLocation";
import FriendMarker from "../../../ui/atoms/location/friend.marker";
import FriendsButton from "../../../ui/atoms/map/friends-button";
import FriendsList from "../../../ui/atoms/map/friends-list";
import ProfileButton from "../../../ui/atoms/user/profile-button";
import UserMarker from "../../../ui/atoms/user/user-marker";
import { withInAppNotification } from "react-native-in-app-notification";
import { getUserRequest } from "../../../../redux/actions/user/user.action";
import { date } from "yup";

MapboxGL.setAccessToken(
  "pk.eyJ1Ijoia2xpcSIsImEiOiJja3U3dngzcmU1ajJjMndwaWZpcnRscHNyIn0.tVk9sh1nGAhcPucKCA8X3Q"
);

function Map({ showNotification, route, navigation }) {
  const dispatch = useDispatch();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState();
  const [annoucementData, setAnnouncementData] = useState([]);
  const [friendsLocation, setFriendsLocation] = useState([]);
  const userRequests = useSelector((state) => state.request);
  let cameraRef = useRef();
  const touchable = useRef();

  const userAuth = auth().currentUser;

  useEffect(() => {
    const openDrawer = route.params?.openDrawer;
    if (openDrawer) {
      navigation.openDrawer();
    }

    GetLocation.then((res) =>
      setUserLocation([res["coords"]["longitude"], res["coords"]["latitude"]])
    ).catch((err) => console.log(err));
    getUserProfile(dispatch);
    getUserRequest(dispatch);

    socket.on(`notification-${userAuth.uid}`, (msg) => {
      showNotification(msg);
      getUserRequest(dispatch);
    });

    socket.on(`announcement-${userAuth.uid}`, (msg) => {
      const data = JSON.parse(msg.message);
      let temp = annoucementData;
      temp.push(data);
      setAnnouncementData([...temp]);
      showNotification({
        message: `${data.creator} just sent an announcement`,
      });
      
    });
  }, []);

  useEffect(() => {
    // console.log("api call stated");
    socket.on("location", msg => {
      // console.log("AAAAAAA Message",msg)
      if(msg.clearGroup){
        let temporaryFriendsLocation=friendsLocation;
        for(let i=0;temporaryFriendsLocation.length;i++){
          // console.log("friendsLocation[i]",temporaryFriendsLocation[i]);
          const groupIndex = temporaryFriendsLocation[i].group.findIndex(x => x==msg.group);
          if(groupIndex !== -1){
            if(temporaryFriendsLocation[i].online || temporaryFriendsLocation[i].group.length>1){
              temporaryFriendsLocation[i].group.splice(groupIndex, 1);
              // console.log("removing room from list");
              // setFriendsLocation([...friendsLocation]);
            }else{
              // console.log("removing every thing");
              temporaryFriendsLocation.splice(i, 1);
              // setFriendsLocation([...friendsLocation.splice(i, 1)]);
              // setFriendsLocation([...friendsLocation]);
            }
          }
        }
        setFriendsLocation([...temporaryFriendsLocation]);
      }else{
      var index = friendsLocation.findIndex(x => x.id==msg.id);//someArray.splice(x, 1);
      if(index === -1){
        if(msg.online || msg.groupOnline){
          const groupName = msg.group;
          msg.group = [];
          if(groupName.length>0) msg.group.push(groupName);
          // console.log("initialization ",msg);
          friendsLocation.push(msg)
          setFriendsLocation([...friendsLocation]);
        }
      }else{
        //location update
        if(!msg.type){
          friendsLocation[index].online=msg.online;
          if(msg.online){
            friendsLocation[index].location=msg.location;
            friendsLocation[index].disconnected=msg.disconnected;
            setFriendsLocation([...friendsLocation]);
          }else{
            //check if group is online
            if(friendsLocation[index].group.length>0){
              setFriendsLocation([...friendsLocation]);
            }else{
            setFriendsLocation([...friendsLocation.splice(index, 1)]);
            setFriendsLocation([...friendsLocation]);
            }
          }
        }else{
          if(msg.groupOnline){
            friendsLocation[index].location=msg.location;
            friendsLocation[index].groupOnline=msg.groupOnline;
            // console.log("we out",msg);
            if(!friendsLocation[index].group.includes(msg.group)){
              friendsLocation[index].group.push(msg.group);
              // console.log("we in",msg);
            }
            setFriendsLocation([...friendsLocation]);
          }else{
            //check if friend is online
            if(friendsLocation[index].online){
              friendsLocation[index].groupOnline=msg.groupOnline;
              friendsLocation[index].group=friendsLocation[index].group.filter(item => item != msg.group);
              setFriendsLocation([...friendsLocation]);
            }else{
              //check if there are any other groups
              if(friendsLocation[index].group.length>1){
                friendsLocation[index].groupOnline=msg.groupOnline;
                friendsLocation[index].group=friendsLocation[index].group.filter(item => item != msg.group);
                setFriendsLocation([...friendsLocation]);
              }else{
                setFriendsLocation([...friendsLocation.splice(index, 1)]);
                setFriendsLocation([...friendsLocation]);
              }
            }
          }
        }
      }
    }
      // console.log("friendsLocation After",index ,friendsLocation);
      // console.log("setFriendsLocation([...friendsLocation]); ",friendsLocation);
      // }
    });
  // console.log('we are here for the first time');
  }, []);


  // const renderAnnotations = (friendsLocation) => {
  //   const items = friendsLocation.map((data, index) => renderAnnotation(data, index));
  //   return items;
  // };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "grey",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ height: "100%", width: "100%" }}>
        <MapboxGL.MapView
          follow
          rotateEnabled={false}
          logoEnabled={false}
          style={{ flex: 1 }}
          styleURL="mapbox://styles/kliq/ckubt5dru3vhb18mq2t54kzf7"
          onPress={() => setSelected(0)}
          onDidFinishLoadingStyle={() => setLoading(false)}
        >
          <MapboxGL.Camera
            ref={cameraRef}
            zoomLevel={14}
            animationMode="flyTo"
            animationDuration={0}
            centerCoordinate={userLocation}
            followUserLocation={true}
          />
          {userLocation ? (
            <MapboxGL.PointAnnotation
              id={"key12"}
              coordinate={userLocation}
              onSelected={(args) => console.log(args)}
              tracksViewChanges={false}
            >
              <UserMarker />
            </MapboxGL.PointAnnotation>
          ) : null}
          {friendsLocation.map((data, index) => (
            <View key={Date.now()}>
            <MapboxGL.PointAnnotation
              key={data.id}
              id={`pointAnnotation${data.id}`}
              // ref={annoteRef}
              ref={touchable}
              coordinate={data.location}
              onSelected={() => {
                cameraRef.current.setCamera({
                  centerCoordinate: data.location,
                  zoomLevel: 16,
                  animationDuration: 1000,
                });
                setSelected(data);
              }}
              >
                  <FriendMarker
                    annoucementData={annoucementData}
                    key={data.id}
                    handleClosePopover={() => setSelected({id:0})}
                    selected={selected}
                    name={data.name}
                    color={data.color}
                    disconnected={data.disconnected}
                    data={data}
                    width={width}
                    touchable={touchable}
                  />
            </MapboxGL.PointAnnotation>
            </View>
          ))}
        </MapboxGL.MapView>
      </View>

      <View
        style={{
          position: "absolute",
          left: 15,
          top: 0,
          width: width / 2.5,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <ProfileButton handleClick={() => navigation.openDrawer()} />
        <FriendsButton
          type="close"
          handleClick={() => navigation.navigate("Test")}
        />
      </View>

      <FriendsList
        height={height}
        data={friendsLocation}
        userClicked={(location) => {
          cameraRef.current.setCamera({
            centerCoordinate: location,
            zoomLevel: 16,
            animationDuration: 2000,
          });
        }}
      />

      <SpeedDial
        color={colors.secondaryTextColor}
        isOpen={open}
        icon={<Icon name="radio-button-on-outline" size={19} color="white" />}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        style={{ paddingBottom: height / 13 }}
      >
        <SpeedDial.Action
          containerStyle={{ backgroundColor: "red" }}
          color="#f700e2"
          style={{ backgroundColor: "gray" }}
          icon={
            <Icon name="chatbubble-ellipses-outline" size={15} color="white" />
          }
          title="All messages"
          onPress={() => console.log("Add Something")}
        />
        <SpeedDial.Action
          icon={<Icon name="megaphone-outline" size={15} color="white" />}
          title="Make an announcement"
          onPress={() => {
            setOpen(false);
            navigation.navigate("AnnouncementPage");
          }}
        />
      </SpeedDial>
      <View
        style={{
          position: "absolute",
          right: 17,
          bottom: 10,
        }}
      >
        <Avatar
          onPress={() => {
            cameraRef.current.setCamera({
              centerCoordinate: userLocation,
              zoomLevel: 14,
              animationDuration: 2000,
            });
          }}
          size={55}
          rounded
          source={require("../../../../../assets/group_28.png")}
        />
      </View>
    </SafeAreaView>
  );
}

export default withInAppNotification(Map);
