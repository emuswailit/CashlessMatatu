import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import AccountsScreen from "../screens/AccountsScreen";
import TestingScreen from "../screens/TestingScreen";
import VehiclesScreen from "../screens/VehiclesScreen";
import VehicleDetailsScreen from "../screens/VehicleDetailsScreen";
import VehiclePayoutsScreen from "../screens/VehiclePayoutsScreen";
import VehicleCollectionScreen from "../screens/VehicleCollectionScreen";
import VehicleCrewScreen from "../screens/VehicleCrewScreen";
import VehicleSubscriptionsScreen from "../screens/VehicleSubscriptionsScreen";

const Stack = createStackNavigator();

export default AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: true }}
      name="Accounts"
      component={AccountsScreen}
    />
    <Stack.Screen name={routes.VEHICLES} component={VehiclesScreen} />
    <Stack.Screen
      name={routes.VEHICLE_DETAILS}
      component={VehicleDetailsScreen}
    />
    <Stack.Screen
      name={routes.VEHICLE_PAYOUTS}
      component={VehiclePayoutsScreen}
    />
    <Stack.Screen
      name={routes.VEHICLE_COLLECTION}
      component={VehicleCollectionScreen}
    />
    <Stack.Screen name={routes.VEHICLE_CREW} component={VehicleCrewScreen} />
    <Stack.Screen
      name={routes.VEHICLE_SUBSCRIPTIONS}
      component={VehicleSubscriptionsScreen}
    />
  </Stack.Navigator>
);
