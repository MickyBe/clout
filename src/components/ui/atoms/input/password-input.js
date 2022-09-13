import React from "react";
import { Input } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { View, Text } from "react-native";

export default function Password(props) {
  const { colors } = useTheme();
  const { label } = props;
  return (
    <Input
      {...props}
      secureTextEntry={true}
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
      containerStyle={{
        width: "100%",
        padding: 0,
      }}
      inputStyle={{
        backgroundColor: colors.primary,
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
