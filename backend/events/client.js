import { google } from "googleapis";

const { OAuth2 } = google.auth;


const OAuth2Client = new OAuth2(
  process.env.CLINET_ID,
  process.env.CLIENT_SECRET
);

OAuth2Client.setCredentials({
  refresh_token:process.env.REFRESH_TOKEN,
});

const calendar = google.calendar({
  version: "v3",
  auth: OAuth2Client,
});

export default calendar;
