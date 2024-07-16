import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "../Icon";

import CircularIcon from "./CircularIcon";

const CardFullWidthWithChevron = ({ item, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 flex-row my-2 items-center text-start justify-around w-full h-14 max-h-14 shadow-md shadow-slate-300 rounded-sm bg-white mx-1"
    >
      <CircularIcon backgroundColor={backgroundColor} name={item.icon.name} />
      <Text className="text-left items-start font-medium text-sm">
        {item.title}
      </Text>
      <Icon
        className="my-2 w-1/2"
        name="chevron-right"
        size={48}
        iconColor="grey"
        backgroundColor="white"
      />
    </TouchableOpacity>
  );
};

export default CardFullWidthWithChevron;
