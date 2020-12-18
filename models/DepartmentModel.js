const mongoose=require('mongoose');
const crs = require('./course.js');//courses
const dep = require('./DepartmentModel.js');
const memo=require('./AcademicMemberModel.js');
const DM=mongoose.Schema({
    name:{type:String,required:true,unique:true},
    HOD:{type:String},
    courses:[crs],
    academicmem:[memo]

});

module.exports=mongoose.model("DM","DM");
