import express from "express";
import { addServices } from "../controllers/services/addServices.js";
import { deleteServices } from "../controllers/services/deleteServices.js";
import { getServices } from "../controllers/services/getServices.js";
import { updateServices } from "../controllers/services/updateServices.js";

const ServicesRouter = express.Router();

ServicesRouter.get("/", getServices);
ServicesRouter.post("/", addServices);
ServicesRouter.put("/", updateServices);
ServicesRouter.delete("/", deleteServices);

export { ServicesRouter };
