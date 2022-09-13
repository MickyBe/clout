import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getTrips } from "../../../../redux/actions/locationHistory/locationHistory.action";
import SavedTripCard from "../../../ui/atoms/activity/saved-trip-card";
import theme from "../../../../navigations/theme";
export default function SavedTrip({ navigation }) {
  const height = Dimensions.get("window").height;
  const { tripsResponse } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getTrips(dispatch);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#2b2b2b",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={25} />
          </TouchableWithoutFeedback>
          <Text style={{ paddingLeft: 15, fontWeight: "bold", fontSize: 17 }}>
            Saved Trips
          </Text>
        </View>
        <View>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              backgroundColor: "#4b4b4b",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon size={20} name="search-outline" color="white" />
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={{ paddingTop: 15, paddingHorizontal: 15 }}>
          {tripsResponse.loading ? (
            <View style={{justifyContent: "center", alignItems: "center"}}><ActivityIndicator color={theme.colors.authButtonColor} size={30} /></View>
          ) : null}
          {tripsResponse.loaded ? (
            tripsResponse.data ? tripsResponse.data.length === 0 ? <View style={{justifyContent:"center", alignItems: "center", flex:1}}><Text>No saved trips found!</Text></View> : (
              tripsResponse.data.map((data) => (
                <View style={{ paddingTop: 10 }}>
                  <SavedTripCard
                  id={data.id}
                  navigation={navigation}
                    mainText={data.name}
                    date={data.date}
                    coordinate={data.locations}
                    height={height}
                    showUser={false}
                  />
                </View>
              ))
            ) : tripsResponse.error ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "red", fontSize: "18", fontWeight: "bold" }}
                >
                  No Saved Trips.
                </Text>
              </View>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
