import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS } from "../constants";
import useApi from "../hooks/useApi";
import transportApi from "../api/transportApi";
import { useInterval } from "../hooks/useInterval";
import ListItemSeparator from "../components/lists/ListItemSeparator";

const VehicleCollectionScreen = ({ route, navigation }) => {
  const vehicle = route.params;
  console.log("patttt", vehicle);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "#ffffff",

      headerTitle: (props) => (
        <Text {...props} style={{ color: "white", ...FONTS.body3 }}>
          COLLECTION - {vehicle.title}
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
  const getWalletBalanceApi = useApi(transportApi.transportActions);
  const getWalletBalance = async () => {
    await getWalletBalanceApi.request({
      action: "GetVehicleWalletBalance",
      vehicle_registration: vehicle.title,
    });
  };

  //Get today settlements
  const [settlements, setsettlements] = useState([]);
  const getTodaySettlementsApi = useApi(transportApi.transportActions);
  const getTodaySettlements = async () => {
    await getTodaySettlementsApi.request({
      action: "GetVehicleWalletSettlements",
      vehicle_registration: vehicle.title,
    });
  };

  //Get account balance

  const [balance, setbalance] = useState();
  const [account, setaccount] = useState();
  useEffect(() => {
    if (getWalletBalanceApi.data) {
      console.log("getSaccoProfileApi.data", getWalletBalanceApi.data);
      if (getWalletBalanceApi.data && getWalletBalanceApi.data.balance) {
        setbalance(getWalletBalanceApi.data.balance.balance);
        setaccount(getWalletBalanceApi.data.balance.account_number);
      }
    }
  }, [getWalletBalanceApi.data]);

  useEffect(() => {
    if (getTodaySettlementsApi.data) {
      console.log("getTodaySettlementsApi.data", getTodaySettlementsApi.data);
      setsettlements(getTodaySettlementsApi.data);
    }
  }, [getTodaySettlementsApi.data]);

  useEffect(() => {
    getWalletBalance();
    getTodaySettlements();
  }, []);

  useInterval(async () => {
    getWalletBalance();
    getTodaySettlements();
  }, 20000);
  return (
    <SafeAreaView className="flex-1 p-2">
      <View
        style={{ backgroundColor: COLORS.grey60 }}
        className="flex justify-center items-center rounded-md"
      >
        <Text className="text-white text-lg">WALLET</Text>
        <Text className="text-white text-3xl">{account}</Text>
        <Text className="text-white text-lg">BALANCE</Text>
        <Text className="text-white text-3xl">KES {balance}</Text>
      </View>
      <View>
        <Text className="text-center text-2xl">Today collections</Text>
        {settlements && settlements.length ? (
          <FlatList
            data={settlements}
            keyExtractor={(menuItem) => menuItem.title}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <View>
                <View className="flex flex-row">
                  <Text>{item.trip_title}</Text>
                </View>

                <Text>{item.provider_reference_number}</Text>
                <Text>KES {item.amount}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No settlements</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VehicleCollectionScreen;
