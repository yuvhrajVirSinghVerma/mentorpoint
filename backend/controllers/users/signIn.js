import usersSchema from "../../models/users.js";
import jwt from "jsonwebtoken";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import { decryptPassword } from "../../utils/passwords.js";
const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log("sever sigin ",email,password)
  try {
    const user = await usersSchema.findOne({ email: email });

    if (!user || user == null) {
      sendFailResponse({
        res,
        err: "User Not Found",
        code: 404,
      });
      return null;
    }

    const p = user.password;
    const token = jwt.sign({ user }, "aekvbkevbelvewvvwugfuqvk");
  console.log("res password ",password,decryptPassword(p))

    if (password == decryptPassword(p)) {
      sendSuccessResponse({
        res,
        data: token,
      });
    } else {
      sendFailResponse({
        res,
        err: "Invalid Credentials",
      });
    }
  } catch (error) {
    sendFailResponse({
      res,
      err: "Internal Error",
    });
  }
};

export { signIn };
