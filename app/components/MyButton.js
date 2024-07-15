import { View, Text, TouchableHighlight } from "react-native";
import React from "react";

const MyButton = ({ title, className, onPress }) => {
  return (
    <TouchableHighlight className={className} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableHighlight>
  );
};

export default MyButton;
