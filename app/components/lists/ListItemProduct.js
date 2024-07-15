import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "../Icon";
import { IconAntDesign } from "..";
import { COLORS, FONTS, SIZES } from "../../constants";
const width = Dimensions.get("screen").width;
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useEffect } from "react";
import { useState } from "react";

function ListItemProduct({
  title,
  subTitle,
  description,
  detail1,
  image,
  IconComponent,
  onPressAdd,
  onPressSubtract,
  onPressDelete,
  renderRightActions,
  item,
  showButtons = false,
  purchased_quantity,
  updatedItem,
  setupdatedItem,
  showInput = true,
}) {
  const [quantity, setquantity] = useState(
    purchased_quantity ? purchased_quantity : 0
  );

  const handleChangeQuantity = (quantity = 0, item) => {
    setquantity(quantity);
    setupdatedItem({
      ...item,
      purchased_quantity: quantity,
    });
  };

  useEffect(() => {
    console.log("qty", quantity);
  }, [quantity]);

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.light,
        marginVertical: SIZES.radius,
        borderRadius: SIZES.radius,
      }}
      underlayColor={colors.light}
    >
      <View style={styles.container}>
        {image && <Image style={styles.image} source={{ uri: image }} />}
        {/* {IconComponent} */}

        <View style={styles.detailContainer}>
          <AppText style={styles.title}>{title}</AppText>
          {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
          {description && (
            <AppText style={styles.description}>
              Purchased quantity: {item.purchased_quantity}
            </AppText>
          )}
          {detail1 && <AppText style={styles.detail1}>{quantity}</AppText>}
        </View>
      </View>
      {/* {showButtons ? (
        <View style={styles.buttons}>
          {onPressAdd && (
            <TouchableOpacity onPress={() => onPressAdd(item)}>
              <IconAntDesign name="plus" backgroundColor={COLORS.primary} />
            </TouchableOpacity>
          )}
          {onPressSubtract && (
            <TouchableOpacity onPress={() => onPressSubtract(item)}>
              <IconAntDesign name="minus" backgroundColor={COLORS.primary} />
            </TouchableOpacity>
          )}
          {onPressDelete && (
            <TouchableOpacity>
              <Icon
                onPress={() => onPressDelete(item)}
                name="trash-can-outline"
                backgroundColor={COLORS.primary}
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View></View>
      )} */}
      {showInput ? (
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
            marginHorizontal: SIZES.radius,
          }}
        >
          <View style={{ flex: 0.5 }}>
            <FloatingLabelInput
              label="Required quantity"
              value={item.purchased_quantity}
              placeholder={item.purchased_quantity.toString()}
              onChangeText={(e) => handleChangeQuantity(e, item)}
              width={100}
              containerStyles={{
                borderWidth: 1,
                paddingHorizontal: 10,
                backgroundColor: "#fff",
                borderColor: COLORS.grey,
                borderRadius: SIZES.radius,
                height: 50,
              }}
              inputStyles={{
                color: COLORS.dark,
                paddingHorizontal: SIZES.radius,
                ...FONTS.body3,
              }}
            />
          </View>
          <View style={{ flex: 0.5, alignItems: "flex-end" }}>
            <TouchableOpacity>
              <Icon
                onPress={() => onPressDelete(item)}
                name="trash-can-outline"
                backgroundColor={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: SIZES.radius,
    paddingHorizontal: SIZES.radius,
  },
  detailContainer: {
    justifyContent: "flex-start",
    flex: 1,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: SIZES.radius,
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
  searchContainer: {
    height: 50,
    borderRadius: 10,

    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: SIZES.radius,
    marginRight: SIZES.base,
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    backgroundColor: COLORS.light,
    flex: 1,
    width: 100,
    borderColor: COLORS.dark,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    height: 50,
    paddingHorizontal: SIZES.radius,
  },
});

export default ListItemProduct;
