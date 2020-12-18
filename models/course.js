const mongoose=require('mongoose');
const locationModel = require('./location.js');
const acmem= require('./AcademicMemberModel.js');//academic member
const sl= require('./slot.js');//academic member


const CO=mongoose.Schema({
    instructors:{type:[acmem]},
    coordinator:{type:acmem},

    academicMembers:[acmem],
    id:{type:String,required:true,unique:true},
    name: String,
    salary:Number,

    password:{type:String,required:true,minlength:5},
    officeLocation:locationModel,
    attendanceRecord:{String},
    coverage:Number,
    slots:[sl]
    
});

module.exports=mongoose.model("CO",CO);
