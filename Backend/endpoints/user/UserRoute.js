var express = require('express');
var router = express.Router();
var jsonParser = express.json();

var UserService = require("./UserService");
var authenticationUtils = require("../utils/AuthenticationUtils");

//find users
router.get('/', authenticationUtils.isAuthenticated,function(req,res,next){
    if (req.user && req.user.isAdministrator) {
        console.log("We are in users route: " + req.query);
        UserService.getUsers(req.query, function (err, result) {
            if (err) {
                res.status(404).json({ "Error": err });
            } else {
                const users = result.map(user => {
                const { id, userID, firstName, lastName, isAdministrator, ...partialObject } = user;
                return { userID, firstName, lastName,  isAdministrator };
                });
                console.log("Result: " + users);
                res.send(users);
            }
        });
    } else {
        console.log("Prohibited for unauthorized users.");
        res.status(401).json( {"Error" : "User is not authorized!"} );
    }
});

// Find user by id
router.get('/:userID', authenticationUtils.isAuthenticated, function (req, res, next) {
    var searchedUserID = req.params.userID;
    if (req.user && req.user.isAdministrator) {
        
        console.log("We are in users route.");
        UserService.findUserBy(searchedUserID, function (err, user) {
            if (err) {
                res.status(404).json({ "Error": err });
            } else {
                console.log("User has been found: " + user);
                const { id, userID, firstName, lastName, isAdministrator, ...partialObject } = user;
                const newUser =  { userID, firstName, lastName,  isAdministrator };               
                res.status(200).send(newUser);
            }
        });
    } else {
        console.log("Prohibited for unauthorized users.");
        res.status(401).json( {"Error" : "User is not authorized!"} );
    }
});


// Create new user
router.post('/', authenticationUtils.isAuthenticated, function (req, res, next) {
    if (req.user && req.user.isAdministrator) {
        console.log("We are in users route.");
        UserService.createNewUser(req.body, function (err, user) {
            if (err) {
                res.status(400).json({ "Error": err });
            } else {
                console.log("User has been created and successfully saved!");
                const { id, userID, firstName, lastName, isAdministrator, ...partialObject } = user;
                const newUser =  { userID, firstName, lastName, isAdministrator };               
                res.status(201).send(newUser);
            }
        });
    } else {
        console.log("Prohibited for unauthorized users.");
        res.status(401).json( {"Error" : "User is not authorized!"} );
    }
 });


// Update user 
router.put('/:userID', authenticationUtils.isAuthenticated, function (req, res, next) {
    if (req.user && req.user.isAdministrator) {
        console.log("We are in users route.");
        UserService.updateUserBy(req.params.userID, req.body, function (err, user) {
            if (err) {
                res.status(400).json({ "Error": err });
            } else {
                console.log("The changes were carried out successfully.");
                const { id, userID, firstName, lastName, isAdministrator, ...partialObject } = user;
                const newUser = { userID, firstName, lastName, isAdministrator };
                res.status(200).send(newUser);
            }
        });
    } else {
        console.log("Prohibited for unauthorized users.");
        res.status(401).json({ "Error": "User is not authorized!" });
    }
});


 
 // Delete user
 router.delete('/:userID', authenticationUtils.isAuthenticated, function (req, res, next) {
    console.log("We are in users route.");
    const { userID } = req.params;
    if (req.user && req.user.isAdministrator) {
        UserService.removeUserBy(userID, function (err, user) {
            if (user) {
                const { id, userID, firstName, lastName, isAdministrator, ...partialObject } = user;
                const newUser = { userID, firstName, lastName, isAdministrator };
                res.status(204).send(newUser);
            } else {
                res.status(404).send({ "Error": "User was not deleted" });
            }
        });
    } else {
        console.log("Prohibited for unauthorized users.");
        res.status(401).json({ "Error": "User for the operation is not authorized!" });
    }
});
 
 module.exports = router;