import React from "react";
import { View, Text, Dimensions, SafeAreaView } from "react-native";
import ProfileButton from "../../../ui/atoms/user/profile-button";
import MapboxGL from "@react-native-mapbox-gl/maps";
import ActivityLink from "../../../ui/atoms/activity/activity-link";

export default function Activity({ navigation }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#2b2b2b",
        flex: 1,
      }}
    >
      <View
        style={{
          height: height,
          paddingTop: height / 10,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            height: "30%",
            width: "100%",
          }}
        >
          <MapboxGL.MapView
            zoomEnabled={false}
            scrollEnabled={false}
            logoEnabled={false}
            style={{ flex: 1 }}
            styleURL="mapbox://styles/kliq/ckubt5dru3vhb18mq2t54kzf7"
          >
            <MapboxGL.Camera
              animationDuration={0}
              centerCoordinate={[-77.035, 38.875]}
              zoomLevel={12}
            />
            <MapboxGL.ShapeSource
              id="source1"
              lineMetrics={true}
              shape={{
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [-77.044211, 38.852924],
                    [-77.045659, 38.860158],
                    [-77.044232, 38.862326],
                    [-77.040879, 38.865454],
                    [-77.039936, 38.867698],
                    [-77.040338, 38.86943],
                    [-77.04264, 38.872528],
                    [-77.03696, 38.878424],
                    [-77.032309, 38.87937],
                    [-77.030056, 38.880945],
                    [-77.027645, 38.881779],
                    [-77.026946, 38.882645],
                    [-77.026942, 38.885502],
                    [-77.028054, 38.887449],
                    [-77.02806, 38.892088],
                    [-77.03364, 38.892108],
                    [-77.033643, 38.899926],
                  ],
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
        <ActivityLink
          frontIcon="globe-outline"
          label="Trip History"
          endIcon="chevron-forward-outline"
          withMap={true}
          handlePress={() => navigation.navigate("TripHistory")}
        />
        <View style={{ paddingTop: 20 }}>
          <ActivityLink
            frontIcon="download-outline"
            label="Saved Trips"
            endIcon="chevron-forward-outline"
            withMap={false}
            handlePress={() => navigation.navigate("SavedTrip")}
          />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          left: 22,
          top: 0,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <ProfileButton handleClick={() => navigation.openDrawer()} />
        <Text
          style={{
            paddingLeft: 15,
            paddingTop: 10,
            fontSize: 17,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Activity
        </Text>
      </View>
    </SafeAreaView>
  );
}
