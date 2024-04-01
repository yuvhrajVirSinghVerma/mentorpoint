import services from "../models/services.js";
import usersSchema from "../models/users.js";

const createEventData = async (slot) => {
  var attendees = [];

  const user = await usersSchema.findOne(
    { _id: slot.user_id },
    { email: 1, name: 1 }
  );

  const mentor = await usersSchema.findOne(
    { _id: slot.mentor_id },
    { email: 1, name: 1 }
  );

  attendees.push({ email: user.email });
  attendees.push({ email: mentor.email });

  const service = await services.findOne({ _id: slot.service_id });
  const summary = service?.title;

  const description = service?.description;

  return {
    event: {
      summary,
      description,
      start_time: slot.start_time,
      end_time: slot.end_time,
      attendees,
    },
    mail: {
      summary,
      username: user.name,
      mentorname: mentor.name,
      user_mail: user.email,
    },
    fee: service.fee,
  };
};

export default createEventData;
