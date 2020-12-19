const mongoose=require('mongoose');
const locationModel = require('./location.js');
const dep = require('./DepartmentModel.js');

const faculty = mongoose.Schema({
    name:{type:String,required:true,unique:true},
    departments:[dep]
});

module.exports=mongoose.model("faculty",faculty);
