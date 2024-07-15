import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import AccountsScreen from "../screens/AccountsScreen";
const Stack = createStackNavigator();

export default AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.ACCOUNTS} component={AccountsScreen} />
  </Stack.Navigator>
);
