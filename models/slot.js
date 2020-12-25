const { number } = require('joi');
const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
//const acmem= require('./AcademicMemberModel.js').schema;//academic member
const counter = require('./counter');

const slot=mongoose.Schema({
    course: {type:Schema.Types.ObjectId ,ref:"CO"},
    sid: Number,
    day:String,
    timing:String,
    type:String,
    instructor:{type:Schema.Types.ObjectId ,ref:"AM"},
    //timing: {enum : ['First','Second','Third','Fourth','Fifth']} ,
    //type: {enum : ['Lab','Tutorial','Lecture']} ,
    //timing by hour ???
    location:{type:Schema.Types.ObjectId ,ref:"location"},
});

slot.pre('save', async function(next) {
    var doc = this;
    const c = await counter.findOneAndUpdate({name: "sid"},{$inc:{ seq: 1}});
    doc.sid = c.seq;
    next();
});

module.exports=mongoose.model("slot",slot);
