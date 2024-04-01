import mongoose from "mongoose";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";
import sessionsSchema from "../../models/sessions.js";
import slotsSchema from "../../models/slots.js";
import createEventData from "../../events/createEventData.js";
import createEvent from "../../events/newevent.js";
import parseEvent from "../../events/eventparser.js";
import sendInvitation from "../../mails/mailer.js";
import usersSchema from "../../models/users.js";

export const addSessions = async (req, res) => {
  try {
    const sessionToAdd = req?.body;
    console.log("session  add ",sessionToAdd)
    const { mentor_id, slot, date } = sessionToAdd;
    console.log(mentor_id);

    const slotResponse = await slotsSchema.findOneAndUpdate(
      { date: date, mentor_id: mentor_id },
      {
        $push: { user_slots: slot },
      }
    );

    if (slotResponse == null) {
      throw "Slot Not Found";
    }
    var fee;
    try {
      const event = await createEventData(sessionToAdd);
      const eventParsed = parseEvent(event.event);
      fee = event.fee;
      const mailData = event.mail;
      try {
        sendInvitation(mailData);
        console.log("email ",mailData)
      } catch (error) {}

      await createEvent(eventParsed);
    } catch (error) {}

    console.log("sessionToAdd ",sessionToAdd)
    delete sessionToAdd["slot"];
    delete sessionToAdd["end_time"];
    let sessionResponse="empty"
    try{
      sessionResponse = await sessionsSchema.create(sessionToAdd);

    }
    catch(error ){
      console.log("error ",error)
    }
    console.log("sessionResponse ",sessionResponse)
    const userResponse = await usersSchema.updateOne(
      { _id: mentor_id },
      {
        $inc: { current_balance: fee, total_earning: fee },
      }
    );
    console.log(userResponse);
    if (userResponse == null) {
      throw "Unable to update earning";
    }
    if (sessionResponse == null) {
      throw "Unable to add Session";
    }

    sendSuccessResponse({
      res,
      slotResponse,
      sessionResponse,
    });
  } catch (err) {
    sendFailResponse({
      res,
      err: err,
      statusCode: 500,
    });
  }
};
