import React from "react";
import { View, Text, TouchableWithoutFeedback,ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SvgEyeClosed from "../../atoms/icons/eye_closed";
import GraySvgComponent from "../icons/grey_eye_closed";
import { ChangeGroupVisibilityType } from "../../../../utility/data/constants";

export default function GroupCard({
  selected,
  group,
  me,
  online,
  handleShow,
  handleHide,
  handleModal,
  changeGroupVisibilityAction,
  acceptLoading
}) {
  if (selected) {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "rgba(47,47,47, 0.9)",
            width: "100%",
            padding: 20,
            justifyContent: "space-between",
            borderRadius: 7,
          }}
        >
          <TouchableWithoutFeedback onPress={handleModal}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text>{group.emoji}</Text>
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
                >
                  {group.name}
                </Text>
                <Text style={{ color: "#27BD7E", fontWeight: "bold" }}>
                  {online}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {acceptLoading ? (
            <TouchableWithoutFeedback onPress={()=>{ }}>
              <View style={{ justifyContent: "center" }}>
                <Icon name="eye-outline" size={25} color={"gray"} />
              </View>
            </TouchableWithoutFeedback>
          // <ActivityIndicator size={20} color="#813be3" />
        ) :
          (<TouchableWithoutFeedback onPress={()=>{
            changeGroupVisibilityAction(
              ChangeGroupVisibilityType.REJECT_VISIBLE,
              group.owner_id,
              group.id);
          // handleHide
          }}>
            <View style={{ justifyContent: "center" }}>
              <Icon name="eye-outline" size={25} color={"white"} />
            </View>
          </TouchableWithoutFeedback>)}
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            borderColor: "#4b4b4b",
            width: "100%",
            padding: 18,
            justifyContent: "space-between",
            borderRadius: 7,
            borderWidth: 2,
          }}
        >
          <TouchableWithoutFeedback onPress={handleModal}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={{ color: "black" }}>{group.emoji}</Text>
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ color: "white", fontSize: 18 }}>
                  {group.name}
                </Text>
                <Text style={{ color: "gray" }}>{online}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ justifyContent: "center" }}>
          {acceptLoading ? (
            <TouchableWithoutFeedback onPress={()=>{ }}>
            <GraySvgComponent/>
          </TouchableWithoutFeedback>
          // <ActivityIndicator size={20} color="#813be3" />
          ) :
          (
            <TouchableWithoutFeedback onPress={ () =>{
              changeGroupVisibilityAction(
                ChangeGroupVisibilityType.ACCEPT_VISIBLE,
                group.owner_id,
                group.id);
              // handleShow
          }
          }>
              <SvgEyeClosed />
            </TouchableWithoutFeedback>)}
          </View>
        </View>
      </View>
    );
  }
}
