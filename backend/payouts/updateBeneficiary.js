import addBeneficiary from "./addBenificiary.js";
import apiClient from "./apiClient.js";
import generateToken from "./generateToken.js";

const updateBeneficiary = async (id) => {
  const token = generateToken();
  try {
    const removedBeneficiary = await apiClient.post("/removeBeneficiary", {
      beneId: id,
    });
  } catch (error) {}

  return addBeneficiary(id);
};

export default updateBeneficiary;
