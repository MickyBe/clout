import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import { View } from "react-native";
import CustomMarker from "../atoms/activity/time-range-interval-marker";
import SliderCustomLabel from "./SliderCustomLabel";

const textTransformerTimes = (value) => {
  return value === 0
    ? "12A.M."
    : (value < 13 ? value : value - 12) + (value < 12 ? "A.M." : "P.M.");
};
const TIME = { min: 0, max: 24 };
const SliderPad = 12;

const DoubleSlider = ({timeRange, onChange}) => {
  const { min, max } = TIME;
  const [width, setWidth] = useState(280);
  const [selected, setSelected] = useState(null);

  if (!selected) {
    setSelected([min, max]);
  }

  // Callbacks
  const onLayout = (event) => {
    setWidth(event.nativeEvent.layout.width - SliderPad * 2);
  };
  const onValuesChangeFinish = (values) => {
    console.log(values);
    setSelected(values);
  };

  return (
    <View onLayout={onLayout}>
      <MultiSlider
        min={min}
        max={max}
        // allowOverlap
        values={timeRange}
        sliderLength={width}
        onValuesChangeFinish={onChange}
        enableLabel={true}
        customLabel={SliderCustomLabel(textTransformerTimes)}
        customMarker={CustomMarker}
        markerSize={20}
        trackStyle={{
          height: 5,
          borderRadius: 8,
        }}
        markerOffsetY={3}
        selectedStyle={{
          backgroundColor: "#D764FF",
        }}
        unselectedStyle={{
          backgroundColor: "rgba(38, 38, 38,1)",
        }}
      />
    </View>
  );
};

export default DoubleSlider;
