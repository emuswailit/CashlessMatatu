import { useEffect, useState } from "react";
import { configureStore } from "./app/redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./app/navigation/rootNavigation";
import authStorage from "./app/auth/storage";
import { useFonts } from "expo-font";
import AuthContext from "./app/auth/context";
import * as SplashScreen from "expo-splash-screen";
import navigationTheme from "./app/navigation/navigationTheme";
import { ActivityIndicator, Text, View } from "react-native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  const [user, setUser] = useState();
  const [rawToken, setRawToken] = useState();
  const [currentUserEmployment, setcurrentUserEmployment] = useState();
  const [customFontsLoaded, setcustomFontsLoaded] = useState(false);
  const [paymentsToken, setpaymentsToken] = useState();

  const restoreToken = async () => {
    const token = await authStorage.getToken();

    if (token) {
      setRawToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  };
  const restoreUser = async () => {
    const user = await authStorage.getUser();

    if (user) {
      setUser(user);
      console.log("There is user");
    } else {
      setUser(null);
      console.log("There is no user");
    }
  };

  const [loaded, error] = useFonts({
    "Poppins-Regular": require("./app/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./app/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./app/assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      console.log("Fonts loaded");
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  useEffect(() => {
    restoreUser();
    restoreToken();
  }, []);

  return (
    <Provider store={configureStore()}>
      <AuthContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
