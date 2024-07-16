import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import TicketsScreen from "../screens/TicketsScreen";
const Stack = createStackNavigator();

export default TicketsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={routes.VEHICLES}
      component={TicketsScreen}
    />
  </Stack.Navigator>
);
