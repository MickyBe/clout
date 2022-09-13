import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { LocationAccuracyTypes } from "../../../../../config/location-accuracy";
import {
  getLocationInterval,
  storeLocationInterval,
} from "../../../../../service/storage";
import MainBackButton from "../../../../ui/atoms/button/main-back.button";
import AccuracyWarningCard from "../../../../ui/atoms/cards/location-accuracy-warning.card";
import CheckBox from "../../../../ui/atoms/input/checkbox";
import auth from "@react-native-firebase/auth";

export default function LocationAccuracyPage({ navigation }) {
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [selected, setSelected] = useState(LocationAccuracyTypes.QUICKSTER);

  useEffect(() => {
    checkLocationAccuracy();
  }, []);

  const checkLocationAccuracy = async () => {
    try {
      const location = await getLocationInterval();
      console.log("LOCATION >>>>> ", location);
      if (location) setSelected(location);
    } catch (err) {
      console.log("ERROR >>> ", err);
    }
  };

  const handleSelect = async (typ) => {
    try {
      await storeLocationInterval(typ);
      await checkLocationAccuracy();
    } catch (err) {
      console.log("ERROR >>> ", err);
    }
  };

  const renderLocationAccuracyType = (typ) => {
    switch (typ) {
      case LocationAccuracyTypes.QUICKSTER:
        return (
          <View>
            <Text
              style={{
                color: "#c644ff",
                fontSize: 20,
                fontWeight: "bold",
                paddingLeft: 10,
              }}
            >
              QUICKSTER
            </Text>
            <Text>Update your location every minute</Text>
          </View>
        );
      case LocationAccuracyTypes.DASHER:
        return (
          <View>
            <Text
              style={{
                color: "#ff00ff",
                fontSize: 20,
                fontWeight: "bold",
                paddingLeft: 10,
              }}
            >
              DASHER
            </Text>
            <Text>Update your location every 3 minute</Text>
          </View>
        );
      case LocationAccuracyTypes.COMING:
        return (
          <View>
            <Text
              style={{
                color: "#7800ff",
                fontSize: 20,
                fontWeight: "bold",
                paddingLeft: 10,
              }}
            >
              I'M COMING
            </Text>
            <Text>Update your location every 5 minute</Text>
          </View>
        );
      case LocationAccuracyTypes.LATE:
        return (
          <View>
            <Text
              style={{
                color: "#e00b89",
                fontSize: 20,
                fontWeight: "bold",
                paddingLeft: 10,
              }}
            >
              FASHIONABLY LATE
            </Text>
            <Text>Update your location every 15 minute</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ height: height, backgroundColor: "#2b2b2b" }}>
      <MainBackButton
        handleBack={() => {
          navigation.navigate("Map", { openDrawer: true });
        }}
      />

      <View
        style={{
          paddingLeft: 35,
          paddingRight: 35,
          paddingTop: height / 20,
        }}
      >
        <AccuracyWarningCard />
        <View
          style={{
            height: height / 1.3,
            paddingTop: height / 15,
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CheckBox
              type={LocationAccuracyTypes.QUICKSTER}
              selected={selected}
              setChecked={() => handleSelect(LocationAccuracyTypes.QUICKSTER)}
            />
            <View
              style={{
                height: height / 13,
                borderColor: "white",
                borderWidth: 1,
                backgroundColor: "white",
              }}
            />
            <CheckBox
              type={LocationAccuracyTypes.DASHER}
              selected={selected}
              setChecked={() => handleSelect(LocationAccuracyTypes.DASHER)}
            />
            <View
              style={{
                height: height / 13,
                borderColor: "white",
                borderWidth: 1,
                backgroundColor: "white",
              }}
            />
            <CheckBox
              type={LocationAccuracyTypes.COMING}
              selected={selected}
              setChecked={() => handleSelect(LocationAccuracyTypes.COMING)}
            />
            <View
              style={{
                height: height / 13,
                borderColor: "white",
                borderWidth: 1,
                backgroundColor: "white",
              }}
            />
            <CheckBox
              type={LocationAccuracyTypes.LATE}
              selected={selected}
              setChecked={() => handleSelect(LocationAccuracyTypes.LATE)}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {renderLocationAccuracyType(LocationAccuracyTypes.QUICKSTER)}
            <View
              style={{
                height: height / 12.2,
              }}
            />
            {renderLocationAccuracyType(LocationAccuracyTypes.DASHER)}
            <View
              style={{
                height: height / 12.2,
              }}
            />
            {renderLocationAccuracyType(LocationAccuracyTypes.COMING)}
            <View
              style={{
                height: height / 12.2,
              }}
            />
            {renderLocationAccuracyType(LocationAccuracyTypes.LATE)}
          </View>
        </View>
        {/* </View> */}
      </View>
    </View>
  );
}
