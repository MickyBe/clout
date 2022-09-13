import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

export default function DateCard({ selected, setSelected, type, title, subTitle, setSelectedDate, date }) {
  return (
    <TouchableWithoutFeedback onPress={() => {setSelected(type); setSelectedDate(date)}}>
      <View
        style={{
          borderRadius: 5,
          backgroundColor: `${selected === type ? "black" : "rgba(38, 38, 38,1)"}`,
          paddingVertical: 5,
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        <Text style={{ fontSize: 12 }}>{subTitle}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
