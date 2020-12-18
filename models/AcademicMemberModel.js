const mongoose=require('mongoose');
const locationModel = require('./location.js');
const crs = require('./course.js');//courses
const dep = require('./DepartmentModel.js');
const fac = require('./facultyModel.js');

const AM=mongoose.Schema({
    name: String,
    gender:String,
    email:{type:String,required:true,unique:true},
    id:{type:String,required:true,unique:true},
    salary:Number,
    password:{type:String,required:true,minlength:5},
    officeLocation:locationModel,
    attendanceRecord:[String],  //??????????  
    role: String,
    leaves:[String],  //??????????  
    dayoff:String,
    courses:[crs],
    faculty:fac,
    department:dep,
    schedule:[slot]
 
});

module.exports=mongoose.model("AM",AM);
