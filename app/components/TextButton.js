import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const TextButton = ({
  contentContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
  iconComponent,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        ...contentContainerStyle,
        borderRadius: SIZES.radius,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      {iconComponent}
      <Text style={{ color: COLORS.secondary, ...FONTS.h3, ...labelStyle }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
