import express from "express";
import { addUser } from "../controllers/users/addUsers.js";
import { addProfile } from "../controllers/users/profile/addProfile.js";
import { getUsers } from "../controllers/users/getUsers.js";
import { signIn } from "../controllers/users/signIn.js";
import { updateUsers } from "../controllers/users/updateUsers.js";
import { upload } from "../utils/files/upload.js";
import multer from "multer";
import path from "path";
import { updateProfile } from "../controllers/users/profile/updateProfile.js";

const UsersRouter = express.Router();

UsersRouter.get("/", getUsers);
UsersRouter.put("/", updateUsers);
UsersRouter.post("/signup", addUser);
UsersRouter.post("/signin", signIn);
UsersRouter.post("/profile", upload.array("profile"), addProfile);
UsersRouter.put("/profile", upload.array("profile"), updateProfile);

export { UsersRouter };
