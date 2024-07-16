import React from "react";
import TripsNavigator from "./TripsNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AccountsNavigator from "./AccountsNavigator";
import TicketsNavigator from "./TicketsNavigator";

const Tab = createBottomTabNavigator();
export default AppNavigator = () => (
  <Tab.Navigator
    useLegacyImplementation={true}
    screenOptions={{
      tabBarActiveBackgroundColor: COLORS.primary,
      tabBarActiveTintColor: "white",
      tabBarInactiveBackgroundColor: COLORS.light,
      tabBarInactiveTintColor: COLORS.grey,
      tabBarLabelStyle: {
        fontSize: 15,
      },
    }}
  >
    <Tab.Screen
      name="Trips"
      component={TripsNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
        headerShown: false,
      }}
    />

    <Tab.Screen
      name="Tickets"
      component={TicketsNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            size={size}
            color={color}
          />
        ),
        headerShown: false,
      }}
    />

    <Tab.Screen
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
        headerShown: false,
      }}
      name="Accounts"
      component={AccountsNavigator}
    />
  </Tab.Navigator>
);
