var express = require('express');

var router = express.Router();

var degreeCourseApplicationService = require("../degreeCourseApplication/DegreeCourseApplicationService");
var authenticationUtils = require("../utils/AuthenticationUtils");


// find all degree course applications
router.get('/', function(req, res, next){
    console.log("We are in degree course application route.");
    degreeCourseApplicationService.findDegreeCourseApplications(req.query, function(err, result){
        if(err){
            res.status(404).json({ "Error": err });
        } else {
            res.send(result);
        }
    });
});

// find my applications
router.get('/myApplications', authenticationUtils.isAuthenticated, function (req, res, next) {
    degreeCourseApplicationService.findMyApplications(req.user.userID, function (err, result) {
        console.log("We are in degree course application route.");
        if (err) {
            res.status(404).json({ "Error": err });
        } else {
            res.send(result);
        }
    });
});

// find degree course application by ID
router.get('/:_id', function(req, res, next){
    const { _id } = req.params;
    degreeCourseApplicationService.findDegreeCourseApplicationByID(_id, function(err, degreeCourseApplication){
        if(err){
            res.status(404).json({ "Error": err });
        } else {
            res.status(200).send(degreeCourseApplication);
        }
    });
});

// create new degree course application
router.post('/', authenticationUtils.isAuthenticated, function(req, res, next){
    if (req.user) {
        degreeCourseApplicationService.createDegreeCourseApplication(req.body, req.user.userID, function(err, degreeCourseApplication){
            if(err){
                res.status(400).json( {"Error": err} );
            } else {
                console.log("A new degree course application has been created.");
                res.status(201).send(degreeCourseApplication);
            }
        });
    }else {
        console.log("Prohibited for unauthorized users.");
        res.status(401).json( {"Error" : "User is not authorized!"} );
    }
});

// update degree course application
router.put('/:_id', authenticationUtils.isAuthenticated,  function(req, res, next){
    const { _id } = req.params;
    if (req.user) {
        degreeCourseApplicationService.updateDegreeCourseApplicationByID(_id, req.user, req.body, function (err, degreeCourseApplication) {
            if(degreeCourseApplication){
                res.status(200).send(degreeCourseApplication);
            } else {
                if(err === "The user is not authorized to change the application."){
                    res.status(401).json( {"Error" : "User is not authorized!"} );
                } else {
                    res.status(400).json({ "Error": err });
                }
            }
        });
    }else {
        console.log("Prohibited for unauthorized users.");
        res.status(401).json( {"Error" : "User is not authorized!"} );
    }
});


// delete degree course application
router.delete('/:_id', authenticationUtils.isAuthenticated, function(req, res, next){
    const { _id } = req.params;

    if (req.user) {
        degreeCourseApplicationService.removeDegreeCourseApplication(_id, req.user,function(err, degreeCourseApplication){
            if(degreeCourseApplication){
                res.status(204).send(degreeCourseApplication);
            } else {
                if(err === "The user is not authorized to change the application."){
                    res.status(401).json( {"Error" : "User is not authorized!"} );
                } else {
                    res.status(404).json({ "Error": err });
                }
            }
        });
    } else {
        console.log("Prohibited for unauthorized users.");
        res.status(401).json( {"Error" : "User is not authorized!"} );
    }
});

module.exports = router;