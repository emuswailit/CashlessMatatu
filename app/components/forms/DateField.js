import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../../config/colors";
import moment from "moment";

import { TextButton } from "./TextButton";
import { COLORS, FONTS, SIZES } from "../../constants";
import AppButton from "../AppButton";

function DateField({
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
  const [selectedDate, setSelectedDate] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFieldValue(name, moment(date).format("YYYY-MM-DD"));
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
    hideDatePicker();
  };
  return (
    <View>
      <AppButton
        title={values && values[name] ? values[name] : placeholder}
        onPress={showDatePicker}
        color={color}
        backgroundColor={backgroundColor}
      ></AppButton>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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

export default DateField;
