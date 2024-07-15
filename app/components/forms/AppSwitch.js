import { useFormikContext } from "formik";
import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";
import AppText from "../AppText";
import { COLORS, SIZES } from "../../constants";

const AppSwitch = ({ name, active, setactive, title }) => {
  const {
    setFieldTouched,
    handleChange,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  const toggleSwitch = (previousState) => {
    setactive(previousState);
    if (previousState === true) {
      setFieldValue(name, "true");
    } else {
      setFieldValue(name, "false");
    }
  };

  return (
    <View style={styles.container}>
      <AppText>{title}</AppText>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={active}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    borderColor: COLORS.grey60,
    borderWidth: 1,
  },
});

export default AppSwitch;
