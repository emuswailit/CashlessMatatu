import client from "./client";

const transportActions = (action) =>
  client.post("/transport/ticketing", action);

export default {
  transportActions,
};
