import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://payout-gamma.cashfree.com/payout/v1",
  headers: {
    "X-Client-Id": process.env.CASHFREE_CLIENTID,
    "X-Client-Secret": process.env.CASHFREE_CLIENTSECRET,
  },
});

export default apiClient;
