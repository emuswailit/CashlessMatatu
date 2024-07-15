import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";

import Text from "./AppText";
import Icon from "./Icon";

function PickerItemWithIcon({ item, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        height: 55,
      }}
    >
      {!item && (
        <Text style={{ color: COLORS.grey, ...FONTS.body2 }}>Country</Text>
      )}

      {item && (
        <>
          <Icon name={item.icon} size={30} backgroundColor={COLORS.primary} />
          <Text style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.body3 }}>
            {item?.title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItemWithIcon;
