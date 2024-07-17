import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CardFullWidthWithAction = ({ action, title, subTitle }) => {
  return (
    <View className="flex-row items-center justify-between px-1   h-14 shadow-md shadow-slate-300 rounded-sm bg-white m-1">
      <View>
        <Text className="text-start items-start font-medium text-sm">
          {title}
        </Text>
        <Text className="text-start items-start font-light text-sm">
          {subTitle}
        </Text>
      </View>

      <TouchableOpacity className="border-blue-800 border-2 px-4 py-1 rounded-lg">
        <Text className="text-start">{action}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardFullWidthWithAction;
