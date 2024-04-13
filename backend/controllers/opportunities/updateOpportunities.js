import opportunitiesSchema from "../../models/opportunities.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

export const updateOpportunities = async (req, res) => {
  try {
    let opportunityToUpdate = req?.body;
    let _id = opportunityToUpdate?._id;

    let result = await opportunitiesSchema.findByIdAndUpdate(
      _id,
      opportunityToUpdate,
      {
        new: true,
        runValidators: true,
      }
    );

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
