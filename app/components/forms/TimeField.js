import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../../config/colors";
import moment from "moment";

import AppButton from "../AppButton";

function TimeField({
  name,
  label,
  placeholder,
  width,
  color,
  backgroundColor,
  ...otherProps
}) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,

    handleChange,
    values,
  } = useFormikContext();
  const [selectedTime, setSelectedTime] = useState("");

  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (date) => {
    console.log("TIME", moment(date).format("HH:mm"));
    setFieldValue(name, moment(date).format("HH:mm"));
    setSelectedTime(moment(date).format("HH:MM"));
    hideTimePicker();
  };
  return (
    <View>
      <AppButton
        title={values && values[name] ? values[name] : placeholder}
        onPress={showTimePicker}
        color={color}
        backgroundColor={backgroundColor}
      ></AppButton>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.light,
    height: 60,
    justifyContent: "flex-start",
    padding: 10,
    borderRadius: 25,
    color: colors.white,
  },
});

export default TimeField;
