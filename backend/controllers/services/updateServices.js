import servicesSchema from "../../models/services.js";
import usersSchema from "../../models/users.js";

import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

function calculateOverallRating(userRatings) {
  let sumWeightedRatings = 0;
  let sumWeights = 0;

  userRatings.forEach((userRating) => {
    const weight = getUserWeight(userRating.userId); 
    sumWeightedRatings += userRating.rating * weight;
    sumWeights += weight;
  });

  if (sumWeights === 0) {
    return 0; 
  }

  const overallRating = sumWeightedRatings / sumWeights;
  return overallRating;
}
function getUserWeight(userId) {
  return 1; // Default weight (you need to customize this based on your requirements)
}
export const updateServices = async (req, res) => {
  try {
    let serviceToAdd = req?.body;
    let _id = serviceToAdd?._id;
    let feedback = serviceToAdd?.feedback;
    let query = serviceToAdd;
    console.log("serviceToAdd ", serviceToAdd);
    let result = await servicesSchema.findById({ _id });
    if (feedback) {
      console.log("res ", result);
    let mentor=await usersSchema.findById({ _id:serviceToAdd.mentorId }, { password: 0 });
      // query=
      //   { $push: { feedback: feedback } },
      //   {rating:query.rating}
      result.feedback.push(feedback);
      let overallServiceRating=calculateOverallRating(result.feedback).toFixed(1)
      // console.log("overallServiceRating ",overallServiceRating.toFixed(1))
      result.rating=overallServiceRating
      mentor.rating=overallServiceRating+mentor.rating
    console.log("mentor ",mentor)
      
      await result.save();
      await mentor.save();
      sendSuccessResponse({
        result,
        result,
      });
      return;
    }
    let data = await servicesSchema.findByIdAndUpdate(_id, query, {
      new: true,
      runValidators: true,
    });

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
