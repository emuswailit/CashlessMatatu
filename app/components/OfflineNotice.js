import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";
function OfflineNotice(props) {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          rawToken,
          setRawToken,
          currentUserEmployment,
          setcurrentUserEmployment,
          paymentsToken,
          setpaymentsToken,
        }}
      >
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          <View>
            <Text>Omaria</Text>
          </View>
        </NavigationContainer>
        <OfflineNotice />
      </AuthContext.Provider>
    );

  return null;
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: "center",
    top: Constants.statusBarHeight,
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },

  text: {
    color: colors.white,
  },
});
export default OfflineNotice;
