import mongoose from "mongoose";
import { generateHashedPassword } from "../../utils/passwords.js";
import jwt from "jsonwebtoken";
import usersSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

export const addUser = async (req, res) => {
  try {
    var { email, password, name ,role} = req?.body;
    password = generateHashedPassword(password);
    console.log("pass ",password)
    console.log("role ",role)
    let data = await usersSchema.create({ email, name, password,role });
    const token = jwt.sign({ user: data }, "aekvbkevbelvewvvwugfuqvk");
    console.log("token ",token)

    sendSuccessResponse({
      res,
      data: token,
    });
  } catch (err) {
    console.log(err);
    sendFailResponse({
      res,
      err: "User Already Exists",
      statusCode: 500,
    });
  }
};
