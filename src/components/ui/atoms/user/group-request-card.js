import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function GroupRequestCard({
  group,
  key,
  rejectGroupRequest,
  acceptGroupRequest,
  loading,
}) {
  return (
    <View style={{ width: "100%", paddingTop: 10 }} key={key}>
      <View
        style={{
          backgroundColor: "rgba(128,128,128, 0.5)",
          padding: 20,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ paddingLeft: 20 }}>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text>{group.emoji}</Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontWeight: "400",
                    paddingLeft: 10,
                  }}
                >
                  {group.name}
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: "gray" }}>
                You've been invited to this group
              </Text>
            </View>
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size={40} color="#813be3" />
        ) : (
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                borderRadius: 20,
                backgroundColor: "gray",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                onPress={() => rejectGroupRequest()}
                name="close-outline"
                size={25}
                color="white"
              />
            </View>
            <View style={{ paddingLeft: 15 }}>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: "gray",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  onPress={() => acceptGroupRequest()}
                  name="add-outline"
                  size={25}
                  color="white"
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
