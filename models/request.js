const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
const RE=mongoose.Schema({
    id:{type:String,required:true,unique:true,sparse:true},

    sender:{type:{type:Schema.Types.ObjectId ,ref:"location"},required:true},
    receiver:[{type:{type:Schema.Types.ObjectId ,ref:"AM"},required:true}],
    state:{enum : ['Pending','Accepted','Rejected','Cancelled']},
    reason:String,
    type:{enum : ['Compensation','Replacement','Leave','Slot-linking','dayOffChange']}
    
});

module.exports=mongoose.model("RE",RE);
