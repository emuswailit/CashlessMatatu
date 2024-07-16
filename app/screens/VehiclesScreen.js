import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import transportApi from "../api/transportApi";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import CardFullWidthWithChevron from "../components/cards/CardFullWidthWithChevron";

const VehiclesScreen = ({ navigation, route }) => {
  const forwardedUser = route.params;
  console.log("vx c", forwardedUser);

  const [conductedVehicles, setconductedVehicles] = useState([]);
  const [administeredVehicles, setadministeredVehicles] = useState([]);

  const getSaccoProfileApi = useApi(transportApi.transportActions);

  const getSaccoProfile = async () => {
    await getSaccoProfileApi.request({
      action: "GetSaccoProfile",
    });
  };

  useEffect(() => {
    getSaccoProfile();
  }, []);

  useEffect(() => {
    if (getSaccoProfileApi.data) {
      console.log("getSaccoProfileApi.data", getSaccoProfileApi.data);
      if (
        getSaccoProfileApi.data &&
        getSaccoProfileApi.data.sacco_personnel_profile &&
        getSaccoProfileApi.data.sacco_personnel_profile.administered_vehicles
      ) {
        setadministeredVehicles(
          getSaccoProfileApi.data.sacco_personnel_profile.administered_vehicles.map(
            (i) => ({
              id: i.id,
              title: i.registration,
              targetScreen: "VehicleDetails",
              icon: {
                name: "bus",
                backgroundColor: "white",
              },
            })
          )
        );
      }
    }
    console.log("getSaccoProfileApi.data 2", getSaccoProfileApi.data);
  }, [getSaccoProfileApi.data]);
  return (
    <SafeAreaView className="flex-1   bg-white">
      <Text>VehiclesScreen</Text>

      <View>
        <Text>VehiclesScreen</Text>
        {administeredVehicles && administeredVehicles.length ? (
          <View>
            <Text>Administered vehicles: {administeredVehicles.length}</Text>
            <FlatList
              data={administeredVehicles}
              keyExtractor={(menuItem) => menuItem.title}
              ItemSeparatorComponent={ListItemSeparator}
              renderItem={({ item }) => (
                <CardFullWidthWithChevron
                  onPress={() => navigation.navigate(item.targetScreen, item)}
                  item={item}
                />
              )}
            />
          </View>
        ) : (
          <View>
            <Text>No administered vehicles</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VehiclesScreen;
