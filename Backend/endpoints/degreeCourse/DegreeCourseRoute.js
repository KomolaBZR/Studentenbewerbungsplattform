
var express = require('express');

var router = express.Router();

var degreeCourseService = require("../degreeCourse/DegreeCourseService");
var authenticationUtils = require("../utils/AuthenticationUtils");


// find all degree courses
router.get('/', function(req, res, next){
    console.log("We are in degree course route.");
    degreeCourseService.findDegreeCourse(req.query, function(err, result){
        if(err){
            res.status(404).json({ "Error": err });
        } else {
            res.send(result);
        }
    });
});


// find degree course by ID
router.get('/:_id', function(req, res, next){
    const { _id } = req.params;
    degreeCourseService.findDegreeCourseByID(_id, function(err, degreeCourse){
        if(err){
            res.status(404).json({ "Error": err });
        } else {
            res.status(200).send(degreeCourse);
        }
    });
});

// find all applications of a degreeCourse by its ID
router.get('/:_id/degreeCourseApplications', function (req, res, next) {
    const { _id } = req.params;
    degreeCourseService.findDegreeCAs(_id, function (err, result) {
        if (err) {
            res.status(404).json({ "Fehler": err });
        } else {
            res.status(200).send(result);
        }
    });
});

// create new degree course
router.post('/', authenticationUtils.isAuthenticated, function(req, res, next){
    if (req.user && req.user.isAdministrator) {
        degreeCourseService.createDegreeCourse(req.body, function(err, degreeCourse){
            if(err){
                res.status(400).json( {"Error": err} );
            } else {
                console.log("A new degree course has been created.");
                res.status(201).send(degreeCourse);
            }
        });
    }else {
        console.log("Prohibited for unauthorized users.");
        res.status(401).json( {"Error" : "User is not authorized!"} );
    }
});

// update degree course
router.put('/:_id', authenticationUtils.isAuthenticated,  function(req, res, next){
    const { _id } = req.params;
    if (req.user && req.user.isAdministrator) {
        degreeCourseService.updateDegreeCourseByID(_id, req.body, function (err, degreeCourse) {
            if(degreeCourse){
                res.status(200).send(degreeCourse);
            } else {
                res.status(500).json({ "Error": err });
            }
        });
    }else {
        console.log("Prohibited for unauthorized users.");
        res.status(401).json( {"Error" : "User is not authorized!"} );
    }
});

// delete degree course
router.delete('/:_id', authenticationUtils.isAuthenticated, function(req, res, next){
    const { _id } = req.params;
    if (req.user && req.user.isAdministrator) {
        degreeCourseService.removeDegreeCourse(_id, function(err, degreeCourse){
            if(degreeCourse){
                res.status(204).send(degreeCourse);
            } else {
                res.status(404).send({ "Error": err });
            }
        });
    } else {
        console.log("Prohibited for unauthorized users.");
        res.status(401).json( {"Error" : "User is not authorized!"} );
    }
});

module.exports = router;