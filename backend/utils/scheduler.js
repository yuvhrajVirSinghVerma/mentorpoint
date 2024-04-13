import moment from "moment";
const HOURS = 36e5;

export const scheduler = (duration, mentor_slots, user_slots) => {
  mentor_slots.map((slot) => {
    if (!slot.is_booked) {
      console.log(slot);
    }
  });
  user_slots.map((slot) => {
    if (!slot.is_booked) {
      console.log(slot);
    }
  });
  console.log(totalSlotsBooked(user_slots));

  return mentor_slots;
};

const totalSlotsBooked = (user_slots) => {
  const slots = new Map();
  user_slots.map((slot) => {
    const duration = Math.abs(slot.end_time - slot.start_time) / HOURS;
    slots.set(duration, slots.get(duration) ? slots.get(duration) + 1 : 1);
  });

  return slots;
};
