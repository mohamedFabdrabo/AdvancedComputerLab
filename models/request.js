const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
//enum states = {Pending,Accepted,Rejecte,Cancelled}

const RE=mongoose.Schema({
    rid:{type:Number,unique:true,sparse:true},
    sender:String,//{type:{type:Schema.Types.ObjectId ,ref:"AM"}},
    receiver:[{type:{type:Schema.Types.ObjectId ,ref:"AM"}}],
    //state:{enum : ['Pending','Accepted','Rejected','Cancelled']},
    state:String,
    senderComment:String,
    recieverComment:String,
    senderDep:String,
    slot:{type:Schema.Types.ObjectId ,ref:"slot"},
    newDayoff:String,
    requested_day:Date,
    type:String
    //type:{enum : ['Compensation','Replacement','Annual','Slot-linking','dayOffChange','Sick','Maternity','Accidental']}
    
});
RE.pre('save', async function(next) {
    var doc = this;
    const c = await counter.findOneAndUpdate({name: "rid"},{$inc:{ seq: 1}});
    doc.rid = c.seq;
    next();
});

module.exports=mongoose.model("RE",RE);
