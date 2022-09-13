import React from "react";
import { Text, View } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";

export default function CustomCheckBox(props) {
  const { colors } = useTheme();
  const { label, loading } = props;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <CheckBox
          size={20}
          checked={props.checked}
          onPress={() => props.handleCheckboxChange()}
        />
      </View>
      <View>
        <Text style={{ fontSize: 12, color: "white" }}>
          I have read and accept the
          <Text style={{ color: colors.secondaryTextColor }}>
            TERMS AND CONDITIONS
          </Text>
        </Text>
      </View>
    </View>
  );
}
