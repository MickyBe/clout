import React from "react";
import { ActivityIndicator } from "react-native";
import theme from "../../../../navigations/theme"

export default function Spinner() {
    return <ActivityIndicator color={theme.colors.authButtonColor} size={40} />
}