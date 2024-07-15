import React from "react";
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { COLORS, FONTS, SIZES } from "../../constants";

function ListItem({
  title,
  subTitle,
  description,
  detail1,
  detail2,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={{ uri: image }} />}
          <View style={styles.detailContainer}>
            <AppText
              style={{
                ...FONTS.h3,
                fontWeight: "bold",
                textTransform: "upper_case",
              }}
            >
              {title}
            </AppText>
            {subTitle && (
              <AppText style={{ ...FONTS.body4, color: COLORS.dark }}>
                {subTitle}
              </AppText>
            )}
            {description && (
              <AppText style={{ ...FONTS.body4 }}>{description}</AppText>
            )}
            {detail1 && <AppText style={{ ...FONTS.body4 }}>{detail1}</AppText>}
            {detail2 && <AppText style={{ ...FONTS.body4 }}>{detail2}</AppText>}
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: colors.white,
    borderRadius: SIZES.radius,
    marginVertical: 2,
    alignItems: "center",
  },
  detailContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
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

export default ListItem;
