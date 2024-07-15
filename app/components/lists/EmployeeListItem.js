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

function ListItem({
  title,
  subTitle,
  description,
  detail1,
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
            <AppText style={styles.title}>{title}</AppText>
            {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
            {description && (
              <AppText style={styles.description}>{description}</AppText>
            )}
            {detail1 && <AppText style={styles.detail1}>{detail1}</AppText>}
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailContainer: {
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

export default ListItem;
