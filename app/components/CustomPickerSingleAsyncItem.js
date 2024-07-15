import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./AppButton";
import Text from "./AppText";
import Screen from "./Screen";
import PickerItemUser from "./PickerItemUser";
import defaultStyles from "../config/styles";
import { useFormikContext } from "formik";
import { ErrorMessage } from "./forms";
import { ListItem, ListItemSeparator } from "./lists";
import { COLORS, FONTS, icons, SIZES } from "../constants";

function CustomPickerSingleAsyncItem({
  PickerItemComponent = PickerItemUser,
  data,
  icon,
  width = "100%",
  height = 40,
  name,
  onSearchTextChanged,
  placeholder,
  selectedItem,
  onSelectItem,
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [finalData, setFinalData] = useState(data);

  //   Transform body systems data for display at modal

  useEffect(() => {
    setFinalData(data);
  }, []);
  useEffect(() => {
    setFinalData(data);
  }, [data]);
  //   Ensure data is refreshed every time modal is opened
  useEffect(() => {
    if (modalVisible) setFinalData(data);
  }, [modalVisible]);

  return (
    <View
      style={{
        borderRadius: SIZES.radius,
        borderColor: COLORS.grey,
        borderWidth: 1,
        marginVertical: SIZES.radius,
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.selectedContainer, { width }, { height }]}>
          {selectedItem && selectedItem.image && (
            <Image
              source={{ uri: selectedItem?.image }}
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                borderRadius: SIZES.radius,
              }}
            />
          )}
          <Text
            placeholder={placeholder}
            style={{
              flex: 1,
              ...FONTS.body4,
              paddingHorizontal: SIZES.radius,
              color: COLORS.primary60,
            }}
            {...otherProps}
          >
            {selectedItem ? selectedItem.title : placeholder}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={30}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      <Modal visible={modalVisible} animationType="slide">
        <Screen style={styles.modal}>
          {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
          <View>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>

          <View style={[styles.container, { width }, { height }]}>
            {icon && (
              <MaterialCommunityIcons
                name={icon}
                size={20}
                color={defaultStyles.colors.medium}
                style={styles.icon}
              />
            )}
            <TextInput
              // value={selectedItem ? selectedItem.title : null}
              placeholder={selectedItem ? selectedItem.title : "Search"}
              style={{
                flex: 1,
                height: 40,
                fontSize: 18,
                width: "100%",
                ...FONTS.body4,
              }}
              {...otherProps}
              onChangeText={(text) => onSearchTextChanged(text)}
            />
          </View>

          {data && data.length > 0 ? (
            <FlatList
              data={finalData}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={ListItemSeparator}
              renderItem={({ item }) => (
                <ListItem
                  onPress={() => {
                    setModalVisible(false);
                    onSelectItem(item);
                    setFieldValue(name, item);
                  }}
                  description={item.description}
                  subTitle={`${item.subTitle}`}
                  title={item.title}
                  image={item.image}
                  detail1={item.detail1}
                  detail2={item.detail2}
                />
              )}
            />
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ ...FONTS.body3 }}>No data to display</Text>
            </View>
          )}
        </Screen>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.grey08,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: SIZES.radius,
    marginVertical: 10,
    height: 40,
  },

  selectedContainer: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.radius,
    marginVertical: 5,
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  modal: { margin: 5, padding: 5, backgroundColor: COLORS.lightGrey },
});

export default CustomPickerSingleAsyncItem;
