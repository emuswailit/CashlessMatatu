import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, Walkthrough, WelcomeScreen } from "../screens";

const Stack = createStackNavigator();
export default AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="login"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Start"
      component={Walkthrough}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
