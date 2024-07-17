import { View, Text, FlatList } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import CardFullWidthWithChevron from "../components/cards/CardFullWidthWithChevron";

const VehiclePayoutsScreen = ({ route, navigation }) => {
  const vehicle = route.params;

  const menuItem = [
    {
      title: "To Airtel",
      subTiTle: "Pay to Airtel number",
      targetScreen: "PayoutsToAirtel",
      icon: {
        name: "cellphone-basic",
        backgroundColor: "white",
        icon_category: "ENTYPO",
      },
    },
    {
      title: "To Bank",
      subTiTle: "Pay to bank account",
      targetScreen: "PayoutsToBank",
      icon: {
        name: "bank",
        backgroundColor: "white",
      },
    },
    {
      title: "To Mpesa",
      subTiTle: "Pay to Mpesa number",
      targetScreen: "PayoutsToMpesa",
      icon: {
        name: "cellphone",
        backgroundColor: "white",
      },
    },
    {
      title: "To Paybill",
      subTiTle: "Pay to any paybill",
      targetScreen: "PayoutsToPaybill",
      icon: {
        name: "cash",
        backgroundColor: "white",
      },
    },
    {
      title: "To Till",
      subTiTle: "Pay to any till",
      targetScreen: "PayoutsToTill",
      icon: {
        name: "home",
        backgroundColor: "white",
      },
    },
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "#ffffff",

      headerTitle: (props) => (
        <Text {...props} style={{ color: "white", ...FONTS.body3 }}>
          Payouts - {vehicle.title}
        </Text>
      ),
      headerStyle: {
        backgroundColor: COLORS.primary, //Set Header color
      },
      headerLeftStyle: {
        tintColor: COLORS.light,
      },
    });
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={menuItem}
        keyExtractor={(menuItem) => menuItem.title}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <CardFullWidthWithChevron
            onPress={() => navigation.navigate(item.targetScreen, vehicle)}
            item={item}
          />
        )}
      />
    </View>
  );
};

export default VehiclePayoutsScreen;
