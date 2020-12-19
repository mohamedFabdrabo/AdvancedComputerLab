const mongoose=require('mongoose');
const crs = require('./course').schema;//courses
const dep = require('./DepartmentModel.js').schema;
const memo =require('./AcademicMemberModel.js').schema;
const DM=mongoose.Schema({
    name:{type:String,required:true,unique:true},
    HOD:{type:memo},
    courses:[crs],
    academicmem:[memo]

});

module.exports=mongoose.model("DM",DM);
