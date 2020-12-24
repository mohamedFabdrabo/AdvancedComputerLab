const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
//const acmem= require('./AcademicMemberModel.js').schema;//academic member

const slot=mongoose.Schema({
    course: {type:Schema.Types.ObjectId ,ref:"CO"},
    sid: number,
    day:String,
    timing:String,
    type:String,
   //timing: {enum : ['First','Second','Third','Fourth','Fifth']} ,
    //type: {enum : ['Lab','Tutorial','Lecture']} ,
   //timing by hour ???
    location:{type:Schema.Types.ObjectId ,ref:"location"},


});
module.exports=mongoose.model("slot",slot);
