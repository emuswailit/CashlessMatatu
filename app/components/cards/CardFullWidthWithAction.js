import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CardFullWidthWithAction = ({ item }) => {
  return (
    <View className="flex-1 flex-row items-center justify-around w-full h-14 shadow-md shadow-slate-300 rounded-sm bg-white mx-1">
      <Text className="text-start items-start font-medium text-sm">
        {item.title}
      </Text>
      <TouchableOpacity className="border-blue-800 border-2 px-4 py-1 rounded-lg">
        <Text>{item.action}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardFullWidthWithAction;
