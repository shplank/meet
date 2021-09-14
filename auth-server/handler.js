const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");
/**
 * SCOPES sets access levels; this is set to readonly.
 */
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
/**
 * Credentials are those values required to get access to your calendar.
 */
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://shplank.github.io/meet/"],
  javascript_origins: ["https://shplank.github.io", "http://localhost:3000"],
};

const { client_secret, client_id, redirect_uris, calendar_id } = credentials;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

/**
 * Generate a URL so users can log in with Google and be authorized to see your calendar.
 * After logging in, they’ll receive a code as a URL parameter.
 */
module.exports.getAuthURL = async () => {
  /**
   * Scopes array passed to the `scope` option. Any scopes passed must be enabled in the
   * "OAuth consent screen" settings in your project on your Google Console.
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  // start with OAuth client values
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  // decode auth code
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    // swap auth code for token
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
  .then((token) => {
    // respond with OAuth token with callback
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(token),
    };
  })
  .catch((err) => {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(err),
    };
  });
};

module.exports.getCalendarEvents = async (event) => {
  // start with OAuth client values
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
    calendar_id
  );
  // get access token
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    // get list of events from google
    calendar.events.list(
      {
        calendarId: calendar_id,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
  .then((results) => {
    // respond with events
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ events: results.data.items })
    };
  })
  .catch((err) => {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(err),
    };
  });
};
