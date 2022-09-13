import React from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import FacePile from "react-native-face-pile";
import { imageDir } from "../../../../utility/data/constants";

export default function FriendRequestCard({
  key,
  style,
  data,
  acceptRequest,
  rejectRequest,
  acceptLoading,
}) {
  // const image = data.profileImage
  //   ? imageDir(data.profileImage)
  //   : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Xdf9OyXn9BpWL30gb6cpyLnkiCCbSaH8wVB1007o9WpYBDgb6J1_afDQTdJuqwgE3xM&usqp=CAU";
  return (
    <View key={key} style={{ width: "100%", paddingTop: 10 }}>
      <View
        style={{
          ...style,
          backgroundColor: "rgba(128,128,128, 0.5)",
          padding: 20,

          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Avatar
              overlayContainerStyle={{ backgroundColor: "blue" }}
              size={75}
              rounded
              source={{
                uri: imageDir(data?.profileImage),
              }}
            />
          </View>
          <View style={{ paddingLeft: 20 }}>
            <View>
              <Text style={{ color: "white", fontSize: 17, fontWeight: "400" }}>
                {data.username}
              </Text>
              <Text style={{ fontSize: 12, color: "gray" }}>
                this is description
              </Text>
            </View>
            <View
              style={{
                paddingTop: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View>
                <FacePile
                  circleSize={15}
                  imageStyle={{ borderWidth: 0 }}
                  numFaces={2}
                  faces={[
                    {
                      id: 0,
                      imageUrl:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_xBCRKLnDjw_o48CbyOVERfkFO0uhMSjnvw&usqp=CAU",
                    },
                    {
                      id: 1,
                      imageUrl:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNjhBaCE6_IlqbjxTdth5Hm0mccqejntA2XA&usqp=CAU",
                    },
                  ]}
                />
              </View>
              <View style={{ paddingLeft: 20 }}>
                <Text style={{ fontSize: 12 }}>Followed by</Text>
              </View>
            </View>
          </View>
        </View>
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
              onPress={() => rejectRequest()}
              name="close-outline"
              size={25}
              color="white"
            />
          </View>
          <View style={{ paddingLeft: 15 }}>
            {acceptLoading ? (
              <ActivityIndicator size={20} color="#813be3" />
            ) : (
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: "gray",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  onPress={() => acceptRequest()}
                  name="add-outline"
                  size={25}
                  color="white"
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
