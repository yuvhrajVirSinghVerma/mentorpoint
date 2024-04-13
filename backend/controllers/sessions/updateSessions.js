import mongoose from "mongoose";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";
import sessionsSchema from "../../models/sessions.js";

export const updateSessions = async (req, res) => {
  try {
    const sessionToUpdate = req?.body;
    let _id = sessionToUpdate?._id;
    console.log("update ",_id,sessionToUpdate);
    let data = await sessionsSchema.findByIdAndUpdate(_id, sessionToUpdate, {
      new: true,
      runValidators: true,
    });

    sendSuccessResponse({
      res,
      data,
    });
  } catch {
    sendFailResponse({
      res,
      err: err,
      statusCode: 500,
    });
  }
};
