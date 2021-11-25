const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.authenticate = functions.https.onRequest((request, response) => {
  functions.logger.info("Token", request.headers.authorization)
  if (request.headers.authorization !== undefined) {
    response.redirect('/tabs/home?token=' + request.headers.authorization)
  } else {
    response.send('The authorization token is not found.')
  }
});

