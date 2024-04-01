import express from "express";
import { addOpportunities } from "../controllers/opportunities/addOpportunities.js";
import { deleteOpportunities } from "../controllers/opportunities/deleteOpportunities.js";
import { getOpportunities } from "../controllers/opportunities/getOpportunities.js";
import { updateOpportunities } from "../controllers/opportunities/updateOpportunities.js";
import { AppliedJobs } from "../controllers/opportunities/AppliedJob.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Initialize multer middleware
const upload = multer({ storage: storage });

const OpportunitiesRouter = express.Router();

OpportunitiesRouter.post('/apply',upload.single("file"),AppliedJobs)
OpportunitiesRouter.get("/", getOpportunities);
OpportunitiesRouter.post("/", addOpportunities);
OpportunitiesRouter.put("/", updateOpportunities);
OpportunitiesRouter.delete("/", deleteOpportunities);

export { OpportunitiesRouter };
