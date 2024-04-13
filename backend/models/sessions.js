import mongoose from "mongoose";

const sessionsSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    mentor_id: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    start_time: { type: String, required: true },
    resume_link: { type: String, required: false },
    service_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "services",
    },
    chats: {
      type: [
        {
          _id: { type: String, required: true },
          text: { type: String, required: true },
          createdAt: { type: Date, required: true },
          read:{type:Boolean},
          user: { type: Object },
        },
      ],
    },
    isReviewed:{type:Boolean}
  },
  { timestamps: true }
);

export default mongoose.model("sessions", sessionsSchema);
