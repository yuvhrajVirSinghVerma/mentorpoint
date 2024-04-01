import "./connections/config.js";
import "./events/newevent.js";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectToMongoDb from "./connections/mongodb.js";
import { UsersRouter } from "./routers/users.js";
import { ServicesRouter } from "./routers/services.js";
import { OpportunitiesRouter } from "./routers/opportunities.js";
import { SessionRouter } from "./routers/sessions.js";
import { SlotsRouter } from "./routers/slots.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import sendInvitation from "./mails/mailer.js";
import parseEvent from "./events/eventparser.js";
import createEvent from "./events/newevent.js";
import verifyVPA from "./payouts/verifyVPA.js";
import paytoVPA from "./payouts/paytoVPA.js";
import fileUpload from "express-fileupload";
connectToMongoDb();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

app.use("/api/users", UsersRouter);
app.use("/api/services", ServicesRouter);
app.use("/api/opportunities", OpportunitiesRouter);
app.use("/api/sessions", SessionRouter);
app.use("/api/slots", SlotsRouter);
app.use(fileUpload());
app.get("/", (req, res) => {
  res.send("Mentorpoint");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Mentorpoint Server is running on port ${PORT}.`);
});

