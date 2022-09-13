import React, {useEffect,useState } from "react";
import { View, Text, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { Avatar, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import SvgEyeClosed from "../icons/eye_closed";
import GraySvgComponent from "../icons/grey_eye_closed";
import { imageDir } from "../../../../utility/data/constants";

export default function FriendsListCard({
  isCheckBox,
  friend,
  iconClicked,
  style,
  onlineFriends,
  offlineFriends,
  acceptLoading,
  openVisibility,
  closeVisibility,
  ...props
}) {
  // console.log("friend data dump",friend);
  const [visibility, setVisibility] = useState(3);
  //visibility logic
  // user  friend visibility-code
  //    1    1     0     both are visible
  //    0    1     1     user have disabled location
  //    1    0     2     friend have disabled location
  //    0    0     1     both have disabled each other

  let userType= friend.UserFriend.friend_id==friend.id ? 1 : 0;
  useEffect(() => {
    visibilityLogicFunction();
  }, [friend]);

  useEffect(() => {
    visibilityListener();
  }, [offlineFriends]);

  const visibilityListener = () => {
      //real time
      if(offlineFriends.includes(friend.id)) {
        console.log("ofline xxxxxxxx=======>",offlineFriends);
        userType ? friend.UserFriend.friendVisible = false : friend.UserFriend.userVisible = false ;
        visibilityLogicFunction();
      }else{ 
        console.log("onlineFriends oute=======----->",onlineFriends);
        if(onlineFriends.includes(friend.id)){
          userType ? friend.UserFriend.friendVisible = true : friend.UserFriend.userVisible = true ;
          visibilityLogicFunction();
      console.log("onlineFriends +++++++==in=====----->",onlineFriends);
        }
      }
  };
  const visibilityLogicFunction = () => {
    if(userType==1){
      if(!friend.UserFriend.userVisible){
        setVisibility(1);
      }
      else if(friend.UserFriend.userVisible&&friend.UserFriend.friendVisible){
        setVisibility(0);
      }else if(friend.UserFriend.userVisible&&!friend.UserFriend.friendVisible){
        setVisibility(2);
      }
      console.log("we here");
    }else{
      if(!friend.UserFriend.friendVisible){
        setVisibility(1);
      }
      else if(friend.UserFriend.userVisible&&friend.UserFriend.friendVisible){
        setVisibility(0);
      }else if(!friend.UserFriend.userVisible&&friend.UserFriend.friendVisible){
        setVisibility(2);
      }
      console.log("we here in second");
    }
    console.log("this is the visability",visibility,userType);  
  }
  return (
    <View
      {...props}
      key={Date.now()}
      style={{
        ...style,
        paddingLeft: 20,
        paddingRight: 20,
        // paddingTop: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Avatar
            overlayContainerStyle={{ backgroundColor: "blue" }}
            size={40}
            rounded
            source={{
              uri: imageDir(friend?.profileImage),
            }}
          />
        </View>
        <View style={{ paddingLeft: 20 }}>
          <Text style={{ color: "white", fontSize: 18 }}>
            {friend.username}
          </Text>
        </View>
      </View>
      <View>
        {
        // selected.includes(friend.id)
        visibility==0?
        acceptLoading ? (
          <Icon
          name="eye-outline"
          size={24}
          color={"gray"}
        />
        ) 
        : 
        (
          <Icon
            onPress={() => {
              closeVisibility(userType)
              userType ? friend.UserFriend.userVisible = false : friend.UserFriend.friendVisible = false ;
              visibilityLogicFunction();
            }}
            name="eye-outline"
            size={24}
            color={"white"}
          />
        )
        : visibility==1?
        acceptLoading ? (
          <GraySvgComponent />
        ) 
        :
        (
          <TouchableWithoutFeedback onPress={() => {
            openVisibility(userType)
            userType ? friend.UserFriend.userVisible = true : friend.UserFriend.friendVisible = true ;
            visibilityLogicFunction();
            }}>
            <SvgEyeClosed />
          </TouchableWithoutFeedback>
        )
        : visibility==2?
        acceptLoading ? (
          <Icon 
            onPress={() => {}}
            name="eye-off-outline"
            size={24}
            color={"gray"}
          />
        ):
        (
          <Icon 
            onPress={() => {
              closeVisibility(userType)
              userType ? friend.UserFriend.userVisible = false : friend.UserFriend.friendVisible = false ;
              visibilityLogicFunction();
            }}
            name="eye-off-outline"
            size={24}
            color={"white"}
          />
        )
        :
        (
        <TouchableWithoutFeedback onPress={() => console.log("data not working")}>
          <SvgEyeClosed />
        </TouchableWithoutFeedback>
        )
      }
      </View>
    </View>
  );
}
