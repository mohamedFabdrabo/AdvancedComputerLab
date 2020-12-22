const mongoose=require('mongoose');
const locationModel = require('./location.js').schema;
const acmem= require('./AcademicMemberModel.js').schema;//academic member
const sl= require('./slot.js').schema;//academic member

const Schema   = mongoose.Schema ;
const RE=mongoose.Schema({
    id:{type:String,required:true,unique:true,sparse:true},
    sender:{type:{type:Schema.Types.ObjectId ,ref:"location"}},
    receiver:[{type:{type:Schema.Types.ObjectId ,ref:"AM"}}],
    state:{enum : ['Pending','Accepted','Rejected','Cancelled']},
    type:{enum : ['Compensation','Replacement','Leave','Slot-linking','Change-Dayoff']},
    slot:sl,
    newDayoff:String,
    reason:String,
    requested_day:Date
});

module.exports=mongoose.model("RE",RE);
