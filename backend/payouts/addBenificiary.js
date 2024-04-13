import apiClient from "./apiClient.js";
import usersSchema from "../models/users.js";
import generateToken from "./generateToken.js";
const addBeneficiary = async (id) => {
  const userData = await usersSchema.findOne(
    { _id: id },
    {
      email: 1,
      phone: 1,
      name: 1,
      upi_id: 1,
    }
  );
  if (userData == null) {
    return { ok: 0, message: "User Not Found" };
  }

  if (!userData?.upi_id) {
    return { ok: 0, message: "UPI ID Not added" };
  }

  const beneficiary = {
    name: userData?.name,
    phone: userData?.mobile,
    email: userData?.email,
    address: "Home",
    beneId: id,
    vpa: userData?.upi_id,
  };

  const authToken = await generateToken();

  const cashfreeResponse = await apiClient.post(
    "/addBeneficiary",
    beneficiary,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  if (cashfreeResponse.status == "SUCCESS") {
    return { ok: 1, message: cashfreeResponse.message };
  } else {
    return { ok: 0, message: cashfreeResponse.message };
  }
};

export default addBeneficiary;
