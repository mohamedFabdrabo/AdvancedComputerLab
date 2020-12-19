const mongoose=require('mongoose');
const locationModel = require('./location.js');
const acmem= require('./AcademicMemberModel.js');//academic member

const slot=mongoose.Schema({
    name: String,
    day:String,
    slots: {enum : ['First','Second','Third','Fourth','Fifth']} ,
    type: {enum : ['Lab','Tutorial']} ,
//timing ???
    location:locationModel,


});
module.exports=mongoose.model("slot",slot);
