import { View, Text, FlatList, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { COLORS, FONTS } from "../constants";
import CardVertical from "../components/cards/CardVertical";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import useApi from "../hooks/useApi";
import transportApi from "../api/transportApi";
import routes from "../navigation/routes";

const VehicleDetailsScreen = ({ route, navigation }) => {
  const params = route.params;
  const menuItems = [
    {
      title: "Collection",
      targetScreen: routes.VEHICLE_COLLECTION,
      icon: {
        name: "bus",
        backgroundColor: "white",
      },
    },
    {
      title: "Crew",
      targetScreen: routes.VEHICLE_CREW,
      icon: {
        name: "account-supervisor",
        backgroundColor: "white",
      },
    },

    {
      title: "Payouts",
      targetScreen: routes.VEHICLE_PAYOUTS,
      icon: {
        name: "cash-multiple",
        backgroundColor: "white",
      },
    },
    {
      title: "Trips",
      targetScreen: routes.VEHICLE_TRIPS,
      icon: {
        name: "road",
        backgroundColor: "white",
      },
    },
    {
      title: "Subscriptions",
      targetScreen: routes.VEHICLE_SUBSCRIPTIONS,
      icon: {
        name: "cash",
        backgroundColor: "white",
      },
    },
  ];
  const vehicle = route.params;
  console.log("Vehicle", vehicle);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "#ffffff",

      headerTitle: (props) => (
        <Text {...props} style={{ color: "white", ...FONTS.body3 }}>
          {vehicle.title}
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

  //Sacco profile
  const getSaccoProfileApi = useApi(transportApi.transportActions);
  const getSaccoProfile = async () => {
    await getSaccoProfileApi.request({
      action: "GetSaccoProfile",
    });
  };

  useEffect(() => {
    if (getSaccoProfileApi.data) {
      console.log("getSaccoProfileApi.data", getSaccoProfileApi.data);
      if (
        getSaccoProfileApi.data &&
        getSaccoProfileApi.data.sacco_personnel_profile &&
        getSaccoProfileApi.data.sacco_personnel_profile.conducted_vehicle
      ) {
      }
    }
  }, [getSaccoProfileApi.data]);

  useEffect(() => {
    getSaccoProfile();
  }, []);

  return (
    <SafeAreaView className="flex-1  p-2  bg-gray-100">
      <View className="flex justify-center items-center">
        <FlatList
          id="menuItems"
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          numColumns={3}
          renderItem={({ item }) => (
            <CardVertical
              height={96}
              width={96}
              onPress={() => navigation.navigate(item.targetScreen, params)}
              item={item}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default VehicleDetailsScreen;
