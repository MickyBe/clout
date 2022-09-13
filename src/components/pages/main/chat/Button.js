import React, { forwardRef } from "react";
import { LayoutChangeEvent, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
  button: {
    padding: 8,
    backgroundColor: "#3b5998",
    borderRadius: 4,
  },
});

const Button = forwardRef(({ icon, onPress, onLayout }, ref) => (
  <TouchableOpacity
    ref={ref}
    onPress={onPress}
    style={styles.button}
    onLayout={onLayout}
  >
    <Icon name={icon} color="white" />
  </TouchableOpacity>
));

export default Button;
