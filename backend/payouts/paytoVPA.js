import apiClient from "./apiClient.js";
import generateToken from "./generateToken.js";
import { v4 as uuidv4 } from "uuid";
const paytoVPA = async (id, amount) => {
  const token = await generateToken();
  console.log(token);
  const beneficiary = await apiClient.get(`/getBeneficiary/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (beneficiary.status == "ERROR") {
    return { ok: 0, message: beneficiary.message };
  } else {
    const transferId = uuidv4();
    try {
      const authToken = await generateToken();
      const cashfreeResponse = await apiClient.post(
        "/requestTransfer",
        {
          beneId: id,
          amount: amount,
          transferId: transferId,
          transferMode: "upi",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (cashfreeResponse?.data?.status == "SUCCESS") {
        return { ok: 1, message: cashfreeResponse?.data?.message };
      } else {
        return { ok: 0, message: cashfreeResponse?.data?.message };
      }
    } catch (error) {
      return { ok: 0, message: error };
    }
  }
};

export default paytoVPA;
