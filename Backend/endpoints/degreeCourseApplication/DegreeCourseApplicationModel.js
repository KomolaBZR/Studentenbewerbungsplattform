var mongoose = require('mongoose');

const DegreeCourseApplicationSchema = new mongoose.Schema({
    id: String,
    //id: { type: String, required: true },
    applicantUserID: { type: String, required: true },
    degreeCourseID: String, 
    targetPeriodYear: String,
    targetPeriodShortName: String
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


const DegreeCourseApplication = mongoose.model("DegreeCourseApplication", DegreeCourseApplicationSchema);

module.exports = DegreeCourseApplication;