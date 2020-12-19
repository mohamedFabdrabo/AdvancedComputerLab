const mongoose=require('mongoose');
const locationModel = require('./location.js').schema;
const attendanceSchema = require('./AttendanceRecords.js').schema;
const slot = require('./slot.js').schema;
const AM=mongoose.Schema({
    name: String,
    gender:String,
    email:{type:String,required:true,unique:true,sparse:true},
    id:{type:String,required:true,unique:true,sparse:true},
    salary:Number,
    password:{type:String,required:true,minlength:5},
    officeLocation:locationModel,
    attendanceRecord:attendanceSchema,    
    role: String,
    leaveBalance: Number,  
    dayoff:String,
    courses:[String],
    faculty:{type:String},
    department:{type:String},
    schedule:[slot],
    leaves:[{ day:Date,
        LeaveType:{enum : ['Accidental','Maternity','Annual','Compensation','Sick']}}]
 
});

module.exports=mongoose.model("AM",AM);
