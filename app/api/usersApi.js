import client from "./client";
import clientWithCache from "./clientWithCache";
const register = (input) => {
  const data = new FormData();
  data.append("accepted_terms", input.accepted_terms);
  data.append("first_name", input.first_name);
  data.append("last_name", input.last_name);
  data.append("email", input.email);
  data.append("phone", input.phone);
  data.append("password", input.password);
  data.append("date_of_birth", input.date_of_birth);
  data.append("gender", input.gender);
  data.append("country", input.country);

  if (input.images && input.images.length) {
    input.images.forEach((image, index) => {
      let uriParts = image.split(".");
      let fileType = uriParts[uriParts.length - 1];
      data.append("images", {
        uri: image,
        name: input.phone + index + "." + fileType,
        type: `image/${fileType}`,
      });
    });
  }

  if (input.documents && input.documents.length) {
    input.documents.forEach((image, index) => {
      let uriParts = image.split(".");
      let fileType = uriParts[uriParts.length - 1];
      data.append("documents", {
        uri: image,
        name: convertToSlug(input.phone) + index + "." + fileType,
        type: `document/${fileType}`,
      });
    });
  }

  return client.post("/authentication/register", data);
};

const facilityRegister = (userinfo, onUploadProgress) => {
  const data = new FormData();
  data.append("accepted_terms", userinfo.accepted_terms);
  data.append("first_name", userinfo.first_name);
  data.append("last_name", userinfo.last_name);
  data.append("national_id", userinfo.national_id);
  data.append("phone", userinfo.phone);
  data.append("date_of_birth", userinfo.date_of_birth);
  data.append("gender", userinfo.gender.value);
  if (userinfo.password) {
    data.append("password", userinfo.phone);
  } else {
    data.append("password", "testpass123");
  }

  if (userinfo.email) {
    data.append("email", userinfo.email);
  } else {
    data.append("email", `${userinfo.phone}@tibacare.co.ke`);
  }

  return client.post("/users/register/company", data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const updateNotificationToken = (token) => {
  const data = new FormData();
  data.append("notification_token", token);
  return client.patch("/users/user/update", data);
};

const pushNotification = (to, title, body) => {
  const data = new FormData();
  data.append("to", to);
  data.append("title", title);
  data.append("body", body);

  // const data = JSON.stringify({ to, title, body });
  return client.post("/users/push/notification", data);
};

const usersAction = (data) => {
  return client.post("/authentication/users", data);
};
const usersActionAdmin = (data) => {
  return client.post("/authentication/users/admin", data);
};

const getCompanyUsers = () => {
  return clientWithCache.get("/users/customers");
};

const updateUser = (input, id, onUploadProgress) => {
  const data = new FormData();
  data.append("first_name", input.first_name);
  data.append("last_name", input.last_name);
  data.append("email", input.email ? input.email : "");

  if (input.images && input.images.length) {
    input.images.forEach((image, index) => {
      let uriParts = image.split(".");
      let fileType = uriParts[uriParts.length - 1];
      data.append("images", {
        uri: image,
        name: convertToSlug(input.title) + index + "." + fileType,
        type: `image/${fileType}`,
      });
    });
  }

  if (input.documents && input.documents.length) {
    input.documents.forEach((image, index) => {
      let uriParts = image.split(".");
      let fileType = uriParts[uriParts.length - 1];
      data.append("documents", {
        uri: image,
        name: convertToSlug(input.title) + index + "." + fileType,
        type: `document/${fileType}`,
      });
    });
  }

  return client.patch(`/authentication/users/${id}/update`, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

const searchUsers = (searchQuery) => {
  return client.post("/authentication/users", {
    action: "SearchUsers",
    searchQuery: searchQuery,
  });
};
const searchEntityCustomers = (searchQuery) => {
  return client.post("/authentication/users", {
    action: "SearchUsers",
    searchQuery: searchQuery,
  });
};

const getClusters = () => {
  return client.post("/authentication/clusters", {
    action: "GetClusters",
  });
};

const addCadre = (data, onUploadProgress) => {
  return client.post("/authentication/cadres", data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const updateCadre = (data, onUploadProgress) => {
  return client.post("/authentication/cadres", data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getCadres = (data, onUploadProgress) => {
  return client.post("/authentication/cadres", data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  facilityRegister,
  usersAction,
  usersActionAdmin,
  pushNotification,
  register,
  updateNotificationToken,
  getCompanyUsers,
  updateUser,
  searchUsers,
  searchEntityCustomers,
  getClusters,
  addCadre,
  updateCadre,
  getCadres,
};
