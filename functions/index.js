const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { google } = require("googleapis");
const https = require("https");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//  CONFIGURAR
const PROJECT_ID = "bioforest-smart";
const SERVICE_ACCOUNT =
  "./bioforest-smart-firebase-adminsdk-tuekl-0af050abb9.json";
//  CONSTANTS
const MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
const SCOPES = [MESSAGING_SCOPE];
const HOST = "fcm.googleapis.com";
const PATH = "/v1/projects/" + PROJECT_ID + "/messages:send";

admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT),
  databaseURL: "https://bioforest-smart.firebaseio.com",
});

function getAccessToken() {
  return new Promise(function(resolve, reject) {
    const key = require(SERVICE_ACCOUNT);
    functions.logger.info("client_email: " + key.client_email);
    functions.logger.info("private_key: " + key.private_key);
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        functions.logger.error(err);
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

function sendFcmMessage(fcmMessage) {
  return new Promise((resolve, reject) => {
    getAccessToken().then(function(accessToken) {
      console.log("accessToken", accessToken);
      var options = {
        hostname: HOST,
        path: PATH,
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      var request = https.request(options, function(resp) {
        resp.setEncoding("utf8");
        resp.on("data", (data) => {
          resolve(JSON.parse(data));
        });
      });
      request.on("error", (err) => {
        reject(JSON.parse(err));
      });
      request.write(JSON.stringify(fcmMessage));
      request.end();
    });
  });
}

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  getAccessToken()
    .then((r) => {
      response.json({
        message: "Hello from Firebase!",
        access_token: r,
      });
    })
    .catch((error) => {
      response.json({
        message: "Error from Firebase!",
        error,
      });
    });
});

exports.send = functions.https.onRequest((request, response) => {
  const { token } = request.query;
  sendFcmMessage({
    message: {
      token,
      notification: {
        title: "Background Message Title",
        body: "Background message body",
      },
      webpush: {
        fcm_options: {
          link: "https://json.cl",
        },
        notification: {
          title: "Background Message Title",
          body: "Background message body",
          icon:
            "https://bioforest-smart.web.app/img/icons/android-chrome-512x512.png",
        },
      },
    },
  })
    .then((r) => {
      response.json({
        r,
      });
    })
    .catch((error) => {
      response.json({
        error,
      });
    });
});
