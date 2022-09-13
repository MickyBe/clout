import React from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { Avatar, ThemeConsumer } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import FacePile from "react-native-face-pile";
import { imageDir } from "../../../../utility/data/constants";

export default function PeopleYouMayKnowCard({
  style,
  data,
  sendRequest,
  loading,
}) {
  const image = data.profileImage
    ? imageDir(data.profileImage)
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Xdf9OyXn9BpWL30gb6cpyLnkiCCbSaH8wVB1007o9WpYBDgb6J1_afDQTdJuqwgE3xM&usqp=CAU";
  return (
    <View key={Date.now()} style={{ width: "100%", paddingTop: 10 }}>
      <View
        style={{
          ...style,
          backgroundColor: "rgba(128,128,128, 0.5)",
          paddingVertical: 10,
          paddingHorizontal: 20,
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
                uri: imageDir(data.profileImage),
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
        {loading ? (
          <ActivityIndicator size={30} color="#813be3" />
        ) : (
          <View
            style={{
              //   height: 40,
              //   width: 40,
              borderRadius: 20,
              backgroundColor: "gray",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              onPress={() => sendRequest()}
              name="add-outline"
              size={25}
              color="white"
            />
          </View>
        )}
      </View>
    </View>
  );
}
