const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
autoIncrement = require('mongoose-auto-increment');
 
//var connection = mongoose.createConnection("mongodb://localhost/myDatabase");
 
//autoIncrement.initialize(connection);

const slot = require('./slot.js').schema;
const AM=mongoose.Schema({
    name: String,
    gender:String,
    email:{type:String,required:true,unique:true,sparse:true},
    id:{type:String,required:true,unique:true,sparse:true},
    salary:Number,
    password:{type:String,required:true,minlength:5},
   officeLocation:{type:Schema.Types.ObjectId ,ref:"location"},
    attendanceRecord:{type:Schema.Types.ObjectId ,ref:"attendanceSchema"},    
    role: String,
    count1:Number,

    leaveBalance: Number,  
    dayoff:String,
    courses:[[{type:Schema.Types.ObjectId ,ref:"CO"}]],
    faculty:{type:String},
    department:{type:String},
    schedule:[slot],
    leaves:[{ day:Date,
        LeaveType:{enum : ['Accidental','Maternity','Annual','Compensation','Sick']}}]

 
});
//AM.plugin(autoIncrement, {inc_field: 'count1',startAt:1});

module.exports=mongoose.model("AM",AM);
