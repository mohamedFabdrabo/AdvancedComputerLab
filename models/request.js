const mongoose=require('mongoose');
const locationModel = require('./location.js').schema;
const acmem= require('./AcademicMemberModel.js').schema;//academic member
//const sl= require('./slot.js').schema;//academic member

const RE=mongoose.Schema({
    id:{type:String,required:true,unique:true},

    sender:{type:String,required:true},
    receiver:{type:[String],required:true},///?????????
    state:{enum : ['Pending','Accepted','Rejected','Cancelled']},
    reason:String,
    type:{enum : ['Compensation','Replacement','Leave','Slot-linking','']}





    
});

module.exports=mongoose.model("RE",RE);
