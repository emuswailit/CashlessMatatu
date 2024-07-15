import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import Text from "./AppText";
import { FONTS } from "../constants";

function PickerItemUser({ item, onPress }) {

  console.log('item here', item)
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{`${item.first_name} ${item.last_name}`}</Text>
      <Text style={styles.text}>{item.phone}</Text>
      <Text style={styles.text}>{item.email}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 2,
    ...FONTS.body3,
  },
});

export default PickerItemUser;
