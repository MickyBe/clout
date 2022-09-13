import MapboxGL from "@react-native-mapbox-gl/maps";
import React from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { formattedTripDates } from "./activity.util";

export default function SavedTripCard({
  navigation,
  height,
  style,
  mainText,
  date,
  showUser,
  coordinate,
  id
}) {
  const coordinateArr = coordinate.map((data) => [
    parseFloat(data.longitude),
    parseFloat(data.latitude),
  ]);
  const center = coordinateArr[Math.floor(coordinateArr.length / 2)].map(
    (data) => parseFloat(data)
  );
  return (
    <View style={style}>
      <View
        style={{
          height: height / 5,
        }}
      >
        <MapboxGL.MapView
          style={{ flex: 1 }}
          zoomEnabled={false}
          scrollEnabled={false}
          logoEnabled={false}
          styleURL="mapbox://styles/kliq/ckubt5dru3vhb18mq2t54kzf7"
        >
          <MapboxGL.Camera
            animationDuration={0}
            centerCoordinate={center}
            zoomLevel={13}
          />
          <MapboxGL.ShapeSource
            id="source1"
            lineMetrics={true}
            shape={{
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: coordinateArr,
              },
            }}
          >
            <MapboxGL.LineLayer
              id="layer1"
              style={{
                lineColor: "#D764FF",
                lineWidth: 2,
              }}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("SavedTripDetail", {
            name: mainText,
            coordinates: coordinateArr,
            centerLocation: center,
            date,
            id
          })
        }
      >
        <View
          style={{
            backgroundColor: "#4b4b4b",
            padding: 10,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                //   alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15, color: "white" }}>{mainText}</Text>
              <Text
                style={{
                  fontSize: 13,
                }}
              >
                {formattedTripDates(date)}
              </Text>
            </View>
            <View>
              <Icon name="chevron-forward-outline" color="white" size={20} />
            </View>
          </View>
          {showUser ? (
            <View style={{ flexDirection: "row", paddingTop: 5 }}>
              <Avatar
                rounded
                size={20}
                source={{
                  uri: "https://thumbs.dreamstime.com/b/happy-person-portrait-smiling-woman-tanned-skin-curly-hair-happy-person-portrait-smiling-young-friendly-woman-197501184.jpg",
                }}
              />
              <Text style={{ paddingLeft: 5, fontSize: 13 }}>Jhon Limbit</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
