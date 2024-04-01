import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "legendyuvhraj@gmail.com",
    // pass: process.env.MAIL_PASSWORD,
    clientId: process.env.CLINET_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

export default transporter;
