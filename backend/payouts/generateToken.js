import apiClient from "./apiClient.js";

const generateToken = async () => {
  const cashfreeResponse = await apiClient.post("/authorize");
  return cashfreeResponse.data?.data?.token;
};

export default generateToken;
