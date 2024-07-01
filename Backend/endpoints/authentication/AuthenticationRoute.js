var express = require('express');
var router = express.Router();
var logger = require('../../config/winston');

var authenticationService = require("./AuthenticationService");

// Token erstellen und im Header zurückgeben
router.get('/', function (req, res, next) {

    logger.debug('Create Authentication Token.');
    
    if (req.headers.authorization && req.headers.authorization.indexOf('Basic') !== -1) {
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [userID, password] = credentials.split(':');

        const user = { userID, password };
        authenticationService.createSessionToken(user, function (err, token, user) {
            if (token) {
                res.header("Authorization", "Bearer " + token);

                if (user) {
                    logger.debug("Token was created successfully.");
                    res.status(200).json({ "Success": "Token was created successfully." });
                } else {
                    logger.debug("User is null, but token was created successfully. Error: " + err);
                    res.status(200).json({ "Success": "User is null, but token was created successfully." });
                }

            } else {
                logger.error("Token wasn't created. Error: " + err);
                res.status(401).json({ "Error": "Token wasn't created."});
            }
        });
    } else {
        logger.error("The authorization header is missing.");
        res.status(401).json({ "Error": "The authorization header is missing." });
    }
});

module.exports = router;