import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { FONTS } from "../constants";

function AppButton({
  title,
  onPress,
  color = "white",
  backgroundColor = "red",
  className = { className },
  width = 320,
}) {
  return (
    <TouchableOpacity
      className={className}
      style={[
        styles.button,
        { backgroundColor: backgroundColor, width: width },
      ]}
      onPress={onPress}
    >
      <Text
        className="text-white"
        style={[styles.text, { ...FONTS.h3 }, { color: color }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AppButton;
