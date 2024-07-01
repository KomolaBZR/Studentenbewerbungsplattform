const DegreeCourseApplication = require("./DegreeCourseApplicationModel");
const DegreeCourse = require("../degreeCourse/DegreeCourseModel");
var userService = require("../user/UserService");

// find degree course applications
function findDegreeCourseApplications(params, callback) {
    DegreeCourseApplication.find(params, function (err, degreeCourseApplications) {
        if (err) {
            console.log("Errors in degree course application search " + err);
            return callback(err, null);
        } else {
            console.log("The search was well done.");
            return callback(null, degreeCourseApplications);
        }
    });
}

//find my application
function findMyApplications(myID,callback){
    if(myID){
        var query = DegreeCourseApplication.find({applicantUserID: myID});
        query.exec(function(err,degreeCourseApplications){
            if(err){
                console.log("Errors in degree course application search " + err);
                return callback(err, null);
            }else{
                console.log("The search was well done.");
            return callback(null, degreeCourseApplications);
            }
        });
    }else{
        console.log("No owerID is specified.");
        callback("No owerID is specified.",null);
    }
}

// find degree course application
function findDegreeCourseApplicationByID(dcaID, callback) {
    if (dcaID) {
        var query = DegreeCourseApplication.findOne({ _id: dcaID });
        query.exec(function (err, degreeCourseApplication) {
            if (err) {
                console.log("Errors in degree course application search " + err);
                return callback(err, null);
            } else {
                console.log("The search was well done.");
                return callback(null, degreeCourseApplication);
            }
        });
    } else {
        console.log("Such degree course application is not found or ID is incorrect.");
        callback("Such degree course application is not found or ID is incorrect.", null);
    }
}

// create new degree course application
function createDegreeCourseApplication(params, userID, callback) {
    if(userID){
        userService.findUserBy(userID,function(err,user){
            if(err){
                callback(err,null);
            }else{
                if(!params.degreeCourseID){
                    console.log("Such degree course ID is not found");
                    callback("Such degree course ID is not found",null);
                }else{
                    DegreeCourse.findOne({_id: params.degreeCourseID}, function (err,degreeCourse){
                        if(err){
                            console.log(`degree course with ID < ${params.degreeCourseID}> is not found`);
                            callback(`degree course with ID < ${params.degreeCourseID}> is not found`,null);
                        }else{
                            var newDegreeCourseApplication = new DegreeCourseApplication(params);
                            !params.applicantUserID ? newDegreeCourseApplication.applicantUserID = userID : newDegreeCourseApplication.applicantUserID = params.applicantUserID;;
                            
                            DegreeCourseApplication.findOne(
                                {
                                    applicantUserID: newDegreeCourseApplication.applicantUserID, 
                                    degreeCourseID: params.degreeCourseID
                                }, function (err, application){
                                    if(application){
                                        console.log("Application with the specified user and degree course already exist.");
                                        callback("Application with the specified user and degree course already exist.", null);
                                    } else {
                                        newDegreeCourseApplication.save(function(err){
                                            if(err){
                                                console.log("This degree course application can not be saved: " + err);
                                                callback("This degree course application can not be saved.",null);
                                            }else{
                                                console.log("The degree course application has been saved.");
                                                callback(null, newDegreeCourseApplication);
                                            }
                                        });
                                    }
                                });
                        }
                    });
                }
            }
        });
    } else {
        console.log("Bad Request."); //console.log("User ID is not specified.");
        callback("Bad Request.", null);//  callback("User ID is not specified.", null);
    }
}

// update degree course application 
function updateDegreeCourseApplicationByID(dcaID, user, params, callback) {
    if(params){
        DegreeCourseApplication.findOne({_id: dcaID}, function (err, degreeApp) {
            if(degreeApp){
                if (degreeApp.applicantUserID === user.userID || user.isAdministrator) {
                    params.degreeCourseID ? degreeApp.degreeCourseID = params.degreeCourseID : null;
                    params.targetPeriodYear ? degreeApp.targetPeriodYear = params.targetPeriodYear : null;
                    params.targetPeriodShortName ? degreeApp.targetPeriodShortName = params.targetPeriodShortName : null;

                    degreeApp.save(function (err, degreeApp) {
                        if (err) {
                            console.log("Degree Application could not be saved: " + err);
                            callback("Degree Application could not be saved.", null);
                        } else {
                            console.log("Degree Application was succefully changed.");
                            callback(null, degreeApp);
                        }
                    });
                } else {
                    console.log("The user is not authorized to change the application.");
                    callback("The user is not authorized to change the application.", null);
                }
            } else {
                console.log("Application with id " + dcaID + " is not found.");
                callback("Application with id " + dcaID + " is not found.", null);
            }
        });
    } else {
        console.log("No any changes are specified.");
        callback("No any changes are specified.", null);
    }
}


// delete degree course
function removeDegreeCourseApplication(dcaID, user, callback) {

        DegreeCourseApplication.findOne({_id: dcaID}, function (err, degreeApp) {
            if(degreeApp){
                if (degreeApp.applicantUserID === user.userID || user.isAdministrator) {

                    DegreeCourseApplication.findByIdAndDelete({ _id: dcaID }, function (err, degreeCourse) {
                        if (degreeCourse) {
                            console.log("Degree Course Application has been deleted.");
                            callback(null, degreeCourse);
                        } else {
                            console.log("Degree Course Application has not be found.");
                            callback("Degree Course Application has not be found.", null);
                        }
                    });
                } else {
                    console.log("The user is not authorized to delete the application.");
                    callback("The user is not authorized to delete the application.", null);
                }
            } else {
                console.log("Application with id " + dcaID + " is not found.");
                callback("Application with id " + dcaID + " is not found.", null);
            }
        });
}

module.exports = {
    findDegreeCourseApplications,
    findMyApplications,
    findDegreeCourseApplicationByID,
    createDegreeCourseApplication,
    updateDegreeCourseApplicationByID,
    removeDegreeCourseApplication
};