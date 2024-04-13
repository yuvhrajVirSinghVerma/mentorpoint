import servicesSchema from "../../models/services.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

export const deleteServices = async (req, res) => {
  try {
    console.log(req.query);
    let { _id } = req?.query;
    console.log(_id);
    let data = await servicesSchema.findByIdAndDelete(_id);

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
