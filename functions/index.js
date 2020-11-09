const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { google } = require("googleapis");
const https = require("https");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//  CONFIGURAR
const MIN_TEMPERATURE = 25;
const MAX_TEMPERATURE = 30;
const PROJECT_ID = "bioforest-smart";
const SERVICE_ACCOUNT =
  "./bioforest-smart-firebase-adminsdk-tuekl-0af050abb9.json";
//  CONSTANTS
const MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
const SCOPES = [MESSAGING_SCOPE];
const HOST = "fcm.googleapis.com";
const PATH = "/v1/projects/" + PROJECT_ID + "/messages:send";

const app = admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT),
  databaseURL: "https://bioforest-smart.firebaseio.com",
});

function getAccessToken() {
  return new Promise(function(resolve, reject) {
    const key = require(SERVICE_ACCOUNT);
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

exports.onChangeTemperature = functions.database
  .ref("/{salaId}/temperature")
  .onUpdate(async (change, context) => {
    const beforeValue = change.before.val();
    const afterValue = change.after.val();
    const { salaId } = context.params;

    functions.logger.info(
      `[${salaId}] BEFORE: ${beforeValue}ºC, AFTER: ${afterValue}ºC`
    );
    if (afterValue > MIN_TEMPERATURE && afterValue < MAX_TEMPERATURE) {
      let temperature = afterValue.toFixed(2);
      functions.logger.info(`TEMP: ${temperature}ºC`);
      await app
        .database()
        .ref(`/${salaId}/name`)
        .once("value")
        .then(async (snapshot) => {
          let roomName = snapshot.val();

          functions.logger.info(`ROOM: ${roomName}`);
          let userDocs = await app
            .firestore()
            .collection("users")
            .get();

          functions.logger.info(`Users: ${userDocs.size}`);

          userDocs.docs.forEach(async (doc) => {
            try {
              let tokenDocs = await doc.ref.collection("tokens").get();

              functions.logger.info(`Tokens ${doc.id}: ${tokenDocs.size}`);
              tokenDocs.docs.forEach(async (snap) => {
                const { token } = snap.data();
                functions.logger.info("send push to " + doc.id);
                try {
                  await sendFcmMessage({
                    message: {
                      token,
                      notification: {
                        title: `Temperatura fuera de rango`,
                        body: `${temperature}ºC - ${roomName}`,
                      },
                      webpush: {
                        fcm_options: {
                          link: `https://${PROJECT_ID}.web.app/`,
                        },
                        notification: {
                          title: `Temperatura fuera de rango`,
                          body: `${temperature}ºC - ${roomName}`,
                          icon: `https://${PROJECT_ID}.web.app/img/icons/android-chrome-512x512.png`,
                        },
                      },
                    },
                  });
                } catch (error) {
                  functions.logger.error("TODO: Remove token " + error.message);
                }
              });
            } catch (error) {
              functions.logger.error("Tokens error " + error.message);
            }
          });
        });
    }
    return null;
  });
