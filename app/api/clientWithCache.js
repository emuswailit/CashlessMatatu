import { create } from "apisauce";
import authStorage from "../auth/storage";
import cache from "../utility/cache";
const apiClient = create({
  baseURL: "https://api.wazipos.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();

  if (!authToken) return;
  request.headers["Authorization"] = `Bearer ${authToken}`;
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  //Send the usual get
  const response = await get(url, params, axiosConfig);
  // console.log("resp here", response.data);
  // Cache the retrieved
  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }
  //Retrieve the cached data
  const data = await cache.get(url);
  //Return the cached data if available, else return the normal response
  return data ? { ok: true, data } : response;
};

export default apiClient;
