import React from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";

import Text from "./AppText";
import AppText from "./AppText";
import colors from "../config/colors";
import { TouchableHighlight } from "react-native";

function PickerItemWithImage({
  item,
  title,
  subTitle,
  description,
  detail1,
  detail2,
  onPress,
  IconComponent,
}) {
  console.log("itemmm", item);
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {item.image && (
          <Image style={styles.image} source={{ uri: item.image }} />
        )}
        <View style={styles.detailContainer}>
          <View style={{ flex: 1 }}>
            <AppText style={{ ...FONTS.body3 }}>{item.title}</AppText>
          </View>

          {item.unit_price && (
            <AppText style={{ ...FONTS.body5 }}>
              KES {item.unit_price} EACH
            </AppText>
          )}
          {/* {description && (
            <AppText style={{ ...FONTS.body5 }}>{description}</AppText>
          )}
          {detail1 && <AppText style={styles.detail1}>{detail1}</AppText>} */}
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    backgroundColor: colors.white,
    borderRadius: SIZES.radius,
    marginVertical: 5,
  },
  detailContainer: {
    flex: 1,

    marginLeft: 10,
    justifyContent: "center",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  subTitle: {
    color: colors.medium,
  },
  description: {
    color: colors.medium,
    fontWeight: "600",
    fontSize: 15,
  },

  title: {
    fontWeight: "800",
  },
});

export default PickerItemWithImage;
