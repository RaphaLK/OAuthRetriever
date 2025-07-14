require('dotenv').config();

const { google } = require("googleapis");
const readline = require("readline")

const oAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT,
  process.env.OAUTH_SECRET,
  "urn:ietf:wg:oauth:2.0:oob"
);

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getAccessToken = () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this URL:", authUrl);

  rl.question("Enter the code from that page here: ", async (code) => {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log("Access Token:", tokens.access_token);
    console.log("Refresh Token:", tokens.refresh_token);
    rl.close();
  });
};

getAccessToken();