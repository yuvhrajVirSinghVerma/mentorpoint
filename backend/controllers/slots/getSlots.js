import slotsSchema from "../../models/slots.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

export const getSlots = async (req, res) => {
  try {
    const query = req?.query || {};
    const data = await slotsSchema.find(query);
    sendSuccessResponse({
      res,
      data,
    });
  } catch (err) {
    console.log(err);
    sendFailResponse({
      res,
      message: err?.message,
    });
  }
};
