import jwtDecode from "jwt-decode";
import { useContext, useState } from "react";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const {
    user,
    setUser,
    rawToken,
    setRawToken,
    currentUserEmployment,
    setcurrentUserEmployment,
    paymentsToken,
    setpaymentsToken,
  } = useContext(AuthContext);

  console.log("Payment token 2", paymentsToken);

  const logIn = (authToken, id) => {
    console.log("ID at 2", id);
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
    setRawToken(authToken);
    setpaymentsToken(paymentsToken);
    authStorage.storePaymentsToken(paymentsToken);
    setMe(id);
  };
  const logOut = () => {
    setUser(null);
    setRawToken(null);
    authStorage.removeToken();
  };
  return {
    logIn,
    logOut,
    user,
    setUser,
    rawToken,
    setRawToken,
    currentUserEmployment,
    setcurrentUserEmployment,
    paymentsToken,
    setpaymentsToken,
  };
};
