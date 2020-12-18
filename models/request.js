const mongoose=require('mongoose');
const locationModel = require('./location.js');
const acmem= require('./AcademicMemberModel.js');//academic member
const sl= require('./slot.js');//academic member


const RE=mongoose.Schema({
    id:{type:String,required:true,unique:true},

    sender:{type:String,required:true},
    reciever:{type:[String],required:true},///?????????
    state:{enum : ['Pending','Accepted','Rejected','Cancelled']},
    reason:String,
    type:{enum : ['Compensation','Replacement','Leave','Slot-linking','']}





    
});

module.exports=mongoose.model("RE",RE);
