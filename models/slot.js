const mongoose=require('mongoose');
const locationModel = require('./location.js');
const acmem= require('./AcademicMemberModel.js');//academic member

const slot=mongoose.Schema({
    //name: String,
    id: String,
    day:String,
    timing: {enum : ['First','Second','Third','Fourth','Fifth']} ,
    type: {enum : ['Lab','Tutorial']} ,
   //timing by hour ???
    location:locationModel,


});
module.exports=mongoose.model("slot",slot);
