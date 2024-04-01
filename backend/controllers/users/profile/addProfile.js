import { compress } from "../../../utils/files/compressor.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../../utils/responses.js";
import { drive } from "../../../connections/drive.config.js";
import fs from "fs";
import usersSchema from "../../../models/users.js";

export const addProfile = async (req, res) => {
  try {
    const { _id } = req?.body;
    console.log(_id);
    console.log(req?.files);
    const folderId = process.env.FOLDER_ID_DRIVE;
    const { mimetype, path } = req?.files[0];
    const { sourcePath, destinationPath } = await compress(path);
    const {
      data: { id: fileId },
    } = await drive.files.create({
      resource: {
        name: `${_id}.${mimetype.split("/")[1]}`,
        parents: [folderId],
      },
      media: {
        mimeType: mimetype,
        body: fs.createReadStream(destinationPath),
      },
    });

    await drive.permissions.create({
      fileId,
      requestBody: {
        type: "anyone",
        role: "reader",
      },
    });
    await usersSchema.findByIdAndUpdate(_id, { profile_picture: fileId });
    sendSuccessResponse({
      res,
      data: { uploaded: req.files.length },
    });

    fs.unlinkSync(sourcePath);
    fs.unlinkSync(destinationPath);
  } catch (err) {
    console.log(err);
    sendFailResponse({
      err,
      res,
      message: err?.message,
    });
  }
};
