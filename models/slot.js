const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
//const acmem= require('./AcademicMemberModel.js').schema;//academic member

const slot=mongoose.Schema({
    course: {type:Schema.Types.ObjectId ,ref:"CO"},
    id: String,
    day:String,
    timing: {enum : ['First','Second','Third','Fourth','Fifth']} ,
    type: {enum : ['Lab','Tutorial']} ,
    location:{type:Schema.Types.ObjectId ,ref:"location"},
    course:String,
});
module.exports=mongoose.model("slot",slot);
