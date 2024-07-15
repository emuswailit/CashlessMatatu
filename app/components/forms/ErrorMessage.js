import React from "react";
import AppText from "../AppText";
import { StyleSheet } from "react-native";
import { FONTS } from "../../constants";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return <AppText style={styles.error}>{error}</AppText>;
}
const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 16,
  },
});

export default ErrorMessage;
