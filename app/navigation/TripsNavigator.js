import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, TripsScreen } from "../screens";
import routes from "./routes";
const Stack = createStackNavigator();

export default AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
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
      name={routes.TRIPS}
      component={TripsScreen}
    />
  </Stack.Navigator>
);
