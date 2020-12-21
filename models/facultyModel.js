const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
const locationModel = require('./location.js').schema;
const dep = require('./DepartmentModel.js').schema;

const faculty = mongoose.Schema({
    name:{type:String,required:true,unique:true,sparse:true},
    departments:[dep]
});

module.exports=mongoose.model("faculty",faculty);
