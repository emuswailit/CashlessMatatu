// Setup config with token - helper function
import { getLoggedInUser } from "../../helpers/authUtils";

export const tokenConfig = (getState) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let token = null;
  // Get token from local storage
  const user = getLoggedInUser();
  console.log("et", getLoggedInUser());
  console.log("uxa", user);

  console.log("User", user);

  if (user) {
    token = user.tokens.access;
  }

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    return null;
  }

  return "config";
};
