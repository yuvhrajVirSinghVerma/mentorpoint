import sessionsSchema from "../../models/sessions.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import usersSchema from "../../models/users.js";

export const getSessions = async (req, res) => {
  try {
    const query = req?.query || {};
    let data = await sessionsSchema.find(query).populate({
      path: 'user_id',
      model: 'users',
      select: 'name',
    })
    .populate({
      path: 'service_id',
      model: 'services',
    })
    .exec();
    console.log("dat ",data)
   
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
