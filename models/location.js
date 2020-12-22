const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
const location=mongoose.Schema({
    name: {type:String,required:true,unique:true,sparse:true},
    capacity:{type:String,required:true},
    type:{type:String,required:true},
    occupation:Number
});

module.exports=mongoose.model("location",location);
