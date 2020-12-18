const mongoose=require('mongoose');
const locationModel = require('./location.js');
const HR=mongoose.Schema({
    name: String,
    email:{type:String,required:true,unique:true},

    id:{type:String,required:true,unique:true},
    
    salary:Number,

    password:{type:String,required:true,minlength:5},
    officeLocation:locationModel,
    attendanceRecord:{String},
    

});

module.exports=mongoose.model("HR",HR);
