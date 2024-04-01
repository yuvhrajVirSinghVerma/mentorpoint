import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";
import slotsSchema from "../../models/slots.js";

export const deleteSlots = async (req, res) => {
  try {
    const _id = req?.body?._id;
    const data = await slotsSchema.findByIdAndDelete(_id);
    sendSuccessResponse({
      res,
      data,
    });
  } catch (err) {
    sendFailResponse({
      res,
      err: err,
      statusCode: 500,
    });
  }
};
