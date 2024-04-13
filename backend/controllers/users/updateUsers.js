import mongoose from "mongoose";
import { generateHashedPassword } from "../../utils/passwords.js";
import usersSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

export const updateUsers = async (req, res) => {
  try {
    const userToAdd = req?.body;
    console.log("userToAdd ",userToAdd,userToAdd.jobs)
    const _id = userToAdd?._id;
    if(userToAdd.updatejob){
      console.log("inside",userToAdd.updatejob)
      try{
        let data = await usersSchema
        .findById({_id})
        .select("-password");
        console.log("job data before",data)
        if(!userToAdd.isSaved){
          data.jobs.push(userToAdd.jobs)
        }else{
         data.jobs=data.jobs.filter(f=>{
            console.log("JSON.stringify(f)!=JSON.stringify(userToAdd.jobs) ",JSON.stringify(f)!=JSON.stringify(userToAdd.jobs),JSON.stringify(f),JSON.stringify(userToAdd.jobs))
            return JSON.stringify(f)!=JSON.stringify(userToAdd.jobs)
          })
        }
        
        console.log("job data ",data)
      await data.save()
      sendSuccessResponse({
        res,
        data,
      });
      }catch(e){
        sendFailResponse({res,err:"Failed to Update"})
        console.log("errro ",e)
      }
      return
    }

    const data = await usersSchema
      .findByIdAndUpdate(_id, userToAdd, {
        new: true,
        runValidators: true,
      })
      .select("-password");

    sendSuccessResponse({
      res,
      data,
    });
  } catch (err) {
    sendFailResponse({
      res,
      err: err,
      statusCode: 500,
    });
  }
};
