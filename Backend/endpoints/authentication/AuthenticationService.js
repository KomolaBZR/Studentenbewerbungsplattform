var userService = require('../user/UserService');
var jwt = require("jsonwebtoken");
var config = require("config");
var logger = require('../../config/winston');

// Token erstellen
function createSessionToken(user, callback){
    logger.debug("AuthenticationService: create Token.");

    if (!user) {
        logger.error("No user for Authentication token is specified.");
        callback("No user for Authentication token is specified.", null, null);
        return;
    } else {
        userService.authorizeUser(user, function (err, user) {
            if (err) {
                logger.error("Authentication has failed.");
                callback("Authentication has failed.", null, null);
                return;
            } else {
                var issuedAt = new Date().getTime();
                var expirationTime = config.get('session.timeout');
                var expiresAt = issuedAt + (expirationTime * 1000);
                var privateKey = config.get('session.tokenKey');
                let token = jwt.sign(
                    { 
                        "userID": user.userID,
                        "firstName": user.firstName,
                        "lastName": user.lastName,
                        "isAdministrator": user.isAdministrator 
                    }, 
                    privateKey, 
                    { 
                        expiresIn: expiresAt, 
                        algorithm: 'HS256' 
                    });

                logger.debug("Token was created: " + token);
                callback(null, token, user);
            }
        });
    }
}

module.exports = {
    createSessionToken    
};
