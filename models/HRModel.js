const mongoose=require('mongoose');
const locationModel = require('./location.js').schema;
const HR=mongoose.Schema({
    name: String,
    email:{type:String,required:true,unique:true},

    id:{type:String,required:true,unique:true},
    
    salary:Number,
    leaveBalance: Number,

    password:{type:String,required:true,minlength:5},
    officeLocation:locationModel,
    attendanceRecord:{String},
    
    

});
const leaves = mongoose.Schema({
    time : {type : Date},
    signIn : {type : Boolean}
});
module.exports=mongoose.model("HR",HR);
