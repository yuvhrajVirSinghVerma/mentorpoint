import confirmationMail from "./templates/bookingConfirmation.js";
import welcomeMail from "./templates/welcome.js";
import transporter from "./transport.js";

const sendInvitation = (mail) => {
  let mailOptions = {
    from: "Mentorpoint App <mentorpoint.in@gmail.com>",
    to: mail?.user_mail,
    subject: mail?.summary,
    html: confirmationMail(mail.username, {
      name: mail.summary,
      mentor: mail?.mentorname,
    }),
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};

export default sendInvitation;
