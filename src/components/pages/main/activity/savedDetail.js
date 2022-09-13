import MapboxGL from "@react-native-mapbox-gl/maps";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
    SafeAreaView, View, Text, Alert, Modal, ActivityIndicator
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { deleteSavedTrip } from "../../../../redux/actions/locationHistory/locationHistory.action";

export default function SavedDetail({ navigation, route }) {
    const { id, name, coordinates, centerLocation } = route.params;
    const {width, height} = Dimensions.get("screen");
    const {deleteUserResponse} = useSelector((state) => state);
const dispatch = useDispatch();
    useEffect(() => {
      if (deleteUserResponse.loaded) {
        if (deleteUserResponse.data) {
          navigation.navigate("SavedTrip")
        }
      }
    }, [deleteUserResponse])

    console.log("deleteUserResponse >>> ", deleteUserResponse);

  return (
    <SafeAreaView>
      <View style={{ width: width, height: height }}>
        <MapboxGL.MapView
          style={{ flex: 1 }}
          zoomEnabled={true}
          scrollEnabled={true}
          logoEnabled={true}
          styleURL="mapbox://styles/kliq/ckubt5dru3vhb18mq2t54kzf7"
        >
          <MapboxGL.Camera
            centerCoordinate={centerLocation}
            zoomLevel={13}
            animationDuration={0}
            followUserLocation={false}
            // centerCoordinate={userLocation}
          />
          <MapboxGL.ShapeSource
            id="source1"
            lineMetrics={true}
            clusterMaxZoomLevel={13}
            shape={{
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: coordinates,
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
      <View
        style={{
          position: "absolute",
          right: 0,
          width: width,
          height: 60,
        }}
      >
        {/* <LinearGradient colors={AppBarGradient}> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Icon name="chevron-back-outline" size={25} />

              <View>
              <Text
                style={{ paddingLeft: 15, fontWeight: "bold", fontSize: 17 }}
              >
                {name}
              </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => {
            Alert.alert("Delete trip", "Are you sure you want to delete trip?", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => deleteSavedTrip(id, dispatch) },
            ]);
          }}>
            <View style={{width: 30, height: 30, borderRadius: 8, backgroundColor: "red", justifyContent: "center", alignItems: "center"}}>
              <Icon name="trash-outline" color="white" size={15} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* </LinearGradient> */}
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={deleteUserResponse.loading}
      >
        <View
          style={{
            flex: 1,
            paddingTop: height / 3,
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <ActivityIndicator size={90} color="#D764FF" />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
