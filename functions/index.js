const functions = require("firebase-functions");
const axios = require('axios');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.authenticate = functions.https.onRequest((request, response) => {
    functions.logger.info("Token", request.headers.authorization)
    if (request.headers.authorization !== undefined) {
        axios.post('https://dcu-sitauth.mahidol.ac.th/auth/v1/sso/profile',
            {
                "token": request.headers.authorization,
                "clientId": "8fd61a82-ba20-4278-82b0-5b175b489189",
                "clientSecret": "x67IirZdDTCHp1pLor6mAdVT107qZ0Yv1mi8O6VB"
            })
            .then(res => {
                let data = res.data.data
                let params = new URLSearchParams(data)
                response.redirect('/tabs/home?' + params.toString())
            })
            .catch(e => {
                if (e.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    functions.logger.error("Response", e.response)
                } else if (e.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    functions.logger.error("Request", e.request.status)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    functions.logger.error("Error Message", e.message)
                }
            })
    } else {
        response.send('The authorization token is not found.')
    }
});

