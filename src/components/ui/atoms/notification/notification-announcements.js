import React from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

export default function NotificationAnnouncements() {
  return (
    <View
      style={{
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/*       
      {[
        {
          id: 0,
          name: "Mikiyas Bekele",
          message:
            "There is a bar fight in rickys Bar if anyone is interested Lmao",
        },
        {
          id: 1,
          name: "Abel Beklele",
          message:
            "Weird gang fight just broke out at 48 and 6th ave, watch out ...",
        },
      ].map((item, index) => {
        return ( */}
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "rgba(153, 41, 142,0.5)",
          margin: 5,
          borderRadius: 5,
          width: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            position: "relative",
            justifyContent: "space-between",
            padding: 10,
            margin: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Abebe kebede</Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 12,
              paddingVertical: 10,
            }}
          >
            There is a bar fight in ricky's bar if anyone is intersted lmao
          </Text>
          <View
            style={{
              position: "relative",
              backgroundColor: "rgba(69, 9, 66, 0.5)",
              alignItems: "center",
              padding: 10,
              borderRadius: 8,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ backgroundColor: "gray", borderRadius: 2 }}>
              <Icon
                style={{ padding: 5 }}
                color="white"
                name="return-up-forward-outline"
              />
            </View>
            <Text
              style={{
                paddingLeft: 10,
                color: "white",
                fontSize: 15,
              }}
            >
              NAVIGATE
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: 5,
            margin: 5,
          }}
        >
          <View style={{}}>
            <Text style={{ color: "white", fontSize: 12 }}>
              🍗 omg chicken wings
            </Text>
          </View>
          <View style={{}}>
            <Text style={{ color: "white", fontSize: 15 }}>02:40</Text>
          </View>
        </View>
      </View>
      {/* );
      })} */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          // bottom: 30,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Show more</Text>
      </View>
    </View>
  );
}
