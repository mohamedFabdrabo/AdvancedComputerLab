const mongoose=require('mongoose');
//const locationModel = require('./location.js').schema;
const acmem= require('./AcademicMemberModel.js').schema;//academic member
const sl= require('./slot.js').schema;//academic member


const CO=mongoose.Schema({
    name: String,
    id:{type:String,required:true,unique:true},

    instructors:{type:[acmem]},
    coordinator:{type:acmem},
    academicMembers:[acmem],

    slots:[sl],

    coverage:Number

    
});

module.exports=mongoose.model("CO",CO);
