var express = require('express');
var router = express.Router();

var UserService = require("./UserService");


//get users
router.get('/', function(req,res,next){
    console.log("We are in public users route");
    UserService.getUsers(req.query, function(err, result){
        
        if(result){
            console.log("Result: " + result);
            res.status(200).send(Object.values(result));
        }
        else{
            res.status(404).json({"Error" : err});
        }
    });
});

//get userById
router.get('/:userID', function(req,res,next){
    console.log("We are in public users route");
    UserService.findUserBy(req.params.userID,function(err, user){
        
        if(user){
            console.log("Result: " + user);
            res.status(200).send(user);
        }
        else{
            res.status(404).json({"Error" : err});
        }
    });
});


//post new users
router.post('/', function(req,res,next){
    console.log("We are in public users route");
    UserService.createNewUser(req.body,function(err, user){
        
        if(user){
            console.log("Result: " + user);
            res.status(201).send(user);
        }
        else{
            res.status(400).json({"Error" : err});
        }
    });
});

//put users
router.put('/:userID', function(req,res,next){
    console.log("We are in public users route");
    UserService.updateUserBy(req.params.userID, req.body,function(err, user){
        if(user)
        {
            console.log("Result: " + user);
            res.status(201).send(user);
        }
        else{
            res.status(400).json({"Error" : err});
        }
    });
});

//delete users
router.delete('/:userID', function(req,res,next){
    console.log("We are in public users route");
    UserService.removeUserBy(req.params.userID,function(err, user){
        if(user)
        {
            console.log("Result: " + user);
            res.status(204).send(user);
        }
        else{
            res.status(404).json({"Error" : "User with specified ID is not found."});
        }
    });
});

module.exports = router;