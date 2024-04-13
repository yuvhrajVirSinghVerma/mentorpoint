import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";
import slotsSchema from "../../models/slots.js";
import servicesSchema from "../../models/services.js";
import moment from "moment";

export const getUserSlots = async (req, res) => {
  try {
    const query = req?.query || {};
    console.log(query);
    const service_id = query?.service_id;
    const mentor_id = query?.mentor_id;
    const date = query?.date;
    const { duration } = await servicesSchema.findById(service_id);
    const slotData = await slotsSchema.findOne(
      { mentor_id: mentor_id, date: date },
      { mentor_slots: 1, user_slots: 1 }
    );
    console.log("slots ",slotData)
    console.log("duration ",duration)

    let data = [];
    if (slotData == null) {
      sendSuccessResponse({
        res,
        data,
      });
      return null;
    }
    const { mentor_slots, user_slots } = slotData;
    console.log(duration, mentor_slots);

    mentor_slots.map((slot) => {
      let start_time = moment(slot.start_time);
      let end_time = moment(slot.end_time);
      let time = moment.duration(end_time.diff(start_time)).asMinutes();
      console.log("time ",time," start_time ",start_time," end_time ",end_time)
      while (time >= duration) {
        data = [
          ...data,
          {
            start_time: start_time,
            end_time: moment(start_time).add(duration, "m").toDate(),
            is_booked: false,
          },
        ];
        time -= duration;
        start_time = moment(start_time).add(duration, "m").toDate();
      }
    });
    console.log("data ",data )
    data = data.map((slot) => {
      user_slots?.map((userSlot) => {
        const slotStartTime = new Date(slot.start_time);
        const slotEndTime = new Date(slot.end_time);
        const userSlotStartTime = new Date(userSlot.start_time);
        const userSlotEndTime = new Date(userSlot.end_time);
        if (
          (slotStartTime.getTime() >= userSlotStartTime.getTime() &&
            slotStartTime.getTime() < userSlotEndTime.getTime()) ||
          (slotEndTime.getTime() > userSlotStartTime.getTime() &&
            slotEndTime.getTime() <= userSlotEndTime.getTime())
        ) {
          slot = { ...slot, is_booked: true };
        }
      });
      return slot;
    });
    console.log("data slots ",data)
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
