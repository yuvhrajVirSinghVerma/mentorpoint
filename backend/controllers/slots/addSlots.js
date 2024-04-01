import mongoose from "mongoose";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import slotsSchema from "../../models/slots.js";
import { updateSlots } from "./updateSlots.js";

export const addSlots = async (req, res) => {
  try {
    const slotsToAdd = req?.body;
    console.log(slotsToAdd);
    const { mentor_id, date } = req?.body;
    const prevSlots = await slotsSchema.findOne({ mentor_id, date });
    console.log(prevSlots);
    if (prevSlots != null || prevSlots?.mentor_slots) {
      return updateSlots(req, res);
    }

    let data = await slotsSchema.create(slotsToAdd);
    sendSuccessResponse({
      res,
      data,
    });
  } catch (err) {
    sendFailResponse({
      err,
      res,
      message: err?.message,
    });
  }
};
