import React, { useState } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { accuracyColor } from "../map/location-accuracy";

export default function CheckBox({ type, selected, setChecked }) {
  return (
    <TouchableWithoutFeedback onPress={() => setChecked()}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 50 / 2,
          borderWidth: 3,
          borderColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {type === selected ? (
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: accuracyColor(type),
            }}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}
