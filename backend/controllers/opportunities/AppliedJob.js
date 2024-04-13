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
    const confirmationMail = (username, session) => {
      const message = `
        <h3>New Applicant ${data.name}</h3>
        <h3>Bio: ${data?.bio}</h3>
        <h3>Skills: ${data?.skills.map((sk)=>sk)}</h3>
        <br>
        ${data.question.map((q)=>{
          return (
            `<p>${q.type=="Custom"?q.selectedQues:q.Question}</p>
            <p>Answer : ${q.selectedAns}</p>
            ${q?.idealAns ?`<p>Ideal Answer : ${q.idealAns}</p>`:`<p></p>`}
            `
          )
        })}
        Regards,<br>Mentorpoint App.</h3>
        <p>Contact No. ${data?.mno}</p>
        <p>
        <a href="mentorpoint://">Download</a>
        </p>
        <p>
        <a href=mentorpoint://>Download2</a>
        </p>
        <p>Open your <a href="mentorpoint://Login">profile</a></p>
        <p>Open your <a href="http://Login">profile2</a></p>
        <br>
        <img src="https://drive.google.com/uc?export=view&id=1q6aqxnQ_BMXjFC5O6FppM9OXzrZAJPp_" width="100px" height="100px"/>

        <script>
        var redirectToApp = function(){
          window.location.replace=${url}
        } 
         window.location = redirectToApp()
        </script>
    `;
      return message;
    };
    
    let mailOptions = {
      from: "Mentorpoint App <mentorpoint.in@gmail.com>",
      to: "legendyuvhraj@gmail.com",
      subject: "You Job Has a New Applicant",
      html: confirmationMail(),
    };

    // transporter.sendMail(mailOptions, function (err, data) {
    //   if (err) {
    //     console.log("Error " + err);
    //   } else {
    //     console.log("Email sent successfully");
    //   }
    // });
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