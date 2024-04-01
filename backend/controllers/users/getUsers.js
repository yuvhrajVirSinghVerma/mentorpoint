import usersSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

export const getUsers = async (req, res) => {
  try {
    let query = req?.query || {};
    console.log("query ", query);

    if (query.role) {
      //if mentor is getting list of all mentor give list of other mentors excluding current mentor
      query = {
        $and: [{ _id: { $ne: query._id } }, { role: query.role }],
      };
    }
   

    const data = await usersSchema.find({ ...query }, { password: 0 }).populate({
      path: 'jobs',
      model: 'opportunities',
      populate:{
        path:"mentor_id",
        model: 'users',
        select: 'name',
      }
    }).populate({
      path: 'AppliedJobs',
      model: 'opportunities',
      
    });
      
   
    const savedjobsWithIsApplied = data[0].jobs.map((job) => ({
      ...job,
      isApplied: data[0].AppliedJobs.some(
        (savedJob) => savedJob._id.toString() == job._id.toString()
      ),
    }));
    const AppliedJobsWithIsApplied = data[0].AppliedJobs.map((job) => ({
      ...job,
      isApplied: true
    }));


    let appliedobj=[]
    AppliedJobsWithIsApplied.map((j) => {
      appliedobj.push({
        ...j._doc,
        isApplied:j.isApplied
      });
    });
    let obj = [];
    savedjobsWithIsApplied.map((j) => {
      obj.push({
        ...j._doc,
        isApplied:j.isApplied
      });
    });

    let realdt=data.map((dt)=>({
      ...dt,
      jjobs:obj,
      tempAppliedJobs:appliedobj
    }))

    let finalobj=realdt.map((r)=>{
      return (
        {
          ...r._doc,
          jobs:r.jjobs,
          AppliedJobs:r.tempAppliedJobs

        }
      )
    })
    sendSuccessResponse({
      res,
      data:finalobj,
    });
  } catch (err) {
    console.log("error ",err)
    sendFailResponse({
      res,
      message: err?.message,
    });
  }
};
