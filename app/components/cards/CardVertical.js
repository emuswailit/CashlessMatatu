import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "../Icon";
import { COLORS } from "../../constants";
import CircularIcon from "./CircularIcon";

const CardVertical = ({ item, height = 96, width = 96, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: width,
        maxWidth: width,
        height: height,
        maxHeight: height,
      }}
      className=" items-center justify-center shadow-md shadow-slate-300 rounded-sm bg-white m-2"
    >
      <CircularIcon name={item.icon.name} />
      <Text className="my-2 text-center">{item.title}</Text>
    </TouchableOpacity>
  );
};

export default CardVertical;
