const User = require("./UserModel");

//get users (Read)
function getUsers(queryParameters, callback) {
    console.log("User Server: find all users, query: " + queryParameters);
    User.find(queryParameters, function (err, users) {
        if (err) {
            console.log("Search failed: " + err);
            return callback(err, null);
        } else {
            console.log("All goes well. A number of users is " + users.length);
            if (users.length === 0) {
                console.log("There is no users. Create an admin");
                // Create the admin user
                var adminUser = new User();
                adminUser.userID = "admin";
                adminUser.password = "123";
                adminUser.firstName = "DefaultAdministrator";
                adminUser.lastName = "Account";
                adminUser.isAdministrator = true;
    
                adminUser.save(function (err) {
                    if (err) {
                        console.log("Administrator was not created: " + err);
                        callback("Administrator was not created.", null);
                    } else {
                        console.log("Administrator was created and saved.");
                        callback(null, users);
                    }
                });
            } else {
                // Process the retrieved users
                console.log("Users are found");
                callback(null, users);
            }
        }
    });
}

//get userByID (Read)
function findUserBy(searchUserID, callback) {
    console.log("UserService: find User by ID: " + searchUserID);

    if (!searchUserID) {
        callback("UserID is missing", null);
        return;
    } else {
        var query = User.findOne({
            userID: searchUserID
        });
        query.exec(function (err, user) {
            if (user) {
                console.log(`Found userID: ${searchUserID}`);
                callback(null, user);
            } else {
                console.log(`Did not find user for userID:  ${searchUserID}`);
                return callback(`Did not find user for userID:  ${searchUserID}`, null);
            }
        });
    }
}

// post new user (Create)
function createNewUser(newUser, callback) {
    console.log("UserService: create new user: " + newUser);

    if (!newUser) {
        callback("User is missing", null);
        return;
    } else {
        var query = User.findOne({
            userID: newUser.userID
        });
        query.exec(function (err, user) {
            if (user) {
                console.log("User " + newUser.userID + " is already created.");
                return callback("User " + newUser.userID + " is already created.", null);
            } else {
                var userToCreate = new User(newUser);
                userToCreate.save(function (err) {
                    if (err) {
                        console.log("User could not be saved: " + err);
                        callback("User could not be saved.", null);
                    } else {
                        console.log("User was succefully saved.");
                        callback(null, userToCreate);
                    }
                });

            }
        });
    }
}



// put user (Update)
function updateUserBy(userByID, userToUpgrade, callback) {
    console.log("UserService: upgrade user: " + userByID);

    if (!userByID) {
        callback("UserID is missing", null);
        return;
    } else {
        var query = User.findOne({
            userID: userByID
        });
        query.exec(function (err, user) {
            if (user) {
                if (userToUpgrade.firstName && user.firstName) {
                    user.firstName = userToUpgrade.firstName;
                }
                if (userToUpgrade.lastName && user.lastName) {
                    user.lastName = userToUpgrade.lastName;
                }
                if (userToUpgrade.password && user.password) {
                    user.password = userToUpgrade.password;
                }
                if (user.isAdministrator === true && userToUpgrade.isAdministrator) {
                    user.isAdministrator = userToUpgrade.isAdministrator;
                }

                user.save(function (err, user) {
                    if (err) {
                        console.log("User could not be saved: " + err);
                        callback("User could not be saved.", null);
                    } else {
                        console.log("User was succefully changed.");
                        callback(null, user);
                    }
                });

            } else {
                console.log("User with specified ID is not found.");
                return callback("User with specified ID is not found.", null);

            }
        });
    }
}

// delete user (Delete)
function removeUserBy(userIDToDelete, callback) {
    console.log("UserService: delete user: " + userIDToDelete);

    if (!userIDToDelete) {
        callback("UserID is missing", null);
        return;
    } else {
        var query = User.findOneAndDelete({
            userID: userIDToDelete
        });
        query.exec(function (err, user) {
            if (err) {
                console.log("User with specified ID is not found.");
                return callback("User with specified ID is not found.", null);
            } else {
                console.log("User " + userIDToDelete + " is deleted.");
                return callback(null, user);
            }
        });
    }
}


//user's authorisation 
function authorizeUser(props, callback) {
    const query = User.findOne({
        userID: props.userID
    });
    query.exec(function (err, user) {
        if (user) {
            user.comparePassword(props.password, function (err, isMatch) {
                if (err) {
                    console.log("Password or UserId is invalid.");
                    callback(err, null);
                } else {
                    if (isMatch) {
                        console.log("Password is correct.");
                        callback(null, user);
                    } else {
                        console.log("Password is incorrect");
                        callback("Authorisation has failed: password is incorrect.", null);
                    }
                }
            });
        } else {
            console.log(`User with userID < ${props.userID} > is not found`);
            callback(`User with userID < ${props.userID} > is not found`, null);
        }
    });
}



module.exports = {
    getUsers,
    findUserBy,
    createNewUser,
    updateUserBy,
    removeUserBy,
    authorizeUser
};