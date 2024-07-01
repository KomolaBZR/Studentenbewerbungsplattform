const DegreeCourse = require("./DegreeCourseModel");
const degreeCourseApplicationService = require("../degreeCourseApplication/DegreeCourseApplicationService"); 

// find degree courses
function findDegreeCourse(params, callback) {
    DegreeCourse.find(params, function (err, degreeCourses) {
        if (err) {
            console.log("Errors in degree course search " + err);
            return callback(err, null);
        } else {
            console.log("The search was well done.");
            return callback(null, degreeCourses);
        }
    });
}


// find degree course
function findDegreeCourseByID(dcID, callback) {
    if (dcID) {
        var query = DegreeCourse.findOne({ _id: dcID });
        query.exec(function (err, degreeCourse) {
            if (err) {
                console.log("Errors in degree course search " + err);
                return callback(err, null);
            } else {
                console.log("The search was well done.");
                return callback(null, degreeCourse);
            }
        });
    } else {
        console.log("Such degree course is not found or ID is incorrect.");
        callback("Such degree course is not found or ID is incorrect.", null);
    }
}

// find degree course applications by ID
function findDegreeCAs(dcID, callback) {
    if(dcID){
        var query = DegreeCourse.findOne({ _id: dcID });
        query.exec(function (err, degreeCourse) {
            if(degreeCourse){
                degreeCourseApplicationService.findDegreeCourseApplications({degreeCourseID: dcID},function(err,degreeCourseApplications){
                    if (err) {
                        console.log("Error by degree course applications search, " + err);
                        return callback("Error by degree course applications search.", null);
                    } else {
                        console.log("The search was well done.");
                        return callback(null, degreeCourseApplications);
                    }
                });
            }else{
                console.log("Error, such degree course apllication with this ID not found, " + err);
                return callback("Error, such degree course apllication with this ID " + dcID + " not found.", null);
            }
        });
    } else {
            console.log("Such degree course is not found or ID is incorrect.");
            callback("Such degree course is not found or ID is incorrect.", null);
    }
}



// create new degree course
function createDegreeCourse(params, callback) {
    if(params){
        findDegreeCourseByID(params._id, function(err,degreeCourse){
            if(degreeCourse){
                console.log("Degree Course already exists.");
                return callback("Degree Course already exists.", null);
            }else{
                var newDegreeCourse = new DegreeCourse(params);
                newDegreeCourse.save(function (err) {
                    if (err) {
                        console.log("Degree Course can not be saved: " + err);
                        callback("Degree Course can not be saved", null);
                    } else {
                         console.log("Degree Course has been saved.");
                        callback(null, newDegreeCourse);
                    }
                }); 
            }
        });
    } else {
        console.log("Bad Request.");
        callback("Bad Request.", null);
    }
}

// update degree course
function updateDegreeCourseByID(dcID, params, callback) {
    if(params){
        DegreeCourse.findOneAndUpdate( {_id: dcID}, params, function(err, degreeCourse){
            if(err){
                console.log("The changes could not be made.");
                callback("The changes could not be made.", null);
            } else {
                console.log("The changes have been saved successfully.");
                callback(null, degreeCourse);
            }
        });
    } else {
        console.log("No any changes are specified.");
        callback("No any changes are specified.", null);
    }
}

// delete degree course
function removeDegreeCourse(degreeCourseID, callback) {
    DegreeCourse.findByIdAndDelete({ _id: degreeCourseID }, function (err, degreeCourse) {
        if (degreeCourse) {
            console.log("Degree Course has been deleted.");
            callback(null, degreeCourse);
        } else {
            console.log("Degree Course has not be found.");
            callback("Degree Course has not be found.", null);
        }
    });
}

module.exports = {
    findDegreeCourse,
    findDegreeCourseByID,
    createDegreeCourse,
    updateDegreeCourseByID,
    removeDegreeCourse,
    findDegreeCAs
};