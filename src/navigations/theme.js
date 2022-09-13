import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#323232",
    backgroundColor: "#1a1a1a",
    inputLabelColor: "#c2c2c2",
    authButtonColor: "#813be3",
    secondaryTextColor: "#813be3",
    googleButtonColor: "#4285f4",
  },
};

export default Theme;
