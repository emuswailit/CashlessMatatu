import client from "./client";
import mobiticketClient from "./mobiticketClient";

const login = (phone_or_email, password) =>
  client.post("/authentication/login/", { phone_or_email, password });
const generatePaymentsToken = () =>
  mobiticketClient.post("/", {
    action: "GenerateToken",
    consumer_code: "53465B2F11A49",
    consumer_key: "d52fb079-909e-4cab-b561-d4bad38ad73f",
    consumer_secret: "afCHXCvkHSf8n1Ii0j8wmjNuMXwtFp1O",
  });

export default {
  login,
  generatePaymentsToken,
};
