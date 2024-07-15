import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import VehiclesScreen from "../screens/VehiclesScreen";
const Stack = createStackNavigator();

export default VehiclesNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.VEHICLES} component={VehiclesScreen} />
  </Stack.Navigator>
);
