import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";
import slotsSchema from "../../models/slots.js";

export const deleteMentorSlots = async (req, res) => {
  try {
    const { slot_id, mentor_id,date } = req.query;
    console.log("backend slot delete ",slot_id,mentor_id,date)
    
    // const ans=await slotsSchema.findOne({mentor_id,date})
    // console.log("ans  ",ans)

    const data = await slotsSchema.findOneAndUpdate(
      { mentor_id,date },
      {
        $pull: { mentor_slots: { _id: slot_id } },
      }
    );
    console.log("slots delted ",data)
    sendSuccessResponse({
      res,
      data,
    });
  } catch (err) {
    sendFailResponse({
      res,
      message: err?.message,
    });
  }
};
