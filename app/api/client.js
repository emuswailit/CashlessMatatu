import { create } from "apisauce";
import authStorage from "../auth/storage";
const apiClient = create({
  baseURL: "https://api.wazipos.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  console.log("Auth token", authToken);

  if (!authToken) return;
  request.headers["Authorization"] = `Bearer ${authToken}`;
});

export default apiClient;
