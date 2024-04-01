import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";
import sessionsSchema from "../../models/sessions.js";

export const getChats = async (req, res) => {
  try {
    const query = req?.query;
    let data = await sessionsSchema.find(query);
    let chats=[]
    data.map((dt)=>{

      dt.chats.map((ch)=>{
        ch.read=true
        chats.push(ch)
    console.log("data chats ",ch)

      })
    })
    await sessionsSchema.findOneAndUpdate(query,{chats:chats})
    sendSuccessResponse({
      res,
      data,
    });
  } catch (err) {
    sendFailResponse({
      res,
      message: err?.message,
    });
  }
};
