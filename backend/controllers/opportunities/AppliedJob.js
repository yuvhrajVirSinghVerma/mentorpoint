import opportunitiesSchema from "../../models/opportunities.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import createEventData from "../../events/createEventData.js";
import createEvent from "../../events/newevent.js";
import parseEvent from "../../events/eventparser.js";
import sendInvitation from "../../mails/mailer.js";
import usersSchema from "../../models/users.js";
import transporter from "../../mails/transport.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from 'fs'
import jwt from "jsonwebtoken";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("__dirname ",__dirname)
export const AppliedJobs=async(req,res)=>{
    // // console.log("ressss ",req.body.formData._parts)
    // let alldata=req.body.formData._parts[0][1]
    // let {data}=alldata
    // let file=alldata.file
    // const uploadPath = __dirname+`/resume/${file.name}`;
    // console.log("uploadPath ",uploadPath)
  
    let token=req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, "aekvbkevbelvewvvwugfuqvk");
    console.log("token ",token)

    let {data}=req.body
    let {id}=data
    console.log("body ",data)
    let url='mentorpoint://'
    console.log("confirmation applied job")
    const confirmationMail = (username, session) => {
      const message = `
      <div>
<h3>About Applicant</h3>
<div style="background-color:#2089dc;color:white;padding:10px">

        <h3>New Applicant ${data.name}</h3>
        <h4>ApplicantContact No. ${data?.mno}</h4>
        <h4>Bio: ${data?.bio}</h4>
        <h4>Skills: ${data?.skills.map((sk)=>sk)}</h4>
        </div>
        <br>
        <h2>Screening Questions</h2>
        <div style="border: 2px solid;
    overflow: scroll;
    max-height: 300px;padding:10px";>
        ${data.question.map((q)=>{
          return (
            `<div style="border-width:2px">
            <h4>${q.type=="Custom"?q.selectedQues:q.Question}</h4>
           ${q?.selectedAns ?`<p> Answer : ${q.selectedAns}</p>`:`<p></p>`}
            ${q?.idealAns ?`<p>Ideal Answer : ${q.idealAns}</p>`:`<p></p>
            </div>
            `}
            `
          )
        })}
        <br>
        </div>
        <div>
        <h4>Regards,<br>Mentorpoint App.</h4>
        </div>
        </div>
       
    `;
      return message;
    };
    
    let mailOptions = {
      from: "Mentorpoint App <mentorpoint.in@gmail.com>",
      to: "legendyuvhraj@gmail.com",
      subject: "You Job Has a New Applicant",
      html: confirmationMail(),
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
    const userdata = await usersSchema
        .findById({_id:decoded.user._id})
        .select("-password");
    userdata.AppliedJobs.push(id)
    await userdata.save()
    console.log("userdata ",userdata)
    sendSuccessResponse({
      res,
      data: {
        message:'Applied successfully'
      },
    });

}