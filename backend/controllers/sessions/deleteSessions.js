import sessionsSchema from "../../models/sessions.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

export const deleteSessions = async (req, res) => {
  try {
    const _id = req?.body?._id;
    const data = await sessionsSchema.findByIdAndDelete(_id);
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
