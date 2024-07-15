import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from "../../config/colors";
import AppText from "../AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "../Icon";
import { IconAntDesign } from "..";
import { COLORS, FONTS, SIZES } from "../../constants";

import { useState } from "react";
import { FloatingLabelInput } from "react-native-floating-label-input";

function ListItemProductWithSelectAction({
  title,
  subTitle,
  description,
  detail1,
  image,
  IconComponent,
  onPressAdd,
  onPressSubtract,
  onPressSelect,
  renderRightActions,
  item,
  itemQuantity = 1,
  handleQuantityChange,
  index,
}) {
  console.log("image", item);
  const [isSelected, setisSelected] = useState(false);
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: COLORS.lightGrey,
          alignItems: "center",
          marginVertical: SIZES.radius,
          padding: SIZES.radius,
        }}
        underlayColor={colors.light}
      >
        {image && <Image style={styles.image} source={{ uri: image }} />}
        <View style={styles.container}>
          {/* {IconComponent} */}

          <View style={styles.detailContainer}>
            <AppText style={styles.title}>{title}</AppText>
            {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
            {description && (
              <AppText style={styles.description}>{description}</AppText>
            )}
            {detail1 && <AppText style={styles.detail1}>{detail1}</AppText>}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <FloatingLabelInput
                  value={item.quantity}
                  hint={item.quantity.toString()}
                  label="Quantity"
                  inputStyles={{
                    color: "blue",
                    paddingHorizontal: 10,
                  }}
                  onChangeText={(value) => handleQuantityChange(value, item.id)}
                  containerStyles={{
                    borderWidth: 2,
                    paddingHorizontal: 10,
                    backgroundColor: "#fff",
                    borderColor: "blue",
                    borderRadius: 8,
                    width: 20,
                  }}
                />
              </View>
              <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                <BouncyCheckbox
                  size={40}
                  fillColor={COLORS.primary}
                  unfillColor="#FFFFFF"
                  text="Add"
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  textStyle={{ fontFamily: "JosefinSans-Regular" }}
                  onPress={() => {
                    onPressSelect(item);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: SIZES.radius,
              }}
            >
              {onPressAdd && (
                <TouchableOpacity onPress={() => onPressAdd(item.id)}>
                  <IconAntDesign name="plus" backgroundColor={COLORS.primary} />
                </TouchableOpacity>
              )}
              {onPressSubtract && (
                <TouchableOpacity onPress={() => onPressSubtract(item.id)}>
                  <IconAntDesign
                    name="minus"
                    backgroundColor={COLORS.primary}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailContainer: {
    justifyContent: "center",
  },

  image: {
    width: 90,
    height: 120,
    borderRadius: 15,
    marginRight: 10,
  },
  subTitle: {
    color: colors.medium,
    ...FONTS.h4,
  },
  description: {
    color: colors.medium,
    ...FONTS.h5,
    color: COLORS.primary,
  },

  title: {
    ...FONTS.h3,
  },
});

export default ListItemProductWithSelectAction;
