var mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    id: String,
    userID:{type: String, unique: true, required : true},
    firstName: {
        type: String,
        validate: {
            validator: function(fname) {
              return /^[a-zA-ZäöüÄÖÜß ]+$/.test(fname);
            },
            message: props => `${props.value} is not a valid first name!`
          }
    },

    lastName: {
        type: String,
        validate: {
            validator: function(lname) {
              return /^[a-zA-ZäöüÄÖÜß ]+$/.test(lname);
            },
            message: props => `${props.value} is not a valid last name!`
          }
    },
    password: String,
    isAdministrator:{type: Boolean, default:false}
}, { timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id;
        delete ret._id;
        // Ensure "id" appears before "userID" by reordering the properties
        const reorderedRet = { id: ret.id, ...ret };
        return reorderedRet;
      }
    }
});

    
UserSchema.methods.whoAmI = function(){
    var output = this.userID
        ? "My name is " + this.firstName +" "+ this.lastName
        : "I don't have a name";
    console.log(output);
};

UserSchema.pre('save', function(next){
    var user = this;
    console.log("Pre-save: " + this.password + "change: " + this.isModified('password'));
    if (!user.isModified('password')){
        return next();
    }
    bcryptjs.hash(user.password, 10).then((hashedPassword) => {
        user.password=hashedPassword;
        next();
    });
}, function(err){
    next(err);
});

UserSchema.methods.comparePassword = function (candidatePassword, next) {
    bcryptjs.compare(candidatePassword, this.password, function(err,isMatch){
        if(err){
            return next(err);
        }else{
            next(null, isMatch);
        }
    });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;