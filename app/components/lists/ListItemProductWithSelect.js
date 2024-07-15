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

import * as Yup from "yup";
import { Form, FormField } from "../forms";
import { SubmitButton } from "../inspiration";
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
  console.log("item at....", item.purchased_quantity);
  const [isSelected, setisSelected] = useState(false);

  const validationSchema = Yup.object().shape({
    // price: Yup.number().required().min(1).max(10000).label("Price"),
    purchased_quantity: Yup.string().required().min(1).label("Quantity"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    handleQuantityChange(values.purchased_quantity, item.wholesaler_receipt_id);
  };
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
            <AppText style={styles.title}>
              {item.wholesaler_receipt_title}
            </AppText>
            <AppText style={styles.subTitle}>
              Units per pack: {item.units_per_pack}
            </AppText>

            <AppText style={styles.description}>
              Pack price: KES {item.pack_selling_price}
            </AppText>

            {item.price_discount_title && (
              <AppText style={styles.detail1}>
                {item.price_discount_title}
              </AppText>
            )}
            {item.quantity_discount_title && (
              <AppText style={styles.detail1}>
                {item.quantity_discount_title}
              </AppText>
            )}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Form
                  initialValues={{
                    purchased_quantity: item.purchased_quantity.toString(),
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        marginRight: 10,
                      }}
                    >
                      <FormField
                        label="Quantity"
                        width={40}
                        height={50}
                        name="purchased_quantity"
                        keyboardType="numeric"
                        placeholder={
                          item ? item.purchased_quantity : "Quantity"
                        }
                      />
                    </View>
                    <View style={{ width: "50%", marginBottom: 18 }}>
                      <SubmitButton
                        contentContainerStyle={{
                          height: 50,
                          width: 50,
                          borderRadius: SIZES.radius,
                          backgroundColor: COLORS.primary,
                          marginTop: SIZES.margin,
                        }}
                        labelStyle={{
                          ...FONTS.body5,
                          color: COLORS.light,
                        }}
                        label="Save"
                      />
                    </View>
                  </View>
                </Form>
              </View>

              {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                {onPressAdd && (
                  <TouchableOpacity
                    style={{ marginRight: 75 }}
                    onPress={() => onPressAdd(item)}
                  >
                    <IconAntDesign
                      name="plus"
                      backgroundColor={COLORS.primary}
                    />
                  </TouchableOpacity>
                )}
                {onPressSubtract && (
                  <TouchableOpacity onPress={() => onPressSubtract(item)}>
                    <IconAntDesign
                      name="minus"
                      backgroundColor={COLORS.primary}
                    />
                  </TouchableOpacity>
                )}
              </View> */}
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
