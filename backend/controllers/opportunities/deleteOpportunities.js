import opportunitiesSchema from "../../models/opportunities.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

export const deleteOpportunities = async (req, res) => {
  try {
    let _id = req?.body?._id;

    let result = await opportunitiesSchema.findByIdAndDelete(_id);

    sendSuccessResponse({
      res,
      data: result,
    });
  } catch (err) {
    sendFailResponse({
      res,
      err: err,
      statusCode: 500,
    });
  }
};
