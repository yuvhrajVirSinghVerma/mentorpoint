import opportunitiesSchema from "../../models/opportunities.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import jwt from "jsonwebtoken";
import usersSchema from "../../models/users.js";

export const getOpportunities = async (req, res) => {
  try {
    let query = req?.query || {};
    console.log("query oppur ", query, req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "aekvbkevbelvewvvwugfuqvk");
    let data = await opportunitiesSchema
      .find({})
      .populate({
        path: "mentor_id",
        model: "users",
        select: ["name", "email"],
      });

    let user = await usersSchema.find({ _id: decoded.user._id });
    console.log("decoded ", decoded, user);

    console.log("user oppur backend ", data);
    // decoded?.user?._id
    const jobsWithIsSaved = data.map((job) => ({
      ...job,
      isSaved: user[0].jobs.some(
        (savedJob) => savedJob.toString() == job._id.toString()
      ),
      isApplied: user[0].AppliedJobs.some(
        (savedJob) => savedJob.toString() == job._id.toString()
      ),
    }));
    // console.log("jobsWithIsSaved ",jobsWithIsSaved)
    let obj = [];
    jobsWithIsSaved.map((j) => {
      obj.push({
        ...j._doc,
        isSaved: j.isSaved,
        isApplied:j.isApplied
      });
    });

    console.log("objjjj ", obj);

    sendSuccessResponse({
      res,
      data: obj,
    });
  } catch (err) {
    console.log("Error ", err);
    sendFailResponse({
      res,
      message: err?.message,
    });
  }
};
