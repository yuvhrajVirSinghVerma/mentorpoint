import { addSlots } from "../controllers/slots/addSlots.js";
import { getUserSlots } from "../controllers/slots/getUserSlots.js";
import { updateSlots } from "../controllers/slots/updateSlots.js";
import { deleteSlots } from "../controllers/slots/deleteSlots.js";
import express from "express";
import { deleteMentorSlots } from "../controllers/slots/deleteMentorSlots.js";
import { getSlots } from "../controllers/slots/getSlots.js";

const SlotsRouter = express.Router();

SlotsRouter.get("/userslots", getUserSlots);
SlotsRouter.get("/", getSlots);
SlotsRouter.post("/", addSlots);
SlotsRouter.put("/", updateSlots);
SlotsRouter.delete("/", deleteSlots);
SlotsRouter.delete("/mentorslots", deleteMentorSlots);

export { SlotsRouter };
