import React from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LocationAccuracyTypes } from "../../../../config/location-accuracy";

export const accuracyColor = (type) => {
  switch (type) {
    case LocationAccuracyTypes.QUICKSTER:
      return "#c644ff";
    case LocationAccuracyTypes.DASHER:
      return "#ff00ff";
    case LocationAccuracyTypes.COMING:
      return "#7800ff";
    case LocationAccuracyTypes.LATE:
      return "#e00b89";
    default:
      return null;
  }
};

export default function LocationAccuracy({ height, type, handleClick }) {
  const renderAccuracy = () => {
    switch (type) {
      case LocationAccuracyTypes.QUICKSTER:
        return (
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
        );
      case LocationAccuracyTypes.DASHER:
        return (
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
        );
      case LocationAccuracyTypes.COMING:
        return (
          <Text
            style={{
              color: "#7800ff",
              fontSize: 20,
              fontWeight: "bold",
              paddingLeft: 10,
            }}
          >
            I 'M COMING
          </Text>
        );
      case LocationAccuracyTypes.LATE:
        return (
          <Text
            style={{
              color: "#e00b89",
              fontSize: 18,
              fontWeight: "bold",
              paddingLeft: 10,
            }}
          >
            FASHIONABLY LATE
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleClick()}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: height / 45,
        }}
      >
        <Icon name="alarm-outline" color={accuracyColor(type)} size={40} />
        {renderAccuracy()}
      </View>
    </TouchableWithoutFeedback>
  );
}
