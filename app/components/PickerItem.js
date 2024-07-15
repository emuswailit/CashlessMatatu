import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import Text from "./AppText";
import { COLORS, FONTS } from "../constants";

function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginVertical: 5 }}>
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
    ...FONTS.body3,
  },
});

export default PickerItem;
