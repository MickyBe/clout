import React from "react";
import { Input } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { View, Text } from "react-native";

export default function SavedTripInput(props) {
  const { colors } = useTheme();
  const { label } = props;
  return (
    <Input
      {...props}
      selectionColor={colors.inputLabelColor}
      label={
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white" }}>{label}</Text>
          {props.required ? (
            <Text style={{ color: "red", paddingLeft: 10 }}>*</Text>
          ) : null}
        </View>
      }
      labelStyle={{
        fontSize: 15,
        color: colors.inputLabelColor,
      }}
      inputStyle={{
        backgroundColor: "rgba(38, 38, 38, 0.8)",
        borderRadius: 3,
        paddingLeft: 10,
        fontSize: 16,
        color: colors.inputLabelColor,
      }}
      inputContainerStyle={{ borderBottomWidth: 0 }}
      onChangeText={(arg) => props.onChange(arg)}
    />
  );
}
