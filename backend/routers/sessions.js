import express from "express";
import { addChats } from "../controllers/sessions/addChats.js";
import { addSessions } from "../controllers/sessions/addSessions.js";
import { deleteSessions } from "../controllers/sessions/deleteSessions.js";
import { getChats } from "../controllers/sessions/getChats.js";
import { getSessions } from "../controllers/sessions/getSessions.js";
import { updateSessions } from "../controllers/sessions/updateSessions.js";

const SessionRouter = express.Router();

SessionRouter.get("/", getSessions);
SessionRouter.post("/booking", addSessions);
SessionRouter.put("/", updateSessions);
SessionRouter.delete("/", deleteSessions);
SessionRouter.post("/chats", addChats);
SessionRouter.get("/chats", getChats);

export { SessionRouter };
