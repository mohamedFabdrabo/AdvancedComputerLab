const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
const locationModel = require('./location.js').schema;
const HR=mongoose.Schema({
    name: String,
    email:{type:String,required:true,unique:true,sparse:true},
    id:{type:String,required:true,unique:true,sparse:true},
    salary:Number,
    leaveBalance: Number,
    gender:String,
    password:{type:String,required:true,minlength:5},
    officeLocation:{type:Schema.Types.ObjectId ,ref:"location"},
    attendanceRecord:{type:Schema.Types.ObjectId ,ref:"attendanceSchema"},   
});
module.exports=mongoose.model("HR",HR);

/*const leaves = mongoose.Schema({
    time : {type : Date},
    signIn : {type : Boolean}
});*/
/*leaves:[{ day:Date,
    LeaveType:{enum : ['Accidental','Maternity','Annual','Compensation','Sick']}}]*/