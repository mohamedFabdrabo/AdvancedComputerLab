const mongoose=require('mongoose');
const locationModel = require('./location.js').schema;
const acmem= require('./AcademicMemberModel.js').schema;//academic member
const sl= require('./slot.js').schema;//academic member

const RE=mongoose.Schema({
    sender:{type:acmem,required:true},
    receiver:{type:[acmem],required:true},///?????????
    state:{enum : ['Pending','Accepted','Rejected','Cancelled']},
    type:{enum : ['Compensation','Replacement','Leave','Slot-linking','Change-Dayoff']},
    slot:sl,
    newDayoff:String,
    reason:String,
    requested_day:Date
});

module.exports=mongoose.model("RE",RE);
