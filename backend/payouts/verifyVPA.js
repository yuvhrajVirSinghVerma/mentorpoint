import apiClient from "./apiClient.js";
import generateToken from "./generateToken.js";

const verifyVPA = async () => {
  const token = await generateToken();
  return apiClient.get("/validation/upiDetails", {
    params: { vpa: "success@upi", name: "Cashfree" },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default verifyVPA;
