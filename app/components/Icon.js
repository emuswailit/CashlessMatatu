import React from "react";
import { TouchableOpacity, View } from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import { COLORS } from "../constants";

function Icon({
  name,
  icon_category = "MATERIALCOMMUNITYICONS",
  size = 40,
  backgroundColor = COLORS.primary,
  iconColor = "#fff",
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {(icon_category === "MATERIALCOMMUNITYICONS" && (
        <MaterialCommunityIcons
          name={name}
          color={iconColor}
          size={size * 0.5}
        />
      )) ||
        (icon_category === "ENTYPO" && (
          <Entypo name={name} color={iconColor} size={size * 0.5} />
        )) ||
        (icon_category === "FONTAWESOME" && (
          <FontAwesome name={name} color={iconColor} size={size * 0.5} />
        )) ||
        (icon_category === "MATERIALICONS" && (
          <MaterialIcons name={name} color={iconColor} size={size * 0.5} />
        )) ||
        (icon_category === "IONICONS" && (
          <Ionicons name={name} color={iconColor} size={size * 0.5} />
        ))}
    </TouchableOpacity>
  );
}

export default Icon;
