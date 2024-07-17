import { View, Text } from "react-native";
import React from "react";
import Icon from "../Icon";
import { COLORS } from "../../constants";

const CircularIcon = ({ name, backgroundColor, icon_category }) => {
  return (
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        icon_category={icon_category}
        className="my-2 border-gray-400"
        name={name}
        size={30}
        iconColor={COLORS.error}
        backgroundColor="white"
      />
    </View>
  );
};

export default CircularIcon;
