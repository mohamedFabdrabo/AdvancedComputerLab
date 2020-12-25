const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;

const slot = require('./slot.js').schema;
const AM=mongoose.Schema({
    name: String,
    gender:String,
    email:{type:String,required:true,unique:true,sparse:true},
    member_id:{type:String,required:true,unique:true,sparse:true},
    salary:Number,
    password:{type:String,required:true,minlength:5},
   officeLocation:{type:Schema.Types.ObjectId ,ref:"location"},
    attendanceRecord:{type:Schema.Types.ObjectId ,ref:"attendanceSchema"},    
    role: String,
    leaveBalance: Number,  
    dayoff:String,
    courses:[{type:Schema.Types.ObjectId ,ref:"CO"}],
    faculty:{type:String},
    department:{type:String},
    schedule:[slot],
    leaves:[{ day:Date,
        LeaveType:{enum : ['Accidental','Maternity','Annual','Compensation','Sick']}}],
    accidental:{type:Number,default:6}
 
});

module.exports=mongoose.model("AM",AM);
