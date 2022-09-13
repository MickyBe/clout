import moment from "moment";
import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function MyAnnouncementCard({ data, setOpenImage }) {
  return (
    <View
      style={{
        backgroundColor: "#4b4b4b",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 4,
        marginTop: 15,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "#B47FFF", fontWeight: "bold", fontSize: 16 }}>
          You
        </Text>
        {data.image || data.audio ? (
          <TouchableWithoutFeedback onPress={() => setOpenImage(data)}>
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
                flexDirection: "row",
                padding: 5,
              }}
            >
              <Icon name="share-outline" color="black" />
              <Text style={{ color: "black", fontSize: 10 }}>Gallery</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <></>
        )}
      </View>
      <Text style={{ width: 250, paddingTop: 10 }}>{data?.description}</Text>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: 8,
        }}
      >
        <View
          style={{
            backgroundColor: "#383838",
            padding: 8,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              backgroundColor: "gray",
              transform: [{ rotate: "320deg" }],
            }}
          >
            <Icon
              style={{ padding: 4 }}
              color="white"
              name="return-up-forward-outline"
            />
          </View>
          <Text style={{ fontSize: 12, color: "white", paddingLeft: 10 }}>
            NAVIGATE
          </Text>
        </View>
        <View>
          <Text style={{ color: "white" }}>
            {moment(data.createdAt).format("HH:mm")}
          </Text>
        </View>
      </View>
    </View>
  );
}
