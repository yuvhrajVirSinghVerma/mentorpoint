import { google } from "googleapis";

const CLIENT_ID = process.env.CLIENT_ID_DRIVE;
const CLIENT_SECRET = process.env.CLIENT_SECRET_DRIVE;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_DRIVE;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oAuth2Client,
});

export { drive };
