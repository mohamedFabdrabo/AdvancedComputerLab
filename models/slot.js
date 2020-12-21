const mongoose=require('mongoose');
const locationSchema = require('./location.js').schema;
//const acmem= require('./AcademicMemberModel.js').schema;//academic member

const slot=mongoose.Schema({
    day:String,
    timing: {enum : ['First','Second','Third','Fourth','Fifth']} ,
    type: {enum : ['Lab','Tutorial']} ,
   //timing by hour ???
    course:String,
    location:locationSchema,


});
module.exports=mongoose.model("slot",slot);
