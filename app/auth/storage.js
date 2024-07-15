import * as SecureStorage from "expo-secure-store";
import jwtDecode from "jwt-decode";
const key = "authToken";

const storeToken = async (authToken) => {
  try {
    return await SecureStorage.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Could not store token");
  }
};

const storeRegistrationDetails = async (details) => {
  console.log("dets", details);
  try {
    return await SecureStorage.setItemAsync(
      "registrationDetails",
      JSON.stringify(details)
    );
  } catch (error) {
    console.log("Could not store reg details", error);
  }
};

const retrieveRegistrationDetails = async () => {
  try {
    const details = await SecureStorage.getItemAsync("registrationDetails");
    console.log("retrieved reg details", JSON.parse(details));
    return JSON.parse(details);
  } catch (error) {
    console.log("Could not retrieve registration details", error);
  }
};

const removeRegistrationDetails = async () => {
  try {
    return await SecureStorage.deleteItemAsync("registrationDetails");
  } catch (error) {
    console.log("Could not delete token");
  }
};

const storePaymentsToken = async (paymentsToken) => {
  try {
    return await SecureStorage.setItemAsync("paymentsToken", paymentsToken);
  } catch (error) {
    console.log("Could not store token");
  }
};

const isExpired = (token) => {
  decoded = jwtDecode(token);

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.log("Not expires");
    return true;
  } else {
    console.log("Already expired");
    return false;
  }
};

const getToken = async () => {
  try {
    const token = await SecureStorage.getItemAsync(key);

    if (isExpired(token)) {
      removeToken();
      return null;
    } else {
      return token;
    }
  } catch (error) {
    console.log("Could not retrieve token", error);
  }
};

const getPaymentsToken = async () => {
  try {
    const token = await SecureStorage.getItemAsync("paymentsToken");
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    console.log("exp", decoded.exp);
    console.log("currentTime", currentTime);
    if (decoded.exp > currentTime) {
      return token;
    } else {
      console.log("It is expired");
    }
  } catch (error) {
    console.log("Could not retrieve payment token", error);
  }
};
const removeToken = async () => {
  try {
    return await SecureStorage.deleteItemAsync(key);
  } catch (error) {
    console.log("Could not delete token");
  }
};
const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

export default {
  getToken,
  getUser,
  removeToken,
  storeToken,
  storePaymentsToken,
  getPaymentsToken,
  storeRegistrationDetails,
  retrieveRegistrationDetails,
  removeRegistrationDetails,
};
