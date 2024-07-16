import { Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../Icon";
import { COLORS } from "../../constants";
import CircularIcon from "./CircularIcon";

const CardHorizontal = ({ item }) => {
  return (
    <TouchableOpacity className="flex-1 flex-row items-center justify-around w-24 h-24 shadow-md shadow-slate-300 rounded-sm bg-white m-1">
      <CircularIcon name={item.icon} />
      <Text className=" w-1/2 text-start items-start font-medium text-sm">
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CardHorizontal;
