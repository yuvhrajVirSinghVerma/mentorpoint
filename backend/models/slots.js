import mongoose from "mongoose";

const slotsSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    mentor_id: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    mentor_slots: {
      type: [
        {
          start_time: { type: Date, required: true },
          end_time: { type: Date, required: true },
          is_booked: { type: Boolean, default: false },
        },
      ],
      // validate: [(val) => val.length > 0, "{PATH}"],
    },
    user_slots: {
      type: [
        {
          start_time: { type: Date, required: true },
          end_time: { type: Date, required: true },
          is_booked: { type: Boolean, default: true },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("slots", slotsSchema);
