const functions = require("firebase-functions");
const admin = require("firebase-admin");

//  CONFIGURAR
const MIN_TEMPERATURE = 19;
const MAX_TEMPERATURE = 30;
const PROJECT_ID = "bioforest-smart";

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://bioforest-smart.firebaseio.com",
});

function sendFcmMessage(fcmMessage) {
  functions.logger.info(`messaging push`);
  return admin.messaging().sendMulticast(fcmMessage);
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
    if (afterValue < MIN_TEMPERATURE && afterValue > MAX_TEMPERATURE) {
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
            .listDocuments();

          functions.logger.info(`Users: ${userDocs.length}`);
          let tokens = [];
          await Promise.all(
            userDocs.map(async (doc) => {
              try {
                let tokenDocs = await doc.collection("tokens").get();
                functions.logger.info(`Tokens ${doc.id}: ${tokenDocs.size}`);
                tokenDocs.docs.forEach(async (snap) => {
                  const { token } = snap.data();
                  tokens.push(token);
                });
              } catch (error) {
                functions.logger.error("Tokens error " + error.message);
              }
              return doc;
            })
          );
          functions.logger.info("send push to " + tokens.length);
          try {
            let response = await sendFcmMessage({
              tokens,
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
            });

            if (response.failureCount > 0) {
              const failedTokens = [];
              response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                  failedTokens.push(tokens[idx]);
                }
              });
              console.log(
                "List of tokens that caused failures: " + failedTokens
              );
            }
          } catch (error) {
            functions.logger.error("TODO: Remove token " + error.message);
          }
        });
    }
    return null;
  });


  // Humidity

exports.onChangeHumidity = functions.database.ref("/{salaId}/humidity")
.onUpdate(async (change, context) => {
  const beforeValue = change.before.val();
  const afterValue = change.after.val();
  const { salaId } = context.params;

  functions.logger.info(
    `[${salaId}] BEFORE: ${beforeValue}%, AFTER: ${afterValue}%`
  );
  if (afterValue < 50) {
    let humidity = afterValue.toFixed(2);
    functions.logger.info(`TEMP: ${humidity}%`);
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
          .listDocuments();

        functions.logger.info(`Users: ${userDocs.length}`);
        let tokens = [];
        await Promise.all(
          userDocs.map(async (doc) => {
            try {
              let tokenDocs = await doc.collection("tokens").get();
              functions.logger.info(`Tokens ${doc.id}: ${tokenDocs.size}`);
              tokenDocs.docs.forEach(async (snap) => {
                const { token } = snap.data();
                tokens.push(token);
              });
            } catch (error) {
              functions.logger.error("Tokens error " + error.message);
            }
            return doc;
          })
        );
        functions.logger.info("send push to " + tokens.length);
        try {
          let response = await sendFcmMessage({
            tokens,
            notification: {
              title: `Humedad fuera de rango`,
              body: `${humidity}% - ${roomName}`,
            },
            webpush: {
              fcm_options: {
                link: `https://${PROJECT_ID}.web.app/`,
              },
              notification: {
                title: `Humedad fuera de rango`,
                body: `${humidity}% - ${roomName}`,
                icon: `https://${PROJECT_ID}.web.app/img/icons/android-chrome-512x512.png`,
              },
            },
          });

          if (response.failureCount > 0) {
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
              if (!resp.success) {
                failedTokens.push(tokens[idx]);
              }
            });
            console.log(
              "List of tokens that caused failures: " + failedTokens
            );
          }
        } catch (error) {
          functions.logger.error("TODO: Remove token " + error.message);
        }
      });
  }
  return null;
});
