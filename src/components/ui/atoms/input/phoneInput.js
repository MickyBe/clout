import { useTheme } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";
import { Input } from "react-native-elements";

export default function PhoneInput(props) {
  const { colors } = useTheme();
  const { label } = props;
  const [countryCode, setCountryCode] = useState(props.countryCode.code);
  const [country, setCountry] = useState(null);
  const onSelect = (country) => {
    props.handleCountryCode({
      phone: `+${country.callingCode[0]}`,
      code: country.cca2,
    });
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Input
        {...props}
        leftIcon={
          props.loading ? (
            <ActivityIndicator />
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CountryPicker
                theme={DARK_THEME}
                {...{
                  countryCode,
                  withFilter: true,
                  withFlag: true,
                  withCountryNameButton: false,
                  withAlphaFilter: true,
                  withCallingCode: true,
                  withEmoji: true,
                  onSelect,
                  visible: false,
                }}
              />
              <Text style={{ fontSize: 16 }}>
                {country
                  ? `+${country.callingCode[0]}`
                  : props.countryCode.phone}
              </Text>
            </View>
          )
        }
        selectionColor={colors.inputLabelColor}
        label={
          <View style={{ flexDirection: "row" }}>
            <Text>{label}</Text>
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
          backgroundColor: colors.primary,
          borderRadius: 3,
          paddingLeft: 7,
          fontSize: 16,
          color: colors.inputLabelColor,
        }}
        inputContainerStyle={{
          backgroundColor: colors.primary,
          borderRadius: 3,
          paddingLeft: 7,
          color: colors.inputLabelColor,
          borderBottomWidth: 0,
        }}
        onChangeText={(arg) => props.onChange(arg)}
      />
    </View>
  );
}
