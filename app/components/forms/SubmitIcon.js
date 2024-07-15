import React from "react";
import AppButton from "../AppButton";
import { useFormikContext } from "formik";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";

function SubmitIcon({ name, size, color }) {
  const { handleSubmit } = useFormikContext();
  return (
    <TouchableOpacity onPress={handleSubmit}>
      <Icon name={name} size={size} color={color} bg />
    </TouchableOpacity>
  );
}

export default SubmitIcon;
