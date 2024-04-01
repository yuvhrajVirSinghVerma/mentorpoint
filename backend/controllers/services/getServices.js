import servicesSchema from "../../models/services.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

export const getServices = async (req, res) => {
  try {
    let query = req?.query || {};
    let data = await servicesSchema.find(query);
    sendSuccessResponse({
      res,
      data,
    });
  } catch (err) {
    sendFailResponse({
      res,
      message: err?.message,
    });
  }
};
