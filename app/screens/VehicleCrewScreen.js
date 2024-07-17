import { View, Text, SafeAreaView } from "react-native";
import React from "react";

import CardFullWidthWithAction from "../components/cards/CardFullWidthWithAction";
import { COLORS, FONTS } from "../constants";

const VehicleCrewScreen = ({ route, navigation }) => {
  const vehicle = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "#ffffff",

      headerTitle: (props) => (
        <Text {...props} style={{ color: "white", ...FONTS.body3 }}>
          Crew - {vehicle.title}
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
    <SafeAreaView className="flex-1 p-2 bg-gray-100">
      <CardFullWidthWithAction
        title={`Michael Omaria`}
        subTitle="Conductor"
        action="Change"
      />
      <CardFullWidthWithAction
        title={`Nancy Chao`}
        subTitle="Driver"
        action="Change"
      />
    </SafeAreaView>
  );
};

export default VehicleCrewScreen;
