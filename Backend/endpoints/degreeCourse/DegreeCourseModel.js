var mongoose = require('mongoose');

const DegreeCourseSchema = new mongoose.Schema({
  id: { type: String, alias: '_id' },
  //id: { type: String, required: true },
  name: String,
  shortName: String,
  universityName: String,
  universityShortName: String,
  departmentName:String,
  departmentShortName: String
}, { 
  timestamps: true, 
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


const DegreeCourse = mongoose.model("DegreeCourse", DegreeCourseSchema);

module.exports = DegreeCourse;