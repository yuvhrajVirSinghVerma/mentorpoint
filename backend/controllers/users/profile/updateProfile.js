import { compress } from "../../../utils/files/compressor.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../../utils/responses.js";
import { drive } from "../../../connections/drive.config.js";
import fs from "fs";
import usersSchema from "../../../models/users.js";

export const updateProfile = async (req, res) => {
  try {
    const { profile_picture } = req?.body;
    const folderId = process.env.FOLDER_ID_DRIVE;
    const { mimetype, path } = req?.files[0];
    const { destinationPath, sourcePath } = await compress(path);
    const { data } = await drive.files.update({
      fileId: profile_picture,
      //   resource: {
      //     name: `${_id}.${mimetype.split("/")[1]}  `,
      //     parents: [folderId],
      //   },
      media: {
        mimeType: mimetype,
        body: fs.createReadStream(destinationPath),
      },
    });

    sendSuccessResponse({
      res,
      data: { uploaded: req.files.length, description: data },
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
